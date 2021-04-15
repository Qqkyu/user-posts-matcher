import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

async function fetchPosts() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const json = await res.json();
    return json;
}

export default fetchPosts;
