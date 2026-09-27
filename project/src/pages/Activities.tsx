import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Music,
  FileText,
  Book,
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useContent } from '../hooks/useContent';
import { useSupabaseEvents } from '../hooks/useSupabaseEvents';

export default function Activities() {
  const { content, loading } = useContent();
  const { events: supabaseEvents, loading: eventsLoading } = useSupabaseEvents();

  const iconMap = {
    Sunday: Calendar,
    Tuesday: Book,
    Friday: Calendar,
    Saturday: Music,
  };

  const colorMap = {
    Sunday: '#2e3e87',
    Tuesday: '#b4712d',
    Friday: '#2e3e87',
    Saturday: '#b4712d',
  };

  const activities = (content.activities || []).map((activity: any) => ({
    ...activity,
    icon: iconMap[activity.day as keyof typeof iconMap] || Calendar,
    color: colorMap[activity.day as keyof typeof colorMap] || '#2e3e87',
  }));

  const fallbackEvents = [
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
        'Join us for an afternoon filled with powerful praise and worship sessions.',
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
      : fallbackEvents;

  const isLoading = (loading || eventsLoading) && events.length === 0;

  const regularActivities = [
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
      <Helmet>
        <title>
          MUKCCU Activities | Maseno University City Campus Christian Union
        </title>
        <meta
          name="description"
          content="Explore weekly activities, upcoming events, worship, Bible study, prayer, fellowship and other activities at Maseno University City Campus Christian Union (MUKCCU)."
        />
        <meta
          name="keywords"
          content="MUKCCU activities, MUKCCU events, Maseno University City Campus Christian Union activities, MUKCCU weekly activities, MUKCCU fellowship"
        />
        <meta
          property="og:title"
          content="MUKCCU Activities - Maseno University City Campus Christian Union"
        />
        <meta
          property="og:description"
          content="Stay connected with MUKCCU through weekly activities, upcoming events, worship, Bible study, prayer and fellowship."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/activities" />
      </Helmet>

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50" />
      )}

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
            Stay Connected, Stay Growing
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-3">
            Activities
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Worship, study, prayer, fellowship and events throughout the year.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* INTRO */}
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us throughout the week as we gather to worship, study, pray,
            fellowship and grow together in Christ.
          </p>
        </div>

        {/* WEEKLY ACTIVITIES */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p
              className="font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#b4712d' }}
            >
              Every Week
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: '#2e3e87' }}
            >
              Weekly Activities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {activities.map((activity: any, index: number) => {
              const Icon = activity.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div
                    className="h-2"
                    style={{ backgroundColor: activity.color }}
                  />

                  <div className="p-6">
                    <div className="flex items-start mb-4">
                      <div
                        className="p-3 rounded-xl mr-4"
                        style={{ backgroundColor: activity.color }}
                      >
                        <Icon className="text-white" size={28} />
                      </div>

                      <div className="flex-1">
                        <span
                          className="inline-block text-sm font-bold px-3 py-1 rounded-full mb-2"
                          style={{
                            backgroundColor: activity.color,
                            color: 'white',
                          }}
                        >
                          {activity.day}
                        </span>

                        <h3
                          className="text-2xl font-bold"
                          style={{ color: '#2e3e87' }}
                        >
                          {activity.title}
                        </h3>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Clock
                          size={18}
                          className="mr-2"
                          style={{ color: '#b4712d' }}
                        />
                        <span className="font-semibold">
                          {activity.time}
                        </span>
                      </div>

                      <div className="flex items-center text-gray-700">
                        <MapPin
                          size={18}
                          className="mr-2"
                          style={{ color: '#b4712d' }}
                        />
                        <span>{activity.location}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* UPCOMING EVENTS */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p
              className="font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#b4712d' }}
            >
              What's Happening
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: '#2e3e87' }}
            >
              Upcoming Events
            </h2>
          </div>

          {events.length > 0 ? (
            <div className="space-y-8">
              {events.map((event: any, index: number) => {
                const Icon = event.icon || Calendar;

                return (
                  <div
                    key={event.id || index}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div
                        className="md:w-48 p-8 flex flex-col items-center justify-center text-white"
                        style={{
                          backgroundColor: event.color || '#2e3e87',
                        }}
                      >
                        <Icon size={48} className="mb-4" />

                        <p className="text-3xl font-bold">
                          {event.date
                            ? new Date(event.date).getDate()
                            : '--'}
                        </p>
                      </div>

                      <div className="flex-1 p-6 md:p-8">
                        <h3
                          className="text-3xl font-bold mb-4"
                          style={{ color: '#2e3e87' }}
                        >
                          {event.title}
                        </h3>

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-gray-700">
                            <Clock
                              size={18}
                              className="mr-3"
                              style={{ color: '#b4712d' }}
                            />
                            {event.time}
                          </div>

                          <div className="flex items-center text-gray-700">
                            <MapPin
                              size={18}
                              className="mr-3"
                              style={{ color: '#b4712d' }}
                            />
                            {event.location}
                          </div>

                          <div className="flex items-center text-gray-700">
                            <Calendar
                              size={18}
                              className="mr-3"
                              style={{ color: '#b4712d' }}
                            />
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
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <Calendar
                size={48}
                className="mx-auto mb-4"
                style={{ color: '#b4712d' }}
              />
              <h3
                className="text-2xl font-bold mb-2"
                style={{ color: '#2e3e87' }}
              >
                No Upcoming Events
              </h3>
              <p className="text-gray-600">
                Please check back soon for new MUKCCU events.
              </p>
            </div>
          )}
        </section>

        {/* REGULAR ACTIVITIES */}
        <section className="mb-16">
          <div className="text-center mb-10">
            <p
              className="font-semibold uppercase tracking-wider mb-2"
              style={{ color: '#b4712d' }}
            >
              Keep Growing
            </p>
            <h2
              className="text-4xl font-bold"
              style={{ color: '#2e3e87' }}
            >
              Regular Activities
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {regularActivities.map((activity, index) => {
              const Icon = activity.icon;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg p-6"
                  style={{ borderLeft: '4px solid #b4712d' }}
                >
                  <Icon
                    className="mb-4"
                    style={{ color: '#2e3e87' }}
                    size={32}
                  />

                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ color: '#2e3e87' }}
                  >
                    {activity.title}
                  </h3>

                  <p
                    className="text-sm font-semibold mb-2"
                    style={{ color: '#b4712d' }}
                  >
                    {activity.frequency}
                  </p>

                  <p className="text-gray-700">{activity.time}</p>
                  <p className="text-gray-600">{activity.location}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ONLINE + INFORMATION */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <div
            className="rounded-2xl shadow-xl p-8"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Join Us Online
            </h2>

            <div className="space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ color: '#b4712d' }}
                >
                  Bible Study Sessions
                </h3>

                <p className="text-white/90 mb-4">
                  Join our online Bible study sessions via Google Meet every
                  two weeks on Tuesday evenings.
                </p>

                <div className="flex items-center text-white/90">
                  <Clock
                    size={18}
                    className="mr-2"
                    style={{ color: '#b4712d' }}
                  />
                  <span>8:00 PM - 9:00 PM</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h3
                  >
                    Bible Study Sessions
                  </h3>

                  <p className="text-white/90 mb-4">
                    Join our online Bible study sessions via Google Meet every
                    two weeks on Tuesday evenings.
                  </p>

                  <div className="flex items-center text-white/90">
                    <Clock
                      size={18}
                      className="mr-2"
                      style={{ color: '#b4712d' }}
                    />
                    <span>8:00 PM - 9:00 PM</span>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: '#b4712d' }}
                  >
                    Stay Connected
                  </h3>

                  <p className="text-white/90">
                    Follow MUKCCU online for announcements, devotionals,
                    worship moments and updates on upcoming activities.
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-2xl shadow-xl p-8"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <h2
                className="text-3xl font-bold mb-6"
                style={{ color: '#2e3e87' }}
              >
                Need More Information?
              </h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                If you have questions about any of our activities, events or
                fellowship opportunities, we would be happy to help.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin
                    size={22}
                    className="mr-3 mt-1 flex-shrink-0"
                    style={{ color: '#b4712d' }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: '#2e3e87' }}
                    >
                      Fellowship Location
                    </h3>
                    <p className="text-gray-600">
                      Maseno University Kisumu Campus
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users
                    size={22}
                    className="mr-3 mt-1 flex-shrink-0"
                    style={{ color: '#b4712d' }}
                  />
                  <div>
                    <h3
                      className="font-bold"
                      style={{ color: '#2e3e87' }}
                    >
                      Everyone Is Welcome
                    </h3>
                    <p className="text-gray-600">
                      Come as you are and grow with us in Christ.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FINAL CTA */}
          <section
            className="rounded-2xl p-10 md:p-14 text-center text-white"
            style={{ backgroundColor: '#101735' }}
          >
            <p
              className="font-semibold uppercase tracking-wider mb-3"
              style={{ color: '#b4712d' }}
            >
              Come Fellowship With Us
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Us This Week
            </h2>

            <p className="text-white/85 max-w-2xl mx-auto leading-relaxed">
              Whether you are looking for a place to worship, study the Word,
              pray or build meaningful Christian friendships, there is a place
              for you at MUKCCU.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
