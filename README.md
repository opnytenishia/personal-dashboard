# Features of Personal Dashboard App

There are 3 main widgets,
  1. Weather Widget - User can view current location temperature if browser is allowed to access ocation or else can search for temperature by city name.
  2. News Feed Widget - User can view news headline and also click on read more to move to news page. User can also select categories and view relevant headlines.
  3. Task Manager Widget - User can add new tasks, view the list, update relevant task when completed and delete tasks.

# Setup and Run Locally

Assuming node and React are installed on the machine, after npm install, npm start should up the project locally.

# Choices Made

1. NewsApi and OpenWeatherMap were choosen for the endpoint to retirve news and weather data.
2. No main packages or libraries were used apart from minor ones like sweetalert2, uuid and these were for styling and generating id purposes.

# Live Deployment

Site is deployed to Netlify but there is a limitation there with the developer version api key for newsApi, they only allow browser calls from localhost. Therefor news widget cannot be checked properly there.
