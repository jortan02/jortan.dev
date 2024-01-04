import { Portfolio } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
    item: Portfolio;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
    return (
        <Link href={"/portfolio/" + item.slug}>
            <div className="w-full p-6 duration-200 border rounded-lg border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100">
                <div className="flex justify-between">
                    <p className="text-xs">{new Date(item.date).toLocaleDateString("en-US")}</p>
                    <p className="text-xs">{item.category.toUpperCase()}</p>
                </div>
                <h2 className="pt-2 text-2xl">{item.title}</h2>
                <p className="pt-3 text-sm">{item.description}</p>
                <ul className="pt-3 list-none flex flex-wrap">
                    {item.skills.map((skill) => (
                        <li key={skill} className="text-sm pr-2">{skill}</li>
                    ))}
                </ul>
            </div>
        </Link>
    );
};
