import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { modulesData } from "@/data/modules-data";
import { motion } from "framer-motion";
import { Lock, CheckCircle, ChevronRight, LogOut } from "lucide-react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const progress = user.progressPercentage;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/dashboard" className="font-display text-lg text-primary tracking-wider">
            Los 12 Sellos
          </Link>
          <div className="flex items-center gap-4">
            {user.isAdmin && (
              <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            )}
            <span className="text-sm text-muted-foreground hidden sm:block">{user.name}</span>
            <button onClick={() => { logout(); navigate("/"); }} className="text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Welcome */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="font-display text-2xl md:text-3xl text-foreground mb-2">
            Bienvenido, <span className="text-gold-gradient">{user.name}</span>
          </h1>
          <p className="text-muted-foreground font-serif">Tu jornada de activación espiritual continúa.</p>
        </motion.div>

        {/* Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-6 mb-10"
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-muted-foreground">Progreso del Manuscrito</p>
            <p className="text-sm font-display text-primary">{progress}%</p>
          </div>
          <div className="w-full h-2 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="h-full rounded-full bg-gold-gradient"
            />
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {user.lastUnlockedDay <= 12
              ? `Día ${user.lastUnlockedDay} de 12 — ${modulesData[Math.min(user.lastUnlockedDay - 1, 11)].title}`
              : "¡Has completado todos los sellos!"}
          </p>
        </motion.div>

        {/* Module Grid */}
        <div className="space-y-3">
          {modulesData.map((mod, i) => {
            const isUnlocked = i + 1 <= user.lastUnlockedDay;
            const isCompleted = i + 1 < user.lastUnlockedDay;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                {isUnlocked ? (
                  <Link
                    to={`/modulo/${mod.id}`}
                    className="flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/40 hover:gold-glow-sm transition-all group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gold-gradient flex items-center justify-center text-primary-foreground font-display text-sm shrink-0">
                      {isCompleted ? <CheckCircle className="w-5 h-5" /> : mod.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-primary/70 tracking-[0.15em] uppercase">Día {mod.dayNumber}</p>
                      <p className="font-display text-foreground truncate">{mod.title}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </Link>
                ) : (
                  <div className="flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/30 opacity-50 cursor-not-allowed">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground tracking-[0.15em] uppercase">Día {mod.dayNumber}</p>
                      <p className="font-display text-muted-foreground truncate">{mod.title}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
