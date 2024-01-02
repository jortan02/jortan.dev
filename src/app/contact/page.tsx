import { contactInfo } from "@/constants/contactInfo";
import { ContactCard } from "@/components/ContactCard";
import { Navigation } from "@/components/Navigation";
import {
    IconUserCircle,
    IconMail,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";
import { Footer } from "@/components/Footer";

export default async function ContactIndex() {
    return (
        <>
            <Navigation />
            <section className="min-h-[calc(100vh-72px-36px)] flex flex-col items-center justify-center">
                <div className="w-1/2">
                    <h1 className="text-center text-4xl font-bold">Contact</h1>
                    <div className="p-16 w-full flex items-center justify-center">
                        <div className="w-2/5 flex flex-col items-center justify-center space-y-5">
                            <IconUserCircle size={48}/>
                            <h2 className="text-2xl">Jordan Tan</h2>
                        </div>
                        <div className="mr-10 w-0.5 self-stretch bg-neutral-400 opacity-100"></div>
                        <div className="w-3/5 flex flex-col space-y-3">
                            <ContactCard
                                icon={<IconMail />}
                                link={`mailto:${contactInfo.email}`}
                                name={contactInfo.email}
                            />
                            <ContactCard
                                icon={<IconBrandGithub />}
                                link={`https://${contactInfo.github}`}
                                name={contactInfo.github}
                            />
                            <ContactCard
                                icon={<IconBrandLinkedin />}
                                link={`https://${contactInfo.linkedin}`}
                                name={contactInfo.linkedin}
                            />
                        </div>
                        <div></div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
