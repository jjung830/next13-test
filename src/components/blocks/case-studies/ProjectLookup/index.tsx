import React from "react";
import Image from "next/image";
import Link from "next/link";
import sanitize from "sanitize-html";
import styled from "styled-components";
import { smDesktopQuery } from "@styles/mediaQueries";
import { tabletQuery } from "@styles/mediaQueries";

import OneUpImage from "@components/blocks/acf/OneUpImage";
import OneUpVideo from "@components/blocks/acf/OneUpVideo";
import TwoUpImage from "@components/blocks/acf/TwoUpImage";

import NextArrow from "@components/icons/NextArrow";
import BackArrow from "@components/icons/BackArrow";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper.min.css";

SwiperCore.use([Navigation]);


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
  image: Image,
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
  name: string,
  innerHTML: string,
  rendered: string,
  attributes: {
    componentsToRender?: string | null,
    data: BlockData
  },
}

const ProjectLookup = ({ attrs }: any) => {
  const {
    awardImageUrl,
    awardsCopy,
    awardsTitle,
    content,
    projectUrl,
    componentsToRender,
  }: {
    awardImageUrl: string;
    awardsCopy: string;
    awardsTitle: string;
    content: Block[];
    projectUrl: string;
    componentsToRender: Block[];
  } = attrs;

  return (
    <SwiperContainer className="swiper-container">
      <div className="inner-container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1.063}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {awardImageUrl && awardsCopy && awardsTitle && (
            <SwiperSlide>
              <IntroCard>
                <ImageContainer>
                  <Image src={awardImageUrl} alt={awardsTitle} fill />
                </ImageContainer>
                <TextContainer>
                  <h3>{awardsTitle}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sanitize(awardsCopy),
                    }}
                  />
                </TextContainer>
              </IntroCard>
            </SwiperSlide>
          )}

          {content?.map((block, i) => {
            const blockName = block.name;
            const attrs = block.attributes;

            switch (blockName) {
              case "acf/one-up":
                // filter to find the relevant block type
                const oneUpFields = componentsToRender.filter((component) =>
                  component.hasOwnProperty("image")
                );

                // if more than one of the same block type exists, find the one that matches the left_image id in the data object
                const filteredOneUpFields: any[] = oneUpFields.filter((item: any) => {
                  return (
                    item.image.ID === attrs.data.image?.ID ||
                    item.image.ID === attrs.data.image
                  );
                });

                console.log("data", attrs.data);
                console.log("one ups", oneUpFields);
                console.log("filtered one ups", filteredOneUpFields);

                if (filteredOneUpFields.length > 0) {
                  attrs.data.imgData = filteredOneUpFields[0].image;
                }

                return (
                  <SwiperSlide key={i}>
                    <OneUpImage attrs={attrs.data} />
                  </SwiperSlide>
                );
              case "acf/one-up-video":
                return (
                  <SwiperSlide key={i}>
                    <OneUpVideo attrs={attrs.data} />
                  </SwiperSlide>
                );
              case "acf/two-up-image":
                // filter to find the relevant block type
                const twoUpFields = componentsToRender.filter((component) =>
                  component.hasOwnProperty("left_image")
                );

                // if more than one of the same block type exists, find the one that matches the left_image id in the data object
                const filteredFields: any[] = twoUpFields.filter((item: any) => {
                  return (
                    item.left_image.ID === attrs.data.left_image ||
                    item.left_image.ID === attrs.data.left_image?.ID
                  );
                });

                if (filteredFields.length > 0) {
                  attrs.data.left_image = filteredFields[0].left_image;
                  attrs.data.right_image = filteredFields[0].right_image;
                }

                return (
                  <SwiperSlide key={i}>
                    <TwoUpImage attrs={attrs.data} />
                  </SwiperSlide>
                );
              default:
                return (
                  <SwiperSlide key={i}>
                    <h2>{blockName}</h2>
                  </SwiperSlide>
                );
            }
          })}
          {projectUrl && (
            <SwiperSlide>
              <FullProjectLink>
                <Link href={projectUrl}>
                  <span>
                    Full Project <NextArrow />
                  </span>
                </Link>
              </FullProjectLink>
            </SwiperSlide>
          )}

          <button className="swiper-button-prev" aria-label="Previous slide">
            <BackArrow />
          </button>
          <button className="swiper-button-next" aria-label="Next slide">
            <NextArrow />
          </button>
        </Swiper>
      </div>
    </SwiperContainer>
  );
};

export default ProjectLookup;

const IntroCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media ${tabletQuery} {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 0;
  padding-bottom: 115.35%;

  img {
    object-fit: cover;
    object-position: center;
  }
`;

const TextContainer = styled.div`
  background: var(--glacier);
  border-radius: 8px;
  padding: 1rem 2rem;
  color: var(--black);
  font-weight: 300;
  font-size: 16px;

  h3 {
    border-top: 1px solid var(--black);
    padding-top: 1rem;
    max-width: 319px;
  }

  h3,
  strong {
    font-size: 24px;
    font-weight: 300;

    @media ${smDesktopQuery} {
      font-size: 18px;
    }
  }

  strong {
    margin-top: 1rem;
    display: block;
  }

  p {
    color: var(--black);
    margin: 0;

    @media ${smDesktopQuery} {
      font-size: 14px;
    }
  }

  a {
    text-decoration: underline;
  }
`;

const SwiperContainer = styled.section`
  background: var(--black);
  overflow: hidden;

  .inner-container {
    max-width: 1440px;
    padding: 2rem var(--side-padding);
    margin: 0 auto;
  }

  section {
    background-color: transparent;
  }

  .swiper {
    overflow: visible;
    position: relative;

    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }
    }
  }

  .image-wrapper {
    position: relative;
    //overflow: hidden;
    width: 100%;
    height: 0;
    padding-bottom: 56.25%;
    margin-bottom: 3rem;
    max-width: 100%;

    img {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
    }
  }

  .oneUpImageCopy,
  .twoUpImagesCopy {
    position: absolute;
    bottom: 0;
    transform: translateY(calc(100% + 1rem));
  }

  .one-up-video .oneUpImageCopy {
    position: relative;
    transform: none;
  }

  .two-up-image .image-wrapper {
    padding-bottom: 115.35%;
  }

  .two-up-image .two-up-inner-container {
    max-width: 100%;
    column-gap: 30px;
  }

  .video-wrapper {
    max-width: 100%;
    height: 0;
    padding-bottom: 56.25%;
  }

  img {
    object-fit: cover;
    object-position: center;
  }

  .swiper-slide section > div {
    padding: 0;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background: var(--white);
    border: 0px;
    border-radius: 32px;
    height: 64px;
    position: absolute;
    z-index: 1;
    width: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.4s opacity ease;

    &:focus {
      opacity: 1;
    }

    @media ${tabletQuery} {
      margin-top: 1rem;
      position: relative;
      opacity: 1;
    }
  }

  .swiper-button-prev {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-50%, -100%);

    @media ${tabletQuery} {
      top: unset;
      transform: none;
    }
  }

  .swiper-button-next {
    top: 50%;
    right: 0;
    transform: translate(50%, -100%);

    @media ${tabletQuery} {
      top: unset;
      transform: none;
      margin-left: auto;
    }
  }

  .oneUpImageCopy {
    font-style: italic;
    max-width: 100%;
  }
`;

const FullProjectLink = styled.div`
  a {
    align-items: center;
    border: 1px solid var(--white);
    border-radius: 311px;
    display: flex;
    justify-content: center;
    height: 622px;
    width: 622px;

    span {
      align-items: center;
      background: var(--white);
      border-radius: 2rem;
      display: flex;
      height: 48px;
      gap: 0.25rem;
      text-transform: uppercase;
      font-size: 18px;
      padding: 0.55rem 1.5rem 0.5rem;
    }

    svg {
      height: 16px;
      transform: translateY(-1px);
    }

    &:hover {
      background: var(--white);

      span {
        background-color: var(--black);
        color: var(--white);
      }
    }
  }
`;
