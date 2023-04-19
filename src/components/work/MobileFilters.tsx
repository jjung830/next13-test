import { useState, useEffect } from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import { tabletQuery, mobileQuery } from "@styles/mediaQueries";

import Search from "@components/icons/Search";
import ChevronDown from "@components/icons/ChevronDown";

const MobileFilters = ({
  setShowCapes,
  setShowIndustries,
  showCapes,
  showIndustries,
  capesFilters,
  industryFilters,
  clientFilters,
  setIndustryFilters,
  setCapesFilters,
  setClientFilters,
  setCurrentRenderedPages,
  fetchSearchResults,
  clientTerms,
  capabilityTerms,
  industryTerms,
  renderInitialState,
  searchResultsCount,
}: {
  setShowCapes: Function,
  setShowIndustries: Function,
  showCapes: boolean,
  showIndustries: boolean,
  capesFilters: string[],
  industryFilters: string[],
  clientFilters: string,
  setIndustryFilters: Function,
  setCapesFilters: Function,
  setClientFilters: Function,
  setCurrentRenderedPages: Function,
  fetchSearchResults: Function,
  clientTerms: {
    name: string,
  }[],
  capabilityTerms: {
    name: string,
  }[],
  industryTerms: {
    name: string,
  }[],
  renderInitialState: Function,
  searchResultsCount: number,
}) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [clientsOpen, setClientsOpen] = useState<boolean>(false);
  const [resultsCount, setResultsCount] = useState<number>(0);

  const addFilterTerm = (term: string, termType: string) => {
    if (termType === "capes") {
      if (capesFilters.indexOf(term) === -1) {
        setCapesFilters([...capesFilters, term]);
      } else {
        // remove term from array if it already exists
        const filteredTerms = capesFilters.filter((termId) => {
          termId !== term;
        });
        setCurrentRenderedPages([]);
        setCapesFilters(filteredTerms);
      }
    } else if (termType === "industry") {
      if (industryFilters.indexOf(term) === -1) {
        setIndustryFilters([...industryFilters, term]);
      } else {
        const filteredTerms = industryFilters.filter((termId) => {
          termId !== term;
        });
        setCurrentRenderedPages([]);
        setIndustryFilters(filteredTerms);
      }
    } else if (termType === "client") {
      if (clientFilters !== term) {
        setClientFilters(term);
      } else {
        setClientFilters("");
      }
    }
  };

  const closeFilters = () => {
    setShowIndustries(false);
    setShowCapes(false);
  };

  const clientOptions = clientTerms.map((term) => {
    const slug = term.name.split(" ").join("-").toLowerCase();

    return {
      value: slug,
      label: term.name,
    };
  });

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        <ChevronDown />
      </components.DropdownIndicator>
    );
  };

  useEffect(() => {
    setResultsCount(searchResultsCount);
  }, [searchResultsCount]);

  return (
    <Filters>
      <div className="filters-container">
        <div className="triggers">
          <button
            className="filter-button"
            onClick={() => {
              closeFilters();
              setShowCapes(!showCapes);
            }}
            aria-expanded={showCapes}
          >
            Capabilities <ChevronDown />
          </button>

          <button
            className="filter-button"
            onClick={() => {
              closeFilters();
              setShowIndustries(!showIndustries);
            }}
            aria-expanded={showIndustries}
          >
            Industry <ChevronDown />
          </button>

          <button
            className="filter-button"
            onClick={() => {
              setClientsOpen(true);
            }}
          >
            Clients
          </button>
        </div>

        <div className="search">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="searchButton"
            aria-label="Toggle Search"
          >
            <Search />
          </button>
        </div>
      </div>

      {(showCapes || showIndustries) && (
        <div className="terms">
          <div className="filters-inner-container">
            {showCapes && (
              <CapabilityTerms>
                <div className="filter-header">
                  <h3>Capabilities</h3>
                </div>

                <div className="filter-terms">
                  {capabilityTerms?.map((term) => {
                    const slug = term.name.split(" ").join("-").toLowerCase();

                    return (
                      <Term
                        key={term.name}
                        applied={
                          capesFilters.indexOf(slug) !== -1 ? true : false
                        }
                        onClick={() => {
                          addFilterTerm(slug, "capes");
                        }}
                      >
                        {term.name}
                      </Term>
                    );
                  })}
                </div>

                <div className="filter-footer">
                  <button
                    className="cancel"
                    onClick={() => {
                      setShowCapes(false);
                      setCapesFilters([]);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="apply-filters"
                    onClick={() => setShowCapes(false)}
                  >
                    APPLY
                  </button>
                </div>
              </CapabilityTerms>
            )}

            {showIndustries && (
              <IndustryTerms>
                <div className="filter-header">
                  <h3>Industries</h3>
                </div>

                <div className="filter-terms">
                  {industryTerms?.map((term) => {
                    const slug = term.name.split(" ").join("-").toLowerCase();
                    return (
                      <Term
                        key={term.name}
                        applied={
                          industryFilters.indexOf(slug) !== -1 ? true : false
                        }
                        onClick={() => {
                          addFilterTerm(slug, "industry");
                        }}
                      >
                        {term.name}
                      </Term>
                    );
                  })}
                </div>

                <div className="filter-footer">
                  <button
                    className="cancel"
                    onClick={() => {
                      setShowIndustries(false);
                      setIndustryFilters([]);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => setShowIndustries(false)}
                    className="apply-filters"
                  >
                    APPLY
                  </button>
                </div>
              </IndustryTerms>
            )}
          </div>
        </div>
      )}

      {clientsOpen && (
        <ClientSelector>
          <div className="terms">
            <div className="filters-inner-container">
              <div className="filter-header">
                <h3>Clients</h3>
              </div>

              <Select
                instanceId="client-selector"
                options={clientOptions}
                placeholder="All Clients"
                components={{ DropdownIndicator }}
                onChange={(value: any) => addFilterTerm(value.value, "client")}
                className="client-selector"
                styles={clientSelectStyles}
                defaultMenuIsOpen
              />

              <div className="filter-footer">
                <button
                  className="cancel"
                  onClick={() => {
                    setClientsOpen(false);
                    setClientFilters("");
                  }}
                >
                  Cancel
                </button>

                <button
                  className="apply-filters"
                  onClick={() => setClientsOpen(false)}
                >
                  SELECT
                </button>
              </div>
            </div>
          </div>
        </ClientSelector>
      )}

      {searchOpen && (
        <SearchContainer>
          <div className="terms">
            <div className="filter-header">
              <h3>Search</h3>
            </div>

            <div className="search">
              <form
                className="search-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  fetchSearchResults(searchVal);
                }}
              >
                <input
                  type="search"
                  placeholder="Search by client or capability"
                  className={searchResultsCount ? "" : "error"}
                  onChange={(e) => {
                    if (e.target.value.length > 2) {
                      setSearchVal(e.target.value);
                      fetchSearchResults(e.target.value);
                    } else {
                      setSearchVal("");
                      renderInitialState();
                      setResultsCount(0);
                    }
                  }}
                />

                <button type="submit" className="icon" aria-label="Search">
                  <Search />
                </button>
              </form>

              {resultsCount > 0 ? (
                <div className="results-count">
                  <p>
                    {resultsCount} Results for {searchVal}
                  </p>
                </div>
              ) : searchVal ? (
                <p>No results for {searchVal}</p>
              ) : (
                ""
              )}
            </div>

            <div className="filter-footer">
              <button
                className="cancel"
                onClick={() => {
                  setSearchOpen(false);
                  renderInitialState();
                  setSearchVal("");
                  setResultsCount(0);
                }}
              >
                Cancel
              </button>

              <button
                disabled={searchResultsCount ? false : true}
                onClick={() => {
                  setSearchOpen(false);
                  fetchSearchResults(searchVal);

                  if (searchVal && searchVal.length > 0) {
                    renderInitialState();
                  }
                }}
                className="apply-filters"
              >
                APPLY
              </button>
            </div>
          </div>
        </SearchContainer>
      )}
    </Filters>
  );
};

export default MobileFilters;

const Filters = styled.div`
  display: none;

  @media ${mobileQuery} {
    display: block;
  }

  .triggers {
    display: flex;
    gap: 2rem;

    @media ${tabletQuery} {
      gap: 1rem;
    }
  }

  .terms {
    background: var(--lightgray);
    left: 0;
    width: 100%;
    position: fixed;
    top: -114.5px;
    height: calc(100% + 114.5px);
    z-index: 3;
    padding-top: 114.5px;
  }

  .filters-container {
    display: flex;
    justify-content: space-between;
    padding: 0 var(--side-padding);
  }

  .filters-inner-container {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .filter-header {
    background: var(--black);
    color: var(--white);
    width: 100%;
    overflow: auto;
    text-align: center;

    h3 {
      font-size: 38px;
      line-height: 42px;
      font-weight: 400;
    }
  }

  .filter-terms {
    padding: var(--side-padding);
  }

  .filter-footer {
    padding: var(--side-padding);
    margin-top: auto;
    display: flex;
    justify-content: center;

    button {
      border: 0px;
      font-family: var(--bodyFont);
      font-size: 18px;
      font-weight: 500;
    }

    .cancel {
      max-width: 154px;
      width: 100%;
    }

    .apply-filters {
      border-radius: 28px;
      color: var(--white);
      background: var(--silver);
      padding: 16px 24px;
      max-width: 154px;
      width: 100%;
    }
  }

  .filter-button {
    background: transparent;
    font-size: 24px;
    border: 0px;
    padding: 0;
    margin: 0;
    color: #999;
    font-family: var(--bodyFont);
    font-weight: 300;

    @media ${tabletQuery} {
      font-size: 18px;

      svg {
        display: none;
      }
    }

    svg {
      transition: 0.4s transform;
    }

    &[aria-expanded="true"] {
      color: var(--white);

      svg {
        transform: rotate(180deg);
      }
    }
  }

  .searchButton {
    background: transparent;
    color: #fff;
    border: 0px;
  }
`;

const ClientSelector = styled.div`
  .terms {
    background: var(--black);
  }

  .filter-footer {
    background: var(--warm-grey);

    .cancel {
      background: var(--warm-grey);
    }

    .apply-filters {
      background: var(--black);
    }
  }
`;

const SearchContainer = styled.div`
  .terms {
    display: flex;
    flex-direction: column;
    background: var(--warm-grey);
  }

  .search {
    height: 34px;
    padding: 3rem var(--side-padding);
    position: relative;

    p {
      color: var(--black);
    }

    .searchButton {
      background: transparent;
      border: 0px;
      color: var(--white);
      position: absolute;
      top: 3px;
      right: 0;
      padding: 0;
    }

    .icon {
      border: 0px;
      background: transparent;
      position: absolute;
      right: var(--side-padding);
      margin-top: 2px;

      svg {
        color: var(--black);
      }
    }

    input {
      background: transparent;
      color: var(--black);
      border: 0;
      border-bottom: 1px solid var(--black);
      font-family: var(--bodyFont);
      font-size: 18px;
      line-height: 24px;
      height: 34px;
      width: 100%;
      padding: 0 2rem 0 0;

      &.error {
        border-bottom: 3px solid red;
      }
    }
  }

  .filter-footer {
    margin-top: auto;

    .cancel {
      background: transparent;
    }

    .apply-filters {
      background: var(--black);

      &:disabled {
        background: var(--silver);
      }
    }
  }
`;

const clientSelectStyles: any = {
  control: (base: {}) => ({
    ...base,
    background: "transparent",
    fontSize: "24px",
    lineHeight: "24px",
    fontWeight: "300",
    fontFamily: "var(--bodyFont)",
    border: "none",
    boxShadow: "none",
    cursor: "pointer",
    padding: "0 var(--side-padding)",
  }),
  placeholder: (base: {}) => ({
    ...base,
    color: "#fff",
  }),
  valueContainer: (base: {}) => ({
    ...base,
    padding: 0,
  }),
  singleValue: (base: {}) => ({
    ...base,
    color: "#fff",
    padding: 0,
  }),
  indicatorSeparator: (base: {}) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base: {}, state: {
    selectProps: {
      menuIsOpen: boolean;
    };
  }) => ({
    ...base,
    color: "#fff",
    padding: "0 4px",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    transition: "0.4s all",

    "&:hover": {
      color: state.selectProps.menuIsOpen ? "#fff" : "#999",
    },
  }),
  menuIsOpen: (base: {}) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base: {}) => ({
    ...base,
    background: "var(--black)",
    padding: "0 var(--side-padding)",
  }),
  menuList: (base: {}) => ({
    ...base,
    maxHeight: "calc(100vh - 287px)",
  }),
  option: (base: {}) => ({
    ...base,
    background: "transparent",
    color: "#fff",
    fontWeight: 300,
    fontSize: "16px",
    "&:hover": {
      background: "transparent",
      color: "#fff",
    },
    "&:focus": {
      background: "transparent",
    },
  }),
};

const CapabilityTerms = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IndustryTerms = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Term = styled.button`
  align-items: center;
  border: 1px solid var(--black);
  height: 48px;
  display: inline-flex;
  font-family: var(--bodyFont);
  background: transparent;
  font-size: 18px;
  padding: 0 1rem;
  border-radius: 24px;
  margin: 5px 5px 5px 0;

  ${(props: {
    applied: boolean;
  }) =>
    props.applied &&
    `
    background-color: var(--black);
    color: var(--white);
  `}
`;
