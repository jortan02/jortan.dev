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

const cardIconSize = 32;
const strokeWidth = 1.5;

export default async function ContactIndex() {
    
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="flex-grow flex flex-col items-center justify-center">
                <div className="w-1/2">
                    <div className="py-16 w-full flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-16">
                        <div className="text-center flex flex-col justify-center space-y-5">
                            <div className="w-48 h-48 flex items-center justify-center border border-neutral-400 text-neutral-400">
                                <IconUser
                                    size={96}
                                    strokeWidth={strokeWidth}
                                    // color="#101010"
                                />
                            </div>
                            <h2 className="text-2xl">Jordan Tan</h2>
                        </div>
                        <div className="md:w-3/5 min-w-fit flex flex-col space-y-3">
                            <ContactCard
                                icon={<IconMail size={cardIconSize} strokeWidth={strokeWidth}/>}
                                link={`mailto:${contactInfo.email}`}
                                name={contactInfo.email}
                            />
                            <ContactCard
                                icon={<IconBrandGithub size={cardIconSize} strokeWidth={strokeWidth}/>}
                                link={`https://${contactInfo.github}`}
                                name={contactInfo.github}
                            />
                            <ContactCard
                                icon={<IconBrandLinkedin size={cardIconSize} strokeWidth={strokeWidth}/>}
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
