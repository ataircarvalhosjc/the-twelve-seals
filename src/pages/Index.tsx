import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="font-display text-xl tracking-wider text-primary">
            Los 12 Sellos
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Iniciar Sesión
            </Link>
            <Link
              to="/signup"
              className="text-sm px-5 py-2 rounded-lg bg-gold-gradient text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Comenzar
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0">
          <img src="/jesus_manuscript_bg.png" alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-background" />
        </div>
        <div className="absolute inset-0 bg-radial-gold" />

        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <p className="text-primary/80 text-sm tracking-[0.3em] uppercase mb-6 font-body">
              Una jornada de activación espiritual
            </p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide leading-tight mb-6">
              <span className="text-gold-gradient">El Manuscrito</span>
              <br />
              <span className="text-foreground">de los 12 Sellos</span>
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-serif italic leading-relaxed">
              Doce códigos sagrados. Siete días de transformación.
              <br />
              Un camino que cambiará tu vida para siempre.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="px-8 py-4 rounded-lg bg-gold-gradient text-primary-foreground font-display text-sm tracking-widest uppercase gold-glow hover:opacity-90 transition-all"
            >
              Comenzar la Jornada
            </Link>
            <a
              href="#sellos"
              className="px-8 py-4 rounded-lg border border-primary/30 text-primary font-display text-sm tracking-widest uppercase hover:border-primary/60 transition-colors"
            >
              Descubrir los Sellos
            </a>
          </motion.div>
        </div>
      </section>

      {/* Seals Preview */}
      <section id="sellos" className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold-gradient mb-4">Los 12 Códigos Sagrados</h2>
            <p className="text-muted-foreground font-serif text-lg max-w-xl mx-auto">
              Cada sello contiene una verdad profunda que transformará un área específica de tu vida espiritual.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Fe", "Perdón", "Identidad", "Palabra",
              "Oración", "Provisión", "Sanidad", "Autoridad",
              "Propósito", "Comunidad", "Perseverancia", "Activación"
            ].map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative p-6 rounded-xl border border-border bg-card/50 hover:border-primary/40 transition-all duration-500 text-center cursor-default"
              >
                <div className="text-3xl mb-3 opacity-60 group-hover:opacity-100 transition-opacity">
                  {["✦", "◈", "◇", "❖", "✧", "⬥", "◆", "⟡", "✦", "◈", "◇", "✦"][i]}
                </div>
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mb-1">Día {i + 1}</p>
                <p className="font-display text-sm text-foreground">{name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-radial-gold opacity-50" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-3xl md:text-4xl text-foreground mb-4">¿Estás listo para la transformación?</h2>
          <p className="text-muted-foreground font-serif text-lg mb-8 max-w-lg mx-auto">
            Accede a los 12 códigos sagrados y comienza tu camino de activación espiritual hoy.
          </p>
          <Link
            to="/signup"
            className="inline-block px-10 py-4 rounded-lg bg-gold-gradient text-primary-foreground font-display text-sm tracking-widest uppercase gold-glow hover:opacity-90 transition-all"
          >
            Acceder Ahora — R$ 11,90
          </Link>
          <p className="text-muted-foreground text-xs mt-4">Acceso de por vida · Sin suscripción · Garantía de 7 días</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm">
          <p className="font-display text-primary/60 mb-2">El Manuscrito de los 12 Sellos</p>
          <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
