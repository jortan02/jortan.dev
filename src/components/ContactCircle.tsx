interface ContactCircleProps {
    icon: React.ReactNode;
    link: string;
}

export const ContactCircle: React.FC<ContactCircleProps> = ({
    icon,
    link,
}) => {
    return (
        <a href={link} target="_blank">
            {icon}
        </a>
    );
};
