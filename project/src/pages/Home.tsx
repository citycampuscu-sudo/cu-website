import { Book, Heart, Users, Target, Calendar, MapPin } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useState } from 'react';
import MemberRegistrationModal from '../components/MemberRegistrationModal';
interface HomeProps {
  onNavigate: (page: string) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const { content, loading } = useContent();
  const [showMemberModal, setShowMemberModal] = useState(false);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  const coreValues = [
    { icon: Heart, title: 'Godliness', description: 'Living in reverence and devotion to God' },
    { icon: Target, title: 'Integrity', description: 'Upholding truth and righteousness' },
    { icon: Users, title: 'Unity', description: 'Standing together in Christ' },
    { icon: Book, title: 'Excellence', description: 'Pursuing the best in all we do' },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="relative min-h-[450px] md:h-[500px] flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: 'url(/gallery/IMG_0174_transcpr.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
  Maseno University Kisumu Campus Christian Union
</h1>

<h2
  className="text-xl md:text-2xl mb-3"
  style={{ color: '#b4712d' }}
>
  Welcome to MUKCCU
</h2>
          
          <p className="text-2xl font-semibold mb-8">
            {content.home?.welcomeText || 'Pursuing Holiness'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
  <button
    onClick={() => onNavigate('About')}
    className="px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
    style={{ backgroundColor: '#b4712d', color: 'white' }}
  >
    Learn More
  </button>

  <button
    onClick={() => setShowMemberModal(true)}
    className="px-8 py-3 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
    style={{ backgroundColor: '#25D366', color: 'white' }}
  >
    Join CU
  </button>
</div>
      </div>
    </div>

    <section className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-lg text-gray-700 leading-relaxed">
          Maseno University Kisumu Campus Christian Union (MUKCCU) is a vibrant
          fellowship of students committed to knowing Christ, growing in faith,
          and serving God with excellence. Our mission is to nurture belief in
          Christ and develop Christ-like character among students and the wider
          community through worship, discipleship, prayer, Bible study,
          evangelism, leadership development, and fellowship.Maseno University Kisumu Campus Christian Union was established in prayer long before it came to be. It was established through prayer by people who believed in God and had passion for the young generation (they were not students themselves). They prayed and fasted day and night for its establishment. They even walked, not once, up and down the stairs dedicating the campus to God.On February 2015, the CU launched its first Sunday service with fully operational Executive Committee. Since then, the CU has grown enormously in terms of numbers, spiritual growth, structures and activities.We provide a welcoming environment where students can build meaningful friendships,
          discover their God-given purpose, and grow spiritually while pursuing
          academic excellence. Through weekly services, small group fellowships,
          mentorship programs, outreach activities, missions, conferences, and
          community engagement initiatives, MUKCCU seeks to impact lives and
          transform society with the love of Christ. Whether you are a new
          student, continuing student, alumnus, or visitor, you are welcome to
          join our family as we pursue holiness, unity, integrity, godliness,
          and excellence. Explore our ministries, upcoming events, leadership,
          and activities, and become part of a community dedicated to living as
          true disciples of Jesus Christ.
        </p>
      </div>
    </section>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            Scripture of the Week
          </h2>
          <div
            className="max-w-3xl mx-auto p-8 rounded-2xl shadow-xl"
            style={{ backgroundColor: '#f8f9fa', borderLeft: '6px solid #b4712d' }}
          >
            <p className="text-xl italic mb-4 text-gray-700">
              "But seek first his kingdom and his righteousness, and all these things will be given to you as well."
            </p>
            <p className="font-semibold" style={{ color: '#2e3e87' }}>
              Matthew 6:33
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Our Vision & Mission
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#2e3e87' }}>
              <div className="flex items-center mb-4">
                <Target className="mr-3" style={{ color: '#b4712d' }} size={32} />
                <h3 className="text-2xl font-bold text-white">Vision</h3>
              </div>
              <p className="text-white text-lg">
                To live as true disciples of Jesus Christ
              </p>
            </div>
            <div className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2" style={{ backgroundColor: '#b4712d' }}>
              <div className="flex items-center mb-4">
                <Heart className="mr-3 text-white" size={32} />
                <h3 className="text-2xl font-bold text-white">Mission</h3>
              </div>
              <p className="text-white text-lg">
                To nurture belief in Christ and develop Christ-like character amongst students and communities
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Our Core Values
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
                  style={{ borderTop: '4px solid #b4712d' }}
                >
                  <Icon className="mb-4" style={{ color: '#2e3e87' }} size={40} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl shadow-lg bg-white">
            <div className="flex items-center mb-4">
              <Calendar className="mr-3" style={{ color: '#b4712d' }} size={32} />
              <h3 className="text-2xl font-bold" style={{ color: '#2e3e87' }}>
                Join Us for Worship
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Sunday Service: 8:00 AM - 10:30 AM
            </p>
            <button
              onClick={() => onNavigate('Weekly Activities')}
              className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#2e3e87' }}
            >
              View Schedule
            </button>
          </div>

          <div className="p-8 rounded-2xl shadow-lg bg-white">
            <div className="flex items-center mb-4">
              <MapPin className="mr-3" style={{ color: '#b4712d' }} size={32} />
              <h3 className="text-2xl font-bold" style={{ color: '#2e3e87' }}>
                Visit Us
              </h3>
            </div>
            <p className="text-lg text-gray-700 mb-4">
              Maseno University Kisumu Campus, 7th Floor, Kisumu City
            </p>
            <button
              onClick={() => onNavigate('Contacts')}
              className="px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#2e3e87' }}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      <MemberRegistrationModal
        isOpen={showMemberModal}
        onClose={() => setShowMemberModal(false)}
      />
    </div>
  );
}
