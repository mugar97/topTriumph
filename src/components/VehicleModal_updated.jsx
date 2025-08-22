import React from 'react';

const VehicleModal = ({ vehicle, isOpen, onClose }) => {
  if (!isOpen || !vehicle) return null;

  const formatPrice = (price) => {
    const numPrice = parseInt(price.replace(/[^\d]/g, ''));
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(numPrice);
  };

  const stats = [
    { 
      label: 'Velocidad Máxima', 
      value: vehicle.velocidad_max_kmh, 
      icon: '🏁',
      unit: 'km/h'
    },
    { 
      label: '0-100 km/h', 
      value: vehicle.cero_a_100_s, 
      icon: '⚡',
      unit: 's'
    },
    { 
      label: 'Potencia', 
      value: vehicle.potencia_hp, 
      icon: '💪',
      unit: 'CV'
    },
    { 
      label: 'Torque', 
      value: vehicle.torque_nm, 
      icon: '🔧',
      unit: 'Nm'
    },
    { 
      label: 'Peso', 
      value: vehicle.peso_kg, 
      icon: '⚖️',
      unit: 'kg'
    },
    { 
      label: 'Autonomía', 
      value: vehicle.autonomia_km, 
      icon: '⛽',
      unit: 'km'
    },
    { 
      label: 'Precio', 
      value: formatPrice(vehicle.precio_usd), 
      icon: '💰',
      unit: ''
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {vehicle.make} {vehicle.model}
            </h2>
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {vehicle.categoria}
            </span>
          </div>

          {/* Image */}
          <div className="mb-6">
            <img
              src={vehicle.imagenUrl}
              alt={`${vehicle.make} ${vehicle.model}`}
              className="w-full h-64 object-cover rounded-lg"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x400/e2e8f0/64748b?text=Sin+Imagen';
              }}
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Descripción</h3>
            <p className="text-gray-600 leading-relaxed">
              El {vehicle.make} {vehicle.model} {vehicle.year} {vehicle.trim} es un vehículo de la categoría "{vehicle.categoria}" 
              que destaca por su potencia de {vehicle.potencia_hp} CV y una velocidad máxima de {vehicle.velocidad_max_kmh} km/h. 
              Con una aceleración de 0-100 km/h en solo {vehicle.cero_a_100_s} segundos, representa lo mejor en su segmento.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Especificaciones</h3>
            <div className="space-y-3">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <span className="font-medium text-gray-700">{stat.label}</span>
                  </div>
                  <span className="font-bold text-lg text-gray-900">
                    {stat.value}{stat.unit && ` ${stat.unit}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <div className="text-center">
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
