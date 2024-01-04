import { contactInfo } from "@/constants/contactInfo";
import React from "react";
import {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";
import { ContactCircle } from "./ContactCircle";

const strokeWidth = 1.5

export const Footer = () => {
    return (
        <footer className="h-[36px] px-4 py-1.5 mt-auto text-sm font-medium bg-green-500 text-neutral-950 flex items-center justify-between md:flex-row">
            <span>
                &copy; {new Date().getFullYear()} Jordan Tan
            </span>
            <div className="items-center justify-center space-x-3 hidden md:flex">
                <ContactCircle
                    icon={<IconMail strokeWidth={strokeWidth} className="duration-200 hover:text-neutral-700"/>}
                    link={`mailto:${contactInfo.email}`}
                />
                <ContactCircle
                    icon={<IconBrandGithub strokeWidth={strokeWidth} className="duration-200 hover:text-neutral-700"/>}
                    link={`https://${contactInfo.github}`}
                />
                <ContactCircle
                    icon={<IconBrandLinkedin strokeWidth={strokeWidth} className="duration-200 hover:text-neutral-700"/>}
                    link={`https://${contactInfo.linkedin}`}
                />
            </div>
            <span>Created using Next.js</span>
        </footer>
    );
};
