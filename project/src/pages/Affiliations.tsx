import { Link2, Users, BookOpen, Target } from 'lucide-react';

export default function Affiliations() {
  const affiliations = [
    {
      name: 'FOCUS Kenya',
      icon: Users,
      description: 'FOCUS Kenya is an umbrella organization that guides Christian Unions in universities, colleges, TVETS, and KMTC\'s across Kenya.',
      role: 'Provides spiritual guidance, training resources, and connects us with the broader Christian student movement in Kenya.',
      color: '#2e3e87',
    },
    {
      name: 'KSCF',
      icon: BookOpen,
      description: 'Kenya Students Christian Fellowship connects us with high schools for missions and weekend challenges.',
      role: 'Facilitates outreach programs to secondary schools, enabling us to share the Gospel with the next generation of students.',
      color: '#b4712d',
    },
  ];

  const benefits = [
    {
      icon: Link2,
      title: 'Network & Connection',
      description: 'Access to a nationwide network of Christian students and leaders',
    },
    {
      icon: Target,
      title: 'Training & Development',
      description: 'Regular training programs and leadership development opportunities',
    },
    {
      icon: Users,
      title: 'Resource Sharing',
      description: 'Access to ministry resources, materials, and best practices',
    },
    {
      icon: BookOpen,
      title: 'Mission Opportunities',
      description: 'Coordinated outreach programs to schools and communities',
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
          <h1 className="text-5xl font-bold mb-2">Affiliations</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>Part of a Greater Movement</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            MUKCCU is proud to be part of larger Christian movements that empower student ministries across Kenya. Together, we're stronger in reaching and discipling the next generation for Christ.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {affiliations.map((affiliation, index) => {
            const Icon = affiliation.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="flex flex-col md:flex-row">
                  <div
                    className="md:w-64 p-8 flex flex-col items-center justify-center text-white"
                    style={{ backgroundColor: affiliation.color }}
                  >
                    <Icon size={64} className="mb-4" />
                    <h3 className="text-3xl font-bold text-center">{affiliation.name}</h3>
                  </div>
                  <div className="flex-1 p-8">
                    <div className="mb-6">
                      <h4 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                        About
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {affiliation.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                        Their Role in Our Ministry
                      </h4>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {affiliation.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Benefits of Our Affiliations
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  style={{ borderTop: '4px solid #b4712d' }}
                >
                  <div className="flex items-start">
                    <div
                      className="p-3 rounded-xl mr-4 flex-shrink-0"
                      style={{ backgroundColor: '#2e3e87' }}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
                        {benefit.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="rounded-2xl shadow-xl p-8"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">Working Together</h2>
            <p className="text-white text-lg mb-6 leading-relaxed">
              Through our affiliations, MUKCCU participates in joint events, training programs, and outreach initiatives. We're part of a movement that's transforming campuses and communities across Kenya.
            </p>
            <ul className="space-y-3 text-white">
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span>Regional and national conferences</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span>High school mission trips</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span>Leadership training programs</span>
              </li>
              <li className="flex items-start">
                <div
                  className="w-2 h-2 rounded-full mt-2 mr-4 flex-shrink-0"
                  style={{ backgroundColor: '#b4712d' }}
                ></div>
                <span>Shared resources and materials</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Impact Together
            </h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              Our partnerships enable us to reach further and impact more lives for Christ. Through coordinated efforts, we're able to:
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-1" style={{ color: '#2e3e87' }}>
                  Reach More Students
                </p>
                <p className="text-gray-600 text-sm">
                  Connect with thousands of students across Kenya
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-1" style={{ color: '#2e3e87' }}>
                  Strengthen Leadership
                </p>
                <p className="text-gray-600 text-sm">
                  Develop strong Christian leaders through mentorship
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-1" style={{ color: '#2e3e87' }}>
                  Share Best Practices
                </p>
                <p className="text-gray-600 text-sm">
                  Learn from successful ministries nationwide
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow">
                <p className="font-semibold mb-1" style={{ color: '#2e3e87' }}>
                  Multiply Impact
                </p>
                <p className="text-gray-600 text-sm">
                  Coordinate efforts for greater Kingdom impact
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="rounded-2xl shadow-xl p-8 md:p-12 text-center"
          style={{ background: 'linear-gradient(135deg, #b4712d 0%, #8b5723 100%)' }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Stronger Together
          </h2>
          <p className="text-white text-lg mb-6 max-w-3xl mx-auto">
            Our affiliations with FOCUS Kenya and KSCF strengthen our ministry and expand our reach. Together, we're building a generation of committed disciples who will transform their communities and the world for Christ.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white rounded-full font-semibold" style={{ color: '#2e3e87' }}>
              Part of FOCUS Kenya
            </div>
            <div className="px-6 py-3 bg-white rounded-full font-semibold" style={{ color: '#2e3e87' }}>
              Connected with KSCF
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
