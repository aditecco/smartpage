/* ---------------------------------
fetchFavicons
--------------------------------- */

// https://nodejs.org/api/buffer.html#buffer
import { Buffer } from "buffer";
import { Handler } from "@netlify/functions";
import axios from "axios";

const API_ENDPOINT = "https://www.google.com/s2/favicons";

// eslint-disable-next-line no-unused-vars
const handler: Handler = async (event, context) => {
  const { queryStringParameters } = event;
  const { domain, size } = queryStringParameters ?? {};
  const reqURL = `${API_ENDPOINT}?sz=${size}&domain_url=${domain}/`;

  try {
    const res = await axios.get(reqURL, {
      responseType: "arraybuffer",
    });

    const body = `data:image/png;base64, ${Buffer.from(
      res.data,
      "binary"
    ).toString("base64")}`;

    return {
      statusCode: res.status,
      body,
    };
  } catch (err) {
    return {
      // TODO proper error handling w/ axios types
      statusCode: 400,
      body: JSON.stringify(err),
    };
  }
};

export { handler };
