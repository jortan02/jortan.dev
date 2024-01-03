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
            <main className="mx-auto max-w-3xl p-8">
                <h1 className="font-bold text-3xl py-3">{item?.title}</h1>
                <div className="grid grid-cols-1 grid-rows-2">
                    <div dangerouslySetInnerHTML={{ __html: item.body.html }} />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Page;
