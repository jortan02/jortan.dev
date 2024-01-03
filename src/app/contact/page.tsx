import { contactInfo } from "@/constants/contactInfo";
import { ContactCard } from "@/components/ContactCard";
import {
    IconUser,
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default async function ContactIndex() {
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="flex-grow flex flex-col items-center justify-center">
                <h1 className="text-center text-4xl">Let&apos;s connect</h1>
                <div className="w-1/2">
                    <div className="py-16 w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16">
                        <div className="flex flex-col justify-center space-y-5">
                            <div className="w-32 h-32 bg-neutral-300 flex items-center justify-center ">
                                <IconUser
                                    size={84}
                                    strokeWidth={1.5}
                                    color="#101010"
                                />
                            </div>
                            <h2 className="text-2xl">Jordan Tan</h2>
                        </div>
                        <div className="md:w-3/5 min-w-fit flex flex-col space-y-3">
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
            <Footer />
        </div>
    );
}
