import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const newsArticles = [
  {
    id: 1,
    title: "AAASHA TRADING Achieves Record Recycling Milestone",
    excerpt: "We're proud to announce that we've successfully recycled over 125,000 tons of steel materials, contributing significantly to environmental sustainability.",
    category: "Company News",
    author: "Rajesh Kumar",
    date: "2024-01-15",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "New Partnership with Leading Steel Manufacturers",
    excerpt: "Strategic partnerships established with major steel producers to enhance our supply chain and provide better value to our customers.",
    category: "Partnerships",
    author: "Sunita Reddy",
    date: "2024-01-10",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Steel Market Trends: Q1 2024 Analysis",
    excerpt: "Comprehensive analysis of current steel market trends, pricing dynamics, and future outlook for the Indian steel industry.",
    category: "Market Analysis",
    author: "Amit Patel",
    date: "2024-01-05",
    readTime: "7 min read"
  },
  {
    id: 4,
    title: "Sustainability Initiative: Zero Waste Goal",
    excerpt: "Our commitment to achieving zero waste to landfill by 2025 through innovative recycling processes and circular economy principles.",
    category: "Sustainability",
    author: "Priya Sharma",
    date: "2023-12-28",
    readTime: "4 min read"
  },
  {
    id: 5,
    title: "Digital Transformation in Steel Trading",
    excerpt: "How digital technologies are revolutionizing the steel trading industry and improving customer experience and operational efficiency.",
    category: "Technology",
    author: "Rajesh Kumar",
    date: "2023-12-20",
    readTime: "6 min read"
  },
  {
    id: 6,
    title: "Quality Certification: ISO 9001:2015 Renewed",
    excerpt: "Successfully renewed our ISO 9001:2015 certification, demonstrating our continued commitment to quality management excellence.",
    category: "Quality",
    author: "Priya Sharma",
    date: "2023-12-15",
    readTime: "2 min read"
  }
];

const categories = ["All", "Company News", "Partnerships", "Market Analysis", "Sustainability", "Technology", "Quality"];

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

      {/* News Articles */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Featured Article */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-emerald-600/20" />
              <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-white/20 text-white mb-4">Featured Story</Badge>
                  <h2 className="text-3xl md:text-4xl font-black mb-4">
                    {newsArticles[0].title}
                  </h2>
                  <p className="text-green-100 mb-6 text-lg leading-relaxed">
                    {newsArticles[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="text-sm">{newsArticles[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{new Date(newsArticles[0].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Button className="bg-white text-green-600 hover:bg-green-50">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                <div className="relative">
                  <div className="w-full aspect-video bg-gradient-to-br from-green-100 to-emerald-200 rounded-2xl shadow-2xl flex items-center justify-center">
                    <div className="text-center text-green-700">
                      <TrendingUp className="w-16 h-16 mx-auto mb-4" />
                      <p className="text-lg font-semibold">Featured News</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                className="px-6 py-2 rounded-full font-semibold transition-all duration-300 bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-600"
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsArticles.slice(1).map((article, index) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div className="relative overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                    <TrendingUp className="w-12 h-12 text-green-600" />
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-green-600 text-white">
                      {article.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="text-green-600 font-medium">{article.readTime}</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 group-hover:bg-green-600 group-hover:text-white transition-all duration-300"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
              Load More Articles
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Stay Updated with{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Industry News
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Subscribe to our newsletter and get the latest updates on steel market trends,
              sustainability initiatives, and company news delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}