import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  Youtube,
  MessageCircle,
  Share2,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../hooks/useContent';

export default function Connect() {
  const { content, loading } = useContent();

  const socialPlatforms = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v',
      description:
        'Follow us on Facebook for daily inspiration, event updates, prayer requests, and community engagement.',
      color: '#2e3e87',
      action: 'Follow Us',
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@masenouniversitycitycamp2013',
      description:
        'Subscribe to our YouTube channel for sermon recordings, worship sessions, testimonies, and more.',
      color: '#b4712d',
      action: 'Subscribe',
    },
    {
      name: 'TikTok',
      icon: Share2,
      url: 'https://vm.tiktok.com/ZMhVnv9Pb/',
      description:
        'Join us on TikTok for short, engaging Gospel-centered content.',
      color: '#2e3e87',
      action: 'Join Us',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>
          MUKCCU Connect | Maseno University City Campus Christian Union
        </title>
        <meta
          name="description"
          content="Connect with Maseno University City Campus Christian Union (MUKCCU) through email, social media, prayer requests, and in-person fellowship."
        />
        <meta
          name="keywords"
          content="MUKCCU contact, MUKCCU social media, Maseno University City Campus Christian Union contact, MUKCCU Facebook, MUKCCU YouTube, MUKCCU TikTok"
        />
        <meta property="og:title" content="MUKCCU Connect" />
        <meta
          property="og:description"
          content="Connect with MUKCCU through email, social media, prayer requests, and fellowship."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/connect" />
      </Helmet>

      {/* HERO */}
      <div
        className="relative h-72 md:h-80 flex items-center justify-center text-white"
        style={{
          background:
            'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
        }}
      >
        <div className="text-center px-4">
          <p
            className="text-sm md:text-base font-semibold uppercase tracking-[0.25em] mb-3"
            style={{ color: '#b4712d' }}
          >
            Stay Connected
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-3">
            Connect
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            We&apos;d Love to Hear from You
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* INTRO */}
        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions, prayer requests, or want to get involved? Reach out
            to us through any of these channels and stay connected with the
            MUKCCU community.
          </p>
        </div>

        {/* CONTACT DETAILS + SOCIAL MEDIA */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
            {/* EMAIL */}
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              style={{ borderTop: '4px solid #2e3e87' }}
            >
              <div className="flex items-start">
                <div
                  className="p-4 rounded-xl mr-6"
                  style={{ backgroundColor: '#2e3e87' }}
                >
                  <Mail className="text-white" size={32} />
                </div>

                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#2e3e87' }}
                  >
                    Email Us
                  </h3>

                  <a
                    href={`mailto:${
                      content.contacts?.email || 'citycampusc.u@gmail.com'
                    }`}
                    className="text-lg hover:underline break-all"
                    style={{ color: '#b4712d' }}
                  >
                    {content.contacts?.email || 'citycampusc.u@gmail.com'}
                  </a>

                  <p className="text-gray-600 mt-2">
                    For general inquiries, prayer requests, or to join a
                    ministry.
                  </p>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              style={{ borderTop: '4px solid #b4712d' }}
            >
              <div className="flex items-start">
                <div
                  className="p-4 rounded-xl mr-6"
                  style={{ backgroundColor: '#b4712d' }}
                >
                  <MapPin className="text-white" size={32} />
                </div>

                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#2e3e87' }}
                  >
                    Visit Us
                  </h3>

                  <p className="text-lg text-gray-800 font-semibold">
                    {content.contacts?.location ||
                      'Maseno University Kisumu Campus, 7th Floor, Kisumu City'}
                  </p>

                  <p className="text-gray-600 mt-2">
                    Sunday Services: 8:00 AM - 10:30 AM
                  </p>
                </div>
              </div>
            </div>

            {/* OFFICE HOURS */}
            <div
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
              style={{ borderTop: '4px solid #2e3e87' }}
            >
              <div className="flex items-start">
                <div
                  className="p-4 rounded-xl mr-6"
                  style={{ backgroundColor: '#2e3e87' }}
                >
                  <MessageCircle className="text-white" size={32} />
                </div>

                <div className="flex-1">
                  <h3
                    className="text-2xl font-bold mb-3"
                    style={{ color: '#2e3e87' }}
                  >
                    Office Hours
                  </h3>

                  <div className="space-y-2 text-gray-700">
                    <p className="text-lg">
                      <span className="font-semibold">Sunday:</span> 8:00 AM -
                      10:30 AM (Service)
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Saturday:</span> 2:30 PM -
                      5:00 PM (Training &amp; Practices)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SOCIAL MEDIA */}
          <div
            className="rounded-2xl shadow-xl p-8 h-full"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Connect on Social Media
            </h2>

            <p className="text-white text-lg mb-8">
              Follow us on social media for the latest updates, events,
              sermons, and inspiration.
            </p>

            <div className="space-y-4">
              {socialPlatforms.map((platform, index) => {
                const Icon = platform.icon;

                return (
                  <a
                    key={index}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl hover:bg-opacity-20 transition-all duration-300"
                  >
                    <Icon className="text-white mr-4" size={32} />

                    <div>
                      <p className="text-white font-semibold text-lg">
                        {platform.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: '#b4712d' }}
                      >
                        {platform.action}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* PRAYER */}
            <div className="mt-8 pt-8 border-t border-white border-opacity-20">
              <h3 className="text-xl font-bold text-white mb-4">
                Need Prayer?
              </h3>

              <p className="text-white mb-4">
                We believe in the power of prayer. Send us your prayer requests
                and our intercessory team will lift you up.
              </p>

              <a
                href="mailto:citycampusc.u@gmail.com?subject=Prayer%20Request"
                className="inline-block px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: '#b4712d', color: 'white' }}
              >
                Submit Prayer Request
              </a>
            </div>
          </div>
        </section>

        {/* ONLINE COMMUNITY */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p
              className="font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#b4712d' }}
            >
              Stay Connected
            </p>

            <h2
              className="text-4xl font-bold"
              style={{ color: '#2e3e87' }}
            >
              Find Us Online
            </h2>
          </div>

          <div className="space-y-6">
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
                      <h3
                        className="text-3xl font-bold mb-4"
                        style={{ color: '#2e3e87' }}
                      >
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
                        {platform.action}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WHAT YOU'LL FIND + COMMUNITY */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="rounded-2xl shadow-xl p-8"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              What You&apos;ll Find
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
            <h2
              className="text-3xl font-bold mb-6"
              style={{ color: '#2e3e87' }}
            >
              Join the Conversation
            </h2>

            <p className="text-gray-700 mb-4">
              Our platforms are more than updates — they are a growing
              community of believers sharing faith and encouragement.
            </p>

            <p className="text-gray-700">
              Engage, share, and stay connected with MUKCCU online.
            </p>
          </div>
        </section>

        {/* QUICK CONTACT */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <Phone
              className="mx-auto mb-4"
              style={{ color: '#2e3e87' }}
              size={40}
            />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: '#2e3e87' }}
            >
              Quick Response
            </h3>
            <p className="text-gray-600">
              We typically respond to emails within 24 hours.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <MapPin
              className="mx-auto mb-4"
              style={{ color: '#b4712d' }}
              size={40}
            />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: '#2e3e87' }}
            >
              Easy to Find
            </h3>
            <p className="text-gray-600">
              Located on the 7th floor of the campus building.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <MessageCircle
              className="mx-auto mb-4"
              style={{ color: '#2e3e87' }}
              size={40}
            />
            <h3
              className="text-xl font-bold mb-2"
              style={{ color: '#2e3e87' }}
            >
              Always Welcome
            </h3>
            <p className="text-gray-600">
              Drop by during our service times or office hours.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section
          className="rounded-2xl shadow-xl p-8 md:p-12 text-center"
          style={{
            background:
              'linear-gradient(135deg, #b4712d 0%, #8b5723 100%)',
          }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Join Us This Sunday
          </h2>

          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Experience worship, fellowship, and the Word of God. Everyone is
            welcome at MUKCCU.
          </p>

          <div className="text-white text-xl font-semibold">
            Sundays at 8:00 AM | 7th Floor, Maseno University Kisumu Campus
          </div>
        </section>
      </div>
    </div>
  );
}
