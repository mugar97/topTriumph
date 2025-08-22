import React, { useState } from 'react';

const VehicleModal = ({ vehicle, onClose }) => {
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

  const stats = [
    { label: 'Velocidad Máxima', value: `${vehicle.velocidad_max_kmh} km/h`, icon: '🏁', color: 'text-red-600' },
    { label: '0-100 km/h', value: `${vehicle.cero_a_100_s}s`, icon: '⚡', color: 'text-blue-600' },
    { label: 'Potencia', value: `${vehicle.potencia_hp} CV`, icon: '💪', color: 'text-orange-600' },
    { label: 'Torque', value: `${vehicle.torque_nm} Nm`, icon: '⚙️', color: 'text-purple-600' },
    { label: 'Peso', value: `${vehicle.peso_kg} kg`, icon: '⚖️', color: 'text-gray-600' },
    { label: 'Autonomía', value: `${vehicle.autonomia_km} km`, icon: '🛣️', color: 'text-green-600' },
    { label: 'Precio', value: formatPrice(vehicle.precio_usd), icon: '💰', color: 'text-yellow-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(vehicle.categoria)} p-6 text-white relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 text-2xl font-bold"
          >
            ×
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">{vehicle.make}</h2>
              <p className="text-xl font-semibold">{vehicle.model}</p>
              <p className="text-lg opacity-90">{vehicle.year} • {vehicle.trim}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-4 py-2">
              <span className="text-sm font-semibold">{vehicle.categoria}</span>
            </div>
          </div>
        </div>

        {/* Vehicle Image */}
        <div className="relative h-64 bg-gray-100">
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
                <div className="text-6xl mb-4">🚗</div>
                <div className="text-lg">Imagen no disponible</div>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Especificaciones del Vehículo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="text-2xl mr-3">{stat.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-gray-600">{stat.label}</div>
                  <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <div className="mt-6 text-center">
            <button
              onClick={onClose}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cerrar Detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;
