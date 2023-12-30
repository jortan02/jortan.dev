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
                <Image
                    className={"aspect-square object-cover"}
                    src={item.image.src}
                    width={item.image.width}
                    height={item.image.height}
                    alt={item.title}
                />
            </div>
        </Link>
    );
};
