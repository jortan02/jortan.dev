interface PortfolioCardProps {
    icon: React.ReactNode;
    link: string;
    name: string;
}

export const ContactCard: React.FC<PortfolioCardProps> = ({
    icon,
    link,
    name,
}) => {
    return (
        <a href={link} target="_blank" className="border rounded p-2 flex space-x-2 duration-200 border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100">
            {icon}
            <h3>{name}</h3>
        </a>
    );
};
