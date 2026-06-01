"use client";

import { useState } from "react";

type ShareButtonProps = {
  title: string;
  text: string;
};

export function ShareButton({ title, text }: ShareButtonProps) {
  const [message, setMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const payload = { title, text, url: window.location.href };

    try {
      if (navigator.share) {
        await navigator.share(payload);
        setMessage("Guia compartida.");
        return;
      }

      await navigator.clipboard.writeText(`${text} | ${window.location.href}`);
      setMessage("Enlace copiado.");
    } catch {
      setMessage("No fue posible compartir en este momento.");
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
      >
        Compartir guia
      </button>
      {message ? <p className="mt-2 text-sm text-slate-600">{message}</p> : null}
    </div>
  );
}
