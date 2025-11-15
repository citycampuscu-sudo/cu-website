import { Mail, MapPin, Phone, Facebook, Youtube, MessageCircle } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function Contacts() {
  const { content, loading } = useContent();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="min-h-screen">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">{content.contacts?.pageTitle || 'Contact Us'}</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>{content.contacts?.pageSubtitle || "We'd Love to Hear from You"}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Have questions, prayer requests, or want to get involved? Reach out to us through any of these channels.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="space-y-6">
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
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    Email Us
                  </h3>
                  <a
                    href={`mailto:${content.contacts?.email || 'citycampusc.u@gmail.com'}`}
                    className="text-lg hover:underline"
                    style={{ color: '#b4712d' }}
                  >
                    {content.contacts?.email || 'citycampusc.u@gmail.com'}
                  </a>
                  <p className="text-gray-600 mt-2">
                    For general inquiries, prayer requests, or to join a ministry
                  </p>
                </div>
              </div>
            </div>

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
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    Visit Us
                  </h3>
                  <p className="text-lg text-gray-800 font-semibold">
                    {content.contacts?.location || 'Maseno University Kisumu Campus, 7th Floor, Kisumu City'}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Sunday Services: 8:00 AM - 10:30 AM
                  </p>
                </div>
              </div>
            </div>

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
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    Office Hours
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="text-lg">
                      <span className="font-semibold">Sunday:</span> 8:00 AM - 10:30 AM (Service)
                    </p>
                    <p className="text-lg">
                      <span className="font-semibold">Saturday:</span> 2:30 PM - 5:00 PM (Training & Practices)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div
              className="rounded-2xl shadow-xl p-8 h-full"
              style={{ backgroundColor: '#2e3e87' }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Connect on Social Media</h2>
              <p className="text-white text-lg mb-8">
                Follow us on social media for the latest updates, events, and inspiration.
              </p>

              <div className="space-y-4">
                <a
                  href="https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl hover:bg-opacity-20 transition-all duration-300"
                >
                  <Facebook className="text-white mr-4" size={32} />
                  <div>
                    <p className="text-white font-semibold text-lg">Facebook</p>
                    <p className="text-sm" style={{ color: '#b4712d' }}>Follow our page</p>
                  </div>
                </a>

                <a
                  href="https://youtube.com/@masenouniversitykisumucamp2013?si=58a9zMVbcGmLX98g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl hover:bg-opacity-20 transition-all duration-300"
                >
                  <Youtube className="text-white mr-4" size={32} />
                  <div>
                    <p className="text-white font-semibold text-lg">YouTube</p>
                    <p className="text-sm" style={{ color: '#b4712d' }}>Subscribe to our channel</p>
                  </div>
                </a>

                <a
                  href="https://vm.tiktok.com/ZMhVnv9Pb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl hover:bg-opacity-20 transition-all duration-300"
                >
                  <svg className="w-8 h-8 text-white mr-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                  <div>
                    <p className="text-white font-semibold text-lg">TikTok</p>
                    <p className="text-sm" style={{ color: '#b4712d' }}>Join us on TikTok</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 pt-8 border-t border-white border-opacity-20">
                <h3 className="text-xl font-bold text-white mb-4">Need Prayer?</h3>
                <p className="text-white mb-4">
                  We believe in the power of prayer. Send us your prayer requests and our intercessory team will lift you up.
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
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <Phone className="mx-auto mb-4" style={{ color: '#2e3e87' }} size={40} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
              Quick Response
            </h3>
            <p className="text-gray-600">
              We typically respond to emails within 24 hours
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <MapPin className="mx-auto mb-4" style={{ color: '#b4712d' }} size={40} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
              Easy to Find
            </h3>
            <p className="text-gray-600">
              Located on the 7th floor of the campus building
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg p-6 text-center">
            <MessageCircle className="mx-auto mb-4" style={{ color: '#2e3e87' }} size={40} />
            <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
              Always Welcome
            </h3>
            <p className="text-gray-600">
              Drop by during our service times or office hours
            </p>
          </div>
        </div>

        <div
          className="mt-16 rounded-2xl shadow-xl p-8 md:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #b4712d 0%, #8b5723 100%)' }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Join Us This Sunday</h2>
          <p className="text-white text-lg mb-6 max-w-2xl mx-auto">
            Experience worship, fellowship, and the Word of God. Everyone is welcome at MUKCCU.
          </p>
          <div className="text-white text-xl font-semibold">
            Sundays at 8:00 AM | 7th Floor, Maseno University Kisumu Campus
          </div>
        </div>
      </div>
    </div>
  );
}
