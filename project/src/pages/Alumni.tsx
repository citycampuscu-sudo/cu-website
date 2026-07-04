import { Helmet } from 'react-helmet-async';
import {
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  Handshake,
  Globe,
  CheckCircle,
} from 'lucide-react';

export default function Alumni() {
  const benefits = [
    {
      icon: Users,
      title: 'Networking',
      description:
        'Connect with fellow MUKCCU alumni across different professions and regions.',
    },
    {
      icon: Heart,
      title: 'Fellowship',
      description:
        'Remain rooted in Christian fellowship through alumni gatherings and prayer.',
    },
    {
      icon: GraduationCap,
      title: 'Mentorship',
      description:
        'Guide current students spiritually, academically and professionally.',
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description:
        'Share opportunities, advice and professional experiences.',
    },
    {
      icon: Handshake,
      title: 'Support the Ministry',
      description:
        'Partner with MUKCCU through prayer, service and giving.',
    },
    {
      icon: Globe,
      title: 'Kingdom Impact',
      description:
        'Continue influencing society with Christ-like leadership wherever God has placed you.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          MUKCCU Alumni | Maseno University Kisumu Campus Christian Union
        </title>

        <meta
          name="description"
          content="Connect with MUKCCU alumni, mentor students, attend alumni events and continue pursuing holiness together."
        />
      </Helmet>

      {/* HERO */}

      <section
        className="relative h-[75vh] flex items-center justify-center text-white"
        style={{
          background:
            'linear-gradient(135deg,#2e3e87 0%,#1a2351 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            MUKCCU Alumni
          </h1>

          <p className="text-2xl text-[#b4712d] font-semibold mb-6">
            Once a MUKCCU Member, Always Family
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            Stay connected with fellow alumni, mentor the next generation,
            strengthen lifelong friendships, and continue serving Christ
            wherever God has placed you.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
              className="px-8 py-4 rounded-xl font-semibold text-white transition hover:scale-105"
              style={{ backgroundColor: '#b4712d' }}
            >
              Join the Alumni Network
            </button>

            <button className="px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-[#2e3e87] transition">
              Meet Our Alumni
            </button>
          </div>
        </div>
      </section>

      {/* WELCOME */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="/images/alumni-group.jpg"
              alt="MUKCCU Alumni"
              className="rounded-2xl shadow-xl object-cover w-full h-[450px]"
            />
          </div>

          <div>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: '#2e3e87' }}
            >
              Welcome Home
            </h2>

            <p className="text-gray-700 leading-8 mb-6">
              Graduating from Maseno University does not mean graduating from
              MUKCCU. The Alumni Network exists to keep former members connected
              through fellowship, mentorship, professional networking, prayer,
              and ministry.
            </p>

            <p className="text-gray-700 leading-8 mb-8">
              Whether you graduated recently or many years ago, you remain an
              important part of our family. Together we continue pursuing
              holiness while making a lasting impact for Christ.
            </p>

            <div className="space-y-4">
              {[
                'Christian Fellowship',
                'Mentorship',
                'Professional Networking',
                'Service & Ministry',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={22} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR IMPACT */}

      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-6xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center mb-14"
            style={{ color: '#2e3e87' }}
          >
            Our Impact
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              ['200+', 'Alumni'],
              ['15+', 'Graduation Classes'],
              ['10+', 'Schools Represented'],
            ].map(([number, label]) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow-lg p-8 text-center"
              >
                <h3
                  className="text-5xl font-bold mb-3"
                  style={{ color: '#b4712d' }}
                >
                  {number}
                </h3>

                <p className="text-gray-700 font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY JOIN */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center mb-14"
            style={{ color: '#2e3e87' }}
          >
            Why Join the Alumni Network?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-2xl shadow-lg p-8 hover:-translate-y-2 transition duration-300"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: '#2e3e87' }}
                  >
                    <Icon className="text-white" size={30} />
                  </div>

                  <h3
                    className="text-2xl font-semibold mb-4"
                    style={{ color: '#2e3e87' }}
                  >
                    {benefit.title}
                  </h3>

                  <p className="text-gray-600 leading-7">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
