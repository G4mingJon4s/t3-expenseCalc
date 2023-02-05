import React, { useState } from 'react'

export default function Payment() {
	const [total, setTotal] = useState(0);
	const [type, setType] = useState("monthly");
	const [date, setDate] = useState("");

	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
		console.log("Submitted!");
	}

	return (
		<div className="flex flex-row">
			<form onSubmit={onSubmit} className="flex flex-col w-min gap-4 bg-gray-100 p-4 rounded-lg m-4">
				<input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="bg-gray-300 rounded-lg p-4"/>
				<select name="type" id="type" value={type} onChange={e => setType(e.target.value)} className="bg-gray-300 rounded-lg p-4">
					<option value="monthly">monthly</option>
					<option value="weekly">weekly</option>
				</select>
				<input type="date" className="bg-gray-300 rounded-lg p-4" value={date} onChange={e => setDate(e.target.value)}/>
				<button type="submit" className="bg-gray-300 rounded-lg p-4">Submit</button>
			</form>
			<span className="bg-gray-100 p-4 rounded-lg m-4 flex flex-col justify-evenly">
				<div>Total: {total}€</div>
				<div>Type: {type}</div>
				<div>Start: {new Date(date).toLocaleDateString(undefined, { year: "numeric", month: "2-digit", day: "2-digit" })}</div>
			</span>
		</div>
	)
}
