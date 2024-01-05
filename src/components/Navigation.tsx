"use client";
import { resumeInfo } from "@/constants/resumeInfo";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";


export const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const finalSlashIndex = usePathname().lastIndexOf('/')
    let previousPath = usePathname().slice(0, finalSlashIndex)
    if (previousPath === "") {
        previousPath = "/"
    }
    return (
        <header className={`h-[72px] sticky top-0 duration-200 ${
            isScrolled ? "bg-neutral-900 border-b border-neutral-800" : "bg-transparent border-b border-transparent"
          }`}>
            <div className="px-4 py-6 mx-[3vw] flex flex-row-reverse items-center justify-between">
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
