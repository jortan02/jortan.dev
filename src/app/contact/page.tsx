import { Navigation } from "@/components/Navigation";

export default async function ContactIndex() {
    return (
        <div>
            <Navigation />
            <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
                <div className="mx-auto max-w-3xl">
                    <h1 className="text-center text-4xl font-bold py-5">
                        Contact
                    </h1>
                    <div className="flex items-center">
                        <div>
                            <h2>Jordan Tan</h2>
                        </div>
                        <div>
                            <h3>Email</h3>
                            <h3>GitHub</h3>
                            <h3>Linkedin</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
