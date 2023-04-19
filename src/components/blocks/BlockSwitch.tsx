import React from "react";
import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import CaseStudyHeroAcf from "./case-studies/CaseStudyHeroAcf";
import ProjectsIntro from "./projects/ProjectsIntro";
import ProjectLookup from "./case-studies/ProjectLookup";
import CaseStudySliderIntro from "./case-studies/CaseStudySliderIntro";
import OneUpImage from "./acf/OneUpImage";
import OneUpVideo from "./acf/OneUpVideo";
import TwoUpImage from "./acf/TwoUpImage";

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

const BlockSwitch = ({ blocks }: {
  blocks: Block[],
}) => {
  const renderBlock = (block: Block, i: number) => {
    const { blockName, attrs, rendered } = block;
    const key = `${i}${blockName}`;

    switch (blockName) {
      case "acf/project-cs-hero":
        const fieldsData = JSON.parse(rendered);
        attrs.data.imgData = fieldsData.image;
        attrs.data.mobileImgData = fieldsData.mobile_image;
        return <CaseStudyHeroAcf key={key} attrs={attrs} />;
      case "acf/projects-intro":
        return <ProjectsIntro key={key} attrs={attrs} />;
      case "case-studies/project-lookup":
        const output = rendered.replaceAll(" ", "");
        const components = output.split("\n");
        const componentsToRender = components?.filter(
          (item) => item.length !== 0
        );

        if (componentsToRender) {
          const componentsJSON: any = componentsToRender.map((component) => {
            return JSON.parse(component);
          });

          attrs.componentsToRender = componentsJSON;
        }

        return <ProjectLookup key={key} attrs={attrs} />;
      case "acf/project-lookup-intro":
        return <CaseStudySliderIntro key={key} attrs={attrs} />;
      case "acf/one-up":
        const oneUpFields: {
          image: Image,
        } = JSON.parse(rendered);
        attrs.data.imgData = oneUpFields.image;

        return <OneUpImage key={key} attrs={attrs.data} />;
      case "acf/one-up-video":
        return <OneUpVideo key={key} attrs={attrs.data} />;
      case "acf/two-up-image":
        const twoUpFields = JSON.parse(rendered);
        attrs.data.left_image = twoUpFields.left_image;
        attrs.data.right_image = twoUpFields.right_image;
        return <TwoUpImage key={key} attrs={attrs.data} />;
      default:
        return (
          <TempBlockContainer key={key}>
            <h1>{block.blockName}</h1>
            <TempBlockContent
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(block.innerHTML),
              }}
            ></TempBlockContent>
          </TempBlockContainer>
        );
    }
  };

  return (
    <React.Fragment>
      {blocks.map((block, i) => renderBlock(block, i))}
    </React.Fragment>
  );
};

export default BlockSwitch;

const TempBlockContainer = styled.section`
  text-align: center;
  padding: 56px 48px;
  border: 1px dotted #777;

  & > h1 {
    font-size: 56px;
    font-weight: bold;
    padding: 1rem;
    border: 1px solid #444;
  }

  &,
  * {
    color: #111 !important;
    background-color: #fff !important;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
    & > h1 {
      font-size: 32px;
    }
  }
`;

const TempBlockContent = styled.div`
  * {
    margin: 0;
  }
  img {
    width: 100%;
    object-fit: contain;
  }
  a {
    text-decoration: underline;
  }
`;
