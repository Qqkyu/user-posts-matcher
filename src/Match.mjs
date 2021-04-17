import requestPosts from "./Posts.mjs";
import requestUsers from "./Users.mjs";

let matchesCache = {};

async function requestMatches() {
    if (Object.keys(matchesCache).length == 0) {
        const [users, posts] = [await requestUsers(), await requestPosts()];

        users.forEach(({ 
            id, 
            username,
            address: { 
                geo 
            } 
        }) => {
            matchesCache[id] = {
                username,
                geo,
            };
        });

        posts.forEach(({
            userId,
            ...props
        }) => {
            const user = matchesCache[userId];
            if (!user.hasOwnProperty("posts")) {
                user["posts"] = [];
            }
            user["posts"].push({ ...props });
        });
    }

    return matchesCache;
}

export default requestMatches;
