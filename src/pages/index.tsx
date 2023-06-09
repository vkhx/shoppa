import React from "react";
import { FooterBanner, HeroBanner, Product } from "../components";
import { client } from "../lib/client";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { SanityProduct, SanityBanner } from "../types/sanityTypes";

const Home = ({
  products,
  banners,
}: {
  products: SanityProduct;
  banners: SanityBanner;
}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <HeroBanner heroBanner={banners.length && banners[0]} />
      <div className="products-heading">
        <h2>{t("best-sellers")}</h2>
      </div>
      <div className="products-container">
        {products?.map((product: SanityProduct) => {
          return <Product key={product._id} product={product} />;
        })}
      </div>
      <FooterBanner footerBanner={banners && banners[1]} />
    </>
  );
};

export default Home;
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  const productQuery = '*[_type== "product"]';
  const products = await client.fetch(productQuery);
  const bannerQuery = '*[_type== "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      products,
      banners,
    },
  };
};
