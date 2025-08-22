import React, { useState } from 'react';

const VehicleCard = ({ vehicle, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'superdeportivo': 'from-red-500 to-red-700',
      'deportivo icono': 'from-orange-500 to-orange-700',
      'camionetas & pick-ups': 'from-green-500 to-green-700',
      'compactos & hatchbacks': 'from-blue-500 to-blue-700',
      'familiares & suv modernos': 'from-purple-500 to-purple-700',
      'clásicos legendarios': 'from-yellow-500 to-yellow-700',
      'Sports': 'from-red-500 to-red-700',
      'SUV': 'from-green-500 to-green-700',
      'Electric': 'from-blue-500 to-blue-700',
      'Luxury': 'from-purple-500 to-purple-700',
      'Truck': 'from-orange-500 to-orange-700',
      'Sedan': 'from-gray-500 to-gray-700',
    };
    return colors[category] || 'from-gray-500 to-gray-700';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
      onClick={onClick}
    >
      {/* Header with gradient */}
      <div className={`bg-gradient-to-r ${getCategoryColor(vehicle.categoria)} p-4 text-white relative`}>
        <div className="absolute top-2 right-2 bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-semibold">
          {vehicle.categoria}
        </div>
        <h3 className="text-xl font-bold truncate">{vehicle.make}</h3>
        <p className="text-lg font-semibold truncate">{vehicle.model}</p>
        <p className="text-sm opacity-90">{vehicle.year} • {vehicle.trim}</p>
      </div>

      {/* Vehicle Image */}
      <div className="relative h-48 bg-gray-100">
        {!imageError ? (
          <img
            src={vehicle.imagenUrl}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <div className="text-gray-500 text-center">
              <div className="text-4xl mb-2">🚗</div>
              <div className="text-sm">Imagen no disponible</div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 gap-3 text-sm">
          {/* Velocidad Máxima */}
          <div className="bg-red-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">🏁</div>
            <div className="flex-1">
              <div className="text-red-500 text-xs">Velocidad Máxima</div>
              <div className="text-red-600 font-bold text-lg">{vehicle.velocidad_max_kmh} km/h</div>
            </div>
          </div>

          {/* 0-100 km/h */}
          <div className="bg-blue-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">⚡</div>
            <div className="flex-1">
              <div className="text-blue-500 text-xs">0-100 km/h</div>
              <div className="text-blue-600 font-bold text-lg">{vehicle.cero_a_100_s}s</div>
            </div>
          </div>

          {/* Potencia */}
          <div className="bg-orange-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">💪</div>
            <div className="flex-1">
              <div className="text-orange-500 text-xs">Potencia</div>
              <div className="text-orange-600 font-bold text-lg">{vehicle.potencia_hp} CV</div>
            </div>
          </div>

          {/* Torque */}
          <div className="bg-purple-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">🔧</div>
            <div className="flex-1">
              <div className="text-purple-500 text-xs">Torque</div>
              <div className="text-purple-600 font-bold text-lg">{vehicle.torque_nm} Nm</div>
            </div>
          </div>

          {/* Peso */}
          <div className="bg-gray-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">⚖️</div>
            <div className="flex-1">
              <div className="text-gray-500 text-xs">Peso</div>
              <div className="text-gray-600 font-bold text-lg">{vehicle.peso_kg} kg</div>
            </div>
          </div>

          {/* Autonomía */}
          <div className="bg-green-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">⛽</div>
            <div className="flex-1">
              <div className="text-green-500 text-xs">Autonomía</div>
              <div className="text-green-600 font-bold text-lg">{vehicle.autonomia_km} km</div>
            </div>
          </div>

          {/* Precio */}
          <div className="bg-yellow-50 rounded-lg p-3 flex items-center">
            <div className="text-xl mr-3">💰</div>
            <div className="flex-1">
              <div className="text-yellow-500 text-xs">Precio</div>
              <div className="text-yellow-600 font-bold text-lg">
                {formatPrice(vehicle.precio_usd).replace('.00', '')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Click indicator */}
      <div className="bg-gray-50 px-4 py-2 text-center text-xs text-gray-500">
        Clic para ver detalles
      </div>
    </div>
  );
};

export default VehicleCard;
