import { Calendar, Clock, MapPin, Book, Music, Camera } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export default function WeeklyActivities() {
  const { content, loading } = useContent();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  const iconMap = {
    'Sunday': Calendar,
    'Tuesday': Book, 
    'Friday': Calendar,
    'Saturday': Music
  };
  
  const colorMap = {
    'Sunday': '#2e3e87',
    'Tuesday': '#b4712d',
    'Friday': '#2e3e87', 
    'Saturday': '#b4712d'
  };
  
  const activities = (content.activities || []).map((activity: any) => ({
    ...activity,
    icon: iconMap[activity.day as keyof typeof iconMap] || Calendar,
    color: colorMap[activity.day as keyof typeof colorMap] || '#2e3e87'
  }));

  const upcomingSchedule = [
    {
      event: 'Sunday Service',
      date: 'Every Sunday',
      time: '8:00 AM',
    },
    {
      event: 'Bible Study (Online)',
      date: 'Every 2 Weeks (Tuesday)',
      time: '8:00 PM',
    },
    {
      event: 'Prayer & Fasting',
      date: 'Every Friday',
      time: 'All Day',
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
          <h1 className="text-5xl font-bold mb-2">Weekly Activities</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>Stay Connected, Stay Growing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Join us throughout the week as we gather to worship, study, pray, and grow together in Christ.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className="h-2"
                  style={{ backgroundColor: activity.color }}
                ></div>
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div
                      className="p-3 rounded-xl mr-4"
                      style={{ backgroundColor: activity.color }}
                    >
                      <Icon className="text-white" size={28} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="text-sm font-bold px-3 py-1 rounded-full"
                          style={{ backgroundColor: activity.color, color: 'white' }}
                        >
                          {activity.day}
                        </span>
                      </div>
                      <h3
                        className="text-2xl font-bold mb-2"
                        style={{ color: '#2e3e87' }}
                      >
                        {activity.title}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-gray-700">
                      <Clock size={18} className="mr-2" style={{ color: '#b4712d' }} />
                      <span className="font-semibold">{activity.time}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <MapPin size={18} className="mr-2" style={{ color: '#b4712d' }} />
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

        <div className="grid md:grid-cols-2 gap-8">
          <div
            className="rounded-2xl shadow-xl p-8"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Regular Schedule
            </h2>
            <div className="space-y-4">
              {upcomingSchedule.map((item, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-20 transition-all duration-300"
                >
                  <h4 className="text-xl font-bold text-white mb-2">
                    {item.event}
                  </h4>
                  <div className="flex items-center justify-between text-white text-sm">
                    <span style={{ color: '#b4712d' }}>{item.date}</span>
                    <span className="font-semibold">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Join Us Online
            </h2>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                  Bible Study Sessions
                </h3>
                <p className="text-gray-700 mb-4">
                  Join our online Bible study sessions via Google Meet every two weeks on Tuesday evenings.
                </p>
                <div className="flex items-center text-gray-600">
                  <Clock size={18} className="mr-2" style={{ color: '#b4712d' }} />
                  <span>8:00 PM - 9:00 PM</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow">
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                  Stay Updated
                </h3>
                <p className="text-gray-700">
                  Follow our social media pages for meeting links, updates, and announcements about all our activities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2e3e87' }}>
            Need More Information?
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Have questions about our weekly activities or want to know how you can get involved? We'd love to hear from you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:citycampusc.u@gmail.com"
              className="px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#2e3e87', color: 'white' }}
            >
              Email Us
            </a>
            <div className="px-6 py-3 rounded-full font-semibold" style={{ backgroundColor: '#f3f4f6', color: '#2e3e87' }}>
              Location: 7th Floor, Maseno University Kisumu Campus
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
