import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PortfolioCard } from "@/components/PortfolioCard";
import { allPortfolios } from "contentlayer/generated";
import Image from "next/image";

export default async function PortfolioIndex() {
    const sorted = allPortfolios
        .filter((item) => item.published)
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="px-4 pb-16 mx-auto flex-grow max-w-4xl space-y-8">
                <div>
                    <h1 className="text-neutral-50 text-4xl">Portfolio</h1>
                    <div className="mt-4 w-full h-px bg-neutral-400" />
                </div>

                {/* Larger screens */}
                <div className="hidden md:flex flex-row space-y-0 space-x-4">
                    <div className="flex w-full flex-col space-y-4">
                        {sorted
                            .filter((_, index) => index % 2 === 0)
                            .map((project) => (
                                <PortfolioCard
                                    key={project.slug}
                                    item={project}
                                />
                            ))}
                    </div>
                    <div className="flex w-full flex-col space-y-4">
                        {sorted
                            .filter((_, index) => index % 2 === 1)
                            .map((project) => (
                                <PortfolioCard
                                    key={project.slug}
                                    item={project}
                                />
                            ))}
                    </div>
                </div>

                {/* Smaller screens */}
                <div className="flex md:hidden flex-row space-y-4">
                    <div className="flex w-full flex-col space-y-4">
                        {sorted.map((project) => (
                            <PortfolioCard key={project.slug} item={project} />
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
