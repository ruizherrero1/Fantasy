"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity, Bell, CalendarDays, Check, ChevronDown, CircleDollarSign, Crown, Gavel,
  Home, Landmark, LayoutGrid, ListFilter, LockKeyhole, MessageCircle, Minus, Moon,
  MoreHorizontal, Plus, Search, Settings, Shield, Shirt, Sparkles, Sun, Trophy,
  TrendingDown, TrendingUp, UserRound, Users, X,
} from "lucide-react";
import { Brand } from "@/components/brand";
import { activity, fixtures, marketPlayers, myPlayers, Player, standings } from "@/lib/demo-data";

type Section = "inicio" | "plantilla" | "mercado" | "clasificacion" | "jornada" | "comunidad" | "administracion" | "ajustes";
type Theme = "stratos" | "classic" | "midnight" | "sand";

type LeagueSettings = {
  theme: Theme;
  captain: boolean;
  captainMultiplier: number;
  bench: boolean;
  benchSlots: number;
  bids: boolean;
  fixedPrice: boolean;
  clauses: boolean;
  directTransfers: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketNotifications: boolean;
};

const defaults: LeagueSettings = {
  theme: "stratos", captain: true, captainMultiplier: 1.5, bench: true, benchSlots: 4,
  bids: true, fixedPrice: true, clauses: true, directTransfers: true,
  emailNotifications: true, pushNotifications: false, marketNotifications: true,
};

const nav = [
  { id: "inicio" as const, label: "Inicio", icon: Home },
  { id: "plantilla" as const, label: "Mi plantilla", icon: Shirt },
  { id: "mercado" as const, label: "Mercado", icon: Gavel, badge: 6 },
  { id: "clasificacion" as const, label: "Clasificación", icon: Trophy },
  { id: "jornada" as const, label: "Jornada", icon: CalendarDays },
  { id: "comunidad" as const, label: "Comunidad", icon: MessageCircle, badge: 3 },
];

const sectionTitles: Record<Section, [string, string]> = {
  inicio: ["Buenas tardes, Ramón", "Jornada 32 · Cierra el sábado a las 13:45"],
  plantilla: ["Mi plantilla", "15 jugadores · Valor de equipo 178,1 M€"],
  mercado: ["Mercado", "6 jugadores disponibles · Cierra hoy a las 22:00"],
  clasificacion: ["Clasificación", "Liga Stratos · Temporada 2025/26"],
  jornada: ["Jornada 32", "Sábado 18 de abril · 10 partidos"],
  comunidad: ["Comunidad", "Todo lo que pasa en vuestra liga"],
  administracion: ["Administración", "Reglas, miembros e historial de acciones"],
  ajustes: ["Ajustes", "Personaliza tu experiencia y las reglas de la liga"],
};

function money(value: number) { return `${value.toLocaleString("es-ES", { maximumFractionDigits: 1 })} M€`; }

function Avatar({ player, small = false }: { player: Player; small?: boolean }) {
  return <span className={`player-avatar ${small ? "small" : ""}`} style={{ background: player.color }}>{player.initials}</span>;
}

function Trend({ value }: { value: number }) {
  const positive = value >= 0;
  return <span className={positive ? "trend up" : "trend down"}>{positive ? <TrendingUp /> : <TrendingDown />}{Math.abs(value)}%</span>;
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return <button type="button" className={`toggle ${checked ? "on" : ""}`} onClick={onChange} aria-label={label} aria-pressed={checked}><span /></button>;
}

export function FantasyApp() {
  const [section, setSection] = useState<Section>("inicio");
  const [settings, setSettings] = useState<LeagueSettings>(defaults);
  const [mobileNav, setMobileNav] = useState(false);
  const [query, setQuery] = useState("");
  const [position, setPosition] = useState("TODOS");
  const [bids, setBids] = useState<Record<number, number>>({});
  const [selectedMarket, setSelectedMarket] = useState<Player | null>(null);
  const [bidAmount, setBidAmount] = useState("");
  const [captainId, setCaptainId] = useState(10);
  const [saved, setSaved] = useState(false);
  const [messages, setMessages] = useState([
    { user: "Javi", text: "¿Quién me vende un defensa? Pago bien 👀", time: "18:04", color: "#65d5ff" },
    { user: "Marta", text: "Después de la cláusula de anoche, ni hablar.", time: "18:07", color: "#ff708f" },
    { user: "Álvaro", text: "El mercado está que arde esta semana.", time: "18:11", color: "#ff9c72" },
  ]);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("stratos-settings");
    const storedBids = localStorage.getItem("stratos-bids");
    if (stored) setSettings({ ...defaults, ...JSON.parse(stored) });
    if (storedBids) setBids(JSON.parse(storedBids));
  }, []);

  useEffect(() => { document.documentElement.dataset.theme = settings.theme; }, [settings.theme]);

  const filteredMarket = useMemo(() => marketPlayers.filter((player) => {
    const matchesQuery = `${player.name} ${player.team}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (position === "TODOS" || player.position === position);
  }), [query, position]);

  function goTo(next: Section) { setSection(next); setMobileNav(false); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function update<K extends keyof LeagueSettings>(key: K, value: LeagueSettings[K]) { setSettings((current) => ({ ...current, [key]: value })); }
  function saveSettings() { localStorage.setItem("stratos-settings", JSON.stringify(settings)); setSaved(true); setTimeout(() => setSaved(false), 1800); }
  function placeBid() {
    if (!selectedMarket) return;
    const amount = Number(bidAmount.replace(",", "."));
    if (!amount || amount < selectedMarket.value) return;
    const next = { ...bids, [selectedMarket.id]: amount };
    setBids(next); localStorage.setItem("stratos-bids", JSON.stringify(next)); setSelectedMarket(null); setBidAmount("");
  }
  function sendMessage() {
    if (!draft.trim()) return;
    setMessages((current) => [...current, { user: "Ramón", text: draft.trim(), time: "Ahora", color: "#b8f35a" }]); setDraft("");
  }

  const [title, subtitle] = sectionTitles[section];

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "mobile-open" : ""}`}>
        <div className="sidebar-top"><Brand /><button className="mobile-close" onClick={() => setMobileNav(false)}><X /></button></div>
        <button className="league-picker"><span className="league-avatar">LS</span><span><small>LIGA ACTUAL</small><strong>Liga Stratos</strong></span><ChevronDown /></button>
        <nav className="main-nav">
          <span className="nav-label">JUEGO</span>
          {nav.map(({ id, label, icon: Icon, badge }) => <button key={id} onClick={() => goTo(id)} className={section === id ? "active" : ""}><Icon /><span>{label}</span>{badge && <i>{badge}</i>}</button>)}
          <span className="nav-label second">LIGA</span>
          <button onClick={() => goTo("administracion")} className={section === "administracion" ? "active" : ""}><Shield /><span>Administración</span></button>
          <button onClick={() => goTo("ajustes")} className={section === "ajustes" ? "active" : ""}><Settings /><span>Ajustes</span></button>
        </nav>
        <div className="sidebar-footer"><div className="user-avatar">RH</div><span><strong>Ramón Herrero</strong><small>Administrador</small></span><MoreHorizontal /></div>
      </aside>

      {mobileNav && <button className="nav-backdrop" onClick={() => setMobileNav(false)} aria-label="Cerrar menú" />}

      <div className="app-main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileNav(true)}><LayoutGrid /></button>
          <div><h1>{title}</h1><p>{subtitle}</p></div>
          <div className="topbar-actions"><button className="icon-button"><Search /></button><button className="icon-button notification"><Bell /><i /></button><div className="balance"><small>SALDO</small><strong>16,4 M€</strong></div></div>
        </header>

        <main className="app-content">
          {section === "inicio" && <HomeView onNavigate={goTo} captain={settings.captain} captainId={captainId} />}
          {section === "plantilla" && <SquadView captain={settings.captain} bench={settings.bench} captainId={captainId} setCaptainId={setCaptainId} />}
          {section === "mercado" && <MarketView players={filteredMarket} query={query} setQuery={setQuery} position={position} setPosition={setPosition} bids={bids} select={setSelectedMarket} />}
          {section === "clasificacion" && <StandingsView />}
          {section === "jornada" && <MatchdayView />}
          {section === "comunidad" && <CommunityView messages={messages} draft={draft} setDraft={setDraft} send={sendMessage} />}
          {section === "administracion" && <AdminView />}
          {section === "ajustes" && <SettingsView settings={settings} update={update} save={saveSettings} saved={saved} />}
        </main>
      </div>

      <nav className="bottom-nav">
        {nav.slice(0, 5).map(({ id, label, icon: Icon }) => <button key={id} onClick={() => goTo(id)} className={section === id ? "active" : ""}><Icon /><span>{label === "Clasificación" ? "Liga" : label}</span></button>)}
      </nav>

      {selectedMarket && <div className="modal-backdrop" onMouseDown={() => setSelectedMarket(null)}><div className="bid-modal" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedMarket(null)}><X /></button><Avatar player={selectedMarket} /><span className={`position-tag ${selectedMarket.position.toLowerCase()}`}>{selectedMarket.position}</span><h2>{selectedMarket.name}</h2><p>{selectedMarket.team} · Valor {money(selectedMarket.value)}</p><label>Tu puja</label><div className="money-input"><input autoFocus inputMode="decimal" value={bidAmount} onChange={(event) => setBidAmount(event.target.value)} placeholder={`${selectedMarket.value.toFixed(1)}`} /><span>M€</span></div><small>Saldo disponible: 16,4 M€</small><button className="button full" onClick={placeBid}>Confirmar puja <Gavel size={17} /></button></div></div>}
    </div>
  );
}

function HomeView({ onNavigate, captain, captainId }: { onNavigate: (section: Section) => void; captain: boolean; captainId: number }) {
  const top = standings.slice(0, 4);
  return <div className="dashboard-grid">
    <section className="stat-row span-all">
      <article className="stat-card featured"><div><span>POSICIÓN</span><strong>1<sup>º</sup></strong><small><TrendingUp /> +1 esta jornada</small></div><Trophy /></article>
      <article className="stat-card"><span>PUNTOS TOTALES</span><strong>1.684</strong><small>Media de liga: 1.513</small></article>
      <article className="stat-card"><span>ÚLTIMA JORNADA</span><strong>74 <small>pts</small></strong><small className="positive">+12 sobre la media</small></article>
      <article className="stat-card"><span>VALOR DE PLANTILLA</span><strong>178,1 <small>M€</small></strong><small className="positive">+3,4 M€ esta semana</small></article>
    </section>

    <section className="panel lineup-panel"><div className="panel-head"><div><span className="kicker">TU ONCE</span><h2>Alineación de la jornada</h2></div><button className="ghost-button" onClick={() => onNavigate("plantilla")}>Editar once</button></div><div className="pitch compact-pitch">
      {myPlayers.slice(0, 11).map((player, index) => <button key={player.id} className={`pitch-player p${index + 1}`}><Avatar player={player} small />{captain && player.id === captainId && <Crown className="captain-crown" />}<strong>{player.name.split(" ").at(-1)}</strong><span>{player.form}</span></button>)}
    </div><div className="lineup-footer"><span><Check /> Once completo</span><span>4-4-2</span><span>Valor: 153,4 M€</span></div></section>

    <section className="panel ranking-panel"><div className="panel-head"><div><span className="kicker">LIGA STRATOS</span><h2>Clasificación</h2></div><button className="text-button" onClick={() => onNavigate("clasificacion")}>Ver completa</button></div><div className="ranking-list">{top.map((team) => <div key={team.rank} className={team.rank === 1 ? "you" : ""}><b>{team.rank}</b><i style={{ background: team.color }}>{team.name.slice(0, 2).toUpperCase()}</i><span><strong>{team.name}</strong><small>{team.manager}</small></span><em>{team.points}<small> pts</small></em></div>)}</div><div className="next-rival"><span>Próximo perseguidor</span><strong>Tiki Taka FC · a 63 pts</strong></div></section>

    <section className="panel market-mini"><div className="panel-head"><div><span className="kicker">OPORTUNIDADES</span><h2>Mercado destacado</h2></div><button className="text-button" onClick={() => onNavigate("mercado")}>Ir al mercado</button></div><div className="mini-market-list">{marketPlayers.slice(0, 3).map((player) => <div key={player.id}><Avatar player={player} small /><span><strong>{player.name}</strong><small>{player.team}</small></span><div><b>{money(player.value)}</b><Trend value={player.trend} /></div></div>)}</div></section>

    <section className="panel activity-panel"><div className="panel-head"><div><span className="kicker">EN DIRECTO</span><h2>Actividad de la liga</h2></div><Activity /></div><div className="activity-list">{activity.map((item) => <div key={item.title}><i className={item.type}>{item.type === "market" ? <Gavel /> : item.type === "admin" ? <Shield /> : <Trophy />}</i><span><strong>{item.title}</strong><small>{item.detail}</small></span><time>{item.time}</time></div>)}</div></section>
  </div>;
}

function SquadView({ captain, bench, captainId, setCaptainId }: { captain: boolean; bench: boolean; captainId: number; setCaptainId: (id: number) => void }) {
  return <div className="squad-layout"><section className="panel squad-pitch-panel"><div className="panel-head"><div><span className="kicker">FORMACIÓN</span><h2>4-4-2 equilibrado</h2></div><select defaultValue="4-4-2"><option>4-4-2</option><option>4-3-3</option><option>3-5-2</option><option>5-3-2</option></select></div><div className="pitch full-pitch">{myPlayers.slice(0, 11).map((player, index) => <button key={player.id} className={`pitch-player p${index + 1} ${player.status !== "titular" ? "warning" : ""}`} onClick={() => captain && setCaptainId(player.id)}><Avatar player={player} />{captain && player.id === captainId && <Crown className="captain-crown" />}<strong>{player.name.split(" ").at(-1)}</strong><span>{player.form} pts</span></button>)}</div><div className="squad-hint"><Sparkles /> {captain ? "Toca un jugador para nombrarlo capitán." : "El capitán está desactivado en los ajustes de liga."}</div></section><aside className="panel squad-list"><div className="panel-head"><div><span className="kicker">CONVOCATORIA</span><h2>Jugadores</h2></div><span className="counter">15/15</span></div>{myPlayers.map((player, index) => <div className={`squad-row ${index > 10 ? "bench" : ""}`} key={player.id}><Avatar player={player} small /><span><strong>{player.name}{captain && player.id === captainId && <Crown />}</strong><small>{player.position} · {player.team}</small></span><div><b>{player.points}</b><small>pts</small></div></div>)}{bench && <div className="bench-label">Banquillo: {myPlayers.slice(11).length} jugadores · sustituciones automáticas activas</div>}</aside></div>;
}

function MarketView({ players, query, setQuery, position, setPosition, bids, select }: { players: Player[]; query: string; setQuery: (v: string) => void; position: string; setPosition: (v: string) => void; bids: Record<number, number>; select: (p: Player) => void }) {
  return <div><div className="market-toolbar"><label className="search-box"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar jugador o equipo" /></label><div className="filter-chips"><ListFilter />{["TODOS", "POR", "DEF", "MED", "DEL"].map((item) => <button key={item} onClick={() => setPosition(item)} className={position === item ? "active" : ""}>{item}</button>)}</div><button className="ghost-button"><CircleDollarSign /> Mis operaciones</button></div><div className="market-summary"><div><Gavel /><span><small>TUS PUJAS ACTIVAS</small><strong>{Object.keys(bids).length}</strong></span></div><div><Landmark /><span><small>SALDO DISPONIBLE</small><strong>16,4 M€</strong></span></div><div><Activity /><span><small>CIERRE DE MERCADO</small><strong>03:42:18</strong></span></div></div><section className="market-grid">{players.map((player) => <article className="market-card" key={player.id}><div className="market-card-top"><Avatar player={player} /><span className={`position-tag ${player.position.toLowerCase()}`}>{player.position}</span><Trend value={player.trend} /></div><h3>{player.name}</h3><p>{player.team}</p><div className="player-stats"><span><small>VALOR</small><strong>{money(player.value)}</strong></span><span><small>PUNTOS</small><strong>{player.points}</strong></span><span><small>FORMA</small><strong>{player.form}</strong></span></div>{bids[player.id] ? <button className="bid-done" onClick={() => select(player)}><Check /> Puja: {money(bids[player.id])}</button> : <button className="button full" onClick={() => select(player)}>Hacer oferta <Gavel size={16} /></button>}<small className="market-owner">Vende: Mercado de la liga</small></article>)}</section>{players.length === 0 && <div className="empty-state"><Search /><h3>No encontramos jugadores</h3><p>Prueba con otro nombre o posición.</p></div>}</div>;
}

function StandingsView() {
  return <div className="standings-layout"><section className="panel standings-panel"><div className="standings-head"><span>#</span><span>EQUIPO</span><span>JORNADA</span><span>VALOR</span><span>PUNTOS</span></div>{standings.map((team) => <div className={`standings-row ${team.rank === 1 ? "current" : ""}`} key={team.rank}><b>{team.rank}</b><i style={{ background: team.color }}>{team.name.slice(0, 2).toUpperCase()}</i><span><strong>{team.name}</strong><small>{team.manager}{team.rank === 1 ? " · Tú" : ""}</small></span><em className={team.round >= 70 ? "positive" : ""}>{team.round}</em><em>{money(team.budget)}</em><strong>{team.points}</strong></div>)}</section><aside><section className="panel podium"><span className="kicker">PODIO ACTUAL</span><div className="podium-bars"><div><i style={{ background: standings[1].color }}>TT</i><span>2</span></div><div className="winner"><Crown /><i style={{ background: standings[0].color }}>SU</i><span>1</span></div><div><i style={{ background: standings[2].color }}>LG</i><span>3</span></div></div></section><section className="panel league-facts"><h3>Datos de la liga</h3><p><span>Media de puntos</span><strong>1.513</strong></p><p><span>Equipo más valioso</span><strong>191,3 M€</strong></p><p><span>Mayor puntuación</span><strong>96 pts</strong></p><p><span>Miembros</span><strong>6 / 12</strong></p></section></aside></div>;
}

function MatchdayView() {
  return <div className="matchday-layout"><section className="panel matchday-main"><div className="matchday-score"><div><span>JORNADA 32</span><strong>74</strong><small>Tus puntos</small></div><div><span>MEDIA DE LIGA</span><strong>62</strong><small>+12 puntos</small></div><div><span>MEJOR JUGADOR</span><strong>14</strong><small>Kylian Mbappé</small></div></div><div className="panel-head"><div><span className="kicker">PRÓXIMOS PARTIDOS</span><h2>Calendario de tus jugadores</h2></div><button className="ghost-button"><CalendarDays /> Calendario</button></div><div className="fixture-list">{fixtures.map((match) => <article key={match.home}><time>{match.time}</time><div><i style={{ background: match.homeColor }}>{match.home.slice(0, 2)}</i><strong>{match.home}</strong><span>vs</span><strong>{match.away}</strong><i style={{ background: match.awayColor }}>{match.away.slice(0, 2)}</i></div><em>{match.players} jugadores tuyos</em></article>)}</div></section><aside className="panel round-team"><span className="kicker">ONCE DE LA JORNADA</span><h2>Rendimiento</h2>{myPlayers.slice(0, 7).sort((a, b) => b.form - a.form).map((player, index) => <div key={player.id}><b>{index + 1}</b><Avatar player={player} small /><span><strong>{player.name}</strong><small>{player.team}</small></span><em>{Math.round(player.form * 1.6)} pts</em></div>)}</aside></div>;
}

function CommunityView({ messages, draft, setDraft, send }: { messages: { user: string; text: string; time: string; color: string }[]; draft: string; setDraft: (v: string) => void; send: () => void }) {
  return <div className="community-layout"><section className="panel chat-panel"><div className="panel-head"><div><span className="kicker">CHAT DE LIGA</span><h2>El vestuario</h2></div><span className="online"><i /> 4 conectados</span></div><div className="messages">{messages.map((message, index) => <div key={`${message.time}-${index}`} className={message.user === "Ramón" ? "own" : ""}><i style={{ background: message.color }}>{message.user.slice(0, 2).toUpperCase()}</i><span><strong>{message.user}<time>{message.time}</time></strong><p>{message.text}</p></span></div>)}</div><div className="chat-input"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Escribe un mensaje..." /><button className="button button-small" onClick={send}>Enviar</button></div></section><aside className="panel activity-panel"><div className="panel-head"><div><span className="kicker">MOVIMIENTOS</span><h2>Última actividad</h2></div></div><div className="activity-list">{activity.concat(activity.slice(0, 2)).map((item, index) => <div key={`${item.title}-${index}`}><i className={item.type}>{item.type === "market" ? <Gavel /> : item.type === "admin" ? <Shield /> : <Trophy />}</i><span><strong>{item.title}</strong><small>{item.detail}</small></span><time>{item.time}</time></div>)}</div></aside></div>;
}

function AdminView() {
  return <div className="admin-grid"><section className="panel admin-summary"><div><Users /><span><strong>6</strong><small>miembros activos</small></span></div><div><LockKeyhole /><span><strong>STRATOS-26</strong><small>código de invitación</small></span></div><div><Shield /><span><strong>0</strong><small>incidencias abiertas</small></span></div></section><section className="panel members-panel"><div className="panel-head"><div><span className="kicker">GESTIÓN</span><h2>Miembros de la liga</h2></div><button className="button button-small"><Plus /> Invitar</button></div>{standings.map((team) => <div className="member-row" key={team.manager}><i style={{ background: team.color }}>{team.manager.slice(0, 2).toUpperCase()}</i><span><strong>{team.manager}</strong><small>{team.name}</small></span><em>{team.rank === 1 ? "Administrador" : "Miembro"}</em><button><MoreHorizontal /></button></div>)}</section><section className="panel audit-panel"><div className="panel-head"><div><span className="kicker">AUDITORÍA</span><h2>Historial de acciones</h2></div><button className="ghost-button">Exportar</button></div>{["Ramón cambió la bonificación del capitán a x1,5", "El sistema cerró el mercado de la jornada 31", "Marta se unió mediante código de invitación", "Ramón corrigió +2 puntos a Pedri", "El sistema procesó 4 pujas ganadoras"].map((item, index) => <div key={item}><i>{index + 1}</i><span><strong>{item}</strong><small>{index < 2 ? "Hoy" : "Esta semana"} · IP registrada</small></span></div>)}</section></div>;
}

function SettingsView({ settings, update, save, saved }: { settings: LeagueSettings; update: <K extends keyof LeagueSettings>(key: K, value: LeagueSettings[K]) => void; save: () => void; saved: boolean }) {
  const markets: [keyof LeagueSettings, string, string][] = [["bids", "Pujas", "Los usuarios compiten con ofertas ocultas"], ["fixedPrice", "Precio fijo", "Compra inmediata por el valor marcado"], ["clauses", "Cláusulas", "Roba jugadores pagando su cláusula"], ["directTransfers", "Traspasos", "Negociaciones directas entre miembros"]];
  return <div className="settings-layout"><section className="panel settings-panel"><div className="settings-section"><span className="kicker">APARIENCIA</span><h2>Elige tu terreno de juego</h2><div className="theme-grid">{(["stratos", "classic", "midnight", "sand"] as Theme[]).map((theme) => <button key={theme} className={`${theme}-theme ${settings.theme === theme ? "selected" : ""}`} onClick={() => update("theme", theme)}><i><span /><span /></i><strong>{theme === "stratos" ? "Stratos" : theme === "classic" ? "Comunio clásico" : theme === "midnight" ? "Medianoche" : "Arena"}</strong>{settings.theme === theme && <Check />}</button>)}</div></div><div className="settings-section"><span className="kicker">ALINEACIÓN</span><h2>Once y banquillo</h2><SettingRow title="Capitán" text="Permite elegir un jugador con bonificación de puntos"><Toggle checked={settings.captain} onChange={() => update("captain", !settings.captain)} label="Activar capitán" /></SettingRow>{settings.captain && <SettingRow title="Multiplicador del capitán" text="Se aplica sobre la puntuación total"><select value={settings.captainMultiplier} onChange={(event) => update("captainMultiplier", Number(event.target.value))}><option value="1.25">x1,25</option><option value="1.5">x1,5</option><option value="2">x2</option></select></SettingRow>}<SettingRow title="Banquillo" text="Activa reservas y sustituciones automáticas"><Toggle checked={settings.bench} onChange={() => update("bench", !settings.bench)} label="Activar banquillo" /></SettingRow>{settings.bench && <SettingRow title="Plazas de banquillo" text="Número máximo de suplentes"><div className="stepper"><button onClick={() => update("benchSlots", Math.max(1, settings.benchSlots - 1))}><Minus /></button><strong>{settings.benchSlots}</strong><button onClick={() => update("benchSlots", Math.min(7, settings.benchSlots + 1))}><Plus /></button></div></SettingRow>}</div><div className="settings-section"><span className="kicker">MERCADO</span><h2>Sistemas permitidos</h2>{markets.map(([key, title, text]) => <SettingRow key={key} title={title} text={text}><Toggle checked={Boolean(settings[key])} onChange={() => update(key, !settings[key] as never)} label={`Activar ${title}`} /></SettingRow>)}</div><div className="settings-section"><span className="kicker">AVISOS</span><h2>Notificaciones</h2><SettingRow title="Correo electrónico" text="Resumen diario y eventos importantes"><Toggle checked={settings.emailNotifications} onChange={() => update("emailNotifications", !settings.emailNotifications)} label="Avisos por correo" /></SettingRow><SettingRow title="Notificaciones push" text="Alertas en móvil y navegador"><Toggle checked={settings.pushNotifications} onChange={() => update("pushNotifications", !settings.pushNotifications)} label="Notificaciones push" /></SettingRow><SettingRow title="Movimientos de mercado" text="Pujas superadas, fichajes y cláusulas"><Toggle checked={settings.marketNotifications} onChange={() => update("marketNotifications", !settings.marketNotifications)} label="Avisos de mercado" /></SettingRow></div><div className="settings-save"><span>Los cambios de reglas quedarán registrados en el historial.</span><button className="button" onClick={save}>{saved ? <><Check /> Guardado</> : "Guardar cambios"}</button></div></section></div>;
}

function SettingRow({ title, text, children }: { title: string; text: string; children: React.ReactNode }) { return <div className="setting-row"><span><strong>{title}</strong><small>{text}</small></span>{children}</div>; }
