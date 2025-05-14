/**
 * @typedef {Object} WeatherData
 * @property {Object} main - Main weather data
 * @property {number} main.temp - Temperature
 * @property {number} main.feels_like - Feels like temperature
 * @property {number} main.humidity - Humidity percentage
 * @property {number} main.pressure - Pressure in hPa
 * @property {Array<{main: string, description: string, icon: string}>} weather - Weather conditions
 * @property {Object} wind - Wind data
 * @property {number} wind.speed - Wind speed in m/s
 * @property {number} wind.deg - Wind direction in degrees
 * @property {string} name - City name
 * @property {Object} sys - System data
 * @property {string} sys.country - Country code
 */

/**
 * @typedef {Object} ForecastData
 * @property {Array<{
 *   dt: number,
 *   main: {
 *     temp: number,
 *     feels_like: number,
 *     humidity: number,
 *     pressure: number
 *   },
 *   weather: Array<{
 *     main: string,
 *     description: string,
 *     icon: string
 *   }>,
 *   wind: {
 *     speed: number,
 *     deg: number
 *   },
 *   dt_txt: string
 * }>} list - List of forecast data points
 * @property {Object} city - City information
 * @property {string} city.name - City name
 * @property {string} city.country - Country code
 */

/**
 * @typedef {Object} WeatherError
 * @property {string} message - Error message
 * @property {string} cod - Error code
 */

// Export the types for use in other files
export {}; 