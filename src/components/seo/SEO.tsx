
import { Helmet } from "react-helmet";

interface Props {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
}

export default function SEO({ title, description, keywords, canonical, ogImage }: Props) {
  try {
    return (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {canonical && <link rel="canonical" href={canonical} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
      </Helmet>
    );
  } catch (error) {
    console.error('SEO component error:', error);
    // Fallback to setting document title directly if Helmet fails
    if (typeof document !== 'undefined') {
      document.title = title;
    }
    return null;
  }
}
