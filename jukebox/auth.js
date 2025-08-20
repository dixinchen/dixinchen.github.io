// auth.js
const clientId = "f8f5bd245ea54c508891e50e6cd43288"; // replace with your Client ID
const redirectUri = "https://dixinchen.github.io./jukebox/index.html#"; // window.location.origin + window.location.pathname; // same URL you set in Spotify Dashboard
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

function login() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=f8f5bd245ea54c508891e50e6cd43288&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
  window.location = authUrl;
}

document.getElementById("loginBtn").addEventListener("click", login);

function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

const token = "BQBho02ego8R_HqSPgYSqiC7Sx3CxoF3QXT8wE-Zujlw8E6r2Vv9Xh4pvoLRalhauO1xZWpt2NF8p1d2C0UKTbyN7zeWHE1_PsEqXh5a1LEXVuBH3UmplC4jSn60DO1x1cGKkbwu8vI"

async function getPlaylists(token) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await response.json();
  return data.items;
}

async function showPlaylists() {
  const token = window.token;
  if (!token) return;

  const playlists = await getPlaylists(token);
  const list = document.createElement("ul");

  playlists.forEach(pl => {
    const li = document.createElement("li");
    li.textContent = pl.name;

    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select for Party";
    selectBtn.addEventListener("click", () => {
      alert(`Playlist "${pl.name}" selected for party!`);
      // TODO: save selection to backend/Firebase
    });

    li.appendChild(selectBtn);
    list.appendChild(li);
  });

  document.body.appendChild(list);
}