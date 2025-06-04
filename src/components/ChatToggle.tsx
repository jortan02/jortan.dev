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
	} = useChat({
		initialMessages: [
			{
				id: "1",
				role: "assistant",
				content:
					"Hi! I can help you with anything about Jordan's portfolio — just ask!",
			},
		],
	});

	const isLoading = status === "submitted" || status === "streaming";

	const lastMessage = messages.at(-1);
	const isEmpty = messages.length === 0;
	const isTyping = lastMessage?.role === "user";
	const offset = "calc(2rem - (100vw - 100%))";

	const MenuButton = ({
		icon,
		onClick,
	}: {
		icon: React.ReactNode;
		onClick: () => void;
	}) => (
		<button
			onClick={onClick}
			className="duration-200 text-neutral-400 hover:text-neutral-100"
		>
			{icon}
		</button>
	);

	return (
		<div
			style={{ right: offset, marginLeft: offset }}
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
				<div
					className="w-full min-w-48 max-w-96 h-auto min-h-96 max-h-[80vh] pt-12 pb-4 px-4 flex flex-col justify-end bg-neutral-950 border border-neutral-700 rounded-lg shadow-lg overflow-hidden"
				>
					{/* Menu Buttons */}
					<div className="absolute top-3 right-3 flex items-center gap-3">
						<MenuButton
							icon={<RotateCcw className="h-5 w-5" />}
							onClick={() => setMessages([])}
						/>
						<MenuButton
							icon={<X className="h-6 w-6" />}
							onClick={() => setIsOpen(false)}
						/>
					</div>

					<ChatContainer className="flex-grow overflow-y-auto">
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
