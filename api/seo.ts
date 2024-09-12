import { baseURL } from "./http";
import { useFetch } from "nuxt/app";

interface SEOInfo {
  match_url: string;
}

export async function fetchSEOInfo(params: SEOInfo) {
  return await useFetch<any>(`${baseURL}/api/seos/info`, {
    method: "get",
    query: {
      ...params,
    },
  });
}
