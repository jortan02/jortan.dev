import { contactInfo } from "@/constants/contactInfo";
import { ContactCard } from "@/components/ContactCard";
import {
    IconUserCircle,
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

export default async function ContactIndex() {
    return (
        <main className="flex-grow flex flex-col items-center justify-center">
            <div className="w-1/2">
                <h1 className="text-center text-4xl font-bold">Contact</h1>
                <div className="py-16 w-full flex flex-col md:flex-row items-center justify-center space-y-4">
                    <div className="md:w-2/5 flex flex-col items-center justify-center space-y-5">
                        <IconUserCircle size={48} />
                        <h2 className="text-2xl">Jordan Tan</h2>
                    </div>
                    <div className="md:w-3/5 max-w-96 flex flex-col space-y-3">
                        <ContactCard
                            icon={<IconMail size={24} />}
                            link={`mailto:${contactInfo.email}`}
                            name={contactInfo.email}
                        />
                        <ContactCard
                            icon={<IconBrandGithub size={24} />}
                            link={`https://${contactInfo.github}`}
                            name={contactInfo.github}
                        />
                        <ContactCard
                            icon={<IconBrandLinkedin size={24} />}
                            link={`https://${contactInfo.linkedin}`}
                            name={contactInfo.linkedin}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
