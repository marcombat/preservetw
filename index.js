async function generateUrls() {
  // obtém a entrada do usuário
  const inputField = document.getElementById("input-field");
  const inputStr = inputField.value.trim();

  // verifica se a entrada é uma URL ou um nome de usuário
  let username = "";
  let twitterProfileLink = "";
  try {
    const url = new URL(inputStr);
    username = url.pathname.split("/")[1];
    twitterProfileLink = inputStr;
  } catch {
    username = inputStr;
    twitterProfileLink = `https://twitter.com/${username}`;
  }

  // gera as URLs principais com base no nome de usuário
  const profileUrl = `https://twitter.com/${username}`;
  const withRepliesUrl = `https://twitter.com/${username}/with_replies`;
  const mediaUrl = `https://twitter.com/${username}/media`;
  const likesUrl = `https://twitter.com/${username}/likes`;
  const followingUrl = `https://twitter.com/${username}/following`;
  const followersUrl = `https://twitter.com/${username}/followers`;

  // imprime as URLs principais geradas
  const urlsList = document.getElementById("urls-list");
  urlsList.innerHTML = "";
  const urls = [profileUrl, withRepliesUrl, mediaUrl, likesUrl, followingUrl, followersUrl];
  urls.forEach(url => {
    const listItem = document.createElement("li");
    listItem.innerText = url;
    urlsList.appendChild(listItem);
  });

  // lista de sites de preservação
  const sites = {
    "Web Archive": "https://web.archive.org/save/",
    "Archive.today": "https://archive.today/?run=1&url="
  };

  // imprime as URLs de preservação para cada site
  for (const [site, baseUrl] of Object.entries(sites)) {
    const siteListItem = document.createElement("li");
    siteListItem.innerText = site;
    urlsList.appendChild(siteListItem);
    urls.forEach(url => {
      const preservedUrl = `${baseUrl}${url}`;
      const preservedUrlListItem = document.createElement("li");
      preservedUrlListItem.innerText = preservedUrl;
      urlsList.appendChild(preservedUrlListItem);
    });
  }

  // separa as URLs de cada site com uma quebra de linha
  urlsList.appendChild(document.createElement("br"));
}
