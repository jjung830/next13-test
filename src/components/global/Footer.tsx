import styled from "styled-components";
import sanitizeHtml from "sanitize-html";
import Madwell from "@components/icons/Madwell";
import MadwellText from "@components/icons/MadwellText";

import { smDesktopQuery } from "@styles/mediaQueries";

const Footer = ({ widgets }:
  {
    widgets: {
      id: string,
      rendered: string,
    }[]
  }) => {
  return (
    <FooterContainer>
      <Inner>
        <Grid>
          <WidgetArea className="madwell-branding">
            <Madwell />
            <MadwellText />
            <Tagline>A Tiny Little Giant Agency™</Tagline>
          </WidgetArea>

          {widgets.length > 0 &&
            widgets.map((widget) => (
              <WidgetArea key={widget.id} id={widget.id}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(widget.rendered),
                  }}
                />
              </WidgetArea>
            ))}
        </Grid>
      </Inner>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  color: var(--white);
  font-size: 16px;
  font-weight: 400;
  font-family: var(--neue);
  line-height: 1.75;

  h3,
  h2 {
    font-family: var(--bodyFont);
    font-weight: 300;
    font-size: 24px;
    margin: 0 0 1rem;
  }

  p {
    margin: 0 0 1rem;
  }

  li {
    list-style: none;
    padding: 0;
    margin: 0 0 1rem;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

const Inner = styled.div`
  max-width: 1440px;
  padding: 0 var(--side-padding);
  margin: 0 auto;
  position: relative;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 200px 1.15fr 1.15fr 0.7fr;
  gap: 2rem;
  max-width: 1116px;
  margin: 0 auto;
  padding: 2rem 0 5rem;

  @media ${smDesktopQuery} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: unset;
    padding-bottom: 2rem;
  }
`;

const WidgetArea = styled.div`
  padding-top: 3rem;

  @media ${smDesktopQuery} {
    padding-top: 2rem;

    &:nth-of-type(4) {
      border-bottom: 1px solid #fff;
      grid-column-start: 1;
      grid-column-end: 3;
      padding-bottom: 1rem;

      li {
        display: inline-block;
        margin-right: 1rem;
      }
    }

    &:nth-of-type(5),
    &:last-child {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    &:last-child {
      padding-bottom: 2rem;
    }
  }

  &:nth-of-type(2),
  &:nth-of-type(6) {
    padding-left: 3rem;

    @media ${smDesktopQuery} {
      padding-left: 0;
    }
  }

  &:nth-of-type(5) {
    a {
      border-bottom: 1px solid #fff;
    }

    &:before {
      content: "";
      height: 1px;
      background: var(--white);
      width: 100%;
      display: block;
      position: absolute;
      left: 0;
      transform: translateY(-3rem);

      @media ${smDesktopQuery} {
        content: none;
      }
    }
  }

  &.madwell-branding {
    text-align: center;
    font-size: 14px;

    @media ${smDesktopQuery} {
      grid-column-start: 1;
      grid-column-end: 3;
    }

    svg {
      margin-bottom: 1.25rem;

      &:nth-of-type(2) {
        display: block;
        margin: 0 auto 0.85rem;
        max-width: 185px;
      }
    }
  }
`;

const Tagline = styled.span``;
