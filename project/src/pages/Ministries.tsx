import { Music, Camera, Users, Globe, Book, Heart, HeartHandshake, Award } from 'lucide-react';
import { useContent } from '../hooks/useContent';

interface MinistriesProps {
  onNavigate: (page: string) => void;
}

export default function Ministries({ onNavigate }: MinistriesProps) {
  const { content, loading } = useContent();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  const iconMap = {
    Music,
    Camera,
    Users,
    Globe,
    Book,
    Heart,
    HeartHandshake,
    Award
  };
  
  const defaultMinistries = [
    {
      icon: 'Music',
      name: 'Board Ministry',
      description: 'Comprises the Praise and worship, Choir, Creative ministry and instrumentalists. Responsible for plays, connecting and handling instruments, praise and worship sessions, choir, and worship experiences.',
      leader: 'Board Director',
      activities: 'Praise & worship, choir practice, instrument training'
    },
    {
      icon: 'Camera',
      name: 'Media and IT',
      description: 'Responsible for church photography, poster designing, livestreaming, screen presentations, publicity, and managing social media pages.',
      leader: 'Media Coordinator',
      activities: 'Photography, livestreaming, social media management'
    },
    {
      icon: 'HeartHandshake',
      name: 'Hospitality Ministry',
      description: 'Responsible for welfare of the CU, ushering and catering in all CU events.',
      leader: 'Hospitality Director',
      activities: 'Ushering, catering, welfare coordination'
    },
    {
      icon: 'Globe',
      name: 'Missions Ministry',
      description: 'Responsible for high school missions, outreach to hostels, inreach to classes, and weekend challenges.',
      leader: 'Missions Coordinator',
      activities: 'High school missions, campus outreach, evangelism'
    },
    {
      icon: 'Book',
      name: 'Bible Study Ministry',
      description: 'Responsible for Bible studies and trivia sessions.',
      leader: 'Bible Study Coordinator',
      activities: 'Bible studies, trivia sessions, teaching'
    },
    {
      icon: 'Users',
      name: 'Discipleship Ministry',
      description: 'Responsible for nurturing of new believers, guidance and counselling, CU library and first year\'s orientation to the CU.',
      leader: 'Discipleship Coordinator',
      activities: 'Mentoring, counselling, library management'
    },
    {
      icon: 'Heart',
      name: 'Intercessory Ministry',
      description: 'Responsible for all prayer meetings of the CU, prayer retreats and Kesha.',
      leader: 'Prayer Coordinator',
      activities: 'Prayer meetings, intercession, prayer retreats'
    },
  ];
  
  const ministries = content.ministries?.list || defaultMinistries;

  return (
    <div className="min-h-screen">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">{content.ministries?.pageTitle || 'Ministries'}</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>{content.ministries?.pageSubtitle || 'Serving God Through Diverse Gifts'}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Every believer is gifted for service. Our ministries provide opportunities to use your talents and passions to build up the body of Christ and reach the lost.
          </p>
        </div>

        <div className="space-y-6">
          {ministries.map((ministry: any, index: number) => {
            const Icon = iconMap[ministry.icon as keyof typeof iconMap] || Heart;
            return (
              <div
                key={index}
                className="flex items-start bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group"
                style={{ borderLeft: '6px solid #b4712d' }}
              >
                <div
                  className="p-4 rounded-xl mr-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: '#2e3e87' }}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-opacity-80 transition-opacity" style={{ color: '#2e3e87' }}>
                    {ministry.name}
                  </h3>
                  {ministry.leader && (
                    <p className="text-sm font-semibold mb-2" style={{ color: '#b4712d' }}>
                      Led by: {ministry.leader}
                    </p>
                  )}
                  <p className="text-gray-700 text-lg leading-relaxed mb-3">
                    {ministry.description}
                  </p>
                  {ministry.activities && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-600 mb-1">Key Activities:</p>
                      <p className="text-sm text-gray-700">{ministry.activities}</p>
                    </div>
                  )}
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        const phone = ministry.contact || '+254700000000';
                        const message = `Hi! I would like to join the ${ministry.name}. Please provide me with more information about how to get involved. Thank you!`;
                        const whatsappUrl = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
                        window.open(whatsappUrl, '_blank');
                      }}
                      className="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                      style={{ backgroundColor: '#25D366', color: 'white' }}
                    >
                      Join via WhatsApp
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <div
            className="inline-block p-8 rounded-2xl shadow-xl"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Serve?
            </h3>
            <p className="text-white text-lg mb-6 max-w-xl">
              Join a ministry and use your God-given talents to make an impact for the Kingdom. Every member is vital to the body of Christ.
            </p>
            <button
              onClick={() => onNavigate('Contacts')}
              className="px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#b4712d', color: 'white' }}
            >
              Join a Ministry
            </button>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#2e3e87' }}>
            Ministry Opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <Music className="mx-auto mb-4" style={{ color: '#b4712d' }} size={40} />
              <h4 className="font-bold text-lg mb-2" style={{ color: '#2e3e87' }}>
                Creative Arts
              </h4>
              <p className="text-gray-600">Use music, drama, and arts to worship and inspire</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <Globe className="mx-auto mb-4" style={{ color: '#b4712d' }} size={40} />
              <h4 className="font-bold text-lg mb-2" style={{ color: '#2e3e87' }}>
                Outreach
              </h4>
              <p className="text-gray-600">Share the Gospel in campuses and communities</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <Heart className="mx-auto mb-4" style={{ color: '#b4712d' }} size={40} />
              <h4 className="font-bold text-lg mb-2" style={{ color: '#2e3e87' }}>
                Prayer
              </h4>
              <p className="text-gray-600">Intercede for the body and the world</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
