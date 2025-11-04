import Hero from "@/components/Hero";
import { WidgetsBand } from "@/components/WidgetsBand";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <WidgetsBand />
      </div>
    </>
  );
}
