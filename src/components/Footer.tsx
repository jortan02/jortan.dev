import { contactInfo } from "@/constants/contactInfo";
import React from "react";
import {
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

export const Footer = () => {
    return (
        <footer>
            <div className="">
                <a
                    href={`mailto:${contactInfo.email}`}
                >
                    <IconMail />
                </a>
                <a
                    href={contactInfo.github}
                >
                    <IconBrandGithub />
                </a>
                <a
                    href={contactInfo.linkedin}
                >
                    <IconBrandLinkedin />
                </a>
            </div>
            <div className="">
                <span className="">&copy; {new Date().getFullYear()} Jordan Tan</span>
                <span className="">Created using Next.js</span>
            </div>
        </footer>
    );
};