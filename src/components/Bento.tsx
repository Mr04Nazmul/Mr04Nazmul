// Magic UI BentoGrid/BentoCard adaptation. MIT © Magic UI.
// Structure, grouped hover lift and CTA reveal retained. Lucide replaces Radix; native links replace Button.
import type { ComponentPropsWithoutRef, ReactNode, ElementType } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../lib/utils";
export function BentoGrid({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("bento-grid", className)} {...props}>
      {children}
    </div>
  );
}
export function BentoCard({
  name,
  description,
  Icon,
  background,
  href,
  className,
  children,
}: {
  name: string;
  description: string;
  Icon: ElementType;
  background?: ReactNode;
  href: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <article className={cn("bento-card group", className)}>
      <div className="bento-background" aria-hidden="true">
        {background}
      </div>
      <div className="bento-content">
        <Icon className="bento-icon" size={30} strokeWidth={1.5} />
        <h3>{name}</h3>
        <p>{description}</p>
        {children}
      </div>
      <a
        className="bento-cta"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        Explore the code <ArrowUpRight size={16} />
        <span className="sr-only"> — {name}</span>
      </a>
      <div className="bento-overlay" />
    </article>
  );
}
