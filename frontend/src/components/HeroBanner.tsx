import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <img
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Fashion"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Discover Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              Perfect Style
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
            Explore our curated collection of premium clothing designed for the modern lifestyle. Quality meets style in every piece.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/shop"
              className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-md hover:bg-gray-100 transition-colors duration-200 group"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <button className="inline-flex items-center px-8 py-3 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;