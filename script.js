const form = document.getElementById("form");
const urlsSection = document.getElementById("urls-section");
const preservedUrlsSection = document.getElementById("preserved-urls-section");
const urlsList = document.getElementById("urls");
const preservedUrlsDiv = document.getElementById("preserved-urls");

function generateUrls() {
    const input = document.getElementById("twitter-url").value;
    const parsedUrl = new URL(input);
    let username, twitterProfileLink;

    if (parsedUrl.protocol && parsedUrl.hostname && parsedUrl.pathname.startsWith("/")) {
        // a entrada é uma URL completa
        twitterProfileLink = input;
        username = parsedUrl.pathname.split("/")[1];
    } else {
        // a entrada é um nome de usuário
        username = input;
        twitterProfileLink = `https://twitter.com/${username}`;
    }

    const profileUrl = `https://twitter.com/${username}`;
    const withRepliesUrl = `https://twitter.com/${username}/with_replies`;
    const mediaUrl = `https://twitter.com/${username}/media`;
    const likesUrl = `https://twitter.com/${username}/likes`;
    const followingUrl = `https://twitter.com/${username}/following`;
    const followersUrl = `https://twitter.com/${username}/followers`;

    const urls = [profileUrl, withRepliesUrl, mediaUrl, likesUrl, followingUrl, followersUrl];
    const sites = {
        "Web Archive": "https://web.archive.org/save/",
        "Archive.today": "https://archive.today/?run=1&url="
    };

    urlsList.innerHTML = "";
    urls.forEach(url => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.textContent = url;
        li.appendChild(a);
        urlsList.appendChild(li);
    });

    preservedUrlsDiv.innerHTML = "";
    for (const [site, baseUrl] of Object.entries(sites)) {
        const h3 = document.createElement("h3");
        h3.textContent = site;
        preservedUrlsDiv.appendChild(h3);
        urls.forEach(url => {
            const a = document.createElement("a");
            a.href = baseUrl + url;
            a.target = "_blank";
            a.textContent = baseUrl + url;
            preservedUrlsDiv.appendChild(a);
        });
    }

    urlsSection.style.display = "block";
    preservedUrlsSection.classList.remove("show");
}

form.addEventListener("submit", event => {
    event.preventDefault();
    generateUrls();
    preservedUrlsSection.classList.add("show");
});
