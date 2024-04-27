import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { ParticlesContainer } from "@/components/ParticlesContainer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col justify-start">
            <Navigation />
            <main className="px-4 flex-grow flex flex-col items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="my-8 text-neutral-50 text-6xl md:text-9xl">
                        jortan
                    </h1>
                    <h2 className="max-w-3xl my-8 text-center text-sm">
                        Hi, my name is Jordan. I am a computer science BS/MS
                        student at the University of Utah. Currently, I am
                        pursuing the data management and analysis track and am
                        expected to graduate Spring 2025.
                    </h2>
                </div>
                <ParticlesContainer />
            </main>
            <Footer />
        </div>
    );
}
