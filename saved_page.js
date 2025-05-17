const supabase_url = "https://uuznafqzlunstodcdolw.supabase.co"
const supabase_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1em5hZnF6bHVuc3RvZGNkb2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0Mjg5MTAsImV4cCI6MjA2MzAwNDkxMH0.nL9hZujBl3kNvXgWWpPTHgeAHbAZFq2DEA8ZeqU2pUI";
const supabase = window.supabase.createClient(supabase_url, supabase_key);

async function loadSavedArt() {
    const gallery = document.getElementById("saved-gallery");

    const { data, error} = await supabase.from("saved-art").select("*");

    if (error) {
        console.error(error);
        return;
    }

    data.forEach(art => {
        const artCard = document.createElement("div");

        artCard.className = "art-card";
        artCard.setAttribute("data-tilt", "");
        artCard.setAttribute("data-aos", "fade-up");

        artCard.innerHTML = `
            <img src="${art.image}">
            <div class="art-info">
                <h3>${art.title}</h3>
                <p>By ${art.artist || "Unknown Artist"}</p>
            </div>`;
        gallery.appendChild(artCard);

        VanillaTilt.init(document.querySelectorAll(".art-card"), {
            max: 45,
            speed: 100,
            glare: true
        });

        AOS.refresh();
    })
}

document.addEventListener('DOMContentLoaded', () => {
    loadSavedArt();
    AOS.init();
});