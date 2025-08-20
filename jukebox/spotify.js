async function getPlaylists(token) {
  const response = await fetch("https://api.spotify.com/v1/me/playlists", {
    headers: { Authorization: "Bearer " + token }
  });
  const data = await response.json();
  return data.items; // array of playlists
}

async function showPlaylists() {
  const token = window.token;
  if (!token) return; // not logged in yet

  const playlists = await getPlaylists(token);
  const list = document.createElement("ul");

  playlists.forEach(pl => {
    const li = document.createElement("li");
    li.textContent = pl.name;

    // Optional: add a button to select this playlist for the party
    const selectBtn = document.createElement("button");
    selectBtn.textContent = "Select for Party";
    selectBtn.addEventListener("click", () => {
      alert(`Playlist "${pl.name}" selected for party!`);
      // Later, we’ll save this to a backend or Firebase
    });

    li.appendChild(selectBtn);
    list.appendChild(li);
  });

  document.body.appendChild(list);
}

// Only show playlists if already logged in
if (window.token) showPlaylists();
