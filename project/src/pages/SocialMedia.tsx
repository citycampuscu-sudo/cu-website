import { Facebook, Youtube, Share2 } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function SocialMedia() {
  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v',
      description:
        'Follow us on Facebook for daily inspiration, event updates, prayer requests, and community engagement.',
      color: '#2e3e87',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@masenouniversitycitycamp2013',
      description:
        'Subscribe to our YouTube channel for sermon recordings, worship sessions, testimonies, and more.',
      color: '#b4712d',
    },
    {
      name: 'TikTok',
      icon: Share2,
      url: 'https://vm.tiktok.com/ZMhVnv9Pb/',
      description:
        'Join us on TikTok for short, engaging Gospel-centered content.',
      color: '#2e3e87',
    },
  ];

  return (
    <div className="min-h-screen">

      {/* SEO META TAGS */}
      <Helmet>
        <title>MUKCCU Social Media | Maseno University City Campus Christian Union</title>
        <meta
          name="description"
          content="Stay connected with Maseno University City Campus Christian Union (MUKCCU) on Facebook, YouTube, and TikTok for sermons, updates, and fellowship content."
        />
        <meta
          name="keywords"
          content="MUKCCU social media, Maseno University City Campus Christian Union Facebook, Maseno University City Campus YouTube, MUKCCU TikTok"
        />

        {/* Open Graph */}
        <meta property="og:title" content="MUKCCU Social Media" />
        <meta property="og:description" content="Follow MUKCCU on social platforms for sermons, updates, and inspiration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/social-media" />
      </Helmet>

      {/* HEADER */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">Social Media</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>
            Stay Connected with Us Online
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join our online community and stay updated with sermons, events,
            testimonies, and daily inspiration.
          </p>
        </div>

        {/* SOCIAL PLATFORMS */}
        <div className="space-y-6 mb-16">
          {socialPlatforms.map((platform, index) => {
            const Icon = platform.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
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

                    <p className="text-gray-700 text-lg mb-6">
                      {platform.description}
                    </p>

                    <a
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-8 py-3 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-all duration-300"
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

        {/* INFO SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="rounded-2xl shadow-xl p-8" style={{ backgroundColor: '#2e3e87' }}>
            <h2 className="text-3xl font-bold text-white mb-6">
              What You'll Find
            </h2>

            <ul className="space-y-4 text-white">
              <li>📺 Sermon recordings and live streams</li>
              <li>📢 Event announcements and updates</li>
              <li>📖 Daily devotionals and scriptures</li>
              <li>🙏 Prayer requests and testimonies</li>
              <li>🎤 Worship sessions and inspiration</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Join the Conversation
            </h2>

            <p className="text-gray-700 mb-4">
              Our platforms are more than updates — they are a growing community
              of believers sharing faith and encouragement.
            </p>

            <p className="text-gray-700">
              Engage, share, and stay connected with MUKCCU online.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl shadow-xl p-10 text-center"
          style={{
            background: 'linear-gradient(135deg, #b4712d 0%, #8b5723 100%)',
          }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Share the Good News
          </h2>

          <p className="text-white mb-8">
            Help spread the Gospel by following and sharing our content.
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
                  className="px-6 py-3 bg-white rounded-full font-semibold flex items-center gap-2 hover:scale-105 transition-all duration-300"
                  style={{ color: '#2e3e87' }}
                >
                  <Icon size={20} />
                  {platform.name}
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
