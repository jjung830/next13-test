const API_URL = process.env.NEXT_PUBLIC_DEV_WORDPRESS_API_URL;

export async function fetchAPI(route: string) {
  if (route.split("/")[route.split("/").length - 1] === "null") return [];
  let data = [];
  let error = "";

  try {
    const headers = { "Content-Type": "application/json" };

    const reqUrl = API_URL + route;

    const res = await fetch(reqUrl, {
      method: "GET",
      headers,
    });

    if (res.status !== 200) {
      throw new Error(`Invalid response: ${res.status} ${res.statusText}`);
    }

    data = await res.json();

    if (data.length === 0) {
      throw Error("No data");
    }
  } catch (e) {
    if (e instanceof Error) {
      error = e.message;
    } else {
      error = "An unknown error occurred.";
    }
  }

  if (error.length > 0) {
    console.log(error);
  }

  return data;
}
