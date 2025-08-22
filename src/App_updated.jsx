import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import VehicleCard from './components/VehicleCard';
import VehicleModal from './components/VehicleModal';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCSVData();
  }, []);

  useEffect(() => {
    filterVehicles();
  }, [vehicles, selectedCategory]);

  const filterVehicles = () => {
    if (selectedCategory === 'Todos') {
      setFilteredVehicles(vehicles);
    } else {
      setFilteredVehicles(vehicles.filter(vehicle => vehicle.categoria === selectedCategory));
    }
  };

  const getUniqueCategories = () => {
    const categories = vehicles.map(vehicle => vehicle.categoria);
    return ['Todos', ...new Set(categories)];
  };

  const getCategoryDisplayName = (category) => {
    const categoryNames = {
      'Todos': 'Todos',
      'superdeportivo': 'Superdeportivos',
      'deportivo icono': 'Deportivos Icónicos',
      'camionetas & pick-ups': 'Camionetas y Pick-ups',
      'compactos & hatchbacks': 'Compactos y Hatchbacks',
      'familiares & suv modernos': 'Familiares y SUVs',
      'clásicos legendarios': 'Clásicos Legendarios'
    };
    return categoryNames[category] || category;
  };

  const loadCSVData = async () => {
    try {
      // Load the updated CSV file from the public directory
      const response = await fetch('/cartas_vehiculos_updated.csv');
      const csvText = await response.text();
      
      Papa.parse(csvText, {
        complete: (results) => {
          if (results.errors.length > 0) {
            console.error('CSV parsing errors:', results.errors);
            loadSampleData(); // Fallback to sample data if CSV fails
          } else {
            // Skip the header row and map the data
            const vehicleData = results.data.slice(1).filter(row => row.length > 1).map(row => ({
              make: row[0],
              model: row[1],
              year: row[2],
              trim: row[3],
              imagenUrl: row[4],
              velocidad_max_kmh: row[5],
              cero_a_100_s: row[6],
              potencia_hp: row[7],
              torque_nm: row[8],
              peso_kg: row[9],
              autonomia_km: row[10],
              precio_usd: row[11],
              categoria: row[12]
            }));
            setVehicles(vehicleData);
            setFilteredVehicles(vehicleData);
          }
          setLoading(false);
        },
        header: false,
        skipEmptyLines: true
      });
    } catch (error) {
      console.error('Error loading CSV:', error);
      loadSampleData(); // Fallback to sample data
    }
  };

  const loadSampleData = () => {
    // Fallback sample data if CSV loading fails
    const sampleData = [
      {
        make: 'Ferrari',
        model: 'F8 Tributo',
        year: '2023',
        trim: 'Base',
        imagenUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
        velocidad_max_kmh: '340',
        cero_a_100_s: '2.9',
        potencia_hp: '710',
        torque_nm: '770',
        peso_kg: '1435',
        autonomia_km: '450',
        precio_usd: '280000',
        categoria: 'superdeportivo'
      },
      {
        make: 'Lamborghini',
        model: 'Huracan',
        year: '2023',
        trim: 'EVO',
        imagenUrl: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400',
        velocidad_max_kmh: '325',
        cero_a_100_s: '3.2',
        potencia_hp: '630',
        torque_nm: '600',
        peso_kg: '1422',
        autonomia_km: '420',
        precio_usd: '250000',
        categoria: 'superdeportivo'
      },
      {
        make: 'Tesla',
        model: 'Model S',
        year: '2023',
        trim: 'Plaid',
        imagenUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400',
        velocidad_max_kmh: '322',
        cero_a_100_s: '2.1',
        potencia_hp: '1020',
        torque_nm: '1420',
        peso_kg: '2162',
        autonomia_km: '628',
        precio_usd: '130000',
        categoria: 'deportivo icono'
      },
      {
        make: 'Porsche',
        model: '911 Turbo S',
        year: '2023',
        trim: 'Turbo S',
        imagenUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
        velocidad_max_kmh: '330',
        cero_a_100_s: '2.7',
        potencia_hp: '640',
        torque_nm: '800',
        peso_kg: '1640',
        autonomia_km: '480',
        precio_usd: '230000',
        categoria: 'superdeportivo'
      }
    ];

    setVehicles(sampleData);
    setFilteredVehicles(sampleData);
    setLoading(false);
  };

  const loadCSVFromFile = (file) => {
    Papa.parse(file, {
      complete: (results) => {
        if (results.errors.length > 0) {
          setError('Error al procesar el archivo CSV');
          console.error(results.errors);
        } else {
          const vehicleData = results.data.slice(1).map(row => ({
            make: row[0],
            model: row[1],
            year: row[2],
            trim: row[3],
            imagenUrl: row[4],
            velocidad_max_kmh: row[5],
            cero_a_100_s: row[6],
            potencia_hp: row[7],
            torque_nm: row[8],
            peso_kg: row[9],
            autonomia_km: row[10],
            precio_usd: row[11],
            categoria: row[12]
          }));
          setVehicles(vehicleData);
          setFilteredVehicles(vehicleData);
        }
        setLoading(false);
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      loadCSVFromFile(file);
    }
  };

  const openModal = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const closeModal = () => {
    setSelectedVehicle(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Cargando vehículos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          🏆 Top Triumph - Cartas de Vehículos
        </h1>
        
        <div className="mb-8 text-center">
          <label className="bg-white text-gray-800 px-6 py-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
            Subir Archivo CSV Personalizado
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <p className="text-white mt-2 text-sm">
            {vehicles.length > 0 ? `Mostrando ${filteredVehicles.length} de ${vehicles.length} vehículos` : 'O sube tu propio archivo CSV con datos de vehículos'}
          </p>
        </div>

        {/* Category Filter */}
        {vehicles.length > 0 && (
          <div className="mb-8">
            <h3 className="text-white text-lg font-semibold mb-4 text-center">Filtrar por Categoría</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {getUniqueCategories().map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-white text-gray-800 shadow-lg'
                      : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                  }`}
                >
                  {getCategoryDisplayName(category)}
                  {category !== 'Todos' && (
                    <span className="ml-1 text-xs opacity-75">
                      ({vehicles.filter(v => v.categoria === category).length})
                    </span>
                  )}
                  {category === 'Todos' && (
                    <span className="ml-1 text-xs opacity-75">
                      ({vehicles.length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle, index) => (
              <VehicleCard
                key={index}
                vehicle={vehicle}
                onClick={() => openModal(vehicle)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-white text-xl mb-2">No se encontraron vehículos</div>
              <div className="text-white text-opacity-75">
                No hay vehículos que coincidan con la categoría seleccionada "{selectedCategory}"
              </div>
            </div>
          )}
        </div>

        {selectedVehicle && (
          <VehicleModal
            vehicle={selectedVehicle}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
