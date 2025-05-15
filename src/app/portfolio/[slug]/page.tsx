import { Inter } from 'next/font/google'
import { allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { contactInfo } from "@/constants/contactInfo";

const contentFont = Inter({
  subsets: ['latin'],
  display: 'swap',
})

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
            <main className="flex-grow space-y-8 text-neutral-800 bg-neutral-100">
                <div className="min-h-96 px-4 flex flex-col items-center justify-center text-neutral-300 bg-neutral-900">
                    <h1 className="text-neutral-50 text-3xl md:text-5xl text-center">{item?.title}</h1>
                    <p className="pt-6 text-center">{item.description}</p>
                    <ul className="pt-4 text-sm list-none flex items-center justify-center flex-wrap">
                        {item.skills.map((skill) => (
                            <li key={skill} className="pr-2">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-12 space-x-6">
                        {item.repository ? (
                            <a
                                className="duration-200 text-neutral-400 hover:text-neutral-100"
                                href={`https://${contactInfo.github}/${item.repository}`}
                                target="_blank"
                            >
                                GitHub →
                            </a>
                        ) : null}
                        {item.url ? (
                            <a
                                className="duration-200 text-neutral-400 hover:text-neutral-100"
                                href={`https://${item.url}`}
                                target="_blank"
                            >
                                Website →
                            </a>
                        ) : null}
                    </div>
                </div>
                <ReactMarkdown
                    className={`px-4 pb-16 mx-auto max-w-4xl flex flex-col justify-start space-y-6 ${contentFont.className}`}
                    components={{
                        img: (props) => (
                            <span className="flex justify-center">
                                <Image
                                    src={props.src!}
                                    alt={props.alt!}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    className="w-auto max-h-[60vh]"
                                />
                            </span>
                        ),
                    }}
                >
                    {item.body.raw}
                </ReactMarkdown>
            </main>
            <Footer />
        </div>
    );
};

export default Page;
