import { Helmet } from "react-helmet-async";
import TrustedBy from "@/components/sections/TrustedBy";

export default function Partners() {
  return (
    <>
      <Helmet>
        <title>Partners - AAASHA TRADING LTD | Trusted Industry Partnerships</title>
        <meta 
          name="description" 
          content="Discover our trusted partnerships with leading steel manufacturers and industry leaders. Building strong relationships for sustainable growth." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-emerald-900/20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Partners
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-green-200 mb-8 leading-relaxed">
              Building strong partnerships with industry leaders to deliver exceptional 
              value and drive sustainable growth in the steel trading sector.
            </p>
          </div>
        </div>
      </section>

      <TrustedBy />
    </>
  );
}