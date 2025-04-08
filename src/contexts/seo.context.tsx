import { FC, Fragment } from "react";
import { Helmet } from "react-helmet";

interface SEOPageProvierProps {
  info?: { title?: string; description?: string; image?: string; url?: string };
  children: React.ReactNode;
}
const SEOPageProvier: FC<SEOPageProvierProps> = ({ children, info }) => {
  return (
    <Fragment>
      <Helmet>
        {info?.title && <title>{info?.title}</title>}
        {info?.description && (
          <meta name="description" content={info?.description} />
        )}
        {info?.image && <meta property="og:image" content={info?.image} />}
        {info?.url && <meta property="og:url" content={info?.url} />}
      </Helmet>
      {children}
    </Fragment>
  );
};

export default SEOPageProvier;
