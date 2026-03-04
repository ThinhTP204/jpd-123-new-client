"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionContextType = {
  value: string | null;
  setValue: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextType | null>(null);

function Accordion({
  children,
  defaultValue,
  className,
}: {
  children: React.ReactNode;
  defaultValue?: string;
  className?: string;
}) {
  const [value, setValue] = React.useState<string | null>(defaultValue ?? null);

  return (
    <AccordionContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-value={value} className={cn("border-b border-border", className)}>
      {children}
    </div>
  );
}

function AccordionTrigger({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionTrigger must be used within Accordion");

  const isOpen = context.value === value;

  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 text-left font-medium",
        className
      )}
      onClick={() => context.setValue(isOpen ? "" : value)}
    >
      {children}
      <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
    </button>
  );
}

function AccordionContent({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const context = React.useContext(AccordionContext);
  if (!context) throw new Error("AccordionContent must be used within Accordion");

  const isOpen = context.value === value;

  return isOpen ? <div className={cn("pb-4", className)}>{children}</div> : null;
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
