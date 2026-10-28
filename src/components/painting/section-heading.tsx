import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  light?: boolean;
  className?: string;
  as?: "h1" | "h2";
  /** "page" steps up to the page-title size; default is the section size. */
  size?: "section" | "page";
}

// Eyebrow (red rule + small caps label), condensed headline, optional lede.
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  light = false,
  className,
  as: Tag = "h2",
  size = "section",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-4 flex items-center gap-3",
            centered && "justify-center",
            light ? "text-red-bright" : "text-accent",
          )}
        >
          <span className={cn("h-[3px] w-8", light ? "bg-red-bright" : "bg-accent")} aria-hidden />
          {eyebrow}
        </p>
      )}
      <Tag
        className={cn(
          size === "page" ? "t-page" : "t-section",
          light ? "text-white" : "text-primary",
        )}
      >
        {title}
      </Tag>
      {description && (
        <p
          className={cn(
            "t-body mt-5",
            centered && "mx-auto",
            light ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
