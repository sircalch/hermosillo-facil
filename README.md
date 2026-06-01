## Hermosillo Facil

Web local para concentrar tramites, apoyos y telefonos utiles de Hermosillo.

### Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Fuse.js para busqueda local
- JSON local para contenido

### Funcionalidad MVP

- Landing con accesos rapidos
- Buscador de guias
- Pagina por categoria
- Ficha de guia con requisitos y pasos
- Telefonos utiles
- Boton para compartir guia
- API interna para busqueda remota de guias

### Estructura principal

```txt
app/
  page.tsx
  buscar/page.tsx
  categoria/[slug]/page.tsx
  guia/[slug]/page.tsx
  telefonos/page.tsx
  about/page.tsx
components/
  SearchGuidesClient.tsx
  SearchBar.tsx
  CategoryCard.tsx
  GuideCard.tsx
  GuideDetail.tsx
  UsefulPhoneCard.tsx
  ShareButton.tsx
data/
  categories.json
  guides.json
  phones.json
lib/
  content.ts
  search.ts
types/
  guide.ts
```

### Ejecutar local

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000` o el puerto disponible.

### Scripts

- `npm run dev`
- `npm run lint`
- `npm run build`

### API interna (App Router)

- `GET /api/guides` con filtros:
  - `q` (texto)
  - `category` (`all` o slug)
  - `source` (`all`, `oficial`, `abierto`, `ciudadano`, `verificado`)
  - `limit`

### Persistencia opcional (Supabase)

Si defines estas variables, `GET /api/guides` consulta Supabase.  
Sin variables, usa `data/guides.json` local.

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SUPABASE_GUIDES_TABLE` (opcional, default: `guides`)

Schema sugerido: `supabase/schema.sql`

### Seguridad de rutas internas

Las rutas `/about` y `/admin/*` estan protegidas con HTTP Basic Auth en `proxy.ts`.

- `INTERNAL_ROUTE_USER`
- `INTERNAL_ROUTE_PASSWORD`
- `NEXT_PUBLIC_SHOW_INTERNAL_NAV` (opcional, `true` para mostrar links internos en el menu)

### Deploy

Recomendado en Vercel.
