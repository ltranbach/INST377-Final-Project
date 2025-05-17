function getDepartmentList() {
    const departmentList = document.getElementById("department-list");
    const page_api_url = "https://collectionapi.metmuseum.org/public/collection/v1/departments";

    fetch(page_api_url)
        .then(res => res.json())
        .then(resJson => {
            resJson.departments.forEach(department => {
                const section = document.createElement("section");

                section.setAttribute("data-aos", "fade-up");
                section.innerHTML = `<h2>${department.displayName}</h2>`;

                const gallery = document.createElement("div");

                gallery.className = "gallery";
                section.appendChild(gallery);
                departmentList.appendChild(section);

                const dept_api_url = `https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${department.departmentId}&q=*`;

                fetch(dept_api_url)
                .then(res => res.json())
                .then(dept => {
                    const objectIDs = dept.objectIDs || [];

                    if (objectIDs.length === 0) {
                        return;
                    }

                    function findValidArt(index = 0) {
                        if (index >= objectIDs.length) {
                            return;
                        }

                        const objectID = objectIDs[index];
                        const object_api_url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`;

                        fetch(object_api_url)
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
                                            <p>"${art.title}"</p>
                                            <p>By ${art.artistDisplayName || "Unknown Artist"}</p>
                                        </div>`;
                                    gallery.appendChild(artCard);

                                    VanillaTilt.init(artCard, {
                                        max: 15,
                                        speed: 400,
                                        glare: true,
                                    });

                                    AOS.refresh(); 
                                } else {
                                    findValidArt(index + 1);
                                }
                                })
                    }

                    findValidArt(); 
                });
            });
        });
}

document.addEventListener("DOMContentLoaded", () => {
  getDepartmentList();
  AOS.init();
});