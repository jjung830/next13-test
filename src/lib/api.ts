import { Page } from "@/types/pages";

import cacheData from "memory-cache";
const API_URL = process.env.NEXT_PUBLIC_DEV_WORDPRESS_API_URL;

import { fetchAPI } from "@lib/fetch";

export async function getProjectBlocks(id: string) {
  const data = (await fetchAPI(`wp/v2/project/${id}`)) || null;
  return data.blocks ? data.blocks : data.blocksData;
}

export async function getCaseStudyBlocks(id: string) {
  const data = (await fetchAPI(`wp/v2/case-study/${id}`)) || null;
  return data.blocks ? data.blocks : data.blocksData;
}

export async function getMeta(id: string) {
  const data = (await fetchAPI(`madwell/v1/page-meta/${id}`)) || null;
  return data;
}

export async function getHeaderMenuItems() {
  const headers = { "Content-Type": "application/json", "User-Agent": "*" };
  const url = `${API_URL}madwell/v1/menu`;
  const headerData = cacheData.get(url);

  if (headerData) {
    return headerData;
  } else {
    const hours = 24;
    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    cacheData.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
}

export async function getFooterWidgets() {
  const headers = { "Content-Type": "application/json", "User-Agent": "*" };
  const url = `${API_URL}wp/v2/widgets?sidebar=footer`;
  const footerData = cacheData.get(url);

  if (footerData) {
    return footerData;
  } else {
    const hours = 24;
    const res = await fetch(url, {
      method: "GET",
      headers,
    });
    const data = await res.json();
    cacheData.put(url, data, hours * 1000 * 60 * 60);
    return data;
  }
}

export async function getWorkSlugs() {
  const data = (await fetchAPI(`madwell/v1/work-slugs`)) || null;
  return data.map((page: Page) => {
    return {
      params: {
        id: page.id,
        slug: page.slug,
      },
    };
  });
}

export async function getPageSlugs() {
  const data = await fetchAPI(`wp/v2/pages`);

  console.log("🚀 ~ file: api.js:74 ~ getPageSlugs ~ data:", data);

  return data.map((page: Page) => {
    return {
      params: {
        id: page.id,
        slug: page.slug,
      },
    };
  });
}

export async function getPageData(id: string) {
  const data = await fetchAPI(`wp/v2/pages/${id}`);
  return data;
}

export async function getProjectSlugs() {
  const data = (await fetchAPI(`madwell/v1/project-slugs`)) || null;
  return data.map((page: Page) => {
    return {
      params: {
        id: page.id,
        slug: page.slug,
      },
    };
  });
}

export async function getProjects(page: Page | number) {
  const data = await fetchAPI(`wp/v2/project?_embed&per_page=6&page=${page}`);

  return data.map((item: any) => {
    return item;
  });
}

export async function getCaseStudies(page: Page | number) {
  const data = await fetchAPI(
    `wp/v2/case-study?_embed&per_page=2&page=${page}`
  );

  return data.map((item: any) => {
    return item;
  });
}

export async function getTaxonomyTerms(name: string) {
  const data = await fetchAPI(`wp/v2/${name}`);

  return data.map((item: any) => {
    return {
      name: item.name,
      id: item.id,
    };
  });
}
