import { Facebook, Youtube, Share2 } from 'lucide-react';

export default function SocialMedia() {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v',
      description: 'Follow us on Facebook for daily inspiration, event updates, prayer requests, and community engagement.',
      color: '#2e3e87',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@masenouniversitykisumucamp2013?si=58a9zMVbcGmLX98g',
      description: 'Subscribe to our YouTube channel for sermon recordings, worship sessions, testimonies, and more.',
      color: '#b4712d',
    },
    {
      name: 'TikTok',
      icon: Share2,
      url: 'https://vm.tiktok.com/ZMhVnv9Pb/',
      description: 'Join us on TikTok for short, engaging content that shares the Gospel in creative and impactful ways.',
      color: '#2e3e87',
    },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">Social Media</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>Stay Connected with Us Online</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join our online community and stay updated with the latest sermons, events, testimonies, and daily inspiration. Follow us on your favorite platforms.
          </p>
        </div>

        <div className="space-y-6 mb-16">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div
                    className="w-full md:w-48 p-8 flex items-center justify-center"
                    style={{ backgroundColor: platform.color }}
                  >
                    <Icon className="text-white" size={64} />
                  </div>
                  <div className="flex-1 p-8">
                    <h3 className="text-3xl font-bold mb-4" style={{ color: '#2e3e87' }}>
                      {platform.name}
                    </h3>
                    <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                      {platform.description}
                    </p>
                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-white"
                      style={{ backgroundColor: platform.color }}
                    >
                      Follow Us
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="rounded-2xl shadow-xl p-8"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">What You'll Find</h2>
            <ul className="space-y-4 text-white">
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span className="text-lg">Live streams and recordings of Sunday services</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span className="text-lg">Event announcements and updates</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span className="text-lg">Daily devotionals and Scripture verses</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span className="text-lg">Testimonies from members</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span className="text-lg">Prayer requests and praise reports</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Join the Conversation
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Our social media platforms are more than just channels for information. They're communities where we encourage one another, share testimonies, and grow together in faith.
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-2" style={{ color: '#2e3e87' }}>
                  Engage with Us
                </p>
                <p className="text-gray-600">
                  Like, comment, and share our posts to spread the Gospel message
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-2" style={{ color: '#2e3e87' }}>
                  Share Your Story
                </p>
                <p className="text-gray-600">
                  Tag us in your posts and testimonies to inspire others
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-2" style={{ color: '#2e3e87' }}>
                  Stay Informed
                </p>
                <p className="text-gray-600">
                  Turn on notifications to never miss important updates
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl shadow-xl p-8 md:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #b4712d 0%, #8b5723 100%)' }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Share the Good News</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Help us reach more people with the message of Christ. Follow us on all platforms and share our content with your friends and family.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {socialPlatforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <a
                  key={index}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2"
                  style={{ color: '#2e3e87' }}
                >
                  <Icon size={20} />
                  <span>{platform.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
