import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Award,
  Leaf,
  Factory,
  TrendingUp,
  CheckCircle,
  Quote
} from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Committed to environmental responsibility through innovative recycling solutions."
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "Maintaining the highest standards in all our products and services."
  },
  {
    icon: Users,
    title: "Customer Focus",
    description: "Building lasting partnerships through exceptional service and reliability."
  },
  {
    icon: Factory,
    title: "Innovation",
    description: "Continuously improving our processes and embracing new technologies."
  }
];

const team = [
  {
    name: "Rajesh Kumar",
    position: "Chief Executive Officer",
    bio: "20+ years of experience in steel trading and sustainable business practices."
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    bio: "Expert in supply chain management and quality assurance processes."
  },
  {
    name: "Amit Patel",
    position: "Sustainability Director",
    bio: "Leading our environmental initiatives and recycling innovations."
  },
  {
    name: "Sunita Reddy",
    position: "Business Development",
    bio: "Building strategic partnerships and expanding market presence."
  }
];

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us - AAASHA TRADING LTD | Sustainable Steel Trading Leaders</title>
        <meta
          name="description"
          content="Learn about AAASHA TRADING LTD's journey, values, and commitment to sustainable steel trading and recycling solutions. Meet our experienced team."
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                AAASHA TRADING
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Pioneering sustainable steel trading and recycling solutions for over 15 years,
              building a greener future through innovation and excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">15+</div>
                <div className="text-green-300">Years Experience</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">350+</div>
                <div className="text-green-300">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg px-6 py-4 border border-white/20">
                <div className="text-3xl font-black text-white">125K+</div>
                <div className="text-green-300">Tons Recycled</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
                <Quote className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-green-800 dark:text-green-300 font-semibold">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
                Building a{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Sustainable Future
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Founded in 2009 with a vision to revolutionize the steel trading industry through
                sustainable practices, AAASHA TRADING LTD has grown from a small startup to a
                leading player in the Indian steel market.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Our commitment to environmental responsibility and quality excellence has earned
                us the trust of major steel manufacturers and helped us contribute significantly
                to India's circular economy.
              </p>
              <div className="space-y-4">
                {[
                  "ISO 9001:2015 Quality Management Certified",
                  "Environmental Management System Compliant",
                  "Zero Waste to Landfill Initiative",
                  "Carbon Neutral Operations by 2025"
                ].map((achievement, index) => (
                  <motion.div
                    key={achievement}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full aspect-[6/7] bg-gradient-to-br from-green-100 to-emerald-200 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center text-green-700">
                  <Factory className="w-16 h-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Steel Recycling Facility</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-green-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-black mb-2">890K+</div>
                <div className="text-green-200">Tons CO₂ Saved</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Our Values</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              What Drives{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Our Success
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our core values guide every decision we make and every relationship we build,
              ensuring sustainable growth and positive impact.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white dark:from-gray-800 dark:to-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center px-6 py-3 bg-green-100 dark:bg-green-800 rounded-full mb-6">
              <Users className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-800 dark:text-green-300 font-semibold">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Leadership
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our experienced team combines industry expertise with innovative thinking
              to drive sustainable growth and deliver exceptional results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-green-100 dark:border-gray-700"
              >
                <div className="relative mb-6">
                  <div className="w-full aspect-square bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl flex items-center justify-center">
                    <Users className="w-12 h-12 text-green-600" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-600/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-semibold mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}