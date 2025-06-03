import { contactInfo } from "@/utils/constants";
import {
	User,
	Envelope,
	GithubLogo,
	LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const cardIconSize = 30;

export default async function ContactIndex() {
	const ContactCard = ({
		icon,
		link,
		name,
		isExternal
	}: {
		icon: React.ReactNode;
		link: string;
		name: string;
		isExternal: boolean;
	}) => {
		return (
			<a
				href={link}
				target={isExternal ? "_blank" : undefined}
				rel={isExternal ? "noopener noreferrer" : undefined}
				className="w-full h-20 px-6 border rounded-lg flex items-center justify-between space-x-6 duration-200 border-neutral-400 hover:border-neutral-100 text-neutral-400 hover:text-neutral-100"
			>
				{icon}
				<h3 className="text-sm md:text-l pr-2">{name}</h3>
			</a>
		);
	};

	return (
		<div className="min-h-screen flex flex-col justify-start">
			<Navigation />
			<main className="grow flex flex-col items-center justify-center">
				<div>
					<h1 className="text-neutral-50 text-4xl">Contact</h1>
					<div className="mt-4 w-full h-px bg-neutral-400" />
				</div>
				<div className="w-full md:w-1/2 py-16 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-16">
					<div className="text-center flex flex-col justify-center space-y-5">
						<div className="w-52 h-52 flex items-center justify-center border border-neutral-400 text-neutral-400">
							<User size={96} />
						</div>
						<h2 className="text-3xl">Jordan Tan</h2>
					</div>
					<div className="md:w-3/5 min-w-fit flex flex-col space-y-3">
						<ContactCard
							icon={<Envelope size={cardIconSize} />}
							link={`mailto:${contactInfo.email}`}
							name={contactInfo.email}
							isExternal={false}
						/>
						<ContactCard
							icon={<GithubLogo size={cardIconSize} />}
							link={`https://${contactInfo.github}`}
							name={contactInfo.github}
							isExternal={true}
						/>
						<ContactCard
							icon={<LinkedinLogo size={cardIconSize} />}
							link={`https://${contactInfo.linkedin}`}
							name={contactInfo.linkedin}
							isExternal={true}
						/>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}
