import requestMatches from "./src/Match.mjs";
import requestPosts from "./src/Posts.mjs";

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
    console.log(duplicateTitles);
    return duplicateTitles;
}

console.log(await duplicateTopicTitles());
