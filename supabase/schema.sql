create table if not exists public.guides (
  slug text primary key,
  title text not null,
  category text not null,
  summary text not null,
  requirements jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  official_link text not null default '',
  phone text not null default 'N/D',
  location text not null default 'N/D',
  updated_at timestamptz not null default now(),
  source_type text not null check (source_type in ('oficial', 'abierto', 'ciudadano', 'verificado')),
  source_name text not null default 'Sin fuente',
  verification_status text not null check (verification_status in ('vigente', 'pendiente', 'en-revision'))
);
