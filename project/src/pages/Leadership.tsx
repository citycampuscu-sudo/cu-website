import { Award, Clock, Users, BookOpen, Search } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseLeadership } from '../hooks/useSupabaseLeadership';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Leadership() {
  const { content, loading } = useContent();
  const { leaders: supabaseLeaders, roles: supabaseRoles, loading: leadersLoading } = useSupabaseLeadership();
  const [searchTerm, setSearchTerm] = useState('');
  
  const leaders = supabaseLeaders.length > 0 ? supabaseLeaders : (content.leadership?.list || []);
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
      hospitalityDirector: "Joyline Chesang",
    },
    {
      year: "2023/2024",
      chairperson: "Samwel Oyugi",
      viceChairperson: "Nashon Otieno",
      secretary: "Keziah Baraka",
      viceSecretary: "Jacky Sankei",
      treasurer: "Graham Juma",
      boardDirector: "Ian Mark Onyango",
      prayerCoordinator: "Mary Thiga",
      missionsCoordinator: "Hillary Ogombe",
      discipleshipCoordinator: "Philomena Mwende",
      bibleStudyCoordinator: "Laurane Cherono",
      hospitalityDirector: "Alexzandria Adhiambo",
    },
    {
      year: "2022/2023",
      chairperson: "Fadhili Mwivali",
      viceChairperson: "Samwel Oyugi",
      secretary: "Riziki Kanze",
      viceSecretary: "Bethsaida Simiyu",
      treasurer: "Jacky Sankei",
      boardDirector: "Timothy Olanda",
      prayerCoordinator: "Nashon Otieno",
      missionsCoordinator: "Carolyne Owino",
      discipleshipCoordinator: "Enock Mutate",
      bibleStudyCoordinator: "Moses Karkar",
      hospitalityDirector: "Mical Ashioya",
    },
    {
      year: "2021/2022",
      chairperson: "Fanuel Favor",
      viceChairperson: "Paul Ojienya",
      secretary: "Mary Rael",
      viceSecretary: "N/A",
      treasurer: "Fanuel Favor",
      boardDirector: "Caren Jepkoech",
      prayerCoordinator: "Fadhili Mwivali",
      missionsCoordinator: "Sam Oyugi",
      discipleshipCoordinator: "Xavior Khisa",
      bibleStudyCoordinator: "Rehema Rashid",
      hospitalityDirector: "Moureen Kemboi",
    },
  ];

  const sortedLeaders = [...leaders].sort((a: any, b: any) => {
    const aIndex = positionOrder.findIndex(
      p => p.toLowerCase() === a.position?.trim().toLowerCase()
    );
    const bIndex = positionOrder.findIndex(
      p => p.toLowerCase() === b.position?.trim().toLowerCase()
    );
    return (
      (aIndex === -1 ? 999 : aIndex) -
      (bIndex === -1 ? 999 : bIndex)
    );
  });

  const filteredLeaders = useMemo(() => {
    return sortedLeaders.filter((leader: any) =>
      leader.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedLeaders, searchTerm]);

  const isLoading = (loading || leadersLoading) && leaders.length === 0;
  
  const currentPatron = supabaseRoles?.find(r => r.role_type === 'current_patron') || content.leadership?.currentPatron;
  const previousPatron = supabaseRoles?.find(r => r.role_type === 'previous_patron') || content.leadership?.previousPatron;
  const alumniDirector = supabaseRoles?.find(r => r.role_type === 'alumni_director') || content.leadership?.alumniDirector;
  const recentFOCUSStaffs =
    supabaseRoles
      ?.filter(r => r.role_type === 'recent FOCUS Staffs')
      ?.sort((a, b) => parseInt(b.year) - parseInt(a.year)) || [];
  const previousChairpersons =
    supabaseRoles?.filter(r => r.role_type === 'previous_chairperson')?.length > 0
      ? supabaseRoles
          .filter(r => r.role_type === 'previous_chairperson')
          .sort((a, b) =>
            Number(b.year?.split('/')[0]) -
            Number(a.year?.split('/')[0])
          )
      : (content.leadership?.previousChairpersons || []);

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative h-56 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
            Leadership
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: '#b4712d' }}
          >
            Servant Leaders for Christ
          </p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {isLoading && leaders.length === 0 ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leadership...</p>
          </div>
        ) : (
          <>
            <div className="mb-12 text-center">
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                The CU has 11 executive committee leaders who are committed to serving God and the student body with dedication and integrity.
              </p>
            </div>

            {currentPatron && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{
                  y: -8,
                  scale: 1.02
                }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-12 p-6 md:p-8 rounded-2xl shadow-xl text-white"
                style={{ backgroundColor: '#2e3e87' }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Award style={{ color: '#b4712d' }} size={40} className="mr-3" />
                  <h2 className="text-3xl font-bold">CU Patron</h2>
                </div>
                <div className="text-center">
                  {currentPatron.image_url && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={currentPatron.image_url} 
                        alt={currentPatron.name}
                        loading="lazy"
                        className="w-24 h-24 rounded-full object-cover border-4"
                        style={{ borderColor: '#b4712d' }}
                      />
                    </div>
                  )}
                  <p className="text-2xl font-semibold mb-2">{currentPatron.name}</p>
                  <p className="text-lg" style={{ color: '#b4712d' }}>{currentPatron.description}</p>
                </div>
              </motion.div>
            )}

            {leaders.length > 0 && (
              <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <Users style={{ color: '#2e3e87' }} size={40} className="mr-3" />
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#2e3e87' }}
                  >
                    Current Leadership Team
                  </h2>
                </div>

                <div className="mb-6 flex justify-center">
                  <div className="relative w-full max-w-md">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search leaders..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e3e87]"
                    />
                  </div>
                </div>

                {filteredLeaders.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">
                    No leaders found matching "{searchTerm}"
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLeaders.map((leader: any, index: number) => (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{
                          y: -8,
                          scale: 1.02
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.05
                        }}
                        key={index}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-5 md:p-6"
                        style={{ borderTop: '4px solid #b4712d' }}
                      >
                        <div className="flex items-start mb-4">
                          {leader.image ? (
                            <img 
                              src={leader.image} 
                              alt={leader.name}
                              loading="lazy"
                              className="w-12 h-12 rounded-full object-cover mr-4 border-2"
                              style={{ borderColor: '#2e3e87' }}
                            />
                          ) : (
                            <div
                              className="w-14 h-14 rounded-full mr-4 flex items-center justify-center"
                              style={{ backgroundColor: '#2e3e87' }}
                            >
                              <span className="text-white font-bold text-base">
                                {leader.name
                                  ?.split(' ')
                                  .map((n: string) => n[0])
                                  .slice(0, 2)
                                  .join('')}
                              </span>
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
                            <p className="text-sm md:text-base text-gray-600 leading-7">
                              {leader.bio}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {recentFOCUSStaffs && recentFOCUSStaffs.length > 0 && (
              <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <BookOpen style={{ color: '#2e3e87' }} size={40} className="mr-3" />
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#2e3e87' }}
                  >
                    Recent FOCUS Staffs
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentFOCUSStaffs.map((staff: any, index: number) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-5 md:p-6"
                      style={{ borderTop: '4px solid #b4712d' }}
                    >
                      <div className="flex items-start mb-4">
                        {staff.image_url ? (
                          <img 
                            src={staff.image_url} 
                            alt={staff.name}
                            loading="lazy"
                            className="w-14 h-14 rounded-full object-cover mr-4 border-2"
                            style={{ borderColor: '#2e3e87' }}
                          />
                        ) : (
                          <div
                            className="p-3 rounded-full mr-4"
                            style={{ backgroundColor: '#2e3e87' }}
                          >
                            <BookOpen className="text-white" size={24} />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-lg font-semibold text-gray-800">
                            {staff.name}
                          </p>
                          {staff.year && (
                            <p className="text-sm" style={{ color: '#b4712d' }}>
                              {staff.year}
                            </p>
                          )}
                        </div>
                      </div>
                      {staff.description && (
                        <div
                          className="pt-4 mt-4"
                          style={{ borderTop: '1px solid #e5e7eb' }}
                        >
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {staff.description}
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
                className="mb-12 p-6 md:p-8 rounded-2xl shadow-xl text-white"
                style={{ backgroundColor: '#8b5cf6' }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Award style={{ color: 'white' }} size={40} className="mr-3" />
                  <h2 className="text-3xl font-bold">Alumni Director</h2>
                </div>
                <div className="text-center">
                  {alumniDirector.image_url && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={alumniDirector.image_url} 
                        alt={alumniDirector.name}
                        loading="lazy"
                        className="w-24 h-24 rounded-full object-cover border-4"
                        style={{ borderColor: '#ffffff' }}
                      />
                    </div>
                  )}
                  <p className="text-2xl font-semibold mb-2">{alumniDirector.name}</p>
                  <p className="text-lg text-white">{alumniDirector.description}</p>
                </div>
              </div>
            )}

            {previousPatron && (
              <div
                className="mb-12 p-6 md:p-8 rounded-2xl shadow-xl text-white"
                style={{ backgroundColor: '#b4712d' }}
              >
                <div className="flex items-center justify-center mb-4">
                  <Award style={{ color: 'white' }} size={40} className="mr-3" />
                  <h2 className="text-3xl font-bold">Previous CU Patron</h2>
                </div>
                <div className="text-center">
                  {previousPatron.image_url && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={previousPatron.image_url} 
                        alt={previousPatron.name}
                        loading="lazy"
                        className="w-24 h-24 rounded-full object-cover border-4"
                        style={{ borderColor: '#ffffff' }}
                      />
                    </div>
                  )}
                  <p className="text-2xl font-semibold mb-2">{previousPatron.name}</p>
                  <p className="text-lg text-white">{previousPatron.description}</p>
                </div>
              </div>
            )}

            {previousChairpersons.length > 0 && (
              <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <Clock style={{ color: '#2e3e87' }} size={40} className="mr-3" />
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#2e3e87' }}
                  >
                    Previous Chairpersons
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {previousChairpersons.map((chair: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -8, scale: 1.02 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05
                      }}
                      className="p-5 rounded-xl shadow-sm hover:shadow-md transition-all"
                      style={{
                        backgroundColor: '#f8f9fa',
                        borderLeft: '4px solid #b4712d'
                      }}
                    >
                      <p
                        className="font-semibold text-lg"
                        style={{ color: '#2e3e87' }}
                      >
                        {chair.name}
                      </p>
                      <p
                        className="text-sm"
                        style={{ color: '#b4712d' }}
                      >
                        {chair.year}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-lg p-8">
              {/* Archive Section */}
              <div className="mb-12 bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-center mb-6">
                  <Clock style={{ color: '#2e3e87' }} size={40} className="mr-3" />
                  <h2
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#2e3e87' }}
                  >
                    Former Executive Teams
                  </h2>
                </div>

                <div className="space-y-4">
                  {leadershipArchive.map((team, index) => (
                    <details
                      key={index}
                      className="bg-gray-50 border rounded-xl overflow-hidden"
                    >
                      <summary
                        className="cursor-pointer px-6 py-4 font-bold text-lg flex justify-between items-center"
                        style={{ color: '#2e3e87' }}
                      >
                        {team.year}
                      </summary>

                      <div className="px-6 pb-6 border-t bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm mt-4">
                          <p><strong>Chairperson:</strong> {team.chairperson}</p>
                          <p><strong>Vice Chairperson:</strong> {team.viceChairperson}</p>
                          <p><strong>Secretary:</strong> {team.secretary}</p>
                          <p><strong>Vice Secretary:</strong> {team.viceSecretary}</p>
                          <p><strong>Treasurer:</strong> {team.treasurer}</p>
                          <p><strong>Board Director:</strong> {team.boardDirector}</p>
                          <p><strong>Prayer Coordinator:</strong> {team.prayerCoordinator}</p>
                          <p><strong>Missions Coordinator:</strong> {team.missionsCoordinator}</p>
                          <p><strong>Discipleship Coordinator:</strong> {team.discipleshipCoordinator}</p>
                          <p><strong>Bible Study Coordinator:</strong> {team.bibleStudyCoordinator}</p>
                          <p><strong>Hospitality Director:</strong> {team.hospitalityDirector}</p>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Structure Flow */}
              <h2 className="text-3xl font-bold text-center mb-10" style={{ color: '#2e3e87' }}>
                Leadership Structure
              </h2>

              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="bg-[#2e3e87] text-white px-8 py-4 rounded-xl shadow">
                  CU Patron
                </div>

                <div className="text-3xl text-[#b4712d]">↓</div>

                <div className="bg-white px-8 py-4 rounded-xl shadow">
                  Chairperson
                </div>

                <div className="text-3xl text-[#b4712d]">↓</div>

                <div className="bg-white px-8 py-4 rounded-xl shadow">
                  Executive Committee
                </div>

                <div className="text-3xl text-[#b4712d]">↓</div>

                <div className="bg-white px-8 py-4 rounded-xl shadow">
                  Ministry Directors & Coordinators
                </div>

                <div className="text-3xl text-[#b4712d]">↓</div>

                <div className="bg-white px-8 py-4 rounded-xl shadow">
                  CU Members
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
