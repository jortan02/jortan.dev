import { contactInfo } from "@/utils/constants";
import React from "react";
import {
	Envelope,
	GithubLogo,
	LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";

export const Footer = () => {
	return (
		<footer className="h-[36px] px-4 py-1.5 mt-auto text-sm font-medium bg-green-500 text-neutral-950 flex items-center justify-between md:flex-row">
			<span>&copy; {new Date().getFullYear()} Jordan Tan</span>
			<div className="items-center justify-center space-x-4 hidden md:flex">
				<a href={`mailto:${contactInfo.email}`} aria-label="Email">
					<Envelope
						size={24}
						className="duration-200 hover:text-neutral-700"
					/>
				</a>
				<a
					href={`https://${contactInfo.github}`}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Github"
				>
					<GithubLogo
						size={24}
						className="duration-200 hover:text-neutral-700"
					/>
				</a>
				<a
					href={`https://${contactInfo.linkedin}`}
					target="_blank"
					rel="noopener noreferrer"
					aria-label="Linkedin"
				>
					<LinkedinLogo
						size={24}
						className="duration-200 hover:text-neutral-700"
					/>
				</a>
			</div>
			<span>Created using Next.js</span>
		</footer>
	);
};
