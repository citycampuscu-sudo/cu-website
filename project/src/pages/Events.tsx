import { Calendar, Clock, MapPin, Users, Music, FileText, Book } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseEvents } from '../hooks/useSupabaseEvents';
import { Helmet } from 'react-helmet-async';

export default function Events() {
  const { content, loading } = useContent();
  const { events: supabaseEvents, loading: eventsLoading } = useSupabaseEvents();

  const upcomingEvents = [
    {
      title: 'Bible Trivia Sunday',
      date: 'November 16, 2025',
      time: 'During Sunday Service',
      location: '7th Floor',
      description:
        'Test your Bible knowledge in a fun and engaging trivia session during our Sunday service.',
      icon: Book,
      color: '#2e3e87',
    },
    {
      title: 'Worship Experience',
      date: 'November 16, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'G1',
      description:
        "Join us for an afternoon filled with powerful praise and worship sessions.",
      icon: Music,
      color: '#b4712d',
    },
    {
      title: 'Annual General Meeting (AGM)',
      date: 'November 23, 2025',
      time: '11:00 AM - 2:00 PM',
      location: '7th Floor',
      description:
        'Official presentation of CU reports and leadership transition.',
      icon: FileText,
      color: '#2e3e87',
    },
  ];

  const contentEvents = content.events?.list || [];
  const events =
    supabaseEvents.length > 0
      ? supabaseEvents
      : contentEvents.length > 0
      ? contentEvents
      : upcomingEvents;

  const isLoading = (loading || eventsLoading) && events.length === 0;

  const recurringEvents = [
    {
      title: 'Media & IT Training',
      frequency: 'Every Saturday',
      time: '2:30 PM - 5:00 PM',
      location: 'CU Office / 7th Floor',
      icon: Calendar,
    },
    {
      title: 'Praise & Worship Practice',
      frequency: 'Every Saturday',
      time: '2:30 PM - 5:00 PM',
      location: 'CU Office / 7th Floor',
      icon: Music,
    },
    {
      title: 'Bible Study (Online)',
      frequency: 'Every 2 Weeks',
      time: '8:00 PM - 9:00 PM',
      location: 'Google Meet',
      icon: Book,
    },
    {
      title: 'Prayer & Fasting',
      frequency: 'Every Friday',
      time: 'All Day',
      location: 'Individual & Corporate',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">

      {/* SEO META TAGS */}
      <Helmet>
        <title>MUKCCU Events | Maseno University City Campus Christian Union</title>
        <meta
          name="description"
          content="Stay updated with upcoming and recurring events at Maseno University City Campus Christian Union (MUKCCU) including worship, Bible study, AGM, and fellowship gatherings."
        />
        <meta
          name="keywords"
          content="MUKCCU events, Maseno University City Campus Christian Union events, Maseno University City Campus Christian Union gatherings, worship experience Maseno University City Campus Christian Union, Bible study Maseno University City Campus Christian Union"
        />

        {/* Open Graph */}
        <meta property="og:title" content="MUKCCU Events - Maseno University City Campus Christian Union" />
        <meta property="og:description" content="Join upcoming worship, Bible study, and fellowship events at MUKCCU." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/events" />
      </Helmet>

      {/* HEADER */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>
      )}

      <div
        className="relative h-80 md:h-96 flex items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)' }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {content.events?.pageTitle || 'Events'}
          </h1>
          <p className="text-xl md:text-2xl" style={{ color: '#b4712d' }}>
            {content.events?.pageSubtitle || 'Join Us in Celebration and Fellowship'}
          </p>
        </div>
      </div>

      {/* REST OF YOUR CONTENT (UNCHANGED) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>
              {events.length}
            </h3>
            <p className="text-gray-600">Upcoming Events</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>
              4
            </h3>
            <p className="text-gray-600">Regular Activities</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>
              100+
            </h3>
            <p className="text-gray-600">Members</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <h3 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>
              11+
            </h3>
            <p className="text-gray-600">Years</p>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#2e3e87' }}>
            Upcoming Events
          </h2>

          <div className="space-y-8">
            {events.map((event: any, index: number) => {
              const Icon = event.icon || Calendar;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">

                    <div
                      className="md:w-48 p-8 flex flex-col items-center justify-center text-white"
                      style={{ backgroundColor: event.color || '#2e3e87' }}
                    >
                      <Icon size={48} className="mb-4" />
                      <p className="text-3xl font-bold">
                        {new Date(event.date).getDate()}
                      </p>
                    </div>

                    <div className="flex-1 p-6 md:p-8">
                      <h3 className="text-3xl font-bold mb-4" style={{ color: '#2e3e87' }}>
                        {event.title}
                      </h3>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <Clock size={18} className="mr-3" style={{ color: '#b4712d' }} />
                          {event.time}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={18} className="mr-3" style={{ color: '#b4712d' }} />
                          {event.location}
                        </div>
                        <div className="flex items-center text-gray-700">
                          <Calendar size={18} className="mr-3" style={{ color: '#b4712d' }} />
                          {event.date}
                        </div>
                      </div>

                      <p className="text-gray-600 text-lg">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recurring Events */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Regular Events
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {recurringEvents.map((event, index) => {
              const Icon = event.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6"
                  style={{ borderLeft: '4px solid #b4712d' }}
                >
                  <Icon className="mb-4" style={{ color: '#2e3e87' }} size={32} />
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
                    {event.title}
                  </h3>
                  <p className="text-sm font-semibold mb-2" style={{ color: '#b4712d' }}>
                    {event.frequency}
                  </p>
                  <p className="text-gray-700">{event.time}</p>
                  <p className="text-gray-600">{event.location}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
