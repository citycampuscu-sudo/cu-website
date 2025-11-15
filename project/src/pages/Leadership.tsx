import { User, Award, Clock, Users } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseLeadership } from '../hooks/useSupabaseLeadership';

export default function Leadership() {
  const { content, loading } = useContent();
  const { leaders: supabaseLeaders, roles: supabaseRoles, loading: leadersLoading } = useSupabaseLeadership();
  
  if (loading || leadersLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  const currentPatron = supabaseRoles?.find(r => r.role_type === 'current_patron') || content.leadership?.currentPatron;
  const previousPatron = supabaseRoles?.find(r => r.role_type === 'previous_patron') || content.leadership?.previousPatron;
  const alumniDirector = supabaseRoles?.find(r => r.role_type === 'alumni_director') || content.leadership?.alumniDirector;
  const previousChairpersons = supabaseRoles?.filter(r => r.role_type === 'previous_chairperson')?.length > 0 ? supabaseRoles.filter(r => r.role_type === 'previous_chairperson') : (content.leadership?.previousChairpersons || []);


  return (
    <div className="min-h-screen">
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">Leadership</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>Servant Leaders for Christ</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-12 text-center">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            The CU has 11 executive committee leaders who are committed to serving God and the student body with dedication and integrity.
          </p>
        </div>



        {currentPatron && (
          <div
            className="mb-12 p-8 rounded-2xl shadow-xl text-white"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <div className="flex items-center justify-center mb-4">
              <Award style={{ color: '#b4712d' }} size={40} className="mr-3" />
              <h2 className="text-3xl font-bold">CU Patron</h2>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold mb-2">{currentPatron.name}</p>
              <p className="text-lg" style={{ color: '#b4712d' }}>{currentPatron.description}</p>
            </div>
          </div>
        )}

        {(supabaseLeaders.length > 0 || (content.leadership?.list && content.leadership.list.length > 0)) && (
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <Users style={{ color: '#2e3e87' }} size={40} className="mr-3" />
              <h2 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>Current Leadership Team</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(supabaseLeaders.length > 0 ? supabaseLeaders : (content.leadership?.list || [])).map((leader: any, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6"
              style={{ borderTop: '4px solid #b4712d' }}
            >
              <div className="flex items-start mb-4">
                {leader.image ? (
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2"
                    style={{ borderColor: '#2e3e87' }}
                  />
                ) : (
                  <div
                    className="p-3 rounded-full mr-4"
                    style={{ backgroundColor: '#2e3e87' }}
                  >
                    <User className="text-white" size={24} />
                  </div>
                )}
                <div className="flex-1">
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ color: '#2e3e87' }}
                  >
                    {leader.position}
                  </h3>
                  <p className="text-lg font-semibold text-gray-800">
                    {leader.name}
                  </p>
                  {leader.course && leader.year && (
                    <p className="text-sm" style={{ color: '#b4712d' }}>
                      {leader.year} {leader.course}
                    </p>
                  )}
                </div>
              </div>
              {leader.bio && (
                <div
                  className="pt-4 mt-4"
                  style={{ borderTop: '1px solid #e5e7eb' }}
                >
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              )}
            </div>
              ))}
            </div>
          </div>
        )}

        {alumniDirector && (
          <div
            className="mb-12 p-8 rounded-2xl shadow-xl text-white"
            style={{ backgroundColor: '#8b5cf6' }}
          >
            <div className="flex items-center justify-center mb-4">
              <Award style={{ color: 'white' }} size={40} className="mr-3" />
              <h2 className="text-3xl font-bold">Alumni Director</h2>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold mb-2">{alumniDirector.name}</p>
              <p className="text-lg text-white">{alumniDirector.description}</p>
            </div>
          </div>
        )}

        {previousPatron && (
          <div
            className="mb-12 p-8 rounded-2xl shadow-xl text-white"
            style={{ backgroundColor: '#b4712d' }}
          >
            <div className="flex items-center justify-center mb-4">
              <Award style={{ color: 'white' }} size={40} className="mr-3" />
              <h2 className="text-3xl font-bold">Previous CU Patron</h2>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold mb-2">{previousPatron.name}</p>
              <p className="text-lg text-white">{previousPatron.description}</p>
            </div>
          </div>
        )}

        {previousChairpersons.length > 0 && (
          <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-center mb-6">
              <Clock style={{ color: '#2e3e87' }} size={40} className="mr-3" />
              <h2 className="text-3xl font-bold" style={{ color: '#2e3e87' }}>Previous Chairpersons</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {previousChairpersons.map((chair: any, index: number) => (
                <div
                  key={index}
                  className="p-4 rounded-lg shadow hover:shadow-md transition-all duration-300"
                  style={{ backgroundColor: '#f8f9fa', borderLeft: '4px solid #b4712d' }}
                >
                  <p className="font-semibold text-lg" style={{ color: '#2e3e87' }}>
                    {chair.name}
                  </p>
                  <p className="text-sm" style={{ color: '#b4712d' }}>
                    {chair.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#2e3e87' }}>
            Leadership Structure
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <div
                className="w-2 h-full rounded-full mr-4"
                style={{ backgroundColor: '#b4712d', minHeight: '100%' }}
              ></div>
              <div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: '#2e3e87' }}>
                  Executive Leadership
                </h4>
                <p className="text-gray-700">
                  Chairperson, Vice-Chairperson, Secretary, Treasurer, and Vice-Secretary form the core executive team
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <div
                className="w-2 h-full rounded-full mr-4"
                style={{ backgroundColor: '#b4712d', minHeight: '100%' }}
              ></div>
              <div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: '#2e3e87' }}>
                  Ministry Coordinators
                </h4>
                <p className="text-gray-700">
                  Bible Study, Discipleship, Board, Hospitality, Missions, and Prayer coordinators oversee specialized ministries
                </p>
              </div>
            </div>
            <div className="flex items-start p-4 bg-white rounded-lg shadow">
              <div
                className="w-2 h-full rounded-full mr-4"
                style={{ backgroundColor: '#b4712d', minHeight: '100%' }}
              ></div>
              <div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: '#2e3e87' }}>
                  Patron Oversight
                </h4>
                <p className="text-gray-700">
                  Prof. Fredrick Aila provides guidance and support as the CU Patron
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
