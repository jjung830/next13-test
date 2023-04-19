import React, { useState, useEffect } from "react";
import { tabletQuery } from "@styles/mediaQueries";
import Link from "next/link";
import styled from "styled-components";
import NavDots from "@components/icons/NavDots";
import Madwell from "@components/icons/Madwell";
import Close from "@components/icons/Close";
import LargeArrow from "@components/icons/LargeArrow";
import LinkedIn from "@components/icons/LinkedIn";
import Twitter from "@components/icons/Twitter";
import Instagram from "@components/icons/Instagram";

type NavItem = {
  title: string;
  url: string;
}

type NavItems = NavItem[];

const Header = ({ items }: {
  items: NavItems,
}) => {
  const [navOpen, setNavOpen] = useState(false);
  const [navItems, setNavItems] = useState<NavItems>([]);

  useEffect(() => {
    if (items) {
      setNavItems(items);
    }
  }, []);

  return (
    <HeaderContainer className={navOpen && "expanded"}>
      <NavBar>
        <Madwell />

        <Trigger
          aria-label="Toggle header nav"
          onClick={() => setNavOpen(!navOpen)}
        >
          {navOpen ? <Close /> : <NavDots />}
        </Trigger>
      </NavBar>

      <NavItems>
        <ul>
          {navItems && 
            navItems.map((item, i) => (
              <li key={`${i}_${item.title}`}>
                <Link href={item.url}>
                  <>
                    {item.title} <LargeArrow />
                  </>
                </Link>
              </li>
            ))}
        </ul>

        <Bottom>
          <Copy>© 2022 Madwell</Copy>

          <SocialNav>
            <Link href="https://twitter.com/madwellington">
              <Twitter />
            </Link>
            <Link href="https://www.instagram.com/madwell/">
              <Instagram />
            </Link>
            <Link href="https://www.linkedin.com/company/madwell/">
              <LinkedIn />
            </Link>
          </SocialNav>
        </Bottom>
      </NavItems>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer: any = styled.header`
  background: var(--black);
  color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem var(--side-padding);
  position: sticky;
  top: 0;
  z-index: 3;
  transition: 0.4s max-height;
  overflow: hidden;

  &.expanded {
    height: 100%;
    position: fixed;
    width: 100%;
  }
`;

const NavItems = styled.div`
  align-items: center;
  background: var(--black);
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  width: 100%;
  max-height: 0px;
  transform: translateX(200%);
  transition: 0.6s transform;
  opacity: 0;

  .expanded & {
    transform: translateX(0);
    max-height: 5000px;
    height: 100%;
    position: relative;
    opacity: 1;
  }

  a {
    align-items: center;
    color: var(--white);
    display: flex;
    font-size: 54px;
    gap: 0.5rem;

    @media ${tabletQuery} {
      font-size: 38px;
    }
  }

  ul {
    list-style: none;
    padding: 0;
    transform: translateX(25%);
    margin-top: auto;

    @media ${tabletQuery} {
      transform: none;

      svg {
        max-width: 30px;
      }
    }
  }
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--white);
`;

const Trigger = styled.button`
  background: var(--black);
  border: 0px;
  color: var(--white);
`;

const Bottom = styled.div`
  align-items: center;
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;

  @media ${tabletQuery} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Copy = styled.div`
  padding: 0;
  margin: 0;

  @media ${tabletQuery} {
    margin-bottom: 1rem;
  }
`;

const SocialNav = styled.div`
  display: flex;
  gap: 0.5rem;
`;
