import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { modulesData, SpiritualModule } from "@/data/modules-data";
import { motion } from "framer-motion";
import { ArrowLeft, Edit3, Users, Settings, Save } from "lucide-react";

const Admin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"modules" | "users" | "settings">("modules");
  const [editingModule, setEditingModule] = useState<SpiritualModule | null>(null);
  const [unlockMode, setUnlockMode] = useState<"daily" | "full">("daily");

  if (!user?.isAdmin) {
    navigate("/dashboard");
    return null;
  }

  const mockUsers = [
    { name: "María García", email: "maria@email.com", progress: 75, day: 9, joined: "2025-12-01" },
    { name: "Carlos López", email: "carlos@email.com", progress: 33, day: 4, joined: "2025-12-05" },
    { name: "Ana Rodríguez", email: "ana@email.com", progress: 8, day: 1, joined: "2025-12-10" },
    { name: "Luis Martínez", email: "luis@email.com", progress: 100, day: 12, joined: "2025-11-15" },
  ];

  const tabs = [
    { id: "modules" as const, label: "Módulos", icon: Edit3 },
    { id: "users" as const, label: "Usuarios", icon: Users },
    { id: "settings" as const, label: "Ajustes", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Dashboard</span>
          </Link>
          <span className="font-display text-sm text-primary tracking-[0.15em] uppercase">Panel de Administración</span>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 max-w-5xl">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg bg-secondary w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${
                activeTab === tab.id
                  ? "bg-gold-gradient text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modules Tab */}
        {activeTab === "modules" && !editingModule && (
          <div className="space-y-3">
            {modulesData.map((mod) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">{mod.icon}</span>
                  <div>
                    <p className="text-xs text-primary/70 tracking-wider uppercase">Día {mod.dayNumber}</p>
                    <p className="font-display text-foreground">{mod.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingModule(mod)}
                  className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* Edit Module */}
        {activeTab === "modules" && editingModule && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl text-foreground">Editando: {editingModule.title}</h2>
              <button onClick={() => setEditingModule(null)} className="text-sm text-muted-foreground hover:text-foreground">
                Cancelar
              </button>
            </div>
            {[
              { label: "Título", value: editingModule.title, key: "title" },
              { label: "Cita Bíblica", value: editingModule.quote, key: "quote" },
              { label: "Referencia", value: editingModule.quoteReference, key: "quoteReference" },
            ].map(({ label, value, key }) => (
              <div key={key}>
                <label className="text-sm text-muted-foreground block mb-2">{label}</label>
                <input
                  defaultValue={value}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            ))}
            {[
              { label: "Explicación", value: editingModule.explanation, key: "explanation" },
              { label: "Aplicación Práctica", value: editingModule.application, key: "application" },
              { label: "Afirmación", value: editingModule.affirmation, key: "affirmation" },
            ].map(({ label, value, key }) => (
              <div key={key}>
                <label className="text-sm text-muted-foreground block mb-2">{label}</label>
                <textarea
                  defaultValue={value}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
            ))}
            <div>
              <label className="text-sm text-muted-foreground block mb-2">Audio (URL)</label>
              <input
                defaultValue={editingModule.audioUrl || ""}
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setEditingModule(null)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gold-gradient text-primary-foreground font-display text-sm tracking-widest uppercase"
            >
              <Save className="w-4 h-4" /> Guardar Cambios
            </button>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 text-xs text-muted-foreground tracking-wider uppercase font-body">Nombre</th>
                    <th className="text-left p-4 text-xs text-muted-foreground tracking-wider uppercase font-body hidden sm:table-cell">Email</th>
                    <th className="text-left p-4 text-xs text-muted-foreground tracking-wider uppercase font-body">Día</th>
                    <th className="text-left p-4 text-xs text-muted-foreground tracking-wider uppercase font-body">Progreso</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUsers.map((u, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="p-4 text-sm text-foreground">{u.name}</td>
                      <td className="p-4 text-sm text-muted-foreground hidden sm:table-cell">{u.email}</td>
                      <td className="p-4 text-sm text-foreground">{u.day}/12</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                            <div className="h-full bg-gold-gradient rounded-full" style={{ width: `${u.progress}%` }} />
                          </div>
                          <span className="text-xs text-muted-foreground">{u.progress}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-display text-lg text-foreground mb-4">Modo de Desbloqueo</h3>
              <div className="flex gap-3">
                {[
                  { id: "daily" as const, label: "Diario (1 por día)", desc: "Los módulos se desbloquean progresivamente" },
                  { id: "full" as const, label: "Acceso completo", desc: "Todos los módulos disponibles de inmediato" },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setUnlockMode(mode.id)}
                    className={`flex-1 p-4 rounded-lg border text-left transition-all ${
                      unlockMode === mode.id
                        ? "border-primary bg-primary/10"
                        : "border-border bg-secondary hover:border-border"
                    }`}
                  >
                    <p className="text-sm font-medium text-foreground">{mode.label}</p>
                    <p className="text-xs text-muted-foreground mt-1">{mode.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
