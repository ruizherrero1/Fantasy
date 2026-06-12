"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Brand } from "@/components/brand";

export default function LoginPage() {
  const router = useRouter();
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError("");
    const form = new FormData(event.currentTarget);
    const payload = register ? { username: form.get("identifier"), email: form.get("email"), password: form.get("password") } : { identifier: form.get("identifier"), password: form.get("password") };
    const response = await fetch(`/api/auth/${register ? "register" : "login"}`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload) });
    const data = await response.json(); setLoading(false);
    if (!response.ok) return setError(data.error || "No se pudo completar el acceso.");
    router.push("/app"); router.refresh();
  }

  return <main className="auth-page"><section className="auth-side"><Brand /><div className="auth-quote"><h1>Tu liga.<br /><span>Tus reglas.</span></h1><p>Un mercado que no duerme, puntos reales y todas las cuentas pendientes de vuestro grupo en un solo sitio.</p></div><small>Fantasy Stratos · LaLiga 2025/26</small></section><section className="auth-form-wrap"><form className="auth-form" onSubmit={submit}><span className="eyebrow">ACCESO PRIVADO</span><h2>{register ? "Crea tu cuenta" : "Vuelve al vestuario"}</h2><p>{register ? "Elige tu identificador. No necesitas una cuenta externa." : "Entra con tu identificador y contraseña de Fantasy Stratos."}</p><label htmlFor="identifier">USUARIO</label><input id="identifier" name="identifier" autoComplete="username" required placeholder="ramon" />{register && <><label htmlFor="email">CORREO (OPCIONAL)</label><input id="email" name="email" type="email" autoComplete="email" placeholder="tu@correo.es" /></>}<label htmlFor="password">CONTRASEÑA</label><input id="password" name="password" type="password" minLength={8} autoComplete={register ? "new-password" : "current-password"} required placeholder="Mínimo 8 caracteres" />{error && <p style={{ color: "var(--danger)", margin: "12px 0 0" }}>{error}</p>}<button className="button" disabled={loading}>{loading ? "Entrando..." : register ? "Crear cuenta" : <>Entrar <ArrowRight size={17} /></>}</button><div className="auth-demo">¿Aún no está conectada la base de datos? <Link href="/app">Abre la demo completa</Link>.<br /><button type="button" className="text-button" onClick={() => { setRegister(!register); setError(""); }}>{register ? "Ya tengo cuenta" : "Crear un usuario y contraseña"}</button></div></form></section></main>;
}
