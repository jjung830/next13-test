"use client";

import React from "react";
import { fetchAPI } from "@lib/fetch";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Layout from "@components/layout/Layout";
import Spinner from "@components/parts/Spinner";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

import {
  getPageSlugs,
  getPageData,
  getHeaderMenuItems,
  getFooterWidgets,
  getMeta,
  getProjects,
  getCaseStudies,
  getTaxonomyTerms,
} from "@lib/api";

import { tabletQuery } from "@styles/mediaQueries";
import ChevronDownButton from "@components/icons/ChevronDownButton";
import Placeholder from "/public/images/432x242.png";
import FiltersAndSearch from "@components/work/filters";
import MobileFilters from "@components/work/MobileFilters";

async function getData() {
  const paths = await getPageSlugs();
  const industryTerms = await getTaxonomyTerms("industry");
  const clientTerms = await getTaxonomyTerms("client");
  const capabilityTerms = await getTaxonomyTerms("capability");
  const filtered = paths.filter(
    (path: {
      params: {
        slug: string;
        id: number;
      };
    }) => path.params.slug === "work"
  );
  const id = filtered.length > 0 && filtered[0].params.id;
  const data = (await getPageData(id)) || null;
  const headMeta = (await getMeta(id)) || null;
  const headerMenuItems = await getHeaderMenuItems();
  const footerWidgets = (await getFooterWidgets()) || null;
  const projects = await getProjects(1);
  const caseStudies = await getCaseStudies(1);

  return {
    props: {
      headMeta,
      data,
      headerMenuItems,
      footerWidgets,
      projects,
      caseStudies,
      industryTerms,
      clientTerms,
      capabilityTerms,
    },
  };
}

interface PageProps {
  props: {
      headMeta: any;
      data: any;
      headerMenuItems: [];
      footerWidgets: [];
      projects: [];
      caseStudies: [];
      industryTerms: [];
      clientTerms: [];
      capabilityTerms: [];
  }
}

export default async function Work() {
  const [pageProps, setPageProps] = useState<PageProps | null>({
    props: {
        headMeta: {},
        data: {},
        headerMenuItems: [],
        footerWidgets: [],
        projects: [],
        caseStudies: [],
        industryTerms: [],
        clientTerms: [],
        capabilityTerms: []
    }
  });

  type GridItem = {
    id: number;
    title: {
      rendered: string;
    };
    type: string;
    post_type: string;
    _embedded: any;
    image: string;
    link: string;
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSearchPage, setCurrentSearchPage] = useState<number>(1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [currentRenderedPages, setCurrentRenderedPages] = useState<
    GridItem[][]
  >([]);
  const [showCapes, setShowCapes] = useState<boolean>(false);
  const [showIndustries, setShowIndustries] = useState<boolean>(false);
  const [capesFilters, setCapesFilters] = useState<[]>([]);
  const [industryFilters, setIndustryFilters] = useState<[]>([]);
  const [clientFilters, setClientFilters] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [currentSearchParams, setCurrentSearchParams] = useState<string>("");
  const [searchResultsCount, setSearchResultsCount] = useState<number>(0);

  useEffect(() => {    
    async function fetchData() {
      const data: PageProps = await getData();
      setPageProps(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (
      capesFilters.length > 0 ||
      industryFilters.length > 0 ||
      clientFilters.length > 0
    ) {
      setSearchActive(true);
      fetchResults();
    } else {
      renderInitialState();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capesFilters, industryFilters, clientFilters]);

  useEffect(() => {
    // initialize AOS
    AOS.init();

    // render page 1 on load
    const firstPage: GridItem[] = projects.concat(caseStudies);

    setCurrentRenderedPages([firstPage]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    headMeta,
    data,
    headerMenuItems,
    footerWidgets,
    projects,
    caseStudies,
    industryTerms,
    clientTerms,
    capabilityTerms,
  } = pageProps!.props;

  if (!pageProps) {
    return <Spinner />;
  }
  console.log("pageProps", pageProps);
  const { title } = data;

  const addPage = async (page: number) => {
    setCurrentPage(page);
    setLoading(true);

    let nextPageProjectData = await fetchAPI(
      `wp/v2/project?_embed&per_page=6&page=${page}`
    );
    let nextPageCSData = await fetchAPI(
      `wp/v2/case-study?_embed&per_page=2&page=${page}`
    );

    const newPageRaw: [] = nextPageProjectData.concat(nextPageCSData);
    const newPage: GridItem[] = newPageRaw.filter(
      (item) => typeof item !== "string"
    );

    if (newPage.length < 6) {
      // disable the more projects button if there are less than 6 projects returned
      setDisabled(true);
    }

    setCurrentRenderedPages(currentRenderedPages.concat([newPage]));
    setLoading(false);
  };

  const mapSearchResults = (results: {
    project: GridItem[];
    case_study: GridItem[];
  }) => {
    let projectsToRender: any[] = [];
    let caseStudiesToRender: any[] = [];
    let output: GridItem[] = [];

    if (results.project) {
      projectsToRender = Object.entries(results.project);

      projectsToRender.forEach((project) => {
        project.forEach((i: GridItem) => {
          output.push(i);
        });
      });
    }

    if (results.case_study) {
      caseStudiesToRender = Object.entries(results.case_study);

      caseStudiesToRender.forEach((caseStudy) => {
        caseStudy.forEach((i: GridItem) => {
          output.push(i);
        });
      });
    }

    return output;
  };

  const addSearchPage = async (page: number) => {
    setCurrentSearchPage(page);
    setLoading(true);

    await fetchAPI(
      `madwell/v1/worksearch?${currentSearchParams}&page=${page}`
    ).then((res) => {
      setDisabled(false);

      const newPageRaw = mapSearchResults(res);
      const newPage: GridItem[] = newPageRaw.filter(
        (item) => typeof item !== "string"
      );

      setCurrentRenderedPages(currentRenderedPages.concat([newPage]));

      if (res.status !== 200) {
        setDisabled(true);
      }

      setLoading(false);
    });
  };

  const fetchResults = async () => {
    setCurrentRenderedPages([]);
    setDisabled(false);
    setLoading(true);

    const capesCSL: string | boolean =
      capesFilters.length > 0 && "capability=" + capesFilters.join(",");
    const industryCSL: string | boolean =
      industryFilters.length > 0 && "industry=" + industryFilters.join(",");
    const clientsCSL: string | boolean =
      clientFilters.length > 0 && "client=" + clientFilters;

    const allFilters: (string | boolean)[] = [
      capesCSL,
      industryCSL,
      clientsCSL,
    ];
    const appliedFilters = allFilters.filter((filter) => {
      if (typeof filter === "string") {
        return filter.length > 0;
      }
    });
    const filterString: string = appliedFilters.join("&");
    setCurrentSearchParams(filterString);

    await fetchAPI(`madwell/v1/worksearch?${filterString}`).then(
      (res: { project: GridItem[]; case_study: GridItem[] }) => {
        const page1Results = mapSearchResults(res);

        const filteredPage1Results = page1Results.filter(
          (item) => typeof item !== "string"
        );

        setCurrentRenderedPages([filteredPage1Results]);
      }
    );

    setLoading(false);
  };

  const fetchSearchResults = async (searchVal: string) => {
    setCurrentRenderedPages([]);
    setSearchActive(true);
    setCurrentSearchParams(`s=${searchVal}`);
    setLoading(true);

    let results = await fetchAPI(`madwell/v1/worksearch?s=${searchVal}`);

    const page1ResultsRaw = mapSearchResults(results);
    const page1Results = page1ResultsRaw.filter(
      (item) => typeof item !== "string"
    );

    setCurrentRenderedPages([page1Results]);
    setSearchResultsCount(page1Results.length);

    setLoading(false);
  };

  const renderInitialState = () => {
    setSearchActive(false);
    const firstPage = [projects.concat(caseStudies)];
    setCurrentRenderedPages(firstPage);
    setCurrentPage(1);
    setCurrentSearchPage(1);
    setDisabled(false);
  };

  return (
    <>
      <Layout
        headMeta={headMeta}
        headerContent={headerMenuItems}
        footerContent={footerWidgets}
      >
        <Container>
          <h1>{title?.rendered}</h1>
        </Container>

        <FiltersAndSearch
          setShowCapes={setShowCapes}
          setShowIndustries={setShowIndustries}
          capesFilters={capesFilters}
          industryFilters={industryFilters}
          setIndustryFilters={setIndustryFilters}
          setCapesFilters={setCapesFilters}
          setClientFilters={setClientFilters}
          setCurrentRenderedPages={setCurrentRenderedPages}
          fetchSearchResults={fetchSearchResults}
          clientTerms={clientTerms}
          capabilityTerms={capabilityTerms}
          industryTerms={industryTerms}
          showCapes={showCapes}
          showIndustries={showIndustries}
          renderInitialState={renderInitialState}
        />

        <MobileFilters
          setShowCapes={setShowCapes}
          setShowIndustries={setShowIndustries}
          capesFilters={capesFilters}
          industryFilters={industryFilters}
          clientFilters={clientFilters}
          setIndustryFilters={setIndustryFilters}
          setCapesFilters={setCapesFilters}
          setClientFilters={setClientFilters}
          setCurrentRenderedPages={setCurrentRenderedPages}
          fetchSearchResults={fetchSearchResults}
          clientTerms={clientTerms}
          capabilityTerms={capabilityTerms}
          industryTerms={industryTerms}
          showCapes={showCapes}
          showIndustries={showIndustries}
          renderInitialState={renderInitialState}
          searchResultsCount={searchResultsCount}
        />

        <Container>
          <Projects>
            <>
              {currentRenderedPages &&
                currentRenderedPages.map((page, i) => (
                  <div className="page" key={i}>
                    {page.map((item: GridItem, j) => {
                      const image = item._embedded?.["wp:featuredmedia"]
                        ? item._embedded["wp:featuredmedia"][0].media_details
                            ?.sizes.medium.source_url
                        : item.image;
                      const title: any = item.title?.rendered
                        ? item.title.rendered
                        : item.title;
                      const type = item.type ? item.type : item.post_type;
                      const terms = item._embedded?.["wp:term"]?.filter(
                        (term: string) => term.length > 0
                      );
                      const getClientNames = () => {
                        let clients: string[] = [];

                        terms?.forEach((term: []) => {
                          term.forEach(
                            (prop: { taxonomy: string; name: string }) => {
                              if (prop.taxonomy === "client") {
                                clients.push(prop.name);
                              }
                            }
                          );
                        });

                        if (clients.length > 0) {
                          return clients.map((client) => (
                            <span key={client} className="client">
                              {client}
                            </span>
                          ));
                        }
                      };

                      const getLink = () => {
                        const url: URL = new URL(item.link);
                        return url.pathname;
                      };

                      const currentArticle: any = page[j];
                      const nextArticle: any = page[j + 1];
                      let lastProject: boolean = false;

                      if (nextArticle) {
                        if (
                          currentArticle.type === "project" &&
                          nextArticle.type === "case-study"
                        ) {
                          lastProject = true;
                        }
                      }

                      return (
                        <React.Fragment key={item.id}>
                          <Project key={item.id} type={type} data-aos="fadeIn">
                            <Link href={getLink()}>
                              <ImageContainer className="image-container">
                                {image ? (
                                  <Image
                                    alt={title ? title : ""}
                                    src={image}
                                    fill
                                  />
                                ) : (
                                  <Image
                                    src={Placeholder.src}
                                    alt="Placeholder"
                                    fill
                                  />
                                )}
                              </ImageContainer>

                              {getClientNames()}

                              {title && <h2>{title}</h2>}
                            </Link>
                          </Project>
                          {lastProject && <hr />}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ))}
            </>

            {loading && (
              <>
                <Spinner />
              </>
            )}
          </Projects>

          {!loading && (
            <MoreButton
              disabled={disabled}
              onClick={() => {
                if (!searchActive) {
                  addPage(currentPage + 1);
                } else {
                  addSearchPage(currentSearchPage + 1);
                }
              }}
            >
              More Projects
              <ChevronDownButton />
            </MoreButton>
          )}
        </Container>
      </Layout>
    </>
  );
}

const Container = styled.section`
  color: var(--white);
  max-width: 1440px;
  padding: 64px var(--side-padding);
  width: 100%;
  margin: 0 auto;

  @media ${tabletQuery} {
    padding: 0 var(--side-padding);
  }

  h1 {
    font-size: 121px;
    line-height: 128px;
    font-weight: 300;
    margin: 0;

    @media ${tabletQuery} {
      font-size: 67px;
      line-height: 72px;
    }
  }
`;

const Projects = styled.div`
  color: var(--white);

  .page {
    color: var(--white);
    display: grid;
    grid-gap: 3rem 1rem;
    grid-template-columns: repeat(12, 1fr);
    margin: 4rem 0;
    width: 100%;

    @media ${tabletQuery} {
      margin: 2rem 0 4rem;
    }
  }

  hr {
    grid-column: span 12;
    height: 0;
    width: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 56%;
  overflow: hidden;

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    position: absolute;
  }
`;

const Project: any = styled.div`
  color: var(--white);
  grid-column: span 4;

  @media ${tabletQuery} {
    grid-column: span 12;
  }

  ${(props: { type: string }) =>
    props.type === "case-study" &&
    `
    grid-column: span 6;

    .image-container {
      padding-bottom: 100%;

      img {
        border-radius: 8px;
        height: 100%;
      }
    }
  `}

  .image-container {
    margin-bottom: 1rem;
  }

  h2 {
    font-weight: 300;
    font-size: 24px;
    line-height: 32px;
    margin: 0;
  }

  .client {
    display: block;
    font-size: 16px;
    font-weight: 300;
    padding-bottom: 0.5rem;
  }
`;

const MoreButton = styled.button`
  background: transparent;
  color: var(--white);
  border: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 54px;
  font-weight: 300;
  margin: 0 auto;

  @media ${tabletQuery} {
    font-size: 38px;
    line-height: 42px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-top: 1rem;
  }
`;
