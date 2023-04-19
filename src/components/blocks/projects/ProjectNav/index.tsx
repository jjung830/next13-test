import styled from "styled-components";
import NextArrow from "@components/icons/NextArrow";
import Link from "next/link";

const ProjectNav = ({ nextPost, nextPostExcerpt }: {
  nextPost: string,
  nextPostExcerpt: string,
}) => {
  return (
    <Container>
      <Inner>
        <Link href={`/project/${nextPost}`}>
          <>
            <span>
              Next Post <NextArrow />
            </span>
            {nextPostExcerpt && (
              <span className="excerpt">{nextPostExcerpt}</span>
            )}
          </>
        </Link>
      </Inner>
    </Container>
  );
};

export default ProjectNav;

const Container = styled.section`
  background: var(--white);
  display: flex;
  justify-content: center;
  padding: 56px var(--side-padding);
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1116px;

  @media screen and (max-width: 600px) {
    padding: 32px 24px;
  }

  a {
    justify-content: center;
    font-size: 36px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    text-align: left;

    svg {
      width: 30px;
    }

    span.excerpt {
      font-size: 16px;
      font-weight: 300;
      max-width: 318px;
      color: gray;
    }
  }
`;
