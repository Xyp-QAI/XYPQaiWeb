import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  fullTitle?: string;
  description?: string;
  path?: string;
  image?: string;
}

const SITE = "XYP Quantum AI";
const BASE_URL = "https://www.xypquantum.com";
const DEFAULT_DESCRIPTION = "XYP Quantum AI builds intelligent AI products, advanced technology systems, and scalable startup solutions for real-world innovation.";
const DEFAULT_IMAGE = `${BASE_URL}/preview.jpg`;

const SEO = ({
  title,
  fullTitle,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image = DEFAULT_IMAGE,
}: SEOProps) => {
  const resolvedTitle = fullTitle ?? (title ? `${title} | ${SITE}` : "XYP Quantum AI | AI Products & Advanced Technology");
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{resolvedTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEO;
