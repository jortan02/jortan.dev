"use client";

import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PortfolioCard } from "@/components/PortfolioCard";
import { allPortfolios } from "contentlayer/generated";
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

    return (
        <div className="w-full min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="px-4 pb-16 w-full mx-auto flex-grow max-w-4xl space-y-8">
                <div>
                    <h1 className="text-neutral-50 text-4xl">Portfolio</h1>
                    <div className="mt-4 w-full h-px bg-neutral-400" />
                </div>

                <div className="flex flex-wrap justify-around text-sm">
                    <button
                        className={`m-1 duration-200 hover:text-neutral-100 ${
                            filter === null
                                ? "text-neutral-100"
                                : "text-neutral-400"
                        }`}
                        onClick={() => onClickFilter(null)}
                    >
                        ALL
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`m-1 duration-200 hover:text-neutral-100 ${
                                filter === category
                                    ? "text-neutral-100"
                                    : "text-neutral-400"
                            }`}
                            onClick={() => onClickFilter(category)}
                        >
                            {category.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                {[0, 1, 2].map((columnIndex) => (
                    <div key={columnIndex} className="flex flex-col gap-4 flex-1">
                    {shownItems
                        .filter((_, index) => index % 3 === columnIndex)
                        .map((project) => (
                        <PortfolioCard key={project.slug} item={project} />
                        ))}
                    </div>
                ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
