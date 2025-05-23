"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { allPortfolios } from "contentlayer/generated";
import { Portfolio } from "contentlayer/generated";
import Link from "next/link";
import { useState } from "react";

export default function PortfolioIndex() {
	const items = allPortfolios
		.filter((item) => item.published)
		.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);

	const categories = Array.from(new Set(items.map((item) => item.category)));
	const [shownItems, setShownItems] = useState(items);
	const [filter, setFilter] = useState<null | string>(null);

	const onClickFilter = (filter: null | string) => {
		const filteredItems = items.filter(
			(item) => filter === null || filter === item.category
		);
		setShownItems(filteredItems);
		setFilter(filter);
	};

	const CategoryButton = ({
		text,
		isActive,
		onClick,
	}: {
		text: string;
		isActive: boolean;
		onClick: () => void;
	}) => (
		<button
			className={`m-1 duration-200 ${
				isActive ? "text-neutral-100" : "text-neutral-400"
			} hover:text-neutral-100`}
			onClick={onClick}
		>
			{text.toUpperCase()}
		</button>
	);

	const PortfolioCard = ({ item }: { item: Portfolio }) => {
		return (
			<Link href={"/portfolio/" + item.slug}>
				<div className="flex flex-col justify-between w-full md:min-h-80 p-6 duration-200 border rounded-lg border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100">
					<div className="flex flex-col">
						<div className="flex justify-between">
							<p className="text-xs">
								{new Date(item.date).toLocaleDateString("en-US")}
							</p>
							<p className="text-xs">{item.category.toUpperCase()}</p>
						</div>
						<h2 className="pt-2 text-xl">{item.title}</h2>
						<p className="pt-3 text-sm">{item.description}</p>
					</div>
					<ul className="pt-3 list-none flex flex-wrap">
						{item.skills.map((skill) => (
							<li key={skill} className="text-sm pr-2">
								{skill}
							</li>
						))}
					</ul>
				</div>
			</Link>
		);
	};

	return (
		<div className="w-full min-h-screen flex flex-col justify-start">
			<Navigation />
			<main className="px-4 pb-16 w-full mx-auto grow max-w-4xl space-y-8">
				<div>
					<h1 className="text-neutral-50 text-4xl">Portfolio</h1>
					<div className="mt-4 w-full h-px bg-neutral-400" />
				</div>

				<div className="flex flex-wrap justify-around text-sm">
					<CategoryButton
						key="all"
						text="ALL"
						isActive={filter === null}
						onClick={() => onClickFilter(null)}
					/>
					{categories.map((category) => (
						<CategoryButton
							key={category}
							text={category.toUpperCase()}
							isActive={filter === category}
							onClick={() => onClickFilter(category)}
						/>
					))}
				</div>

				<div className="flex flex-col md:flex-row gap-4">
					{[0, 1, 2].map((columnIndex) => (
						<div
							key={columnIndex}
							className="flex flex-col gap-4 flex-1"
						>
							{shownItems
								.filter((_, index) => index % 3 === columnIndex)
								.map((project) => (
									<PortfolioCard
										key={project.slug}
										item={project}
									/>
								))}
						</div>
					))}
				</div>
			</main>
			<Footer />
		</div>
	);
}
