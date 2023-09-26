
const apiKey = '55013bd9a31b4f5523c3add309a9234d';
const cityId = 524901;

async function fetchWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`);
        const data = await response.json();

        const temperatureCelsius = data.main.temp - 273.15; // Конвертація в градуси Цельсія
        document.getElementById('temperature-value').textContent = `${temperatureCelsius.toFixed(1)}°C`;
    } catch (error) {
        console.error('Помилка отримання погодних даних:', error);
    }
}

fetchWeather();

