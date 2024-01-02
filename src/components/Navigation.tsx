// https://github.com/chronark/chronark.com/
"use client";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navigation: React.FC = () => {

    return (
        <header className="h-[72px]">
            <div className={"bg-neutral-900/500"}>
                <div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
                    <div className="flex justify-between gap-8">
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
                            Contacts
                        </Link>
                    </div>
                    <Link
                        href="/"
                        className={`duration-200 text-neutral-300 hover:text-neutral-100 ${
                            usePathname() !== "/" ? "visible" : "hidden"
                        }`}
                    >
                        <IconArrowLeft className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
