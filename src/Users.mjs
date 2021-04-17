import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

let usersCache = [];

async function requestUsers() {
    if (usersCache.length == 0) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        usersCache = await res.json();
    }
    return usersCache;
}

export default requestUsers;
