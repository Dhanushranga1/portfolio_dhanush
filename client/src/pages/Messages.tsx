import { useState } from "react";
import MessageCard from "@/components/MessageCard";
import MessageForm from "@/components/MessageForm";

// TODO: remove mock functionality
const initialMessages = [
  {
    content: "love your work! the attention to detail in your projects is incredible.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    content: "your blog posts have helped me so much in my learning journey. thank you!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    content: "the ui designs in your portfolio are stunning. would love to collaborate!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
];

export default function Messages() {
  const [messages, setMessages] = useState(initialMessages);

  const handleSubmit = (message: string) => {
    // TODO: remove mock functionality
    setMessages([
      {
        content: message,
        timestamp: new Date(),
      },
      ...messages,
    ]);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-mono font-bold mb-4">messages</h1>
        <p className="text-sm font-mono text-muted-foreground mb-12">
          leave an anonymous message, share your thoughts, or just say hi!
        </p>

        <div className="space-y-12">
          <MessageForm onSubmit={handleSubmit} />

          <div>
            <h2 className="text-lg font-mono font-semibold mb-6">
              recent messages ({messages.length})
            </h2>
            <div className="divide-y divide-border">
              {messages.map((message, index) => (
                <MessageCard key={index} {...message} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
