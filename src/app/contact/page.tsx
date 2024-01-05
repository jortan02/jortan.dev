import { contactInfo } from "@/constants/contactInfo";
import { ContactCard } from "@/components/ContactCard";
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
    
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="flex-grow flex flex-col items-center justify-center">
                    <div className="w-full md:w-1/2 py-16 flex flex-col md:flex-row items-center justify-center space-y-10 md:space-y-0 md:space-x-16">
                        <div className="text-center flex flex-col justify-center space-y-5">
                            <div className="w-48 h-48 flex items-center justify-center border border-neutral-400 text-neutral-400">
                                <User
                                    size={96}
                                />
                            </div>
                            <h1 className="text-3xl">Jordan Tan</h1>
                        </div>
                        <div className="md:w-3/5 min-w-fit flex flex-col space-y-3">
                            <ContactCard
                                icon={<Envelope size={cardIconSize}/>}
                                link={`mailto:${contactInfo.email}`}
                                name={contactInfo.email}
                            />
                            <ContactCard
                                icon={<GithubLogo size={cardIconSize}/>}
                                link={`https://${contactInfo.github}`}
                                name={contactInfo.github}
                            />
                            <ContactCard
                                icon={<LinkedinLogo size={cardIconSize}/>}
                                link={`https://${contactInfo.linkedin}`}
                                name={contactInfo.linkedin}
                            />
                        </div>
                    </div>
            </main>
            <Footer />
        </div>
    );
}
