// spotify.js
async function getPlaylists(token) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await response.json();
  return data.items; // array of playlists
}

async function showPlaylists() {
  const token = window.token; // make sure auth.js sets window.token = token
  const playlists = await getPlaylists(token);
  const list = document.createElement("ul");
  playlists.forEach(pl => {
    const li = document.createElement("li");
    li.textContent = pl.name;
    list.appendChild(li);
  });
  document.body.appendChild(list);
}

showPlaylists();
