import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
}

const SITE = "XYP Quantum AI";
const BASE_URL = "https://xypquantum.com";

const SEO = ({
  title,
  description = "Building the future of intelligent systems — AI, IoT, Computer Vision & Quantum Computing from Bengaluru, India.",
  path = "/",
}: SEOProps) => {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} — Intelligent Systems from India`;
  const url = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SEO;
