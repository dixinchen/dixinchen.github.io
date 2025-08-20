// auth.js
const clientId = "c21340f1c4a944ebb4ec5f67dce2eb3e"; // replace with your Client ID
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
  const authUrl = `https://accounts.spotify.com/authorize?client_id=c21340f1c4a944ebb4ec5f67dce2eb3e&redirect_uri=${encodeURIComponent(
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

const token = getTokenFromUrl();
if (token) {
  window.token = token;
  console.log("Logged in with token:", token);
  showPlaylists();
}

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