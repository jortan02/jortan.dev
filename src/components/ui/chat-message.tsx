"use client"

import React, { useMemo, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"
import { Ban, ChevronRight, Code2, Loader2, Terminal } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { FilePreview } from "@/components/ui/file-preview"
import { MarkdownRenderer } from "@/components/ui/markdown-renderer"

const chatBubbleVariants = cva(
  "group/message relative break-words rounded-lg p-3 text-sm sm:max-w-[70%]",
  {
    variants: {
      isUser: {
        true: "bg-primary text-primary-foreground",
        false: "bg-muted text-foreground",
      },
      animation: {
        none: "",
        slide: "duration-300 animate-in fade-in-0",
        scale: "duration-300 animate-in fade-in-0 zoom-in-75",
        fade: "duration-500 animate-in fade-in-0",
      },
    },
    compoundVariants: [
      {
        isUser: true,
        animation: "slide",
        class: "slide-in-from-right",
      },
      {
        isUser: false,
        animation: "slide",
        class: "slide-in-from-left",
      },
      {
        isUser: true,
        animation: "scale",
        class: "origin-bottom-right",
      },
      {
        isUser: false,
        animation: "scale",
        class: "origin-bottom-left",
      },
    ],
  }
)

type Animation = VariantProps<typeof chatBubbleVariants>["animation"]

interface Attachment {
  name?: string
  contentType?: string
  url: string
}

interface PartialToolCall {
  state: "partial-call"
  toolName: string
}

interface ToolCall {
  state: "call"
  toolName: string
}

interface ToolResult {
  state: "result"
  toolName: string
  result: {
    __cancelled?: boolean
    [key: string]: any
  }
}

type ToolInvocation = PartialToolCall | ToolCall | ToolResult

interface ReasoningPart {
  type: "reasoning"
  reasoning: string
}

interface ToolInvocationPart {
  type: "tool-invocation"
  toolInvocation: ToolInvocation
}

interface TextPart {
  type: "text"
  text: string
}

// For compatibility with AI SDK types, not used
interface SourcePart {
  type: "source"
}

type MessagePart = TextPart | ReasoningPart | ToolInvocationPart | SourcePart

export interface Message {
  id: string
  role: "user" | "assistant" | (string & {})
  content: string
  createdAt?: Date
  experimental_attachments?: Attachment[]
  toolInvocations?: ToolInvocation[]
  parts?: MessagePart[]
}

export interface ChatMessageProps extends Message {
  showTimeStamp?: boolean
  animation?: Animation
  actions?: React.ReactNode
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  role,
  content,
  createdAt,
  showTimeStamp = false,
  animation = "scale",
  actions,
  experimental_attachments,
  toolInvocations,
  parts,
}) => {
  const files = useMemo(() => {
    return experimental_attachments?.map((attachment) => {
      const dataArray = dataUrlToUint8Array(attachment.url)
      const file = new File([dataArray], attachment.name ?? "Unknown")
      return file
    })
  }, [experimental_attachments])

  const isUser = role === "user"

  const formattedTime = createdAt?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  if (isUser) {
    return (
      <div
        className={cn("flex flex-col", isUser ? "items-end" : "items-start")}
      >
        {files ? (
          <div className="mb-1 flex flex-wrap gap-2">
            {files.map((file, index) => {
              return <FilePreview file={file} key={index} />
            })}
          </div>
        ) : null}

        <div className={cn(chatBubbleVariants({ isUser, animation }))}>
          <MarkdownRenderer>{content}</MarkdownRenderer>
        </div>

        {showTimeStamp && createdAt ? (
          <time
            dateTime={createdAt.toISOString()}
            className={cn(
              "mt-1 block px-1 text-xs opacity-50",
              animation !== "none" && "duration-500 animate-in fade-in-0"
            )}
          >
            {formattedTime}
          </time>
        ) : null}
      </div>
    )
  }

  // Group consecutive tool calls together to render them in a single block
  const processedParts = useMemo(() => {
    if (!parts) return []
    const result: (
      | MessagePart
      | { type: "tool-group"; toolInvocations: ToolInvocation[] }
    )[] = []

    for (const part of parts) {
      const lastPart = result[result.length - 1]

      if (
        part.type === "tool-invocation" &&
        lastPart &&
        lastPart.type === "tool-group"
      ) {
        lastPart.toolInvocations.push(part.toolInvocation)
      } else if (part.type === "tool-invocation") {
        result.push({
          type: "tool-group",
          toolInvocations: [part.toolInvocation],
        })
      } else {
        result.push(part)
      }
    }
    return result
  }, [parts])

  if (parts && parts.length > 0) {
    return (
      <div className="flex w-full flex-col items-start">
        {processedParts.map((part, index) => {
          const isLastPart = index === processedParts.length - 1

          if (part.type === "text") {
            return (
              <div
                className={cn(
                  "w-full",
                  !isLastPart && "mb-2"
                )}
              >
                <div
                  className={cn(chatBubbleVariants({ isUser, animation }))}
                  key={`text-${index}`}
                >
                  <MarkdownRenderer>{part.text}</MarkdownRenderer>
                  {actions ? (
                    <div className="absolute -bottom-4 right-2 flex space-x-1 rounded-lg border bg-background p-1 text-foreground opacity-0 transition-opacity group-hover/message:opacity-100">
                      {actions}
                    </div>
                  ) : null}
                </div>
              </div>
            )
          }
          if (part.type === "reasoning") {
            return (
              <div key={`reasoning-${index}`} className={cn(!isLastPart && "mb-2")}>
                <ReasoningBlock part={part} />
              </div>
            )
          }
          if (part.type === "tool-group") {
            return (
              <div key={`tool-group-${index}`} className={cn(!isLastPart && "mb-2")}>
                <ToolCall
                  toolInvocations={part.toolInvocations}
                />
              </div>
            )
          }
          return null
        })}
        {showTimeStamp && createdAt && (
          <time
            dateTime={createdAt.toISOString()}
            className={cn(
              "mt-1 block px-1 text-xs opacity-50",
              animation !== "none" && "duration-500 animate-in fade-in-0"
            )}
          >
            {formattedTime}
          </time>
        )}
      </div>
    )
  }

  if (toolInvocations && toolInvocations.length > 0) {
    return <ToolCall toolInvocations={toolInvocations} />
  }

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className={cn(chatBubbleVariants({ isUser, animation }))}>
        <MarkdownRenderer>{content}</MarkdownRenderer>
        {actions ? (
          <div className="absolute -bottom-4 right-2 flex space-x-1 rounded-lg border bg-background p-1 text-foreground opacity-0 transition-opacity group-hover/message:opacity-100">
            {actions}
          </div>
        ) : null}
      </div>

      {showTimeStamp && createdAt ? (
        <time
          dateTime={createdAt.toISOString()}
          className={cn(
            "mt-1 block px-1 text-xs opacity-50",
            animation !== "none" && "duration-500 animate-in fade-in-0"
          )}
        >
          {formattedTime}
        </time>
      ) : null}
    </div>
  )
}

function dataUrlToUint8Array(data: string) {
  const base64 = data.split(",")[1]
  const buf = Buffer.from(base64, "base64")
  return new Uint8Array(buf)
}

const ReasoningBlock = ({ part }: { part: ReasoningPart }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex flex-col items-start sm:max-w-[70%]">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="group w-full overflow-hidden rounded-lg border bg-muted/50"
      >
        <div className="flex items-center p-2">
          <CollapsibleTrigger asChild>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-4 w-4 transition-transform group-data-[state=open]:rotate-90" />
              <span>Thinking</span>
            </button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent forceMount>
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            variants={{
              open: { height: "auto", opacity: 1 },
              closed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="border-t"
          >
            <div className="p-2">
              <div className="whitespace-pre-wrap text-xs">
                {part.reasoning}
              </div>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

function ToolCall({
  toolInvocations,
}: Pick<ChatMessageProps, "toolInvocations">) {
  if (!toolInvocations?.length) return null

  const runningInvocations = toolInvocations.filter(
    (inv) => inv.state === "call" || inv.state === "partial-call"
  )

  // If any tool is running, display the "in-progress" state.
  if (runningInvocations.length > 0) {
    const totalTools = toolInvocations.length
    return (
      <div className="flex min-w-[210px] items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>
          {totalTools > 1 ? (
            <>Calling {totalTools} tools...</>
          ) : (
            <>
              Calling{" "}
              <span className="font-mono">
                {"`"}
                {toolInvocations[0].toolName}
                {"`"}
              </span>
              ...
            </>
          )}
        </span>
      </div>
    )
  }

  // If no tools are running, show a consolidated "completed" or "cancelled" message.
  const totalTools = toolInvocations.length
  const cancelledTools = toolInvocations.filter(
    (inv) => inv.state === "result" && inv.result.__cancelled
  ).length

  // All tools were cancelled
  if (cancelledTools === totalTools) {
    return (
      <div className="flex min-w-[210px] items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
        <Ban className="h-4 w-4" />
        <span>
          {totalTools > 1 ? (
            <>{totalTools} tools cancelled</>
          ) : (
            <>
              Cancelled{" "}
              <span className="font-mono">
                {"`"}
                {toolInvocations[0].toolName}
                {"`"}
              </span>
            </>
          )}
        </span>
      </div>
    )
  }

  // All tools completed
  return (
    <div className="flex min-w-[210px] items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
      <Code2 className="h-4 w-4" />
      <span>
        {totalTools > 1 ? (
          <>{totalTools} tools completed</>
        ) : (
          <>
            <span className="font-mono">
              {"`"}
              {toolInvocations[0].toolName}
              {"`"}
            </span>{" "}
            completed
          </>
        )}
      </span>
    </div>
  )
}
