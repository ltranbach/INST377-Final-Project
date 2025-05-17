const supabase_url = "https://uuznafqzlunstodcdolw.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1em5hZnF6bHVuc3RvZGNkb2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0Mjg5MTAsImV4cCI6MjA2MzAwNDkxMH0.nL9hZujBl3kNvXgWWpPTHgeAHbAZFq2DEA8ZeqU2pUI";
const supabase = window.supabase.createClient(supabase_url, supabase_key);

function getRandomArt() {
    const gallery = document.getElementById("home-gallery");
    const NUM_ARTWORKS = 6;
    const page_api_url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

    fetch(page_api_url)
        .then(res => res.json())
        .then(arts => {
            const IDs = arts.objectIDs;
            const usedIDs = new Set();
            let artworksLoaded = 0;

            loadArtwork();

            function loadArtwork() {
                if (artworksLoaded >= NUM_ARTWORKS) {
                    return;
                }

                const randomIndex = Math.floor(Math.random() * IDs.length);
                const ID = IDs[randomIndex];

                if (usedIDs.has(ID)) {
                    loadArtwork(); 
                    return;
                }

                usedIDs.add(ID);

                const ID_api_url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${ID}`;

                fetch(ID_api_url)
                    .then(res => res.json())
                    .then(art => {
                        if (art.primaryImageSmall && art.title) {
                            const artCard = document.createElement("div");

                            artCard.className = "art-card";
                            artCard.setAttribute("data-tilt", "");
                            artCard.setAttribute("data-aos", "fade-up");
                            
                            artCard.innerHTML = `
                                <img src="${art.primaryImageSmall}">
                                <div class="art-info">
                                    <h3>"${art.title}"</h3>
                                    <p>By ${art.artistDisplayName || "Unknown Artist"}</p>
                                </div>`;
                            
                            const saveButton = document.createElement("button");
                            
                            saveButton.textContent = "Save Art";
                            saveButton.addEventListener("click", () => {
                                supabase.from("saved-art").insert([{
                                    title: art.title,
                                    artist: art.artistDisplayName || "Unknown Artist",
                                    image: art.primaryImageSmall,
                                    objectid: art.objectID
                                }]).then(( { error }) => {
                                    if (error) {
                                        alert(`${error.message}`);
                                    } else {
                                        alert("art added successfully");
                                    }
                                })
                            })

                            artCard.appendChild(saveButton);
                            gallery.appendChild(artCard);
                            ++artworksLoaded;

                            VanillaTilt.init(artCard, {
                                max: 45,
                                speed: 100,
                                glare: true
                            });

                            AOS.refresh();
                        }
                        loadArtwork(); 
                    })
            }
        });
}

document.addEventListener("DOMContentLoaded", () => {
    getRandomArt();
    AOS.init();
});