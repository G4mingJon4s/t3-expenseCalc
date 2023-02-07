import React, { useState } from 'react'
import SymbolPicker from '../components/SymbolPicker';
import DynamicIcon, { allValidIcons } from '../components/DynamicIcon';
import type { Payment } from '@prisma/client';

export default function Payments() {
	return (
		<div className="">
			<PaymentEditableCard />
		</div>
	);
}

export function PaymentEditableCard() {
	const [data, setData] = useState({
		idIn: "1231234dssdg5",
		nameIn: "Shopping",
		typeIn: "monthly",
		totalIn: 123.45,
		dateIn: "2023-02-23",
		symbolIn: "HiClipboard"
	});

	const [isEdit, setIsEdit] = useState(false);

	if (isEdit) return <PaymentCreateCard saveData={newData => {
		setData(Object.fromEntries(Object.entries(newData).map(p => [`${p[0]}In`, p[1]])) as { [K in keyof Payment as `${K}In`]: Payment[K] });
		setIsEdit(false);
	}} revertAndClose={() => setIsEdit(false)} data={data} setData={(data) => console.log(data)} />
	else return <PaymentShowCard deleteEntry={() => alert("not implemented!")} data={data} openEdit={() => setIsEdit(true)} />
}

interface PaymentCreateCardProps {
	saveData: (data: Payment) => void;
	revertAndClose: () => void;
	setData: (data: Payment) => void;
	data: {
		[K in keyof Payment as `${K}In`]: Payment[K]
	};
}

export function PaymentCreateCard({ revertAndClose, saveData, data: { idIn, nameIn, typeIn, totalIn, dateIn, symbolIn } }: PaymentCreateCardProps) {
	const [name, setName] = useState(nameIn ?? "");
	const [type, setType] = useState(typeIn ?? "monthly");
	const [total, setTotal] = useState<number | undefined>(totalIn);
	const [date, setDate] = useState(dateIn ?? "");
	const [symbol, setSymbol] = useState(symbolIn ?? "HiArchive");

	const newPayment: Payment = {
		id: idIn,
		name,
		type,
		total: total ?? 0,
		date,
		symbol
	};

	const isValid = (name.length > 0) && (allValidIcons.includes(symbol)) && ((total ?? 0) >= 0) && (!Number.isNaN(Date.parse(date)));

	return (
		<div className={`m-4 flex flex-row rounded-lg bg-gray-300 p-4 ${isValid ? "text-positive" : "text-negative"}`}>
			<SymbolPicker selected={symbol} setSelected={name => setSymbol(name)} />
			<input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { e.preventDefault(); setName(e.currentTarget.value) }} type="text" name="payment-name" placeholder="Shopping" required className="clickable ml-4 w-[20rem] rounded-lg bg-gray-200 px-4" />
			<select name="payment-type" value={type} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => { e.preventDefault(); setType(e.target.value) }} className="clickable ml-4 w-[20rem] rounded-lg bg-gray-200 px-4">
				<option value="monthly">monthly</option>
				<option value="weekly">weekly</option>
			</select>
			<input value={total} type="number" name="payment-total" placeholder="123.45" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTotal(Number(e.currentTarget.value))} className="clickable ml-4 w-[20rem] rounded-lg bg-gray-200 px-4 text-right" />
			<input type="date" value={date} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDate(e.target.value)} className="clickable ml-4 rounded-lg bg-gray-200 px-4" />
			<button type="button" name="payment-submit" disabled={!isValid} onClick={() => saveData(newPayment)} className="text-positive clickable ml-auto rounded-[50%] bg-gray-200 p-4">
				<DynamicIcon iconName="HiCheckCircle" props={{ size: 32 }} />
			</button>
			<button type="button" name="payment-cancel" onClick={revertAndClose} className="text-negative clickable ml-4 rounded-[50%] bg-gray-200 p-4">
				<DynamicIcon iconName="HiBan" props={{ size: 32 }} />
			</button>
		</div>
	);
}

interface PaymentShowCardProps {
	deleteEntry: () => void;
	openEdit: () => void;
	data: Omit<{
		[K in keyof Payment as `${K}In`]: Payment[K]
	}, "idIn">;
}

export function PaymentShowCard({ deleteEntry, openEdit, data: { nameIn, typeIn, totalIn, dateIn, symbolIn } }: PaymentShowCardProps) {
	return (
		<div className="text-neutral group m-4 flex flex-row rounded-lg bg-gray-300 p-4">
			<div className="rounded-[50%] bg-gray-200 p-4">
				<DynamicIcon iconName={symbolIn} props={{ size: 32 }} />
			</div>
			<input value={nameIn} disabled type="text" name="payment-name" placeholder="Shopping" className="ml-4 w-[20rem] rounded-lg bg-gray-200 px-4" />
			<input value={typeIn} disabled type="text" name="payment-type" placeholder="Monthly" className="ml-4 w-[20rem] rounded-lg bg-gray-200 px-4" />
			<input value={totalIn} disabled type="number" name="payment-total" placeholder="123.45" className="ml-4 w-[20rem] rounded-lg bg-gray-200 px-4 text-right" />
			<input value={dateIn} disabled type="date" className="ml-4 rounded-lg bg-gray-200 px-4" />
			<button type="button" onClick={openEdit} name="payment-submit" className="clickable ml-auto rounded-[50%] bg-gray-200 p-4 opacity-0 group-hover:opacity-100">
				<DynamicIcon iconName="HiCog" props={{ size: 32 }} />
			</button>
			<button type="button" name="payment-cancel" onClick={deleteEntry} className="text-negative clickable ml-4 rounded-[50%] bg-gray-200 p-4 opacity-0 group-hover:opacity-100">
				<DynamicIcon iconName="HiMinusCircle" props={{ size: 32 }} />
			</button>
		</div>
	);
}
