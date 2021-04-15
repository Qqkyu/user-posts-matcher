import { createRequire } from "module";

const require = createRequire(import.meta.url);
const fetch = require("node-fetch");

async function fetchUsers() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const json = await res.json();
    return json;
}

export default fetchUsers;
