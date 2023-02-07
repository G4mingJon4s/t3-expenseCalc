import React, { useState } from 'react'
import DynamicIcon, { allValidIcons } from './DynamicIcon';

const iconsPerPage = 12;

interface Props {
	selected: string;
	setSelected: (name: string) => void;
}

export default function SymbolPicker({ selected, setSelected}: Props) {
	const [isOpen, setIsOpen] = useState(false);
	const [page, setPage] = useState(1);

	function handleToggleSymbol(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		setIsOpen(val => !val);
	}

	const maxPages = Math.ceil(allValidIcons.length / iconsPerPage)

	function pageButtonHandler(right = false) {
		return function(e: React.MouseEvent<HTMLButtonElement>) {
			e.preventDefault();
			setPage(val => {
				const computed = val +(right ? 1 : -1);
				return Math.max(1, Math.min(maxPages, computed));
			})
		}
	}

	function selectIconHandler(name: string) {
		return (e: React.MouseEvent<HTMLButtonElement>) => {
			e.preventDefault();
			setSelected(name);
			setIsOpen(false);
		};
	}

	return (
		<div className="relative flex items-center">
			<button onClick={handleToggleSymbol} className="clickable rounded-[50%] bg-gray-200 p-4">
				<DynamicIcon iconName={selected} props={{ size: 32 }}/>
			</button>
			{isOpen && <div className="absolute top-[110%] left-0 z-10 h-max min-w-[300px] rounded-lg bg-gray-400 p-4 shadow-lg shadow-red-400">
				<div className="grid grid-cols-4 grid-rows-3 items-center">
					{allValidIcons.slice((page - 1) * iconsPerPage, page * iconsPerPage).map(s =>
						<button onClick={selectIconHandler(s)} key={s} className="button mx-auto my-2 rounded-[50%] bg-gray-100 p-2">
							<DynamicIcon iconName={s} props={{ size: 32 }}/>
						</button>)}
				</div>
				<div className="m-auto flex justify-between rounded-lg bg-gray-100 p-4">
					<button onClick={pageButtonHandler(false)} className=""><DynamicIcon iconName="HiArrowLeft" props={{ size: 32 }}/></button>
					<div>{page} / {maxPages}</div>
					<button onClick={pageButtonHandler(true)} className=""><DynamicIcon iconName="HiArrowRight" props={{ size: 32 }}/></button>
				</div>
			</div>}
		</div>
	);
}