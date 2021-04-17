import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

let cache = [];

async function fetchUsers() {
    if (cache.length == 0) {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        cache = await res.json();
    }
    return cache;
}

export default fetchUsers;
