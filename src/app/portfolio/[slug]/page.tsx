import { allPortfolios } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

import { contactInfo } from "@/constants/contactInfo";

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
            <main className="flex-grow space-y-8">
                <div className="min-h-96 px-4 flex flex-col items-center justify-center">
                    <h1 className="text-5xl">{item?.title}</h1>
                    <p className="pt-6">{item.description}</p>
                    <ul className="pt-4 list-none flex flex-wrap">
                        {item.skills.map((skill) => (
                            <li key={skill} className="pr-2">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-12">
                        {item.repository ? <a className="duration-200 text-neutral-400 hover:text-neutral-100" href={`https://${contactInfo.github}/${item.repository}`}>GitHub →</a> : null}
                        {item.url ? <a className="duration-200 text-neutral-400 hover:text-neutral-100" href={item.url}>GitHub →</a> : null}
                    </div>
                </div>
                <div className="start text-neutral-800 bg-neutral-100">
                    <ReactMarkdown className="px-4 p-16 mx-auto max-w-4xl flex flex-col justify-start space-y-6"
                        components={{
                            img: (props) => (
                                <span className="flex justify-center">
                                    <Image
                                    src={props.src!} alt={props.alt!}
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        className="w-auto h-[60vh]"
                                    />
                                </span>
                            ),
                          }}>
                        {item.body.raw}
                    </ReactMarkdown>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Page;
