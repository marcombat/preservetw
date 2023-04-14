async function generateUrls() {
    const inputField = document.getElementById("input-field");
    const usernameOrUrl = inputField.value;

    // verifica se a entrada é uma URL ou um nome de usuário
    const parsedUrl = new URL(usernameOrUrl);
    let twitterProfileLink, username;
    if (parsedUrl.hostname === "twitter.com") {
        // a entrada é uma URL completa
        twitterProfileLink = usernameOrUrl;
        username = parsedUrl.pathname.split("/")[1];
    } else {
        // a entrada é um nome de usuário
        username = usernameOrUrl;
        twitterProfileLink = `https://twitter.com/${username}`;
    }

    // gera as URLs principais com base no nome de usuário
    const profileUrl = `https://twitter.com/${username}`;
    const withRepliesUrl = `https://twitter.com/${username}/with_replies`;
    const mediaUrl = `https://twitter.com/${username}/media`;
    const likesUrl = `https://twitter.com/${username}/likes`;
    const followingUrl = `https://twitter.com/${username}/following`;
    const followersUrl = `https://twitter.com/${username}/followers`;

    // lista de URLs a serem preservadas
    const urls = [profileUrl, withRepliesUrl, mediaUrl, likesUrl, followingUrl, followersUrl];

    // lista de sites de preservação
    const sites = {
        "Web Archive": "https://web.archive.org/save/",
        "Archive.today": "https://archive.today/?run=1&url=",
        "Archive.is": "http://archive.is/?url=",
        "Archive.fo": "https://archive.fo/?run=1&url=",
        "Perma.cc": "https://perma.cc/api/v1/archives/?url=",
        "WebCite": "http://www.webcitation.org/query.php?url="
    };

    // limpa a lista de URLs existente
    const urlsList = document.getElementById("urls-list");
    urlsList.innerHTML = "";

    // adiciona as URLs geradas à lista
    for (const url of urls) {
        const li = document.createElement("li");
        li.innerText = url;
        urlsList.appendChild(li);
    }

    // adiciona as URLs de preservação à lista
    for (const [site, baseUrl] of Object.entries(sites)) {
        const li = document.createElement("li");
        li.innerText = `${site}:`;
        urlsList.appendChild(li);
        for (const url of urls) {
            const preservedUrl = `${baseUrl}${url}`;
            const li = document.createElement("li");
            li.innerText = preservedUrl;
            urlsList.appendChild(li);
        }
        urlsList.appendChild(document.createElement("br"));
    }
}
