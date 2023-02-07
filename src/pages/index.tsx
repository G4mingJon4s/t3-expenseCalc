import Link from "next/link";

export default function Home() {

	return (
		<>
			<Link href="/payments">Payments</Link><br/>
			<Link href="/create/payment">Create payment</Link>
		</>
	);
}
