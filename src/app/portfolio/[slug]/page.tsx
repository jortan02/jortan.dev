import { allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";

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
        <>
        <Navigation />
        <div className="mx-auto max-w-3xl p-8">
            <Link
                href="/portfolio"
                className="text-blue-500 hover:text-blue-700"
                >
                ← Back to Portfolio
            </Link>
            <h1 className="font-bold text-3xl py-3">{item?.title}</h1>
            <div className="grid grid-cols-1 grid-rows-2">
                <Image
                    src={item?.image.src}
                    width={item?.image.width}
                    height={item?.image.height}
                    alt={item?.title}
                    />
                <div dangerouslySetInnerHTML={{ __html: item.body.html }} />
            </div>
        </div>
        </>
    );
};

export default Page;
