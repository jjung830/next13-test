import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import {
  getProjectSlugs,
  getProjectBlocks,
  getHeaderMenuItems,
  getFooterWidgets,
  getMeta,
} from "@lib/api";
import Layout from "@components/layout/Layout";
import BlockSwitch from "@components/blocks/BlockSwitch";
import ProjectNav from "@components/blocks/projects/ProjectNav";

export async function getStaticPaths() {
  const paths = await getProjectSlugs();

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const paths = (await getProjectSlugs()) || null;
  const filtered = paths.filter((path: {
    params: {
      slug: string
    }
  }) => path.params.slug === params?.slug);
  const id = filtered.length > 0 && filtered[0].params.id;
  const postIndex = paths.indexOf(filtered[0]);
  const blocksData = (await getProjectBlocks(id)) || null;
  const metaData = await getMeta(id);
  const headerMenuItems = await getHeaderMenuItems();
  const footerWidgets = (await getFooterWidgets()) || null;

  // next post
  const nextPost = paths[postIndex + 1]?.params.slug || null;
  const nextPostId = paths[postIndex + 1]?.params.id || null;
  const nextPostMeta = (await getMeta(nextPostId)) || null;

  return {
    props: {
      headMeta: metaData,
      blocks: blocksData,
      headerMenuItems: headerMenuItems,
      footerWidgets: footerWidgets,
      nextPost: nextPost,
      nextPostMeta: nextPostMeta,
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
  nextPost,
  nextPostMeta,
}: {
  blocks: Block[],
  headMeta: any,
  headerMenuItems: [],
  footerWidgets: [],
  nextPost: string,
  nextPostMeta: any,
}) {
  return (
    <>
      <Layout
        headMeta={headMeta}
        headerContent={headerMenuItems}
        footerContent={footerWidgets}
      >
        <BlockSwitch blocks={blocks} />
        {nextPost && nextPostMeta && (
          <ProjectNav
            nextPost={nextPost}
            nextPostExcerpt={nextPostMeta.excerpt}
          />
        )}
      </Layout>
    </>
  );
}
