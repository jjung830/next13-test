import Image from "next/image";
import styled from "styled-components";

const OneUpImage = ({ attrs }: {
  attrs: {
    copy: string,
    textColor: string,
    imgData: {
      ID: string,
      alt: string,
      width: number,
      height: number,
      sizes: {
        large: string,
      },
    },
  }
  }) => {
  const { copy, textColor, imgData } = attrs;

  return (
    <Container id={imgData.ID}>
      <InnerContainer>
        <ImageWrapper className="image-wrapper">
          <Image
            src={imgData.sizes.large}
            alt={imgData.alt}
            width={imgData.width}
            height={imgData.height}
          />
          <Copy className="oneUpImageCopy" textColor={textColor}>
            {copy}
          </Copy>
        </ImageWrapper>
      </InnerContainer>
    </Container>
  );
};

export default OneUpImage;

type ContainerProps = {
  bgColor?: string,
  children: React.ReactNode,
  id: string
}

const Container: React.FC<ContainerProps> = styled.section<ContainerProps>`
  background-color: ${(props) =>
    props.bgColor ? props.bgColor : "var(--black)"};
  display: flex;
  justify-content: center;
`;

const InnerContainer = styled.div`
  width: 100%;
  max-width: 1440px;
  padding: 56px var(--side-padding);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  max-width: 1116px;
  position: relative;

  img {
    height: auto;
    max-width: 100%;
  }
`;

const Copy = styled.p`
  &.oneUpImageCopy {
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
