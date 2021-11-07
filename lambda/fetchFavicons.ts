/* ---------------------------------
fetchFavicons
--------------------------------- */

import { Handler } from "@netlify/functions";
const axios = require("axios").default;

const handler: Handler = async (event, context) => {
  const req = await axios.get("https://jsonplaceholder.typicode.com/todos/1");

  return {
    statusCode: 200,
    body: JSON.stringify(req.data),
  };
};

export { handler };
