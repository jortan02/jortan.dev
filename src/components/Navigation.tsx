"use client";
import { resumeInfo } from "@/constants/resumeInfo";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {
    const finalSlashIndex = usePathname().lastIndexOf('/')
    let previousPath = usePathname().slice(0, finalSlashIndex)
    if (previousPath === "") {
        previousPath = "/"
    }
    return (
        <header className="h-[72px]">
            <div className="px-4 py-6 mx-0 md:mx-[3vw] flex flex-row-reverse items-center justify-between">
                <div className="flex justify-between gap-8">
                    <a
                        href={resumeInfo.resume}
                        target="_blank"
                        className="duration-200 text-neutral-400 hover:text-neutral-100"
                    >
                        Resume
                    </a>
                    <Link
                        href="/portfolio"
                        className="duration-200 text-neutral-400 hover:text-neutral-100"
                    >
                        Portfolio
                    </Link>
                    <Link
                        href="/contact"
                        className="duration-200 text-neutral-400 hover:text-neutral-100"
                    >
                        Contact
                    </Link>
                </div>
                <Link
                    href={previousPath}
                    className={`duration-200 text-neutral-400 hover:text-neutral-100 ${
                        usePathname() !== "/" ? "visible" : "hidden"
                    }`}
                >
                    <IconArrowLeft className="w-6 h-6" />
                </Link>
            </div>
        </header>
    );
};
