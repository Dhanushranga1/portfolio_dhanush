import { useState } from "react";
import { motion } from "framer-motion";
import MessageCard, { type MessageStatus } from "@/components/MessageCard";
import MessageForm from "@/components/MessageForm";

// Curated messages - in production, these would come from Formspree submissions
// that you've manually approved and added here, or from a Google Sheet/API
const initialMessages: Array<{
  content: string;
  timestamp: Date;
  status: MessageStatus;
}> = [
  {
    content: "love your work! the attention to detail in your projects is incredible.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    status: 'published',
  },
  {
    content: "your blog posts have helped me so much in my learning journey. thank you!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    status: 'published',
  },
  {
    content: "the ui designs in your portfolio are stunning. would love to collaborate!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    status: 'published',
  },
];

export default function Messages() {
  const [messages] = useState(initialMessages);

  const handleSubmit = (message: string) => {
    // In production, this is handled by Formspree
    // Messages are sent to your email and you manually curate them
    console.log('Message submitted via Formspree:', message);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-mono font-bold mb-2 text-accent-info">
            $ messages
            <span className="animate-pulse">_</span>
          </h1>
          <p className="text-sm font-mono text-muted-foreground mb-12">
            leave an anonymous message, share your thoughts, or just say hi!
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <MessageForm onSubmit={handleSubmit} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-baseline gap-3 mb-6">
              <h2 className="text-lg font-mono font-semibold text-foreground">
                $ ls messages/
              </h2>
              <span className="text-sm font-mono text-muted-foreground">
                ({messages.length} {messages.length === 1 ? 'entry' : 'entries'})
              </span>
            </div>
            
            <div className="space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                >
                  <MessageCard {...message} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
