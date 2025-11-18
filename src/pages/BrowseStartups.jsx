import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import StartupCard from '../components/BrowseStartups/StartupCard';
import { startupsApi } from '../services/api';

const BrowseStartups = () => {
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedStage, setSelectedStage] = useState('');

  const industries = [
    'All Industries',
    'Artificial Intelligence',
    'FinTech',
    'Productivity',
    'Design & Media',
    'Social & Communication',
    'Data & Analytics',
    'Defense Tech'
  ];

  const fundingStages = [
    'All Stages',
    'SEED',
    'SERIES_A',
    'SERIES_B',
    'SERIES_C',
    'SERIES_D',
    'SERIES_E',
    'SERIES_F',
    'SERIES_G',
    'SERIES_H'
  ];

  useEffect(() => {
    fetchStartups();
  }, [selectedIndustry, selectedStage]);

  const fetchStartups = async () => {
    setLoading(true);
    setError('');
    
    try {
      const params = {};
      if (selectedIndustry && selectedIndustry !== 'All Industries') {
        params.industry = selectedIndustry;
      }
      if (selectedStage && selectedStage !== 'All Stages') {
        params.funding_stage = selectedStage;
      }

      const response = await startupsApi.getAll(params);
      setStartups(response.data.startups || []);
    } catch (err) {
      console.error('Error fetching startups:', err);
      setError('Failed to load startups. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Browse Startups</h1>
          <p className="text-gray-600 mt-2">
            Discover and connect with innovative startups
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search startups by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Industry Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Industry
              </label>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry === 'All Industries' ? '' : industry}>
                    {industry}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline h-4 w-4 mr-1" />
                Funding Stage
              </label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {fundingStages.map(stage => (
                  <option key={stage} value={stage === 'All Stages' ? '' : stage}>
                    {stage.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {filteredStartups.length} {filteredStartups.length === 1 ? 'startup' : 'startups'} found
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader className="h-8 w-8 text-primary-600 animate-spin" />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {/* Startups Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStartups.map(startup => (
              <StartupCard key={startup.startup_id} startup={startup} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredStartups.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No startups found matching your criteria</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BrowseStartups;
