import { Helmet } from "react-helmet-async";
import OurPartners from "@/components/sections/OurPartners";

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

      {/* Partners Content Section - Full Page */}
      <OurPartners />
    </>
  );
}