import { Helmet } from 'react-helmet-async';
import {
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  Globe,
  CheckCircle,
} from 'lucide-react';
import { useState } from 'react';
import { createAlumni } from '../hooks/useSupabaseAlumni';
import { useSupabaseAlumniEvents } from '../hooks/useSupabaseAlumniEvents';

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
      icon: Heart,
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

  const [loading, setLoading] = useState(false);
  const { events, loading: eventsLoading } = useSupabaseAlumniEvents();
  const [copied, setCopied] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    course: '',
    graduation_year: '',
    occupation: '',
    location: '',
    church: '',
    mentor: false,
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createAlumni({
        ...formData,
        graduation_year: Number(formData.graduation_year),
      });

      alert('Thank you for joining the MUKCCU Alumni Network!');

      setFormData({
        full_name: '',
        email: '',
        phone: '',
        course: '',
        graduation_year: '',
        occupation: '',
        location: '',
        church: '',
        mentor: false,
        message: '',
      });
    } catch (error) {
      console.error(error);
      alert('Registration failed. Please try again.');
    }

    setLoading(false);
  };

  const copyText = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(field);

      setTimeout(() => {
        setCopied('');
      }, 2000);
    } catch (err) {
      alert('Failed to copy.');
    }
  };

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
          background: 'linear-gradient(135deg,#2e3e87 0%,#1a2351 100%)',
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
              onClick={() =>
                document
                  .getElementById('join-alumni')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-xl font-semibold text-white transition hover:scale-105"
              style={{ backgroundColor: '#b4712d' }}
            >
              Join the Alumni Network
            </button>

            <button
              onClick={() =>
                document
                  .getElementById('alumni-gallery')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              className="px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-[#2e3e87] transition"
            >
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

      {/* ALUMNI GALLERY */}
      <section id="alumni-gallery" className="py-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#2e3e87' }}
            >
              Alumni Gallery
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Celebrating moments of fellowship, conferences, outreach,
              graduations and lifelong friendships built through MUKCCU.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              'gallery1.jpg',
              'gallery2.jpg',
              'gallery3.jpg',
              'gallery4.jpg',
              'gallery5.jpg',
              'gallery6.jpg',
              'gallery7.jpg',
              'gallery8.jpg',
            ].map((image) => (
              <div
                key={image}
                className="overflow-hidden rounded-2xl shadow-lg group"
              >
                <img
                  src={`/images/${image}`}
                  alt="MUKCCU Alumni"
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING ALUMNI EVENTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#2e3e87' }}
            >
              Upcoming Alumni Events
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto">
              Stay connected through reunions, fellowship, mentorship,
              networking and ministry events organized by the MUKCCU Alumni
              Network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventsLoading ? (
              <div className="text-center py-16">
                <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#2e3e87] border-t-transparent"></div>

                <p className="mt-4 text-gray-600">
                  Loading upcoming events...
                </p>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-16">
                <h3
                  className="text-2xl font-semibold mb-3"
                  style={{ color: '#2e3e87' }}
                >
                  No Upcoming Events
                </h3>

                <p className="text-gray-600 max-w-xl mx-auto">
                  There are currently no scheduled alumni events.
                  Please check back later or join the Alumni Network to
                  receive notifications whenever new events are announced.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 col-span-full">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#f8f9fa] rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300"
                  >
                    {event.image && (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-52 object-cover"
                      />
                    )}

                    <div className="p-8">
                      <span
                        className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-5"
                        style={{ backgroundColor: '#b4712d' }}
                      >
                        {event.event_date}
                      </span>

                      <h3
                        className="text-2xl font-bold mb-3"
                        style={{ color: '#2e3e87' }}
                      >
                        {event.title}
                      </h3>

                      <p className="text-gray-500 mb-2">
                        📍 {event.venue}
                      </p>

                      <p className="text-gray-500 mb-4">
                        🕒 {event.event_time}
                      </p>

                      <p className="text-gray-600 leading-7 mb-6">
                        {event.description}
                      </p>

                      {event.registration_link && (
                        <a
                          href={event.registration_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-6 py-3 rounded-lg text-white font-semibold"
                          style={{ backgroundColor: '#2e3e87' }}
                        >
                          Register
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* JOIN ALUMNI NETWORK */}
      <section id="join-alumni" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2
              className="text-4xl font-bold mb-4"
              style={{ color: '#2e3e87' }}
            >
              Join the Alumni Network
            </h2>

            <p className="text-gray-600 max-w-3xl mx-auto leading-8">
              Keep your connection with MUKCCU alive. Register today to receive
              alumni news, event invitations, mentorship opportunities and ministry
              updates.
            </p>
          </div>

          <div className="bg-[#f8f9fa] rounded-3xl shadow-xl p-8 md:p-12">
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border rounded-xl p-4"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="border rounded-xl p-4"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Course Studied"
                className="border rounded-xl p-4"
              />

              <input
                type="number"
                name="graduation_year"
                value={formData.graduation_year}
                onChange={handleChange}
                placeholder="Graduation Year"
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Current Occupation"
                className="border rounded-xl p-4"
              />

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Current County / Country"
                className="border rounded-xl p-4 md:col-span-2"
              />

              <input
                type="text"
                name="church"
                value={formData.church}
                onChange={handleChange}
                placeholder="Local Church (Optional)"
                className="border rounded-xl p-4 md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="mentor"
                    checked={formData.mentor}
                    onChange={handleChange}
                    className="h-5 w-5"
                  />

                  <span className="text-gray-700">
                    I am willing to mentor current MUKCCU students.
                  </span>
                </label>
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Prayer Requests or Comments"
                className="border rounded-xl p-4 md:col-span-2"
              />

              <div className="md:col-span-2 text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 rounded-xl text-white font-semibold hover:scale-105 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ backgroundColor: '#b4712d' }}
                >
                  {loading ? 'Submitting...' : 'Join the Alumni Network'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#f8f9fa]">
        <div className="max-w-5xl mx-auto px-6">
          <h2
            className="text-4xl font-bold text-center mb-14"
            style={{ color: '#2e3e87' }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'Who can join the Alumni Network?',
                a: 'Any former member of Maseno University City Campus Christian Union is welcome to join.',
              },
              {
                q: 'Is there a registration fee?',
                a: 'No. Registration is completely free.',
              },
              {
                q: 'How will I receive alumni updates?',
                a: 'Through our official email, WhatsApp groups and soc
