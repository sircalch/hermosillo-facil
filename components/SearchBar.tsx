"use client";

import { RefObject } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
};

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar guia, tramite o apoyo",
  inputRef,
}: SearchBarProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between gap-3">
        <span className="block text-sm font-medium text-slate-700">Busqueda</span>
        <span className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-slate-600">
          Ctrl/Cmd + K
        </span>
      </div>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:ring-2 focus:ring-slate-300"
        />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Ejemplos: licencia, fuga de agua, beca, alumbrado.
      </p>
    </label>
  );
}
