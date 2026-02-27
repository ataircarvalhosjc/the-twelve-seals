import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { modulesData } from "@/data/modules-data";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Lock, BookOpen, Lightbulb, Sparkles } from "lucide-react";

const ModuleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user, updateProgress } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  const moduleId = parseInt(id || "1");
  const mod = modulesData.find((m) => m.id === moduleId);

  if (!mod) {
    navigate("/dashboard");
    return null;
  }

  const isUnlocked = mod.dayNumber <= user.lastUnlockedDay;

  if (!isUnlocked) {
    navigate("/dashboard");
    return null;
  }

  const isLastUnlocked = mod.dayNumber === user.lastUnlockedDay;
  const hasNext = mod.dayNumber < 12;

  const handleComplete = () => {
    updateProgress(mod.dayNumber);
    if (hasNext) {
      navigate(`/modulo/${mod.id + 1}`);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/dashboard" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Volver</span>
          </Link>
          <span className="font-display text-sm text-primary/70 tracking-[0.15em] uppercase">
            Día {mod.dayNumber} de 12
          </span>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-10 max-w-3xl">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="text-5xl mb-4 animate-float">{mod.icon}</div>
          <p className="text-primary/70 text-xs tracking-[0.3em] uppercase mb-3">{mod.subtitle}</p>
          <h1 className="font-display text-3xl md:text-4xl text-gold-gradient mb-2">{mod.title}</h1>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-primary/20 bg-card p-8 mb-8 text-center gold-glow-sm"
        >
          <p className="font-serif text-lg md:text-xl italic text-foreground leading-relaxed mb-3">
            "{mod.quote}"
          </p>
          <p className="text-primary/70 text-sm font-display tracking-wider">— {mod.quoteReference}</p>
        </motion.div>

        {/* Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Revelación del Código</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed font-serif text-base">{mod.explanation}</p>
        </motion.div>

        {/* Application */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-8 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Aplicación Práctica</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed font-serif text-base">{mod.application}</p>
        </motion.div>

        {/* Affirmation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-primary/30 bg-card p-8 mb-6 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-display text-lg text-foreground">Afirmación Espiritual</h2>
          </div>
          <p className="font-serif text-lg italic text-primary leading-relaxed">"{mod.affirmation}"</p>
        </motion.div>

        {/* Audio Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6 mb-10"
        >
          <p className="text-sm text-muted-foreground mb-3 font-display tracking-wider uppercase">Narración del Código</p>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground">
              ▶
            </div>
            <div className="flex-1">
              <div className="h-1 rounded-full bg-border">
                <div className="h-full w-0 rounded-full bg-primary" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Audio próximamente</p>
            </div>
          </div>
        </motion.div>

        {/* Action */}
        {isLastUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={handleComplete}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gold-gradient text-primary-foreground font-display text-sm tracking-widest uppercase gold-glow hover:opacity-90 transition-all"
            >
              {hasNext ? (
                <>
                  Completar y Desbloquear Día {mod.dayNumber + 1}
                  <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Completar el Manuscrito
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.div>
        )}

        {!isLastUnlocked && (
          <div className="text-center">
            <Link
              to={`/modulo/${mod.id + 1}`}
              className="inline-flex items-center gap-2 text-primary hover:underline font-display text-sm tracking-wider"
            >
              Siguiente Código <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModuleDetail;
