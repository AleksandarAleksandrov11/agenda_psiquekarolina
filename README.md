# agenda.psiquekarolina.com

Landing minimalista para reservar citas con Karolina Cieliczka. Una sola página con el calendario de Google Calendar embebido.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

1. Sube este repositorio a GitHub (o conéctalo directamente en Vercel).
2. En [vercel.com](https://vercel.com), crea un **nuevo proyecto** e importa el repo.
3. Vercel detectará Vite automáticamente. No hace falta configurar variables de entorno.
4. Despliega. Obtendrás una URL tipo `agenda-psiquekarolina.vercel.app`.

### Conectar el subdominio `agenda.psiquekarolina.com`

1. En el proyecto de Vercel, ve a **Settings → Domains**.
2. Añade el dominio: `agenda.psiquekarolina.com`.
3. Vercel te mostrará un registro DNS **CNAME** que debes crear en tu proveedor de dominio (donde gestionas `psiquekarolina.com`):

   | Tipo  | Nombre  | Valor                          |
   |-------|---------|--------------------------------|
   | CNAME | `agenda` | `cname.vercel-dns.com` (o el que indique Vercel) |

4. Espera la propagación DNS (puede tardar unos minutos u horas).
5. Vercel emitirá el certificado SSL automáticamente.

**Dominio canónico:** https://agenda.psiquekarolina.com

## SEO y favicons

- Favicons reutilizados de psiquekarolina.com (`public/`)
- `site.webmanifest` con rutas relativas
- `robots.txt` básico
- `noindex` activo: no se incluye `sitemap.xml` (una sola URL; añádelo si quitas `noindex`)

## Stack

- Vite (HTML estático)
- CSS vanilla
- Google Fonts: Fraunces + Poppins
