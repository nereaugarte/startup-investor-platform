import React, { useState } from 'react';
import { Heart, TrendingUp, Loader, CheckCircle } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';

const Portfolio = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const triggerMatching = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);
    
    try {
      const response = await axios.post(
        'https://d21v303lo0.execute-api.eu-north-1.amazonaws.com/dev/trigger-matching',
        {}
      );
      
      console.log('Workflow triggered:', response.data);
      setSuccess(true);
      
      // Show success for 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to trigger matching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Portfolio</h1>
            <p className="text-gray-600 mt-2">
              Trigger the AI matching workflow to find startups that match your interests
            </p>
          </div>
          <button
            onClick={triggerMatching}
            disabled={loading}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 animate-spin" />
                <span>Running Workflow...</span>
              </>
            ) : (
              <>
                <TrendingUp className="h-5 w-5" />
                <span>Run Matching Workflow</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-green-800">
              Matching workflow started successfully! Check your email for results and view Step Functions in AWS Console.
            </span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">How It Works</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <p>Click "Run Matching Workflow" to trigger AWS Step Functions</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <p>Step Functions orchestrates Lambda functions to fetch latest startup data</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <p>AI matching algorithm analyzes startups against investor preferences</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <p>Results are sent via SNS email notifications to matched investors</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-gray-900 mb-2">AWS Services Used:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Step Functions</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Lambda</span>
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">DynamoDB</span>
              <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">SNS</span>
              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">API Gateway</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Check Your Email
          </h3>
          <p className="text-gray-600">
            After running the workflow, matched investors will receive email notifications with startup recommendations
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Portfolio;

