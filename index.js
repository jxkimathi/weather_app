// WEATHER APP INTERACTIVITY

const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "177b37b726fc3e1dddba218b3cdb6229";


weatherForm.addEventListener("submit", async event => {

    // Prevent the default submission
    event.preventDefault();

    const city = cityInput.value;

    // Fetches data from the API or catch the error
    if (city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        } catch (error) {
            console.error(error);
            displayError(error);
        }
    } else {
        displayError("Please enter a city!")
    }
});

async function getWeatherData(city) {
    // Fetches the weather data from an API and displays it in JSON format
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiURL);

    if (!response.ok) {
        throw new Error("Could not fetch weather data");
    }

    return await response.json();
}

function displayWeatherInfo(data) {
    const {name: city,
            main: {temp, humidity},
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    // Creates the elements to be displayed on the card
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    // Changes the elements into appropriate, understandable content
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(((temp - 273.15) * (9/5) + 32).toFixed(1))}°F`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);

    // Fetches the styling from the CSS file
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji");

    // Displays the elements on the card
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {
    // Chooses the approriate weather emoji to display with certain weather conditions
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️"; // thunderstorm
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️"; // drizzle
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️"; //rain
        case (weatherId >= 600 && weatherId < 700):
            return "❄️"; //snow
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️"; //fog
        case (weatherId === 800):
            return "☀️"; // clear
        case (weatherId > 800):
            return "☁️";
    }
}

function displayError(message) {

    // Displays the Error message on the card
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay);
}
