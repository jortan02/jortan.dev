import { Portfolio } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
    item: Portfolio;
}

export const PortfolioCard: React.FC<PortfolioCardProps> = ({ item }) => {
    return (
        <Link href={"/portfolio/" + item.slug}>
            <div className="w-full">
                <h2>{item.title}</h2>
            </div>
        </Link>
    );
};
