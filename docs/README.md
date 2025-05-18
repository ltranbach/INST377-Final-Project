# INST377-Final-Project

1. Virtual Museum Tour Project

2. For this project, I wanted to utilize the Metropolitan Museum of Art API to create a website that introduces people to the MET and allows them to virtually explore the museum from the comfort of their devices.

3. This project was intended to be used through the Desktop browser, preferably Google Chrome.

4. Developer Manual

    1. This project fetches data from the MET API, stores data in a Supabase database, and is deployed through Vercel.

    2. Running the app:

        1. Locally

            1. Clone the repo

                git clone git@github.com:ltranbach/INST377-Final-Project.git

            2. Open Visual Studio and Live Server any of the .html pages, preferably the index.html

            3. Explore the website

        2. Remote

            1. https://inst-377-final-project-mauve.vercel.app/
          
        3. Github Repository Link
      
            1. https://github.com/ltranbach/INST377-Final-Project.git

    3. Structure of the project:

        1. index.html
        2. home_page.js
        3. explore_page.html
        4. explore_page.js
        5. search_page.html
        6. search_page.js
        7. saved_page.html
        8. saved_page.js
        9. about_page.html
        10. style.css
        11. README.md
 
    4. This project utilized several APIs:

        1. MET Museum API - used for getting artwork data
        
        2. Supabase API - used for storing and retrieving data

            1. The endpoints used for Supabase API

                1. Table: 'saved-art'

                    1. insert - used for saving data

                    2. select - used for retrieving data
                  
    5. This project also utilized several libraries:
  
       1. Vanilla Tilt library - allows for the artwork to be tilted, similarly to a 3D card 
      
       2. Animate on Scroll library - adds a fading animation when scrolling the pages

    6. Testing

        1. Implemented alerts for Supabase testing, giving feedback on whether it works.

    7. Future improvements for the project:

        1. The design of the website can be improved

        2. Adding a few crucial functionalities, like creating unique authentification for each user, or usability for mobile devices

        3. Adding a delete button for removing saved artworks

5. Project by Lam Tran Bach for UMD College Park Spring 2025 INST377 Final Project
