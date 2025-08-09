
import { motion } from 'framer-motion';

const partners = [
  "TATA Steel", "JSW", "SAIL", "Hindalco", "Vedanta",
  "JSPL", "Essar", "NMDC", "ArcelorMittal", "POSCO",
  "Reliance", "Adani"
];

export default function TrustedBy() {
  return (
    <section className="container py-16 overflow-hidden">
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-muted-foreground mb-2"
        >
          Trusted by Industry Leaders
        </motion.h2>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto max-w-md"
        />
      </div>

      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
        
        <motion.div
          animate={{ x: [0, -100 * partners.length] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-8 items-center"
          style={{ width: `${200 * partners.length}%` }}
        >
          {[...partners, ...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="glass-card rounded-xl px-6 py-3 min-w-max hover:glass-ring transition-all duration-200"
            >
              <span className="text-sm font-medium text-muted-foreground">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
