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
        <a href={link} target="_blank" className="border rounded p-3 flex justify-between space-x-2 duration-200 border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100">
            {icon}
            <h3 className="pr-2">{name}</h3>
        </a>
    );
};
