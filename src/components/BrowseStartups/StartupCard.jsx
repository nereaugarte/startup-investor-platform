import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, TrendingUp } from 'lucide-react';

const StartupCard = ({ startup }) => {
  const navigate = useNavigate();

  const formatFunding = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(1)}B`;
    }
    return `$${(amount / 1000000).toFixed(0)}M`;
  };

  const getFundingStageColor = (stage) => {
    const colors = {
      'SEED': 'bg-green-100 text-green-800',
      'SERIES_A': 'bg-blue-100 text-blue-800',
      'SERIES_B': 'bg-purple-100 text-purple-800',
      'SERIES_C': 'bg-orange-100 text-orange-800',
      'SERIES_D': 'bg-red-100 text-red-800',
      'SERIES_E': 'bg-pink-100 text-pink-800',
      'SERIES_F': 'bg-indigo-100 text-indigo-800',
      'SERIES_G': 'bg-yellow-100 text-yellow-800',
      'SERIES_H': 'bg-gray-100 text-gray-800',
      'SERIES_I': 'bg-teal-100 text-teal-800',
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {startup.name}
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <span className={'px-3 py-1 rounded-full text-xs font-semibold ' + getFundingStageColor(startup.funding_stage)}>
                {startup.funding_stage.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                {startup.industry}
              </span>
            </div>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {startup.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <TrendingUp className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Total Raised</p>
              <p className="font-semibold text-gray-900">
                {formatFunding(startup.total_raised)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Employees</p>
              <p className="font-semibold text-gray-900">
                {startup.employee_count}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <MapPin className="h-4 w-4" />
          <span>{startup.location}</span>
        </div>

        <button
          onClick={() => navigate('/startup/' + startup.startup_id)}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default StartupCard;
