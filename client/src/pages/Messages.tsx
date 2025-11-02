import { useState } from "react";
import MessageCard from "@/components/MessageCard";
import MessageForm from "@/components/MessageForm";
import { MessageSquare } from "lucide-react";

// TODO: remove mock functionality
const initialMessages = [
  {
    content: "Love your work! The attention to detail in your projects is incredible. Keep creating amazing things!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    content: "Your blog posts have helped me so much in my learning journey. Thank you for sharing your knowledge!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    content: "The UI designs in your portfolio are stunning. Would love to collaborate on a project sometime!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    content: "Just wanted to say your work inspires me to become a better developer. Keep it up!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
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
    <div className="min-h-screen pt-32 pb-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <MessageSquare className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent">
              Message Board
            </span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Leave an anonymous message, share your thoughts, or just say hi!
          </p>
        </div>

        {/* Message Form */}
        <div className="mb-16">
          <MessageForm onSubmit={handleSubmit} />
        </div>

        {/* Messages List */}
        <div>
          <h2 className="text-2xl font-display font-bold mb-6">
            Recent Messages ({messages.length})
          </h2>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <MessageCard key={index} {...message} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
