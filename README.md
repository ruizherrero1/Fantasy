# Fantasy Stratos

Fantasy privado de LaLiga para jugar con amigos. Incluye plantilla y alineaciones, capitán y banquillo configurables, clasificación, jornada, chat, administración, auditoría y cuatro sistemas de mercado: pujas, precio fijo, cláusulas y traspasos directos.

## Stack

- Next.js 16, React 19 y TypeScript
- Tailwind CSS 4 más un sistema visual propio con cuatro temas
- Supabase como PostgreSQL gestionado, sin Supabase Auth
- Autenticación propia con `scrypt`, sesiones revocables y cookies `HttpOnly`
- API-Football como adaptador inicial de datos reales de LaLiga
- Vercel como destino recomendado de despliegue

## Desarrollo local

```bash
npm install
copy .env.example .env.local
npm run dev
```

Abre `http://localhost:3000`. La ruta `/app` tiene un modo demo funcional que persiste pujas y ajustes en el navegador.

## Base de datos

1. Crea un proyecto en Supabase.
2. Copia `SUPABASE_URL` y la clave `service_role` en `.env.local`. Esa clave solo debe existir en el servidor.
3. Vincula el proyecto y aplica la migración:

```bash
npx supabase login
npx supabase link --project-ref TU_PROJECT_REF
npx supabase db push
```

Las tablas tienen RLS activado, no conceden acceso a `anon` ni `authenticated`, y solo el backend usa `service_role`. Esto es intencionado porque Fantasy Stratos mantiene su propio sistema de identidad.

## Datos reales

Configura `API_FOOTBALL_KEY`, `API_FOOTBALL_LALIGA_ID=140` y la temporada. El endpoint protegido de sincronización es:

```text
POST /api/cron/sync-players?page=1
Authorization: Bearer <CRON_SECRET>
```

La respuesta indica `nextPage`; repite la llamada hasta que sea `null`. Los datos deportivos proceden del proveedor y el valor fantasy se calcula internamente con rendimiento, apariciones, goles y asistencias. Las reglas de puntuación viven en `src/lib/scoring.ts` y pueden evolucionar por liga.

## Despliegue

Importa el repositorio en Vercel, añade las variables de `.env.example` y despliega. Antes de abrir la liga a los amigos, aplica la migración y crea el primer usuario desde `/login`.

## Estado actual

La interfaz completa y el modo demo están listos. El esquema de producción, autenticación propia y sincronización de jugadores reales también están implementados; para activarlos hacen falta las credenciales de Supabase y API-Football.
