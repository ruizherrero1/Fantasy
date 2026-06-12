# Fantasy

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

El proyecto está preparado para compartir el Supabase `gymlog-web` (`tnuohiyrwnoqsnxyfonn`) sin tocar sus tablas. Todos los objetos de esta aplicación usan el prefijo `fantasy_`.

Fantasy no necesita la clave global `service_role`. Utiliza una clave publicable junto con `FANTASY_DATABASE_API_SECRET`, una credencial de servidor propia que las políticas RLS solo aceptan en las tablas `fantasy_*`. Esa credencial debe existir únicamente en el servidor y nunca usar el prefijo `NEXT_PUBLIC_`.

Para aplicar futuras migraciones:

```bash
npx supabase login
npx supabase link --project-ref tnuohiyrwnoqsnxyfonn
npx supabase db push
```

Las tablas tienen RLS activado. El rol `anon` solo puede operar cuando el backend envía la credencial propia de Fantasy; `authenticated` no recibe acceso y las tablas existentes de GymLog conservan sus políticas sin cambios.

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

La interfaz completa, el esquema de producción y la autenticación propia están conectados y verificados contra Supabase. La sincronización de jugadores reales está implementada y solo necesita `API_FOOTBALL_KEY`.
