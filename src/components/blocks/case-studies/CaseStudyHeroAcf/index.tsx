import Image from "next/image";
import styled, { css } from "styled-components";
import { tabletQuery } from "@styles/mediaQueries";

const CaseStudyHeroAcf = ({ attrs }: any) => {
  const { company, imgData, mobileImgData }: {
    company: string,
    imgData: {
      url: string,
      alt: string,
      width: number,
      height: number,
    },
    mobileImgData: {
      url: string,
      alt: string,
      width: number,
      height: number,
    },
  } = attrs.data;
  return (
    <Container>
      <InnerContainer>
        {imgData.url ? (
          <ImgWrapper>
            <Image
              src={imgData.url}
              alt={imgData.alt}
              width={imgData.width}
              height={imgData.height}
            />
          </ImgWrapper>
        ) : null}
        {mobileImgData.url ? (
          <ImgWrapperM>
            <Image
              src={mobileImgData.url}
              alt={mobileImgData.alt}
              width={mobileImgData.width}
              height={mobileImgData.height}
            />
          </ImgWrapperM>
        ) : null}
        <Company>{company}</Company>
      </InnerContainer>
    </Container>
  );
};

export default CaseStudyHeroAcf;

const Container: any = styled.section`
  background-color: ${(props: {
    bgColor: string;
  }) =>
    props.bgColor ? props.bgColor : "var(--black)"};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  color: var(--white);
  width: 100%;
  max-width: 1440px;
  padding: 64px 48px 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media ${tabletQuery} {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
    margin-bottom: 80px;
  }
`;

const ImgStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    animation: fadeIn 2s;
    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;

const ImgWrapper = styled.div`
  max-width: 1116px;
  ${ImgStyles}

  @media screen and (max-width: 600px) {
    display: none;
  }
`;
const ImgWrapperM = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    ${ImgStyles}
  }
`;

const Company = styled.h1`
  position: absolute;
  bottom: -80px;
  left: 48px;
  max-width: 660px;
  font-weight: 300;
  font-size: 121px;
  line-height: 128px;
  letter-spacing: -0.04em;

  @media ${tabletQuery} {
    bottom: -10px;
    max-width: 300px;
    font-size: 67px;
    line-height: 72px;
  }

  @media screen and (max-width: 600px) {
    bottom: -60px;
    left: 8px;
  }
`;
