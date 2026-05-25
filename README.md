# Schuckman & Asoc. — sitio web

Sitio del estudio de arquitectura, construido con **Astro** (sitio estático) + **Sanity** (CMS).

## Arquitectura

```
schuckman-web/
├── src/             ← Astro: el sitio que ven los visitantes
├── studio/          ← Sanity Studio: panel admin del CMS
├── public/          ← Assets estáticos (favicons, etc.)
└── astro.config.mjs
```

Dos partes que se deployan a lugares distintos:

- **Frontend (Astro)** → Cloudflare Pages → `www.schuckman.com.ar`
- **CMS (Sanity Studio)** → Hosting gratuito de Sanity → `schuckman.sanity.studio`

El frontend lee del CMS via API en cada build. Cuando se publica un cambio en el CMS, se dispara un webhook que rebuiltea el frontend automáticamente.

## Desarrollo local

### Frontend
```bash
npm install
npm run dev
```
Abre http://localhost:4321

### Studio
```bash
cd studio
npm install
npm run dev
```
Abre http://localhost:3333

## Deploy

### Variables de entorno necesarias

**Astro (Cloudflare Pages):**
- `SANITY_PROJECT_ID` — del panel de Sanity
- `SANITY_DATASET` — `production`

**Studio (sanity deploy):**
- `SANITY_STUDIO_PROJECT_ID` — mismo proyecto
- `SANITY_STUDIO_DATASET` — `production`

### Pasos de deploy completo (primera vez)

1. **Crear proyecto en Sanity** (sanity.io/manage)
   - Crear cuenta gratis
   - "Create new project" → nombre "Schuckman"
   - Guardar el Project ID

2. **Configurar Studio**
   ```bash
   cd studio
   # editar sanity.config.ts y pegar el Project ID
   npm install
   npm run deploy
   # eligir hostname: schuckman → será schuckman.sanity.studio
   ```

3. **Cargar contenido inicial** en `schuckman.sanity.studio`
   - Crear "Configuración del sitio" (singleton)
   - Crear 7 proyectos (con fotos)

4. **Conectar Cloudflare Pages**
   - Cloudflare Dashboard → Pages → "Create with Git"
   - Conectar este repo de GitHub
   - Framework: Astro
   - Build command: `npm run build`
   - Output dir: `dist`
   - Env vars: `SANITY_PROJECT_ID`, `SANITY_DATASET`
   - Deploy

5. **DNS**
   - Cloudflare Dashboard → Custom Domain → `schuckman.com.ar`
   - En el panel de Argentina Virtual: cambiar A/CNAME records a Cloudflare
   - Dejar MX records intactos (email se mantiene en Argentina Virtual)

6. **Webhook para auto-rebuild** (opcional)
   - Cloudflare Pages → Settings → Deploy Hooks → crear hook → copiar URL
   - Sanity Studio → API → Webhooks → pegar URL, trigger on publish

## Datos de contacto del estudio

- **Email**: r.schuckman@schuckman.com.ar
- **Tel/WhatsApp**: +54 11 3024-4030
- **Dirección**: Lavalle 898, 1er piso, Ituzaingó, Buenos Aires
- **Instagram**: @schuckman_asoc

## Stack

- Astro 6 (SSG)
- Sanity 3 (CMS)
- Fonts: Instrument Serif (display) + Jost (UI)
- Hosting: Cloudflare Pages (gratuito)

## Mantenimiento

Para agregar/editar un proyecto:
1. Entrar a `schuckman.sanity.studio`
2. Crear o editar el proyecto
3. Publicar
4. El sitio se rebuiltea solo en 30s (si el webhook está configurado)
