import { Target, Heart, Users, Book, Cross, Globe } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function About() {
  const { content, loading } = useContent();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  const coreValues = [
    { icon: Cross, title: 'Godliness', description: 'Living in reverence and devotion to God in all aspects of our lives' },
    { icon: Target, title: 'Integrity', description: 'Upholding truth, righteousness, and moral principles in our conduct' },
    { icon: Users, title: 'Unity', description: 'Standing together in Christ as one body, supporting one another' },
    { icon: Book, title: 'Excellence', description: 'Pursuing the best in all we do for the glory of God' },
  ];

  const objectives = [
    { icon: Heart, title: 'Discipleship', description: 'Growing and nurturing believers in their walk with Christ' },
    { icon: Globe, title: 'Mission', description: 'Reaching out to campuses and communities with the Gospel' },
    { icon: Cross, title: 'Evangelism', description: 'Proclaiming the good news of Jesus Christ to all' },
    { icon: Users, title: 'Leadership Development', description: 'Equipping and empowering servant leaders for the Kingdom' },
  ];

  return (
    <div className="min-h-screen">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">{content.about?.pageTitle || 'About MUKCCU'}</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>{content.about?.pageSubtitle || 'Pursuing Holiness'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              The full name of the Christian Union is <span className="font-semibold" style={{ color: '#2e3e87' }}>Maseno University Kisumu Campus Christian Union (MUKCCU)</span> and our motto is <span className="font-semibold" style={{ color: '#b4712d' }}>Pursuing Holiness</span>.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-6 rounded-xl" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #2e3e87' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>Vision</h3>
                <p className="text-gray-700">{content.about?.vision || 'To live as true disciples of Jesus Christ'}</p>
              </div>
              <div className="p-6 rounded-xl" style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #b4712d' }}>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>Mission</h3>
                <p className="text-gray-700">{content.about?.mission || 'To nurture belief in Christ and develop Christ-like character amongst students and communities'}</p>
              </div>
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
                  className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white group"
                >
                  <Icon
                    className="mb-4 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: '#2e3e87' }}
                    size={40}
                  />
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Our Objectives
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {objectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
                  style={{ borderTop: '4px solid #b4712d' }}
                >
                  <Icon className="mb-4" style={{ color: '#2e3e87' }} size={40} />
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    {obj.title}
                  </h3>
                  <p className="text-gray-700 text-lg">{obj.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <div
            className="rounded-2xl shadow-xl p-8 md:p-12"
            style={{ background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)' }}
          >
            <h2 className="text-4xl font-bold mb-8 text-white text-center">
              Our History
            </h2>
            <div className="prose prose-lg max-w-none text-white">
              <p className="text-lg leading-relaxed mb-4">
                Maseno University Kisumu Campus Christian Union was established in prayer long before it came to be. It was established through prayer by people who believed in God and had passion for the young generation (they were not students themselves). They prayed and fasted day and night for its establishment. They even walked, not once, up and down the stairs dedicating the campus to God.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                In <span className="font-semibold" style={{ color: '#b4712d' }}>January 2014</span>, their prayers were answered when 3 students (<span className="font-semibold">Sammy Moraya, Nicodemus Makanu and Liz Wangu</span>) were appointed to foresee the establishment of the Christian Union. They nominated other students to help them in the quest and operation.
              </p>
              <p className="text-lg leading-relaxed mb-4">
                Through God's help and determination, they were able to organize prayer and bible study meetings. The CU started growing steadily till about November 2014 when the CU held its Kesha, though outside the university premises.
              </p>
              <p className="text-lg leading-relaxed">
                On <span className="font-semibold" style={{ color: '#b4712d' }}>February 2015</span>, the CU launched its first Sunday service with fully operational Executive Committee. Since then, the CU has grown enormously in terms of numbers, spiritual growth, structures and activities.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl shadow-xl bg-white">
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#2e3e87' }}>
              Color Branding
            </h3>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full shadow-lg mb-2"
                  style={{ backgroundColor: '#2e3e87' }}
                ></div>
                <p className="text-sm font-semibold">#2e3e87</p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full shadow-lg mb-2"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <p className="text-sm font-semibold">#b4712d</p>
              </div>
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full shadow-lg mb-2 border-2"
                  style={{ backgroundColor: '#ffffff', borderColor: '#2e3e87' }}
                ></div>
                <p className="text-sm font-semibold">#ffffff</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
