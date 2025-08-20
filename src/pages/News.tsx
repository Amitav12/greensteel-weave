import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { TrendingUp, Award, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const featuredArticle = {
  id: 1,
  title: "Recycling in School Initiative taken by our CEO",
  excerpt: "Our company was honored to participate in the 1st International Steel Industry & Global Market Summit organized by SteelRadar, celebrating 50 years of industry excellence.",
  category: "Events",
  author: "Rajesh Kumar",
  date: "2024-01-20",
  readTime: "4 min read",
  image: "/src/News1.jpg",
  content: "The Steel Summit 2024 brought together industry leaders from across the globe to discuss the future of steel trading, sustainability initiatives, and market trends. AAASHA TRADING was proud to be recognized among the leading companies contributing to the steel industry's growth."
};

export default function News() {
  return (
    <>
      <Helmet>
        <title>News & Updates - AAASHA TRADING LTD | Latest Industry News</title>
        <meta
          name="description"
          content="Stay updated with the latest news, market trends, and company updates from AAASHA TRADING LTD. Industry insights and sustainability initiatives."
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
              News &{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Stay informed with the latest industry news, market insights, and company updates
              from the world of sustainable steel trading.
            </p>
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-white font-semibold">Latest Industry Insights</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article - Steel Summit */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Content Side */}
                <div className="p-8 lg:p-12 text-white relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20" />
                  <div className="relative z-10">
                    <Badge className="bg-white/20 text-white mb-4 flex items-center w-fit">
                      <Award className="w-4 h-4 mr-2" />
                      Featured Story
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-black mb-4">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-green-100 mb-6 text-lg leading-relaxed">
                      {featuredArticle.excerpt}
                    </p>
                    <p className="text-green-50 mb-8 leading-relaxed">
                      {featuredArticle.content}
                    </p>
                    {/* Removed author/date row */}
                    {/* Previously here:
                    <div className="flex items-center space-x-6 mb-6">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span className="text-sm">{featuredArticle.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(featuredArticle.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    */}
                    {/* Removed the button below */}
                    {/* <Button className="bg-white text-green-600 hover:bg-green-50">
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button> */}
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="relative h-[400px] lg:h-auto">
                  <img
                    src={featuredArticle.image}
                    alt="Educating school kids about recycling"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/20" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Steel Summit Gallery Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-green-50 dark:from-gray-800 dark:to-gray-700">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              Steel Summit 2024{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A glimpse into the prestigious international steel industry summit where AAASHA TRADING was recognized for excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Award Ceremony Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="/src/News1.jpg"
                alt="Award Ceremony at Steel Summit"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-2">
                  <Award className="w-5 h-5 text-yellow-400 mr-2" />
                  <Badge className="bg-yellow-500 text-black">Recognition</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">Industry Excellence Award</h3>
                <p className="text-gray-200 text-sm">AAASHA TRADING receives recognition for outstanding contribution to sustainable steel trading</p>
              </div>
            </motion.div>

            {/* International Delegates Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="/src/News2.jpg"
                alt="International Delegates at Steel Summit"
                className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-blue-400 mr-2" />
                  <Badge className="bg-blue-500 text-white">Global Partnership</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">International Collaboration</h3>
                <p className="text-gray-200 text-sm">Building bridges across continents with industry leaders from around the world</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}