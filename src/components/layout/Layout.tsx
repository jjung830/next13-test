import Head from "next/head";
const API_URL = process.env.NEXT_PUBLIC_DEV_WORDPRESS_API_URL;
import Header from "@components/global/Header";
import Footer from "@components/global/Footer";

interface LayoutProps {
  headMeta: { title: string; excerpt: string; ogImage: string };
  children: React.ReactNode;
  headerContent: any[];
  footerContent: any[];
}

export default function Layout({
  headMeta,
  children,
  headerContent,
  footerContent,
}: LayoutProps) {
  const { title, excerpt, ogImage } = headMeta;
  const pageTitle: string = `${title} - Madwell`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content={excerpt ? excerpt : undefined}></meta>
        <meta
          property="og:title"
          content={title ? title : undefined}
          key="ogtitle"
        />
        <meta
          property="og:description"
          content={excerpt ? excerpt : undefined}
          key="ogdesc"
        />
        <meta
          property="og:image"
          content={ogImage ? ogImage : undefined}
          key="ogimage"
        />

        {API_URL === "https://madwellstaging.wpengine.com/wp-json/" && (
          <script
            type="text/javascript"
            src="https://www.bugherd.com/sidebarv2.js?apikey=6uunmegcgn4jh1cdzhxywa"
            async
          ></script>
        )}

        <title>{pageTitle}</title>
      </Head>

      {headerContent && <Header items={headerContent} />}

      <main className="capes-container">{children}</main>

      {footerContent && <Footer widgets={footerContent} />}
    </>
  );
}
