import requestMatches from "./src/Match.mjs";
import requestPosts from "./src/Posts.mjs";
import requestUsers from "./src/Users.mjs";

async function usersPostsCount() {
    const [matches, infos] = [await requestMatches(), []];
    for (const userId in matches) {
        const user = matches[userId];
        infos.push(
            `${user["username"]} napisał(a) ${user["posts"].length} postów`
        );
    }
    return infos;
}

async function duplicateTopicTitles() {
    const [posts, titles, duplicateTitles] = [await requestPosts(), [], []];

    for (let { title } of posts) {
        if (!titles.includes(title)) {
            titles.push(title);
        } else if (!duplicateTitles.includes(title)) {
            duplicateTitles.push(title);
        }
    }
    return duplicateTitles;
}

async function matchClosestUsers() {
    const [users, matches] = [await requestUsers(), {}];

    for (let {
        id,
        address: {
            geo: { lat, lng },
        },
    } of users) {
        let [curMinDist, minDistUser] = [Number.MAX_SAFE_INTEGER, {}];
        for (let {
            id: cmpId,
            name: cmpName,
            address: {
                geo: { lat: cmpLat, lng: cmpLng },
            },
        } of users) {
            // only compare distinct users
            if (id != cmpId) {
                const dist = distance(lat, lng, cmpLat, cmpLng);

                if (dist < curMinDist) {
                    // update minimum distance and closest user for current iteration
                    curMinDist = dist;
                    minDistUser = {
                        name: cmpId,
                        id: cmpName,
                        distance: dist,
                    };
                }
            }
        }
        matches[id] = minDistUser;
    }

    return matches;
}

function distance(lat1, lng1, lat2, lng2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lng2 - lng1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
