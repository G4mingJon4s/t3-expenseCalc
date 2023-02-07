import React, { useState } from 'react'
import { api } from '../../utils/api';
import SymbolPicker from '../../components/SymbolPicker';

export default function Payment() {
	const paymentMutation = api.payment.createPayment.useMutation();

	const [total, setTotal] = useState(0);
	const [type, setType] = useState("monthly");
	const [date, setDate] = useState("");
	const [symbol, setSymbol] = useState("HiArchive");

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();

		paymentMutation.mutateAsync({
			type,
			total,
			date: new Date(date).toISOString(),
			symbol: "HiCalendar",
		}).then(changeToSubmit).catch(e => console.log(e));
	}

	function changeToSubmit() {
		console.log("Hello world!");
	}

	return (
		<div className="flex flex-row">
			<form onSubmit={onSubmit} className="m-4 flex w-min flex-col gap-4 rounded-lg bg-gray-100 p-4">
				<input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="button p-4" />
				<select name="type" id="type" value={type} onChange={e => setType(e.target.value)} className="button p-4">
					<option value="monthly">monthly</option>
					<option value="weekly">weekly</option>
				</select>
				<input type="date" className="button p-4" value={date} onChange={e => setDate(e.target.value)} />
				<SymbolPicker selected={symbol} setSelected={name => setSymbol(name)} />
				<button disabled={Number.isNaN(Date.parse(date))} type="submit" className="button p-4">Submit</button>
			</form>
			<span className="m-4 flex flex-col justify-evenly rounded-lg bg-gray-100 p-4">
				<div>Total: {total}€</div>
				<div>Type: {type}</div>
				<div>Start: {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })}</div>
				<div>Symbol: {symbol}</div>
			</span>
		</div>
	);
}
