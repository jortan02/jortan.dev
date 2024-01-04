interface ContactCardProps {
    icon: React.ReactNode;
    link: string;
    name: string;
}

export const ContactCard: React.FC<ContactCardProps> = ({
    icon,
    link,
    name,
}) => {
    return (
        <a href={link} target="_blank" className="w-full h-20 px-6 border rounded-lg flex items-center justify-between space-x-6 duration-200 border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100">
            {icon}
            <h3 className="pr-2">{name}</h3>
        </a>
    );
};
