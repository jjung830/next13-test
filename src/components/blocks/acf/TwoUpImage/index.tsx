import Image from "next/image";
import styled from "styled-components";

const TwoUpImage = ({ attrs }: {
  attrs: {
    left_image: {
      ID: string,
      alt: string,
      width: number,
      height: number,
      sizes: {
        large: string,
      },
    },
    left_image_copy: string,
    right_image: {
      ID: string,
      alt: string,
      width: number,
      height: number,
      sizes: {
        large: string,
      },
    },
    right_image_copy: string,
  },
}) => {
  const { left_image, left_image_copy, right_image, right_image_copy } = attrs;

  return (
    <Container className="two-up-image">
      <InnerContainer>
        <ImageGrid className="two-up-inner-container">
          <ImageWrapper id={left_image.ID} className="image-wrapper">
            <Image
              src={left_image?.sizes.large}
              alt={left_image?.alt}
              width={left_image?.width}
              height={left_image?.height}
            />
            <Copy className="twoUpImagesCopy">{left_image_copy}</Copy>
          </ImageWrapper>
          <ImageWrapper id={right_image.ID} className="image-wrapper">
            <Image
              src={right_image.sizes.large}
              alt={right_image.alt}
              width={right_image.width}
              height={right_image.height}
            />
            <Copy className="twoUpImagesCopy">{right_image_copy}</Copy>
          </ImageWrapper>
        </ImageGrid>
      </InnerContainer>
    </Container>
  );
};

export default TwoUpImage;

const Container: any = styled.section`
  background-color: ${(props: {
    bgColor: string;
  }) =>
    props.bgColor ? props.bgColor : "var(--black)"};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 56px var(--side-padding);

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const ImageGrid = styled.div`
  max-width: 1116px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 24px;
  margin-inline: auto;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    row-gap: 72px;
  }
`;

const ImageWrapper: any = styled.div`
  position: relative;
  width: 100%;

  img {
    height: auto;
    max-width: 100%;
  }
`;

const Copy: any = styled.p`
  &.twoUpImagesCopy {
    color: ${(props: {
      textColor: string;
    }) => (props.textColor ? props.textColor : "#FFFFFF")};
    font-size: 14px;
    line-height: 16px;
    font-style: italic;
    align-self: flex-start;
    margin-block: 16px 0;
  }
`;
