"use client";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
// import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
    // const ref = useRef<HTMLElement>(null);
    // const [isIntersecting, setIntersecting] = useState(true);

    // useEffect(() => {
    //     if (!ref.current) return;
    //     const observer = new IntersectionObserver(([entry]) =>
    //         setIntersecting(entry.isIntersecting)
    //     );

    //     observer.observe(ref.current);
    //     return () => observer.disconnect();
    // }, []);

    return (
        // <header ref={ref}>
        <header>
            {/* <div
				className={`fixed inset-x-0 top-0 z-50 duration-200 border-b  ${
					isIntersecting
						? "bg-neutral-900/0 border-transparent"
						: "bg-neutral-900/500  border-neutral-800 "
				}`}
			> */}
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
                        <ArrowLeftIcon className="w-6 h-6" />
                    </Link>
                </div>
            </div>
        </header>
    );
};
