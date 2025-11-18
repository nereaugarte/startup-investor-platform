import FundingChart from '../components/MarketIntelligence/FundingChart';
import React from 'react';
import { TrendingUp, DollarSign, Briefcase, Award, ArrowUp, ArrowDown } from 'lucide-react';
import Layout from '../components/Layout/Layout';

const MarketIntelligence = () => {
  const metrics = [
    {
      title: 'Total VC Funding (2024)',
      value: '$445B',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Active Startups',
      value: '12,847',
      change: '+8.3%',
      trend: 'up',
      icon: Briefcase,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Unicorn Companies',
      value: '1,215',
      change: '+15.2%',
      trend: 'up',
      icon: Award,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Avg. Deal Size',
      value: '$34.6M',
      change: '-3.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const trendingIndustries = [
    { name: 'Artificial Intelligence', funding: '$89.2B', growth: '+45%', deals: 2847 },
    { name: 'FinTech', funding: '$67.5B', growth: '+28%', deals: 1923 },
    { name: 'Healthcare Tech', funding: '$54.3B', growth: '+31%', deals: 1654 },
    { name: 'CleanTech', funding: '$43.1B', growth: '+52%', deals: 987 },
    { name: 'E-commerce', funding: '$38.7B', growth: '+18%', deals: 1432 }
  ];

  const recentInsights = [
    {
      title: 'AI Startups See Record Funding',
      summary: 'Artificial Intelligence companies raised $89B in 2024, marking a 45% increase year-over-year.',
      date: '2 days ago',
      category: 'AI'
    },
    {
      title: 'FinTech Growth Accelerates in Q4',
      summary: 'Financial technology sector shows strong momentum with increased investor interest.',
      date: '5 days ago',
      category: 'FinTech'
    },
    {
      title: 'CleanTech Investment Surge',
      summary: 'Climate technology startups attract record investment as sustainability becomes priority.',
      date: '1 week ago',
      category: 'CleanTech'
    }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Market Intelligence</h1>
          <p className="text-gray-600 mt-2">
            Real-time insights and trends in the startup ecosystem
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${metric.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-semibold ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-gray-600">{metric.title}</p>
              </div>
            );
          })}
        </div>

        {/* Trending Industries */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Industries</h2>
          <div className="space-y-4">
            {trendingIndustries.map((industry, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{industry.name}</h3>
                  <p className="text-sm text-gray-600">{industry.deals} deals in 2024</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{industry.funding}</p>
                  <p className="text-sm text-green-600 font-semibold">{industry.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Insights */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Insights</h2>
          <div className="space-y-4">
            {recentInsights.map((insight, index) => (
              <div key={index} className="border-l-4 border-primary-500 pl-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-semibold">
                        {insight.category}
                      </span>
                      <span className="text-xs text-gray-500">{insight.date}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{insight.title}</h3>
                    <p className="text-sm text-gray-600">{insight.summary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Funding Trends Over Time</h2>
	  <FundingChart />
        </div>
      </div>
    </Layout>
  );
};

export default MarketIntelligence;
