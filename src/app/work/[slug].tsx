import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {
  getWorkSlugs,
  getCaseStudyBlocks,
  getHeaderMenuItems,
  getFooterWidgets,
  getMeta,
} from "@lib/api";

import Layout from "@components/layout/Layout";
import BlockSwitch from "@components/blocks/BlockSwitch";
import React from 'react';

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getWorkSlugs();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paths = (await getWorkSlugs()) || null;
  const filtered = paths.filter((path: {
    params: {
      slug: string
    }
  }) => path.params.slug === params?.slug);
  const postIndex = paths.indexOf(filtered);
  const nextPost = paths[postIndex + 1];
  const id = filtered.length > 0 && filtered[0].params.id;
  const blocksData = (await getCaseStudyBlocks(id)) || null;
  const metaData = await getMeta(id);
  const headerMenuItems = await getHeaderMenuItems();
  const footerWidgets = (await getFooterWidgets()) || null;

  return {
    props: {
      headMeta: metaData,
      blocks: blocksData,
      headerMenuItems: headerMenuItems,
      footerWidgets: footerWidgets,
      nextPost: nextPost,
    },
  };
}


type Image = {
  ID: string,
  alt: string,
  width: number,
  height: number,
  sizes: {
    large: string,
  },
}

type BlockData = {
  copy: string,
  textColor: string,
  imgData: Image,
  mobileImgData: Image,
  left_image: Image,
  left_image_copy: string,
  right_image: Image,
  right_image_copy: string,
  vimeo_id: string;
  thumbnail: string;
  autoplay: boolean;
  bgColor: string;
}

type Block = {
  blockName: string,
  innerHTML: string,
  rendered: string,
  attrs: {
    componentsToRender?: string | null,
    data: BlockData
  },
}

export default function Work({
  blocks,
  headMeta,
  headerMenuItems,
  footerWidgets,
}: {
  blocks: Block[],
  headMeta: any,
  headerMenuItems: [],
  footerWidgets: []
}) {
  return (
    <>  
      <Layout
        headMeta={headMeta}
        headerContent={headerMenuItems}
        footerContent={footerWidgets}
      >
        <BlockSwitch blocks={blocks} />
      </Layout>
    </>
  );
}
