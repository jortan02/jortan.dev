import { allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

interface Params {
    params: {
        slug: string;
    };
}

const Page: React.FC<Params> = ({ params: { slug } }) => {
    const item = allPortfolios.find((item) => item.slug === slug);
    if (!item) {
        notFound();
    }
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="px-4 pb-16 mx-auto flex-grow max-w-4xl space-y-8">
				<div>
                	<h2 className="text-3xl">{item?.title}</h2>
					<div className="mt-4 w-full h-px bg-neutral-400" />
				</div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: item.body.html }} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Page;
