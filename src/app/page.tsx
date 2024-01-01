// https://github.com/chronark/chronark.com/
import { ParticlesContainer } from "@/components/ParticlesContainer"
import { Navigation } from "@/components/Navigation";

export default function Home() {
  return (
    <>
    <Navigation />
    <div className="flex flex-col items-center justify-center h-[calc(100vh-72px)]">
        <div className="z-10 flex flex-col items-center justify-center">
            <h1 className="my-8 text-6xl md:text-9xl text-white font-display">
                jortan  
            </h1>
            <h2 className="max-w-3xl mx-4 my-8 text-center text-sm text-neutral-300">
                Hi, my name is Jordan. I am a computer science student
                at the University of Utah. Currently, I am working on my
                bachelor&apos;s thesis on compositionality behavior in large
                language models.
            </h2>
        </div>
    </div>
    <ParticlesContainer />
    </>
  )
};