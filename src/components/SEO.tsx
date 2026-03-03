import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  fullTitle?: string;
  description?: string;
  path?: string;
}

const SITE = "XYP Quantum AI";
const BASE_URL = "https://www.xypquantum.com";
const DEFAULT_DESCRIPTION = "XYP Quantum AI builds intelligent AI products, advanced technology systems, and scalable startup solutions for real-world innovation.";

/**
 * SEO component: updates document title, description, and canonical only.
 * Open Graph and Twitter Card tags are defined once in index.html to avoid
 * duplicates and malformed tags (e.g. og:temporal:twitter:* in Facebook Debugger).
 */
const SEO = ({
  title,
  fullTitle,
  description = DEFAULT_DESCRIPTION,
  path = "/",
}: SEOProps) => {
  const resolvedTitle = fullTitle ?? (title ? `${title} | ${SITE}` : "XYP Quantum AI | AI Products & Advanced Technology");
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
