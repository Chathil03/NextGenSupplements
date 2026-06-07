"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Status = "idle" | "loading" | "success" | "duplicate" | "error";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("newsletter_subscribers")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .insert({ email } as any);

    if (!error) {
      setStatus("success");
      setEmail("");
    } else if (error.code === "23505") {
      // Unique violation — already subscribed
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  };

  const statusMessage: Record<Exclude<Status, "idle" | "loading">, { text: string; color: string }> = {
    success: { text: "You're in! Welcome to the elite.", color: "text-primary" },
    duplicate: { text: "You're already subscribed.", color: "text-secondary" },
    error: { text: "Something went wrong. Please try again.", color: "text-error" },
  };

  return (
    <section className="bg-on-background py-20 text-center">
      <div className="px-gutter max-w-2xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-on-primary uppercase mb-4">
          Join the Elite
        </h2>
        <p className="text-secondary-fixed-dim mb-10">
          Get scientific training tips and exclusive early access to
          performance-driven product launches.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ENTER YOUR EMAIL"
            required
            disabled={status === "loading" || status === "success"}
            className="flex-grow bg-transparent border-2 border-outline text-on-primary font-label-bold px-6 py-4 focus:border-primary focus:outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-bold text-label-bold uppercase tracking-widest px-10 py-4 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "..." : "SUBSCRIBE"}
          </button>
        </form>

        {status !== "idle" && status !== "loading" && (
          <p className={`mt-4 font-label-bold text-label-bold ${statusMessage[status].color}`}>
            {statusMessage[status].text}
          </p>
        )}
      </div>
    </section>
  );
}
