import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PortfolioCard } from "@/components/PortfolioCard";
import { allPortfolios } from "contentlayer/generated";
import Image from "next/image";

export default async function PortfolioIndex() {
    const items = allPortfolios;

    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="mx-auto max-w-3xl">
                <h1 className="py-5 text-4xl">Portfolio</h1>
                <div className="p-4 md:p-0 grid grid-cols-3 gap-4 w-full">
                    {items.map((item, index) => (
                        <PortfolioCard key={index} item={item} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
