# Weather Forecasting App

A modern and responsive weather forecasting application built with React and TypeScript, utilizing the OpenWeatherMap API.

## Features

- Real-time weather data for any location
- 5-day weather forecast
- Temperature toggle between Celsius and Fahrenheit
- Responsive design for all screen sizes
- Modern UI with smooth animations
- Detailed weather information including:
  - Temperature
  - Humidity
  - Wind speed
  - Weather conditions
  - Atmospheric pressure

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- OpenWeatherMap API key

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd weather-forecast
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeatherMap API key:
```
REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm start
```

The application will be available at `http://localhost:3000`

## Technologies Used

- React
- TypeScript
- Material-UI
- Styled Components
- Axios
- OpenWeatherMap API

## Project Structure

```
src/
  ├── components/         # Reusable UI components
  ├── services/          # API and other services
  ├── types/             # TypeScript type definitions
  ├── utils/             # Utility functions
  ├── styles/            # Global styles and themes
  └── App.tsx            # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
