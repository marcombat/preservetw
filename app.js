function generateUrls() {
    const input = document.getElementById("twitter-url").value;
    const parsedUrl = new URL(input);
    const username = parsedUrl.pathname.startsWith("/") ? parsedUrl.pathname.split("/")[1] : input;
    const profileUrl = `https://twitter.com/${username}`;
    const withRepliesUrl = `https://twitter.com/${username}/with_replies`;
    const mediaUrl = `https://twitter.com/${username}/media`;
    const likesUrl = `https://twitter.com/${username}/likes`;
    const followingUrl = `https://twitter.com/${username}/following`;
    const followersUrl = `https://twitter.com/${username}/followers`;
    const urls = [profileUrl, withRepliesUrl, mediaUrl, likesUrl, followingUrl, followersUrl];

    let urlsHtml = "<h2>URLs Principais:</h2>";
    urlsHtml += "<ul>";
    urls.forEach(url => {
        urlsHtml += `<li><a href="${url}" target="_blank">${url}</a></li>`;
    });
    urlsHtml += "</ul>";
    document.getElementById("urls").innerHTML = urlsHtml;

    const preservedUrlsHtml = generatePreservedUrlsHtml(urls);
    document.getElementById("web-archive").innerHTML = preservedUrlsHtml;
}

function generatePreservedUrlsHtml(urls) {
    const sites = {
        "Web Archive": "https://web.archive.org/save/",
        "Archive.today": "https://archive.today/?run=1&url="
    };

    let preservedUrlsHtml = "";
    for (const [site, baseUrl] of Object.entries(sites)) {
        preservedUrlsHtml += `<h2> ${site}:</h2>`;
        preservedUrlsHtml += "<ul>";
        urls.forEach(url => {
            preservedUrl = baseUrl + url;
            preservedUrlsHtml += `<li><a href="${preservedUrl}" target="_blank">${preservedUrl}</a></li>`;
        });
        preservedUrlsHtml += "</ul>";
    }
    return preservedUrlsHtml;
}
