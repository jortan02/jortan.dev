import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PortfolioCard } from "@/components/PortfolioCard";
import { allPortfolios } from "contentlayer/generated";
import Image from "next/image";

export default async function PortfolioIndex() {
    const sorted = allPortfolios.filter((item) => item.published).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="px-4 pb-16 mx-auto flex-grow max-w-4xl space-y-8">
				<div>
                	<h1 className="text-4xl">Portfolio</h1>
					<div className="mt-4 w-full h-px bg-neutral-400" />
				</div>

                <div className="grid grid-cols-1 gap-4 mx-auto md:grid-cols-2">
                    <div className="grid grid-cols-1 gap-4">
                        {sorted
                            .filter((_, index) => index % 2 === 0)
                            .map((project) => (
                                <PortfolioCard
                                    key={project.slug}
                                    item={project}
                                />
                            ))}
                    </div>
                    <div className="grid grid-cols-1 gap-4">
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
            </main>
            <Footer />
        </div>
    );
}
