import { useState } from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import { tabletQuery, mobileQuery } from "@styles/mediaQueries";

import Search from "@components/icons/Search";
import ChevronDown from "@components/icons/ChevronDown";

const FiltersAndSearch = ({
  setShowCapes,
  setShowIndustries,
  showCapes,
  showIndustries,
  capesFilters,
  industryFilters,
  setIndustryFilters,
  setCapesFilters,
  setClientFilters,
  setCurrentRenderedPages,
  fetchSearchResults,
  clientTerms,
  capabilityTerms,
  industryTerms,
  renderInitialState,
}: {
  setShowCapes: Function,
  setShowIndustries: Function,
  showCapes: boolean,
  showIndustries: boolean,
  capesFilters: string[],
  industryFilters: string[],
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
}) => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

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
      setClientFilters(term);
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
          <Select
            instanceId="client-selector"
            options={clientOptions}
            placeholder="Clients"
            components={{ DropdownIndicator }}
            onChange={(value: any) => addFilterTerm(value.value, "client")}
            className="client-selector"
            styles={clientSelectStyles}
          />
        </div>

        <div className="search">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchSearchResults(searchVal);
            }}
          >
            {searchOpen && (
              <input
                type="search"
                placeholder="Search by client or capability"
                onChange={(e) => {
                  setSearchVal(e.target.value);
                  if (e.target.value.length === 0) {
                    renderInitialState();
                  }
                }}
              />
            )}
          </form>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="searchButton"
            aria-label="toggle-search"
          >
            <Search />
          </button>
        </div>
      </div>

      {(showCapes || showIndustries) && (
        <div className="terms">
          <div className="filters-container">
            {showCapes && (
              <CapabilityTerms>
                {capabilityTerms?.map((term) => {
                  const slug = term.name.split(" ").join("-").toLowerCase();

                  return (
                    <Term
                      key={term.name}
                      applied={capesFilters.indexOf(slug) !== -1 ? true : false}
                      onClick={() => {
                        addFilterTerm(slug, "capes");
                      }}
                    >
                      {term.name}
                    </Term>
                  );
                })}
              </CapabilityTerms>
            )}

            {showIndustries && (
              <IndustryTerms>
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
              </IndustryTerms>
            )}
          </div>
        </div>
      )}
    </Filters>
  );
};

export default FiltersAndSearch;

const Filters = styled.div`
  @media ${mobileQuery} {
    display: none;
  }

  .triggers {
    display: flex;
    gap: 2rem;

    @media ${tabletQuery} {
      gap: 1rem;
    }
  }

  .terms {
    background: var(--white);
    left: 0;
    width: 100%;
    z-index: 1;
    padding: 1rem 0;
    margin-top: 1rem;
  }

  .filters-container {
    max-width: 1440px;
    margin: auto;
    padding: 0 var(--side-padding);
    display: flex;
    justify-content: space-between;
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

  .search {
    height: 34px;
    position: relative;

    .searchButton {
      background: transparent;
      border: 0px;
      color: var(--white);
      position: absolute;
      top: 3px;
      right: 0;
      padding: 0;
    }

    input {
      background: var(--black);
      color: #999;
      border: 0;
      border-bottom: 1px solid #999;
      font-family: var(--bodyFont);
      font-size: 18px;
      line-height: 24px;
      height: 34px;
      width: 300px;
      max-width: 100%;
      padding: 0 2rem 0 1rem;
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

    "@media only screen and (max-width: 1023px)": {
      fontSize: "18px",
    },
  }),
  placeholder: (base: {}, state: {
    selectProps: { menuIsOpen: boolean; },
    isSelected: boolean
  }) => ({
    ...base,
    color: state.selectProps.menuIsOpen || state.isSelected ? "#fff" : "#999",
  }),
  valueContainer: (base: {}) => ({
    ...base,
    padding: 0,
  }),
  singleValue: (base: {}, state: {
    selectProps: { menuIsOpen: boolean; },
  }) => ({
    ...base,
    color: state.selectProps.menuIsOpen ? "#fff" : "#999",
    padding: 0,
  }),
  indicatorSeparator: (base: {}) => ({
    ...base,
    display: "none",
  }),
  dropdownIndicator: (base: {}, state: {
    selectProps: { menuIsOpen: boolean; },
  }) => ({
    ...base,
    color: state.selectProps.menuIsOpen ? "#fff" : "#999",
    padding: "0 4px",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    transition: "0.4s all",

    "&:hover": {
      color: state.selectProps.menuIsOpen ? "#fff" : "#999",
    },

    "@media only screen and (max-width: 1023px)": {
      display: "none",
    },
  }),
  menuIsOpen: (base: {}) => ({
    ...base,
    color: "#fff",
  }),
  menu: (base: {}) => ({
    ...base,
    background: "var(--black)",
    padding: 0,
  }),
  option: (base: {}) => ({
    ...base,
    background: "transparent",
    color: "#999",
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

const CapabilityTerms = styled.div``;

const IndustryTerms = styled.div``;

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
