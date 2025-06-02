"use client";

import { sansSerifFont } from "@/styles/fonts";

import { useState, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Chat } from "@/components/ui/chat";
import { ChatContainer, ChatForm, ChatMessages } from "@/components/ui/chat";
import { MessageInput } from "@/components/ui/message-input";
import { MessageList } from "@/components/ui/message-list";
import { PromptSuggestions } from "@/components/ui/prompt-suggestions";
import { Message } from "./ui/chat-message";

import { BotMessageSquare, RotateCcw, X } from "lucide-react";

export function ChatToggle() {
	const [isOpen, setIsOpen] = useState(false);

	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		append,
		status,
		stop,
		setMessages,
	} = useChat();

	const isLoading = status === "submitted" || status === "streaming";

	const lastMessage = messages.at(-1);
	const isEmpty = messages.length === 0;
	const isTyping = lastMessage?.role === "user";

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
					<BotMessageSquare className="h-6 w-6" />
				</button>
			)}

			{/* Chat Interface */}
			{isOpen && (
				<div className="w-80 h-[calc(100vh-20%)] min-h-96 max-h-[600px] pt-12 pb-4 px-4 flex flex-col justify-end bg-neutral-950 border border-neutral-700 rounded-lg shadow-lg overflow-y-auto relative">
					<div className="absolute top-2 right-2 flex items-center gap-2">
						<button onClick={() => setMessages([])}>
							<RotateCcw className="h-4 w-4 text-neutral-400 hover:text-neutral-100" />
						</button>
						<button onClick={() => setIsOpen(false)}>
							<X className="h-5 w-5 text-neutral-400 hover:text-neutral-100" />
						</button>
					</div>
					<ChatContainer>
						{!isEmpty ? (
							<ChatMessages messages={messages as Message[]}>
								<MessageList
									messages={messages as Message[]}
									isTyping={isTyping}
								/>
							</ChatMessages>
						) : null}

						<ChatForm
							className="mt-auto"
							isPending={isLoading || isTyping}
							handleSubmit={handleSubmit}
						>
							{() => (
								<MessageInput
									className="max-h-32"
									value={input}
									onChange={handleInputChange}
									stop={stop}
									isGenerating={isLoading}
								/>
							)}
						</ChatForm>
					</ChatContainer>
				</div>
			)}
		</div>
	);
}
