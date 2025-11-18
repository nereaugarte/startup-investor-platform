import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Users, TrendingUp, Calendar, ExternalLink, Mail, Loader } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { startupsApi } from '../services/api';

const StartupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    fetchStartupDetails();
  }, [id]);

  const fetchStartupDetails = async () => {
    setLoading(true);
    setError('');
    
    try {
      const response = await startupsApi.getById(id);
      setStartup(response.data);
    } catch (err) {
      console.error('Error fetching startup details:', err);
      setError('Failed to load startup details');
    } finally {
      setLoading(false);
    }
  };

  const handleContact = async () => {
    setContactLoading(true);
    try {
      await startupsApi.contact(id, {
        investor_name: 'Current User',
        investor_email: 'user@example.com',
        message: contactMessage
      });
      alert('Contact request sent successfully!');
      setShowContactForm(false);
      setContactMessage('');
    } catch (err) {
      alert('Failed to send contact request');
    } finally {
      setContactLoading(false);
    }
  };

  const formatFunding = (amount) => {
    if (amount >= 1000000000) {
      return `$${(amount / 1000000000).toFixed(2)}B`;
    }
    return `$${(amount / 1000000).toFixed(1)}M`;
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-12">
          <Loader className="h-8 w-8 text-primary-600 animate-spin" />
        </div>
      </Layout>
    );
  }

  if (error || !startup) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-red-600">{error || 'Startup not found'}</p>
          <button
            onClick={() => navigate('/browse')}
            className="mt-4 text-primary-600 hover:underline"
          >
            Back to Browse
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/browse')}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Browse</span>
        </button>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-12">
            <h1 className="text-4xl font-bold text-white mb-4">{startup.name}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                {startup.funding_stage.replace('_', ' ')}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-semibold">
                {startup.industry}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="px-8 py-8 space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {startup.description}
              </p>
            </div>

            {/* Key Metrics */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Metrics</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    <span className="text-sm text-gray-600">Total Raised</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFunding(startup.total_raised)}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Users className="h-6 w-6 text-blue-600" />
                    <span className="text-sm text-gray-600">Employees</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {startup.employee_count}
                  </p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="h-6 w-6 text-purple-600" />
                    <span className="text-sm text-gray-600">Location</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {startup.location}
                  </p>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="h-6 w-6 text-orange-600" />
                    <span className="text-sm text-gray-600">Founded</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {startup.founded_year}
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 pt-6 border-t">
              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>Contact Startup</span>
              </button>
            </div>

            {/* Contact Form */}
            {showContactForm && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Send Message</h3>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Write your message here..."
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleContact}
                    disabled={!contactMessage.trim() || contactLoading}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {contactLoading ? 'Sending...' : 'Send Message'}
                  </button>
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StartupDetail;
