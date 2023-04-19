import styled from "styled-components";
import sanitize from "sanitize-html";
import ArrowIcon from "@components/icons/Arrow";
import { tabletQuery } from "@styles/mediaQueries";

const ProjectsIntro = ({ attrs }: any) => {
  let {
    caseStudySectionIntro,
    eyebrow,
    title,
    copy,
    subtitle1,
    subcopy1,
    subtitle2,
    subcopy2,
    ctaurl,
    ctacopy,
  }: {
    caseStudySectionIntro: boolean,
    eyebrow: string,
    title: string,
    copy: string,
    subtitle1: string,
    subcopy1: string,
    subtitle2: string,
    subcopy2: string,
    ctaurl: string,
    ctacopy: string,
  } = attrs.data;
  // adding line breaks for acf wysiwyg fields
  copy = copy.replace(/\r\n\r\n/g, "<div></div>");
  subcopy1 = subcopy1.replace(/\r\n\r\n/g, "<div></div>");
  subcopy2 = subcopy2.replace(/\r\n\r\n/g, "<div></div>");

  return (
    <Container id={eyebrow}>
      <InnerContainer>
        <MainContent>
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <Title
            isLarge={caseStudySectionIntro}
            dangerouslySetInnerHTML={{
              __html: sanitize(title),
            }}
          ></Title>
          {copy ? (
            <Copy
              dangerouslySetInnerHTML={{
                __html: sanitize(copy),
              }}
            ></Copy>
          ) : null}
        </MainContent>
        {subtitle1 && subcopy1 ? (
          <SubContent>
            <SubCard>
              <SubTitle>{subtitle1}</SubTitle>
              <SubCopy
                dangerouslySetInnerHTML={{
                  __html: sanitize(subcopy1),
                }}
              ></SubCopy>
            </SubCard>
            <SubCard>
              <SubTitle>{subtitle2}</SubTitle>
              <SubCopyLowercase
                dangerouslySetInnerHTML={{
                  __html: sanitize(subcopy2),
                }}
              ></SubCopyLowercase>
            </SubCard>
          </SubContent>
        ) : null}
        {ctaurl && ctacopy ? (
          <CtaLink href={ctaurl}>
            <CtaCopy>{ctacopy}</CtaCopy> <ArrowIcon />
          </CtaLink>
        ) : null}
      </InnerContainer>
    </Container>
  );
};

export default ProjectsIntro;

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
  color: var(--white);
  width: 100%;
  max-width: 1440px;
  padding: 56px var(--side-padding);
  display: grid;
  grid-template-columns: 57.59% 32.14%;
  justify-content: space-between;

  @media ${tabletQuery} {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
    margin-bottom: 80px;
  }
`;

const MainContent = styled.div`
  max-width: 774px;
`;

const Eyebrow = styled.span`
  display: block;
  width: fit-content;
  color: var(--warm-grey);
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.04em;
  margin-bottom: 16px;
  padding-top: 8px;
  border-top: 2px solid var(--glacier);
`;

const Title = styled.div`
  h1,
  h2 {
    margin: 0;
    font-weight: 400;
    font-size: ${(props: {
      isLarge: boolean;
    }) => (props.isLarge ? "81px" : "54px")};
    line-height: ${(props: {
      isLarge: boolean;
    }) => (props.isLarge ? "88px" : "56px")};
    letter-spacing: -0.04em;

    @media ${tabletQuery} {
      font-size: 38px;
      line-height: 42px;
    }
  }
`;

const Copy = styled.div`
  color: var(--warm-grey);
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.04em;
  text-align: left;
  margin-block: 32px 0;

  @media ${tabletQuery} {
    margin-bottom: 48px;
  }
`;

const SubContent = styled.div`
  max-width: 204px;
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  @media ${tabletQuery} {
    width: 100%;
    max-width: revert;
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
  }
`;

const SubCard = styled.div``;

const SubTitle = styled.h2`
  width: fit-content;
  font-size: 24px;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: -0.04em;
  padding-block: 8px 16px;
  border-top: 2px solid var(--glacier);
  margin: 0;
`;

const SubCopy = styled.div`
  font-weight: 300;
  line-height: 21px;
  text-transform: uppercase;
  letter-spacing: 1.5px;

  p {
    margin: 0;
    font-size: 14px;
  }

  & > div {
    height: 8px;
  }
`;

const SubCopyLowercase = styled.div`
  font-size: 16px;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0;

  & > div {
    height: 8px;
  }
`;
const CtaLink = styled.a`
  text-transform: uppercase;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 32px;

  & > span {
    color: var(--white);
  }

  @media ${tabletQuery} {
    display: none;
  }
`;

const CtaCopy = styled.span``;
