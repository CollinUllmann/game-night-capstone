# Game Night
### Link to live site:
https://game-night-3l3y.onrender.com/



### Summary
Are you a Magic: the Gathering player? Do you want to make changes to your decks, but not sure where to start? Game Night is here! This application allows Magic players to track their performance and gain insights into their gameplay and deck construction.

This is a capstone projecct for the 24-week App Academy program.

#### Profile Page
<img width="1369" alt="profile_screenshot" src="https://github.com/CollinUllmann/game-night-capstone/assets/130401689/1592ad94-3145-4287-ab2d-2f68890da366">

#### Deck Details
<img width="1324" alt="deck_screenshot" src="https://github.com/CollinUllmann/game-night-capstone/assets/130401689/5b1ca75d-9c3a-494a-8447-014c3025cb29">

#### Event Details
<img width="1319" alt="event_screenshot" src="https://github.com/CollinUllmann/game-night-capstone/assets/130401689/bb8e7c3d-3326-47cc-a9ec-b417fd6248ff">

#### Match Form
<img width="1310" alt="match_form_screenshot" src="https://github.com/CollinUllmann/game-night-capstone/assets/130401689/0fb2b638-d569-40aa-975e-2195e4d68de2">


## Technologies
#### Languages
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![HTML](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

#### Libraries
![]()
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)

#### Database
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)



## Getting Started

1. Clone this repository (only the main branch for full functionality).
2. Install dependencies.
   ```
   pipenv install -r requirements.txt
   ```
3. Create a .env file based on the example with proper settings for your development environment.
4. Make sure the SQLite3 database connection url is in the .env file.
5. This starter organizes all tables inside the flask_schema schema, defined by the SCHEMA environment variable. Replace the value for SCHEMA with a unique name, making sure you use the snake_case convention.
6. Get into your pipenv, migrate your database, seed your database, and run your Flask app:
   ```
   pipenv shell
   ```
   ```
   flask db upgrade
   ```
   ```
   flask seed all
   ```
   ```
   flask run
   ```
7. To run the React frontend in development: -cd into the react-vite directory and run npm i to install dependencies.
8. Next, run npm run build to create the dist folder. This command includes the --watch flag. This flag will rebuild the dist folder whenever you change your code, keeping the production version up to date.

## Features
1. Users
   - Users can create an account
   - Users can log in and log out with authentication
2. Events
   - Logged in users can create new events
   - Logged in users can view events
   - Logged in users can update events
   - Logged in users can delete events
4. Matches
   - Logged in users can create new matches
   - Logged in users can view matches
   - Logged in users can update matches
   - Logged in users can delete matches
5. Decks
   - Logged in users can create new decks
   - Logged in users can view decks
   - Logged in users can update decks
   - Logged in users can delete decks
