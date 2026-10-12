"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type ContactEvent, type LinkLocation } from "@/lib/tracking";

type TrackedLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  event: ContactEvent;
  where: LinkLocation;
  children: ReactNode;
};

/** Outbound contact link (wa.me, mailto, LinkedIn) that reports the click to the dataLayer. */
export default function TrackedLink({ href, event, where, children, onClick, ...rest }: TrackedLinkProps) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      onClick={(e) => {
        track({ event, link_location: where });
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
