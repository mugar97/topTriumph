# Top Triumph - Vehicle Cards App

A React-based application that creates "Top Trumps" style cards for vehicle data visualization.

## Features

- 📊 Interactive vehicle cards with detailed specifications
- 🎨 Beautiful, responsive design with Tailwind CSS
- 📄 CSV file upload and parsing with Papa Parse
- 🖼️ Dynamic image handling with fallback support
- 📱 Mobile-friendly responsive layout
- 🔍 Detailed modal views for each vehicle
- 🎯 Category-based color coding

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Papa Parse** - CSV parsing library
- **ES6+** - Modern JavaScript

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd topTriumph
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

### Sample Data
The app comes with sample vehicle data to demonstrate functionality.

### CSV Upload
Click "Upload CSV File" to load your own vehicle data. The CSV should have the following columns:
- `make` - Vehicle manufacturer
- `model` - Vehicle model
- `year` - Manufacturing year
- `trim` - Trim level
- `imagenUrl` - Image URL
- `velocidad_max_kmh` - Maximum speed (km/h)
- `cero_a_100_s` - 0-100 km/h acceleration (seconds)
- `potencia_hp` - Horsepower
- `torque_nm` - Torque (Nm)
- `peso_kg` - Weight (kg)
- `autonomia_km` - Range (km)
- `precio_usd` - Price (USD)
- `categoria` - Category (Sports, SUV, Electric, etc.)

### Interacting with Cards
- Browse vehicle cards in the grid layout
- Click any card to view detailed specifications in a modal
- Cards are color-coded by vehicle category

## Project Structure

```
src/
├── components/
│   ├── VehicleCard.jsx    # Individual vehicle card component
│   └── VehicleModal.jsx   # Detailed modal view component
├── App.jsx                # Main application component
├── main.jsx              # React entry point
└── index.css             # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Customization

### Adding New Categories
Update the `getCategoryColor` function in both `VehicleCard.jsx` and `VehicleModal.jsx` to add new category colors.

### Modifying Card Layout
Edit the `VehicleCard.jsx` component to customize the card appearance and stats display.

### Changing Color Scheme
Modify the Tailwind configuration in `tailwind.config.js` or update the gradient classes in the components.

## License

This project is licensed under the MIT License.
