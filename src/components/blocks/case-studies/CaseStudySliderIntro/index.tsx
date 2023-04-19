import styled from "styled-components";
import sanitize from "sanitize-html";
import ArrowIcon from "@components/icons/Arrow";
import { tabletQuery } from "@styles/mediaQueries";

const CaseStudySliderIntro = ({ attrs }: any) => {
  let { header, copy, ctaurl, ctacopy }: {
    header: string,
    copy: string,
    ctaurl: string,
    ctacopy: string,
  } = attrs.data;
  // adding line breaks for acf wysiwyg fields
  copy = copy.replace(/\r\n\r\n/g, "<div></div>");

  return (
    <Container>
      <InnerContainer>
        <HeaderSection>
          <Header>{header}</Header>
        </HeaderSection>
        <CopySection>
          {copy ? (
            <Copy
              dangerouslySetInnerHTML={{
                __html: sanitize(copy),
              }}
            ></Copy>
          ) : null}
          {ctaurl && ctacopy ? (
            <CtaLink href={ctaurl}>
              <CtaCopy>{ctacopy}</CtaCopy> <ArrowIcon />
            </CtaLink>
          ) : null}
        </CopySection>
      </InnerContainer>
    </Container>
  );
};

export default CaseStudySliderIntro;

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
  padding: 88px var(--side-padding);
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  column-gap: 24px;

  @media ${tabletQuery} {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
    margin-bottom: 80px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Header = styled.h2`
  font-size: 54px;
  line-height: 56px;
  font-weight: 400;
  letter-spacing: -0.04em;
  margin: 0;
  max-width: 432px;

  @media screen and (max-width: 600px) {
    font-size: 38px;
    line-height: 42px;
    margin-bottom: 16px;
  }
`;

const CopySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Copy = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: -0.02em;
  margin: 0;
  max-width: 432px;

  a {
    color: var(--glacier);
    text-decoration: underline;
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
  border-bottom: 2px solid var(--white);

  & > span {
    color: var(--white);
  }
`;

const CtaCopy = styled.span``;
