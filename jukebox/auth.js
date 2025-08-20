// auth.js
const clientId = "c21340f1c4a944ebb4ec5f67dce2eb3e"; // replace with your Client ID
const redirectUri = "https://dixinchen.github.io./index.html#" // window.location.origin + window.location.pathname; // same URL you set in Spotify Dashboard
const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

function login() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;
  window.location = authUrl;
}

function getTokenFromUrl() {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  return params.get("access_token");
}

const token = getTokenFromUrl();

if (!token) {
  login();
} else {
  console.log("Logged in with token:", token);
  // Later we’ll use this token to call Spotify APIs
}
