/* ---------------------------------
Utils
--------------------------------- */

/**
 * Creates bookmark descriptions out of URL slugs (WIP)
 * (Imported from Bookman)
 */

import { URL_FILTER } from "@/constants";

export function slugToDesc(url) {
  let desc;

  if (url.charAt(url.length - 1) === "/") {
    url = url.substr(0, url.length - 1);
  }

  desc = url
    .replace(URL_FILTER, "")
    .split("/")
    .pop()
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
    .join(" ")
    .replace(".html", "")
    .replace("#", "")
    .replace(/[\d]*/, "");

  return desc || url;
}

export function extractDomains(s) {
  return s && s.replace(URL_FILTER, "").split("/").slice(0, 1).toString();
}
