import { useMemo, useState } from 'react';
import { Award, Clock, Users, BookOpen, Search } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseLeadership } from '../hooks/useSupabaseLeadership';

export default function Leadership() {
  const { content, loading } = useContent();
  const { leaders: supabaseLeaders = [], roles: supabaseRoles = [], loading: leadersLoading } =
    useSupabaseLeadership();

  const leaders =
    supabaseLeaders.length > 0
      ? supabaseLeaders
      : content.leadership?.list || [];

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const positionOrder = [
    'Chairperson',
    'Vice-Chairperson',
    'Secretary',
    'Vice-Secretary',
    'Treasurer',
    'Board Director',
    'Discipleship Coordinator',
    'Prayer Coordinator',
    'Missions Coordinator',
    'Hospitality Director',
    'Bible Study Coordinator'
  ];

  const positions = ['All', ...positionOrder];

  const sortedLeaders = useMemo(() => {
    return [...leaders].sort((a: any, b: any) => {
      const aIndex = positionOrder.findIndex(
        p => p.toLowerCase() === a.position?.trim().toLowerCase()
      );
      const bIndex = positionOrder.findIndex(
        p => p.toLowerCase() === b.position?.trim().toLowerCase()
      );
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
  }, [leaders]);

  const filteredLeaders = useMemo(() => {
    return sortedLeaders.filter((leader: any) => {
      const matchesSearch =
        leader.name?.toLowerCase().includes(search.toLowerCase()) ||
        leader.position?.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === 'All' || leader.position === filter;

      return matchesSearch && matchesFilter;
    });
  }, [sortedLeaders, search, filter]);

  const leadershipArchive = [
    {
      year: "2024/2025",
      chairperson: "Nashon Otieno",
      viceChairperson: "Brian Romany",
      secretary: "Elizabeth Wambugu",
      viceSecretary: "Vicky Chepkoech",
      treasurer: "Saib Anakala",
      boardDirector: "Mercy Munga",
      prayerCoordinator: "Allan Kwemoi",
      missionsCoordinator: "Irine Nasimiyu",
      discipleshipCoordinator: "Sharon Wanjala",
      bibleStudyCoordinator: "Christopher Isabali",
      hospitalityDirector: "Joyline Chesang"
    }
  ];

  const isLoading = (loading || leadersLoading) && leaders.length === 0;

  const currentPatron =
    supabaseRoles?.find(r => r.role_type === 'current_patron') ||
    content.leadership?.currentPatron;

  return (
    <div className="min-h-screen bg-gray-50">

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50" />
      )}

      {/* HERO */}
      <div className="relative h-52 flex items-center justify-center text-white"
        style={{ background: 'linear-gradient(135deg,#2e3e87,#1a2351)' }}>
        <div className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold">Leadership</h1>
          <p className="text-sm md:text-lg mt-2" style={{ color: '#b4712d' }}>
            Servant Leaders for Christ
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">

        {/* SEARCH + FILTER (MOBILE FIRST) */}
        <div className="bg-white rounded-2xl shadow p-4 md:p-6 mb-8 space-y-4 md:space-y-0 md:flex md:gap-4 md:items-center">

          {/* Search */}
          <div className="flex items-center w-full md:w-2/3 border rounded-xl px-3 py-2">
            <Search size={18} className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search leader or position..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full outline-none text-sm md:text-base"
            />
          </div>

          {/* Filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/3 border rounded-xl px-3 py-2 text-sm md:text-base"
          >
            {positions.map((pos, i) => (
              <option key={i} value={pos}>
                {pos}
              </option>
            ))}
          </select>

        </div>

        {/* CURRENT LEADERS */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">

          <div className="flex items-center justify-center mb-6">
            <Users size={36} style={{ color: '#2e3e87' }} className="mr-3" />
            <h2 className="text-xl md:text-3xl font-bold text-center"
              style={{ color: '#2e3e87' }}>
              Current Leadership Team
            </h2>
          </div>

          {filteredLeaders.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No leaders found matching your search.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {filteredLeaders.map((leader: any, index: number) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-5 border-t-4"
                  style={{ borderColor: '#b4712d' }}
                >

                  {/* Avatar */}
                  <div className="flex items-center gap-4 mb-4">

                    {leader.image ? (
                      <img
                        src={leader.image}
                        className="w-14 h-14 rounded-full object-cover border"
                        style={{ borderColor: '#2e3e87' }}
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: '#2e3e87' }}>
                        {leader.name?.split(' ').map((n: string) => n[0]).slice(0, 2).join('')}
                      </div>
                    )}

                    <div>
                      <p className="font-bold text-sm md:text-base" style={{ color: '#2e3e87' }}>
                        {leader.position}
                      </p>
                      <p className="text-gray-800 font-medium text-sm md:text-base">
                        {leader.name}
                      </p>
                    </div>

                  </div>

                  {leader.bio && (
                    <p className="text-xs md:text-sm text-gray-600">
                      {leader.bio}
                    </p>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>

        {/* ARCHIVE (kept simple & clean) */}
        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <div className="flex items-center justify-center mb-6">
            <Clock size={32} style={{ color: '#2e3e87' }} className="mr-3" />
            <h2 className="text-xl md:text-3xl font-bold" style={{ color: '#2e3e87' }}>
              Leadership Archive
            </h2>
          </div>

          {leadershipArchive.map((team, i) => (
            <div key={i} className="border rounded-xl mb-6 overflow-hidden">

              <div className="bg-[#2e3e87] text-white px-4 py-3 font-bold">
                {team.year}
              </div>

              <div className="p-4 grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                <p><b>Chair:</b> {team.chairperson}</p>
                <p><b>Vice Chair:</b> {team.viceChairperson}</p>
                <p><b>Secretary:</b> {team.secretary}</p>
                <p><b>Treasurer:</b> {team.treasurer}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}