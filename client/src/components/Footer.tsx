import { useSiteSettings } from "@/hooks/useStrapi";

export default function Footer() {
  const { data } = useSiteSettings();
  const fullName = data?.data?.fullName ?? "dhanush ranga gopisetty";

  return (
    <footer className="border-t border-border mt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <p className="text-xs font-mono text-muted-foreground text-center">
          © {new Date().getFullYear()} {fullName.toLowerCase()}
        </p>
      </div>
    </footer>
  );
}
