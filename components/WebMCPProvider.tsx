"use client";

import { useEffect } from "react";

export function WebMCPProvider() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    if (!("modelContext" in navigator)) return;

    const mc = (navigator as any).modelContext;

    mc.registerTool({
      name: "getBookInfo",
      description:
        "Get information about The Explorer Mindset book by Jean-Philippe Gauthier",
      inputSchema: {
        type: "object",
        properties: {},
        required: [],
      },
      async execute() {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                title: "The Explorer Mindset",
                subtitle: "A Guide to Growth for Your Life, Family, and Work",
                author: "Jean-Philippe Gauthier",
                foreword: "Sean Downey",
                published: "2026-02-25",
                description:
                  "A practical guide to building curiosity, adaptability, and resilience for navigating an uncertain future.",
                themes: ["Curiosity", "Adaptability", "Resilience"],
                audience:
                  "Anyone navigating change in their career, family, or personal life",
                website: "https://theexplorermindset.com",
              }),
            },
          ],
        };
      },
    });

    mc.registerTool({
      name: "subscribeNewsletter",
      description:
        "Subscribe to The Explorer Mindset newsletter for reflections on curiosity, adaptability, and resilience",
      inputSchema: {
        type: "object",
        properties: {
          email: {
            type: "string",
            description: "Email address to subscribe",
            pattern: "^[^@]+@[^@]+\\.[^@]+$",
          },
        },
        required: ["email"],
      },
      async execute({ email }: { email: string }) {
        try {
          const res = await fetch("/api/subscribe", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          });
          const data = await res.json();
          return {
            content: [
              {
                type: "text",
                text: data.success
                  ? "Successfully subscribed to The Explorer Mindset newsletter."
                  : `Subscription failed: ${data.error}`,
              },
            ],
          };
        } catch {
          return {
            content: [
              {
                type: "text",
                text: "Subscription failed due to a network error.",
              },
            ],
          };
        }
      },
    });

    return () => {
      mc.unregisterTool?.("getBookInfo");
      mc.unregisterTool?.("subscribeNewsletter");
    };
  }, []);

  return null;
}
