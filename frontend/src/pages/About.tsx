import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We believe fashion is a form of self-expression that should be accessible to everyone.'
    },
    {
      icon: Target,
      title: 'Quality First',
      description: 'Every piece is carefully selected and tested to ensure the highest quality standards.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'We build lasting relationships with our customers and value their feedback.'
    },
    {
      icon: Award,
      title: 'Sustainable Practices',
      description: 'Committed to ethical sourcing and environmentally responsible fashion.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Fashion industry veteran with 15 years of experience in retail and design.'
    },
    {
      name: 'Michael Chen',
      role: 'Creative Director',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Award-winning designer specializing in contemporary and sustainable fashion.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      image: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Operations expert ensuring smooth logistics and customer satisfaction.'
    },
    {
      name: 'David Park',
      role: 'Head of Marketing',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Digital marketing strategist building meaningful brand connections.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About StyleHub</h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We're passionate about making high-quality, stylish clothing accessible to everyone. 
            Our story began with a simple mission: to create a fashion destination that combines 
            style, quality, and affordability.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2020, StyleHub emerged from a simple observation: finding truly stylish, 
                  well-made clothing at fair prices shouldn't be a treasure hunt. Our founders, 
                  Sarah Johnson and Michael Chen, combined their expertise in fashion retail and 
                  design to create something different.
                </p>
                <p>
                  What started as a small online boutique has grown into a trusted destination for 
                  fashion-conscious individuals who value both style and substance. We've built our 
                  reputation on three pillars: exceptional quality, thoughtful design, and 
                  outstanding customer service.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide, offering carefully curated 
                  collections that reflect the latest trends while maintaining timeless appeal. 
                  Every piece in our store is selected with our customers in mind.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Our store"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-blue-600">5+ Years</p>
                <p className="text-gray-600">of Excellence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Our Mission</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-16">
            To democratize fashion by making high-quality, stylish clothing accessible to everyone, 
            while building a sustainable and ethical business that benefits our customers, 
            communities, and the environment.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">
              The passionate individuals behind StyleHub's success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-blue-200">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Countries</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;