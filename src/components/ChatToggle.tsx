"use client";

import { sansSerifFont } from "@/styles/fonts";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { Message } from "./ui/chat-message";

export function ChatToggle() {
	const [isOpen, setIsOpen] = useState(false);
	const { messages, input, handleInputChange, handleSubmit, status, stop } =
		useChat();

	const isLoading = status === "submitted" || status === "streaming";

	return (
		<div
			style={{ right: "calc(32px - (100vw - 100%))" }}
			className={`fixed bottom-[48px] z-50 ${sansSerifFont.className}`}
		>
			{/* Toggle Button */}
			{!isOpen && (
				<button
					onClick={() => setIsOpen(!isOpen)}
					className="chat-toggle-button bg-neutral-600 text-neutral-50 p-4 rounded-full shadow-lg hover:bg-neutral-700 transition-all duration-500 ease-in-out"
				>
					💬
				</button>
			)}

			{/* Chat Interface */}
			{isOpen && (
				<div className="w-80 h-[calc(100vh-20%)] min-h-96 max-h-[600px] pt-12 pb-4 px-4 flex flex-col justify-end bg-neutral-950 border border-neutral-700 rounded-lg shadow-lg overflow-y-auto relative">
					<button
						onClick={() => setIsOpen(false)}
						className="duration-200 text-neutral-400 hover:text-neutral-100 absolute top-2 right-4 text-xl"
					>
						✖
					</button>
					<Chat
						className="overflow-hidden"
						messages={messages as Message[]}
						input={input}
						handleInputChange={handleInputChange}
						handleSubmit={handleSubmit}
						isGenerating={isLoading}
						stop={stop}
					/>
				</div>
			)}
		</div>
	);
}
