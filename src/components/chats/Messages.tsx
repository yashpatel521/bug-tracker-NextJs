"use client";

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessage {
  id: number;
  content: string;
  senderName: string;
  createdAt: string;
}

const mockMessages: ChatMessage[] = [
  {
    id: 1,
    content: "Hey there! How's the bug fix going?",
    senderName: "Alice",
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    content: "Pretty smooth. Pushing updates soon.",
    senderName: "Bob",
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    content: "Great! Let me know if you need any help.",
    senderName: "Alice",
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    content: "Thanks! I will.",
    senderName: "Bob",
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    content: "By the way, did you check the new design?",
    senderName: "Alice",
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    content: "Yes, I love it! The colors are vibrant.",
    senderName: "Bob",
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    content: "I agree! It really pops.",
    senderName: "Alice",
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    content: "Can't wait to implement it.",
    senderName: "Bob",
    createdAt: new Date().toISOString(),
  },
];

export const Messages = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const msg: ChatMessage = {
      id: messages.length + 1,
      content: newMessage,
      senderName: "You",
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  //   useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);

  const chatUserName = "Alice";

  return (
    <Card className="flex-1 p-4 flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-10 p-2 border-b font-semibold text-lg flex gap-2 items-center bg-white dark:bg-[#09090b]">
        <Avatar className="h-8 w-8">
          <AvatarFallback>
            {chatUserName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {chatUserName}
      </div>

      {/* Messages */}
      <CardContent className="overflow-y-auto flex-1 space-y-4 mt-2 flex flex-col">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderName === "Alice";
          return (
            <div
              key={msg.id}
              className={`rounded-lg max-w-[70%] text-sm break-words flex items-center gap-2 
                ${isCurrentUser ? "self-end flex-row-reverse" : "self-start"}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>
                  {msg.senderName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="border rounded-lg p-2 bg-gray-100 dark:bg-gray-800">
                <div>{msg.content}</div>
                <div className="text-xs mt-1 text-gray-600">
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Input */}
      <div className="mt-2 flex items-center gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  );
};
