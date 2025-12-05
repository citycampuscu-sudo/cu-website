import { Calendar, Clock, MapPin, Users, Music, FileText, Book } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseEvents } from '../hooks/useSupabaseEvents';

export default function Events() {
  const { content, loading } = useContent();
  const { events: supabaseEvents, loading: eventsLoading } = useSupabaseEvents();
  
  const upcomingEvents = [
    {
      title: 'Bible Trivia Sunday',
      date: 'November 16, 2025',
      time: 'During Sunday Service',
      location: '7th Floor',
      description: 'Test your Bible knowledge in a fun and engaging trivia session during our Sunday service. Great prizes and spiritual insights await!',
      icon: Book,
      color: '#2e3e87',
    },
    {
      title: 'Worship Experience',
      date: 'November 16, 2025',
      time: '2:00 PM - 5:00 PM',
      location: 'G1',
      description: 'Join us for an afternoon filled with powerful praise and worship sessions. Experience God\'s presence in a special way.',
      icon: Music,
      color: '#b4712d',
    },
    {
      title: 'Annual General Meeting (AGM)',
      date: 'November 23, 2025',
      time: '11:00 AM - 2:00 PM',
      location: '7th Floor',
      description: 'Official day of presenting CU reports for the last spiritual year including financial statement. Leadership transition will take place during this meeting.',
      icon: FileText,
      color: '#2e3e87',
    },
  ];
  
  const contentEvents = content.events?.list || [];
  const events = supabaseEvents.length > 0 ? supabaseEvents : (contentEvents.length > 0 ? contentEvents : upcomingEvents);
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
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>
      )}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">{content.events?.pageTitle || 'Events'}</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>{content.events?.pageSubtitle || 'Join Us in Celebration and Fellowship'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#2e3e87' }}>
            Upcoming Events
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Mark your calendars and join us for these special gatherings
          </p>

          <div className="space-y-6">
            {events.map((event: any, index: number) => {
              const Icon = event.icon || Calendar;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    <div
                      className="md:w-48 p-8 flex flex-col items-center justify-center text-white"
                      style={{ backgroundColor: event.color }}
                    >
                      <Icon size={48} className="mb-4" />
                      <div className="text-center">
                        <p className="text-3xl font-bold mb-1">
                          {new Date(event.date).getDate()}
                        </p>
                        <p className="text-lg">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex-1 p-8">
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#2e3e87' }}>
                        {event.title}
                      </h3>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-700">
                          <Clock size={18} className="mr-3" style={{ color: '#b4712d' }} />
                          <span className="font-semibold">{event.time}</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin size={18} className="mr-3" style={{ color: '#b4712d' }} />
                          <span>{event.location}</span>
                        </div>
                        {event.date && (
                          <div className="flex items-center text-gray-700">
                            <Calendar size={18} className="mr-3" style={{ color: '#b4712d' }} />
                            <span>{event.date}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 leading-relaxed text-lg">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-4" style={{ color: '#2e3e87' }}>
            Regular Events
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Consistent gatherings that build community and faith
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {recurringEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
                  style={{ borderLeft: '4px solid #b4712d' }}
                >
                  <div className="flex items-start mb-4">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ backgroundColor: '#2e3e87' }}
                    >
                      <Icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2" style={{ color: '#2e3e87' }}>
                        {event.title}
                      </h3>
                      <p className="text-sm font-semibold mb-2" style={{ color: '#b4712d' }}>
                        {event.frequency}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-700">
                      <Clock size={16} className="mr-2" style={{ color: '#b4712d' }} />
                      <span className="text-sm">{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin size={16} className="mr-2" style={{ color: '#b4712d' }} />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-2xl shadow-xl p-8 md:p-12 text-center text-white"
          style={{ backgroundColor: '#2e3e87' }}
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Don't miss out on any of our events! Follow us on social media or contact us directly to receive timely updates about all our activities and special programs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://facebook.com/profile.php?id=100064050612790&mibextid=rS40aB7S9Ucbxw6v"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#b4712d', color: 'white' }}
            >
              Follow on Facebook
            </a>
            <a
              href="mailto:citycampusc.u@gmail.com"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg bg-white"
              style={{ color: '#2e3e87' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
