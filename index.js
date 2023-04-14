function generateUrls() {
  const inputField = document.getElementById("input-field");
  const inputStr = inputField.value.trim();

  // verifica se a entrada é uma URL ou um nome de usuário
  let username;
  let twitterProfileLink;
  try {
    const parsedUrl = new URL(inputStr);
    twitterProfileLink = parsedUrl.toString();
    username = parsedUrl.pathname.split("/")[1];
  } catch (error) {
    twitterProfileLink = `https://twitter.com/${inputStr}`;
    username = inputStr;
  }

  // gera as URLs principais com base no nome de usuário
  const profileUrl = `https://twitter.com/${username}`;
  const withRepliesUrl = `https://twitter.com/${username}/with_replies`;
  const mediaUrl = `https://twitter.com/${username}/media`;
  const likesUrl = `https://twitter.com/${username}/likes`;
  const followingUrl = `https://twitter.com/${username}/following`;
  const followersUrl = `https://twitter.com/${username}/followers`;

  // cria a lista de URLs a serem exibidas
  const urlsList = document.getElementById("urls-list");
  urlsList.innerHTML = ""; // limpa a lista
  const urls = [
    profileUrl,
    withRepliesUrl,
    mediaUrl,
    likesUrl,
    followingUrl,
    followersUrl
  ];
  urls.forEach(url => {
    const listItem = document.createElement("li");
    listItem.textContent = url;
    urlsList.appendChild(listItem);
  });

  // exibe as URLs dos sites de preservação
  const sites = {
    "Web Archive": "https://web.archive.org/save/",
    "Archive.today": "https://archive.today/?run=1&url=",
    "Archive.is": "http://archive.is/?url=",
    "Archive.fo": "https://archive.fo/?run=1&url=",
    "Perma.cc": "https://perma.cc/api/v1/archives/?url=",
    "WebCite": "http://www.webcitation.org/query.php?url="
  };

  Object.entries(sites).forEach(([site, base_url]) => {
    const siteHeader = document.createElement("h3");
    siteHeader.textContent = `${site}:`;
    urlsList.appendChild(siteHeader);

    urls.forEach(url => {
      const preservedUrl = `${base_url}${url}`;
      const listItem = document.createElement("li");
