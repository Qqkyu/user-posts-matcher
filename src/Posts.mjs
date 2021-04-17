import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

let postsCache = [];

async function requestPosts() {
    if (postsCache.length == 0) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        postsCache = await res.json();
    }
    return postsCache;
}

export default requestPosts;
