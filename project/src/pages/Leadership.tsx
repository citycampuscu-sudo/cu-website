import {
  Award,
  Clock,
  Users,
  BookOpen,
  Search,
  Crown,
  Heart,
  GraduationCap,
  ChevronDown,
  Music,
  Flame,
  HeartHandshake,
  Globe2,
} from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseLeadership } from '../hooks/useSupabaseLeadership';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';

export default function Leadership() {
  const { content, loading } = useContent();
  const {
    leaders: supabaseLeaders,
    roles: supabaseRoles,
    loading: leadersLoading,
  } = useSupabaseLeadership();

  const [searchTerm, setSearchTerm] = useState('');

  const leaders =
    supabaseLeaders.length > 0
      ? supabaseLeaders
      : content.leadership?.list || [];

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
    'Bible Study Coordinator',
  ];

  const leadershipArchive = [
    {
      year: '2024/2025',
      chairperson: 'Nashon Otieno',
      viceChairperson: 'Brian Romany',
      secretary: 'Elizabeth Wambugu',
      viceSecretary: 'Vicky Chepkoech',
      treasurer: 'Saib Anakala',
      boardDirector: 'Mercy Munga',
      prayerCoordinator: 'Allan Kwemoi',
      missionsCoordinator: 'Irine Nasimiyu',
      discipleshipCoordinator: 'Sharon Wanjala',
      bibleStudyCoordinator: 'Christopher Isabali',
      hospitalityDirector: 'Joyline Chesang',
    },
    {
      year: '2023/2024',
      chairperson: 'Samwel Oyugi',
      viceChairperson: 'Nashon Otieno',
      secretary: 'Keziah Baraka',
      viceSecretary: 'Jacky Sankei',
      treasurer: 'Graham Juma',
      boardDirector: 'Ian Mark Onyango',
      prayerCoordinator: 'Mary Thiga',
      missionsCoordinator: 'Hillary Ogombe',
      discipleshipCoordinator: 'Philomena Mwende',
      bibleStudyCoordinator: 'Laurane Cherono',
      hospitalityDirector: 'Alexzandria Adhiambo',
    },
    {
      year: '2022/2023',
      chairperson: 'Fadhili Mwivali',
      viceChairperson: 'Samwel Oyugi',
      secretary: 'Riziki Kanze',
      viceSecretary: 'Bethsaida Simiyu',
      treasurer: 'Jacky Sankei',
      boardDirector: 'Timothy Olanda',
      prayerCoordinator: 'Nashon Otieno',
      missionsCoordinator: 'Carolyne Owino',
      discipleshipCoordinator: 'Enock Mutate',
      bibleStudyCoordinator: 'Moses Karkar',
      hospitalityDirector: 'Mical Ashioya',
    },
    {
      year: '2021/2022',
      chairperson: 'Fanuel Favor',
      viceChairperson: 'Paul Ojienya',
      secretary: 'Mary Rael',
      viceSecretary: 'N/A',
      treasurer: 'Fanuel Favor',
      boardDirector: 'Caren Jepkoech',
      prayerCoordinator: 'Fadhili Mwivali',
      missionsCoordinator: 'Sam Oyugi',
      discipleshipCoordinator: 'Xavior Khisa',
      bibleStudyCoordinator: 'Rehema Rashid',
      hospitalityDirector: 'Moureen Kemboi',
    },
  ];

  const sortedLeaders = [...leaders].sort((a: any, b: any) => {
    const aIndex = positionOrder.findIndex(
      (p) => p.toLowerCase() === a.position?.trim().toLowerCase()
    );

    const bIndex = positionOrder.findIndex(
      (p) => p.toLowerCase() === b.position?.trim().toLowerCase()
    );

    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  const filteredLeaders = useMemo(() => {
    return sortedLeaders.filter((leader: any) =>
      leader.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      leader.position?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedLeaders, searchTerm]);

  const isLoading = (loading || leadersLoading) && leaders.length === 0;

  const currentPatron =
    supabaseRoles?.find((r) => r.role_type === 'current_patron') ||
    content.leadership?.currentPatron;

  const previousPatron =
    supabaseRoles?.find((r) => r.role_type === 'previous_patron') ||
    content.leadership?.previousPatron;

  const alumniDirector =
    supabaseRoles?.find((r) => r.role_type === 'alumni_director') ||
    content.leadership?.alumniDirector;

  const recentFOCUSStaffs =
    supabaseRoles
      ?.filter((r) => r.role_type === 'recent FOCUS Staffs')
      ?.sort((a, b) => parseInt(b.year) - parseInt(a.year)) || [];

    const previousChairpersons =
    supabaseRoles?.filter(
      (r) => r.role_type === 'previous_chairperson'
    )?.length > 0
      ? supabaseRoles
          .filter((r) => r.role_type === 'previous_chairperson')
          .sort(
            (a, b) =>
              Number(b.year?.split('/')[0]) -
              Number(a.year?.split('/')[0])
          )
      : content.leadership?.previousChairpersons || [];

  
    // ============================================================
  // LEADERSHIP STRUCTURE
  // ============================================================

  /*
   * These are the official EXECUTIVE TEAM positions.
   *
   * Chairperson is handled separately as the principal leader.
   * Board Director is intentionally NOT included here because
   * Board Director is the Praise & Worship Leader and belongs
   * under Ministry Leadership.
   */
  const executivePositions = [
    'Vice-Chairperson',
    'Secretary',
    'Vice-Secretary',
    'Treasurer',
  ];

  /*
   * Ministry leadership positions.
   *
   * Board Director = Praise & Worship Leader.
   */
  const ministryPositions = [
    'Board Director',
    'Discipleship Coordinator',
    'Prayer Coordinator',
    'Missions Coordinator',
    'Hospitality Director',
    'Bible Study Coordinator',
  ];

  /*
   * Normalize positions so small differences in spacing/case
   * do not prevent a leader from appearing.
   */
  const normalizePosition = (position?: string) =>
    (position || '')
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase();

  /*
   * All leaders except the Chairperson.
   *
   * IMPORTANT:
   * We are filtering directly from `leaders`, which comes from
   * the Supabase `leaders` table.
   */
  const otherLeaders = leaders.filter(
    (leader: any) =>
      normalizePosition(leader.position) !== 'chairperson'
  );
  const chairperson = leaders.find(
  (leader: any) =>
    normalizePosition(leader.position) === 'chairperson'
);

  /*
   * EXECUTIVE TEAM
   *
   * This MUST contain:
   * - Vice-Chairperson
   * - Secretary
   * - Vice-Secretary
   * - Treasurer
   */
  const executiveLeaders = otherLeaders.filter((leader: any) =>
    executivePositions.some(
      (position) =>
        normalizePosition(position) ===
        normalizePosition(leader.position)
    )
  );

  /*
   * MINISTRY LEADERSHIP
   *
   * Board Director is the Praise & Worship Leader.
   */
  const ministryLeaders = otherLeaders.filter((leader: any) =>
    ministryPositions.some(
      (position) =>
        normalizePosition(position) ===
        normalizePosition(leader.position)
    )
  );

  /*
   * Ministry display names.
   */
  const ministryRoleLabels: Record<string, string> = {
    'Board Director': 'Praise & Worship Leader',
    'Discipleship Coordinator': 'Discipleship Ministry',
    'Prayer Coordinator': 'Prayer Ministry',
    'Missions Coordinator': 'Missions Ministry',
    'Hospitality Director': 'Hospitality Ministry',
    'Bible Study Coordinator': 'Bible Study Ministry',
  };

  /*
   * Ministry icons.
   */
  const ministryRoleIcons: Record<string, any> = {
    'Board Director': Music,
    'Discipleship Coordinator': Flame,
    'Prayer Coordinator': HeartHandshake,
    'Missions Coordinator': Globe2,
    'Hospitality Director': Heart,
    'Bible Study Coordinator': BookOpen,
  };

  /*
   * Sort the Executive Team in the correct order.
   */
  const sortedExecutiveLeaders = [...executiveLeaders].sort(
    (a: any, b: any) => {
      const aIndex = executivePositions.findIndex(
        (position) =>
          normalizePosition(position) ===
          normalizePosition(a.position)
      );

      const bIndex = executivePositions.findIndex(
        (position) =>
          normalizePosition(position) ===
          normalizePosition(b.position)
      );

      return aIndex - bIndex;
    }
  );

  /*
   * Sort Ministry Leadership in the correct order.
   */
  const sortedMinistryLeaders = [...ministryLeaders].sort(
    (a: any, b: any) => {
      const aIndex = ministryPositions.findIndex(
        (position) =>
          normalizePosition(position) ===
          normalizePosition(a.position)
      );

      const bIndex = ministryPositions.findIndex(
        (position) =>
          normalizePosition(position) ===
          normalizePosition(b.position)
      );

      return aIndex - bIndex;
    }
  );
  // ============================================================
  // LEADER PHOTO
  // ============================================================

  const renderLeaderPhoto = (
    leader: any,
    size = 'w-36 h-36 md:w-44 md:h-44'
  ) => {
    if (leader?.image) {
      return (
        <img
          src={leader.image}
          alt={leader.name}
          loading="lazy"
          className={
            size +
            ' rounded-full object-cover border-4 shadow-lg'
          }
          style={{ borderColor: '#2e3e87' }}
        />
      );
    }

    return (
      <div
        className={
          size +
          ' rounded-full flex items-center justify-center shadow-lg border-4'
        }
        style={{
          backgroundColor: '#2e3e87',
          borderColor: '#b4712d',
        }}
      >
        <span className="text-white text-4xl md:text-5xl font-bold">
          {leader?.name
            ?.split(' ')
            .map((n: string) => n[0])
            .slice(0, 2)
            .join('')}
        </span>
      </div>
    );
  };
  const LeaderCard = ({
    leader,
    index,
  }: {
    leader: any;
    index: number;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -7 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
      }}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden"
    >
      <div
        className="h-1.5"
        style={{ backgroundColor: '#b4712d' }}
      />

      <div className="p-6 md:p-7">
        <div className="flex justify-center mb-5">
          {renderLeaderPhoto(leader)}
        </div>

        <div className="text-center">
          <p
            className="text-sm uppercase tracking-wider font-bold mb-2"
            style={{ color: '#b4712d' }}
          >
            {leader.position}
          </p>

          <h3
            className="text-xl md:text-2xl font-bold"
            style={{ color: '#2e3e87' }}
          >
            {leader.name}
          </h3>

          {leader.course && leader.year && (
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
              <GraduationCap size={16} />
              <span className="text-sm">
                {leader.year} • {leader.course}
              </span>
            </div>
          )}
          {ministryRoleLabels[leader.position] && (
  <p
    className="text-sm font-semibold mt-2"
    style={{ color: '#b4712d' }}
  >
    {ministryRoleLabels[leader.position]}
  </p>
)}

          {leader.bio && (
            <>
              <div className="border-t border-gray-100 my-5" />

              <p className="text-gray-600 text-sm md:text-base leading-7">
                {leader.bio}
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
  const MinistryLeaderCard = ({
  leader,
  index,
}: {
  leader: any;
  index: number;
}) => {
  const MinistryIcon =
    ministryRoleIcons[leader.position] || Heart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.05,
      }}
      className="group bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Gold accent */}
      <div
        className="h-1.5"
        style={{ backgroundColor: '#b4712d' }}
      />

      <div className="p-7">
        {/* Ministry icon */}
        <div className="flex justify-center mb-5">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center shadow-sm"
            style={{
              backgroundColor: '#f7f3ed',
            }}
          >
            <MinistryIcon
              size={21}
              style={{ color: '#b4712d' }}
            />
          </div>
        </div>

        {/* Photo */}
        <div className="flex justify-center mb-5">
          {renderLeaderPhoto(
            leader,
            'w-32 h-32 md:w-36 md:h-36'
          )}
        </div>

        <div className="text-center">

          {/* Ministry function */}
          <p
            className="text-xs uppercase tracking-widest font-bold"
            style={{ color: '#b4712d' }}
          >
            {ministryRoleLabels[leader.position] ||
              leader.position}
          </p>

          {/* Position */}
          <p
            className="text-sm font-semibold mt-1"
            style={{ color: '#2e3e87' }}
          >
            {leader.position}
          </p>

          {/* Name */}
          <h3
            className="text-xl md:text-2xl font-bold mt-2"
            style={{ color: '#2e3e87' }}
          >
            {leader.name}
          </h3>

          {/* Academic information */}
          {leader.course && leader.year && (
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-500">
              <GraduationCap size={16} />

              <span className="text-sm">
                {leader.year} • {leader.course}
              </span>
            </div>
          )}

          {/* Bio */}
          {leader.bio && (
            <>
              <div className="border-t border-gray-100 my-5" />

              <p className="text-gray-600 text-sm leading-7">
                {leader.bio}
              </p>
            </>
          )}

        </div>
      </div>
    </motion.div>
  );
};

  return (
    <div className="min-h-screen bg-gray-50">

      {/* =====================================================
          HERO
      ===================================================== */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden text-white"
        style={{
          background:
            'linear-gradient(135deg, #2e3e87 0%, #1a2351 65%, #111735 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white" />
          <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full border border-white" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 bg-white/10 border border-white/20">
              <Users size={30} style={{ color: '#b4712d' }} />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              Our Leadership
            </h1>

            <p
              className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: '#b4712d' }}
            >
              Servant leaders committed to Christ, community and mission.
            </p>

            <p className="mt-5 text-white/75 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
              Meet the men and women serving MUKCCU, strengthening the
              fellowship and helping students grow in Christ.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">

        {isLoading ? (
          <div className="text-center py-20">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
              style={{ borderColor: '#2e3e87' }}
            />
            <p className="mt-4 text-gray-600">
              Loading leadership...
            </p>
          </div>
        ) : (
          <>

            {/* =================================================
                INTRO
            ================================================= */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <span
                className="inline-block text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: '#b4712d' }}
              >
                Called to Serve
              </span>

              <h2
                className="text-3xl md:text-4xl font-bold mb-5"
                style={{ color: '#2e3e87' }}
              >
                Leading Through Service
              </h2>

              <p className="text-gray-600 text-lg leading-8">
                MUKCCU is served by leaders who are committed to
                honouring Christ, building the fellowship and helping
                students discover and use their gifts for God's purposes.
              </p>
            </motion.div>


            {/* =================================================
                SPIRITUAL OVERSIGHT
            ================================================= */}
            {currentPatron && (
              <section className="mb-20">
                <div className="flex items-center gap-3 mb-8">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: '#2e3e87' }}
                  >
                    <Award className="text-white" size={20} />
                  </div>

                  <div>
                    <p
                      className="text-sm font-bold uppercase tracking-widest"
                      style={{ color: '#b4712d' }}
                    >
                      Spiritual Oversight
                    </p>

                    <h2
                      className="text-2xl md:text-3xl font-bold"
                      style={{ color: '#2e3e87' }}
                    >
                      CU Patron
                    </h2>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  viewport={{ once: true }}
                  className="relative overflow-hidden rounded-3xl shadow-xl text-white"
                  style={{
                    background:
                      'linear-gradient(135deg, #2e3e87, #1a2351)',
                  }}
                >
                  <div
                    className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10"
                    style={{ backgroundColor: '#b4712d' }}
                  />

                  <div className="relative p-8 md:p-10">
                    <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                      {currentPatron.image_url ? (
                        <img
                          src={currentPatron.image_url}
                          alt={currentPatron.name}
                          loading="lazy"
                          className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover border-4 shadow-xl"
                          style={{ borderColor: '#b4712d' }}
                        />
                      ) : (
                        <div
                          className="w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center border-4"
                          style={{
                            backgroundColor: '#1a2351',
                            borderColor: '#b4712d',
                          }}
                        >
                          <Award size={42} style={{ color: '#b4712d' }} />
                        </div>
                      )}

                      <div className="flex-1">
                        <p
                          className="text-sm font-bold uppercase tracking-widest mb-2"
                          style={{ color: '#b4712d' }}
                        >
                          Spiritual Oversight
                        </p>

                        <h3 className="text-2xl md:text-3xl font-bold mb-3">
                          {currentPatron.name}
                        </h3>

                        {currentPatron.description && (
                          <p className="text-white/80 leading-7 max-w-2xl">
                            {currentPatron.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </section>
            )}


            {/* =================================================
                EXECUTIVE LEADERSHIP
            ================================================= */}
            {leaders.length > 0 && (
              <section className="mb-20">

                <div className="text-center mb-10">
                  <span
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: '#b4712d' }}
                  >
                    2026/2027
                  </span>

                  <h2
                    className="text-3xl md:text-4xl font-bold mt-2"
                    style={{ color: '#2e3e87' }}
                  >
                    Executive Leadership
                  </h2>

                  <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                    Meet the student leaders entrusted with guiding the
                    fellowship and coordinating its ministry.
                  </p>
                </div>

                {/* Search */}
                <div className="mb-10 flex justify-center">
                  <div className="relative w-full max-w-lg">
                    <Search
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={19}
                    />

                    <input
                      type="text"
                      placeholder="Search leaders by name or position..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-11 pr-5 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e3e87] focus:border-transparent"
                    />
                  </div>
                </div>

                {filteredLeaders.length === 0 ? (
                  <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
                    <Search
                      className="mx-auto text-gray-300 mb-4"
                      size={42}
                    />

                    <p className="text-gray-500">
                      No leaders found matching "{searchTerm}"
                    </p>
                  </div>
                ) : (
                  <>
                    {/* FEATURED CHAIRPERSON */}
                    {chairperson && (
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-10"
                      >
                        <div
                          className="relative overflow-hidden rounded-3xl shadow-xl bg-white"
                          style={{
                            borderTop: '6px solid #b4712d',
                          }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-5">

                            <div
                              className="md:col-span-2 p-8 md:p-10 flex items-center justify-center"
                              style={{
                                background:
                                  'linear-gradient(135deg, #2e3e87, #1a2351)',
                              }}
                            >
                              {chairperson.image ? (
                                <img
                                  src={chairperson.image}
                                  alt={chairperson.name}
                                  loading="lazy"
                                  className="w-56 h-56 md:w-64 md:h-64 rounded-full object-cover border-8 shadow-2xl"
                                  style={{ borderColor: '#b4712d' }}
                                />
                              ) : (
                                <div
                                  className="w-56 h-56 md:w-64 md:h-64 rounded-full flex items-center justify-center border-8 shadow-2xl"
                                  style={{
                                    backgroundColor: '#1a2351',
                                    borderColor: '#b4712d',
                                  }}
                                >
                                  <span className="text-white text-6xl font-bold">
                                    {chairperson.name
                                      ?.split(' ')
                                      .map((n: string) => n[0])
                                      .slice(0, 2)
                                      .join('')}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="md:col-span-3 p-8 md:p-10 flex flex-col justify-center">
                              <div className="flex items-center gap-2 mb-3">
                                <Crown
                                  size={20}
                                  style={{ color: '#b4712d' }}
                                />

                                <span
                                  className="text-sm font-bold uppercase tracking-widest"
                                  style={{ color: '#b4712d' }}
                                >
                                  Chairperson
                                </span>
                              </div>

                              <h3
                                className="text-3xl md:text-4xl font-bold"
                                style={{ color: '#2e3e87' }}
                              >
                                {chairperson.name}
                              </h3>

                              {chairperson.course && chairperson.year && (
                                <div className="flex items-center gap-2 mt-3 text-gray-500">
                                  <GraduationCap size={18} />

                                  <span>
                                    {chairperson.year} •{' '}
                                    {chairperson.course}
                                  </span>
                                </div>
                              )}

                              <div
                                className="w-16 h-1 my-6 rounded-full"
                                style={{ backgroundColor: '#b4712d' }}
                              />

                              {chairperson.bio ? (
                                <p className="text-gray-600 text-base md:text-lg leading-8">
                                  {chairperson.bio}
                                </p>
                              ) : (
                                <p className="text-gray-500 leading-7">
                                  Providing servant leadership and
                                  coordinating the executive team in
                                  advancing the mission of MUKCCU.
                                </p>
                              )}
                            </div>

                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* EXECUTIVE TEAM */}
                    {executiveLeaders.length > 0 && (
                      <>
                        <div className="flex items-center gap-3 mb-7">
                          <div
                            className="h-px flex-1"
                            style={{ backgroundColor: '#e5e7eb' }}
                          />

                          <h3
                            className="text-lg font-bold uppercase tracking-wider px-3"
                            style={{ color: '#2e3e87' }}
                          >
                            Executive Team
                          </h3>

                          <div
                            className="h-px flex-1"
                            style={{ backgroundColor: '#e5e7eb' }}
                          />
                        </div>

                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {sortedExecutiveLeaders.map(
    (leader: any, index: number) => (
      <LeaderCard
        key={leader.name + '-' + leader.position}
        leader={leader}
        index={index}
      />
    )
  )}
</div>
</div>
                      </>
                    )}

                    {/* MINISTRY LEADERS */}
                    {ministryLeaders.length > 0 && (
                      <div className="mt-16">
                        <div className="text-center mb-10">
  <span
    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
    style={{ color: '#b4712d' }}
  >
    <Heart size={16} />
    Serving the Mission
  </span>

  <h3
    className="text-3xl md:text-4xl font-bold mt-2"
    style={{ color: '#2e3e87' }}
  >
    Ministry Leadership
  </h3>

  <p className="text-gray-600 mt-3 max-w-2xl mx-auto leading-7">
    Leaders entrusted with nurturing worship, discipleship,
    prayer, missions, hospitality and Bible study within MUKCCU.
  </p>
</div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {ministryLeaders.map(
                            (leader: any, index: number) => (
                              <LeaderCard
                                key={leader.name + '-' + leader.position}
                                leader={leader}
                                index={index}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}


            {/* =================================================
                FOCUS STAFF
            ================================================= */}
            {recentFOCUSStaffs.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-10">
                  <span
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: '#b4712d' }}
                  >
                    Ministry Support
                  </span>

                  <h2
                    className="text-3xl md:text-4xl font-bold mt-2"
                    style={{ color: '#2e3e87' }}
                  >
                    FOCUS Ministry Team
                  </h2>

                  <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Ministry staff who support discipleship, evangelism
                    and Christian witness among students.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentFOCUSStaffs.map((staff: any, index: number) => (
                    <motion.div
                      key={staff.name + '-' + staff.year + '-' + index}
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -6 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45 }}
                      className="bg-white rounded-3xl shadow-md hover:shadow-xl overflow-hidden"
                    >
                      <div
                        className="h-1.5"
                        style={{ backgroundColor: '#b4712d' }}
                      />

                      <div className="p-7 text-center">
                        {staff.image_url ? (
                          <img
                            src={staff.image_url}
                            alt={staff.name}
                            loading="lazy"
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 shadow-md"
                            style={{ borderColor: '#2e3e87' }}
                          />
                        ) : (
                          <div
                            className="w-28 h-28 mx-auto rounded-full flex items-center justify-center border-4"
                            style={{
                              backgroundColor: '#2e3e87',
                              borderColor: '#b4712d',
                            }}
                          >
                            <BookOpen
                              size={38}
                              className="text-white"
                            />
                          </div>
                        )}

                        <p
                          className="mt-5 text-sm uppercase tracking-wider font-bold"
                          style={{ color: '#b4712d' }}
                        >
                          FOCUS Staff
                        </p>

                        <h3
                          className="text-xl font-bold mt-1"
                          style={{ color: '#2e3e87' }}
                        >
                          {staff.name}
                        </h3>

                        {staff.year && (
                          <p className="text-sm text-gray-500 mt-1">
                            {staff.year}
                          </p>
                        )}

                        {staff.description && (
                          <>
                            <div className="border-t border-gray-100 my-5" />

                            <p className="text-gray-600 text-sm leading-7">
                              {staff.description}
                            </p>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}


            {/* =================================================
                ALUMNI DIRECTOR
            ================================================= */}
            {alumniDirector && (
              <section className="mb-20">
                <div className="max-w-4xl mx-auto">
                  <div
                    className="rounded-3xl overflow-hidden shadow-xl text-white"
                    style={{
                      background:
                        'linear-gradient(135deg, #2e3e87, #1a2351)',
                    }}
                  >
                    <div className="p-8 md:p-10 flex flex-col md:flex-row items-center gap-7 text-center md:text-left">
                      {alumniDirector.image_url ? (
                        <img
                          src={alumniDirector.image_url}
                          alt={alumniDirector.name}
                          loading="lazy"
                          className="w-28 h-28 rounded-full object-cover border-4"
                          style={{ borderColor: '#b4712d' }}
                        />
                      ) : (
                        <div
                          className="w-28 h-28 rounded-full flex items-center justify-center border-4"
                          style={{
                            backgroundColor: '#1a2351',
                            borderColor: '#b4712d',
                          }}
                        >
                          <Heart
                            size={36}
                            style={{ color: '#b4712d' }}
                          />
                        </div>
                      )}

                      <div>
                        <p
                          className="text-sm uppercase tracking-widest font-bold"
                          style={{ color: '#b4712d' }}
                        >
                          Alumni Leadership
                        </p>

                        <h2 className="text-2xl md:text-3xl font-bold mt-1">
                          Alumni Director
                        </h2>

                        <p className="text-xl font-semibold mt-2">
                          {alumniDirector.name}
                        </p>

                        {alumniDirector.description && (
                          <p className="text-white/75 mt-2 leading-7">
                            {alumniDirector.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}


            {/* =================================================
                PREVIOUS PATRON
            ================================================= */}
            {previousPatron && (
              <section className="mb-20">
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white rounded-3xl shadow-md p-8 text-center border border-gray-100">
                    <Award
                      size={34}
                      className="mx-auto mb-4"
                      style={{ color: '#b4712d' }}
                    />

                    <p
                      className="text-sm uppercase tracking-widest font-bold"
                      style={{ color: '#b4712d' }}
                    >
                      Leadership Legacy
                    </p>

                    <h2
                      className="text-2xl md:text-3xl font-bold mt-2"
                      style={{ color: '#2e3e87' }}
                    >
                      Previous CU Patron
                    </h2>

                    {previousPatron.image_url && (
                      <img
                        src={previousPatron.image_url}
                        alt={previousPatron.name}
                        loading="lazy"
                        className="w-24 h-24 mx-auto mt-6 rounded-full object-cover border-4"
                        style={{ borderColor: '#2e3e87' }}
                      />
                    )}

                    <p className="text-xl font-semibold text-gray-800 mt-5">
                      {previousPatron.name}
                    </p>

                    {previousPatron.description && (
                      <p className="text-gray-600 mt-2 max-w-2xl mx-auto leading-7">
                        {previousPatron.description}
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}


            {/* =================================================
                FORMER CHAIRPERSONS
            ================================================= */}
            {previousChairpersons.length > 0 && (
              <section className="mb-20">
                <div className="text-center mb-10">
                  <span
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: '#b4712d' }}
                  >
                    Leadership Legacy
                  </span>

                  <h2
                    className="text-3xl md:text-4xl font-bold mt-2"
                    style={{ color: '#2e3e87' }}
                  >
                    Former Chairpersons
                  </h2>

                  <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                    Honouring those who have previously served MUKCCU
                    through the office of Chairperson.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {previousChairpersons.map(
                    (chair: any, index: number) => (
                      <motion.div
                        key={chair.name + '-' + chair.year + '-' + index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.04,
                        }}
                        className="bg-white rounded-3xl shadow-md hover:shadow-xl p-6 text-center border border-gray-100"
                      >
                        {chair.image_url ? (
                          <img
                            src={chair.image_url}
                            alt={chair.name}
                            loading="lazy"
                            className="w-28 h-28 mx-auto rounded-full object-cover border-4 shadow-md"
                            style={{ borderColor: '#2e3e87' }}
                          />
                        ) : (
                          <div
                            className="w-28 h-28 mx-auto rounded-full flex items-center justify-center border-4"
                            style={{
                              backgroundColor: '#2e3e87',
                              borderColor: '#b4712d',
                            }}
                          >
                            <span className="text-white text-3xl font-bold">
                              {chair.name
                                ?.split(' ')
                                .map((n: string) => n[0])
                                .slice(0, 2)
                                .join('')}
                            </span>
                          </div>
                        )}

                        <h3
                          className="mt-5 text-lg font-bold"
                          style={{ color: '#2e3e87' }}
                        >
                          {chair.name}
                        </h3>

                        <p
                          className="mt-1 text-sm font-semibold"
                          style={{ color: '#b4712d' }}
                        >
                          {chair.year}
                        </p>

                        <p className="text-xs text-gray-500 mt-2">
                          Former Chairperson
                        </p>
                      </motion.div>
                    )
                  )}
                </div>
              </section>
            )}


            {/* =================================================
                LEADERSHIP ARCHIVE
            ================================================= */}
            <section className="mb-20">
              <div className="text-center mb-10">
                <span
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: '#b4712d' }}
                >
                  Our History
                </span>

                <h2
                  className="text-3xl md:text-4xl font-bold mt-2"
                  style={{ color: '#2e3e87' }}
                >
                  Leadership Through the Years
                </h2>

                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                  Explore the executive teams that have served MUKCCU
                  over the years.
                </p>
              </div>

              <div className="max-w-4xl mx-auto space-y-3">
                {leadershipArchive.map((team, index) => (
                  <details
                    key={team.year}
                    className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <summary
                      className="cursor-pointer list-none px-6 py-5 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor:
                              index === 0 ? '#2e3e87' : '#f5f5f5',
                          }}
                        >
                          <Clock
                            size={18}
                            style={{
                              color:
                                index === 0 ? '#b4712d' : '#2e3e87',
                            }}
                          />
                        </div>

                        <div>
                          <p
                            className="font-bold text-lg"
                            style={{ color: '#2e3e87' }}
                          >
                            {team.year}
                          </p>

                          <p className="text-sm text-gray-500">
                            Former Executive Team
                          </p>
                        </div>
                      </div>

                      <ChevronDown
                        size={21}
                        className="text-gray-400 transition-transform group-open:rotate-180"
                      />
                    </summary>

                    <div className="border-t border-gray-100 px-6 py-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                        <p>
                          <strong>Chairperson:</strong>{' '}
                          {team.chairperson}
                        </p>

                        <p>
                          <strong>Vice Chairperson:</strong>{' '}
                          {team.viceChairperson}
                        </p>

                        <p>
                          <strong>Secretary:</strong>{' '}
                          {team.secretary}
                        </p>

                        <p>
                          <strong>Vice Secretary:</strong>{' '}
                          {team.viceSecretary}
                        </p>

                        <p>
                          <strong>Treasurer:</strong>{' '}
                          {team.treasurer}
                        </p>

                        <p>
                          <strong>Board Director:</strong>{' '}
                          {team.boardDirector}
                        </p>

                        <p>
                          <strong>Prayer Coordinator:</strong>{' '}
                          {team.prayerCoordinator}
                        </p>

                        <p>
                          <strong>Missions Coordinator:</strong>{' '}
                          {team.missionsCoordinator}
                        </p>

                        <p>
                          <strong>Discipleship Coordinator:</strong>{' '}
                          {team.discipleshipCoordinator}
                        </p>

                        <p>
                          <strong>Bible Study Coordinator:</strong>{' '}
                          {team.bibleStudyCoordinator}
                        </p>

                        <p>
                          <strong>Hospitality Director:</strong>{' '}
                          {team.hospitalityDirector}
                        </p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </section>


            {/* =================================================
                LEADERSHIP STRUCTURE
            ================================================= */}
            <section>
              <div className="text-center mb-10">
                <span
                  className="text-sm font-bold uppercase tracking-widest"
                  style={{ color: '#b4712d' }}
                >
                  How We Serve
                </span>

                <h2
                  className="text-3xl md:text-4xl font-bold mt-2"
                  style={{ color: '#2e3e87' }}
                >
                  Leadership Structure
                </h2>

                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                  A simple view of how leadership and ministry work
                  together within MUKCCU.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <div
                  className="rounded-3xl p-6 md:p-10 shadow-xl"
                  style={{
                    background:
                      'linear-gradient(135deg, #f8f9fc, #ffffff)',
                  }}
                >
                  <div className="flex flex-col items-center">

                    <div
                      className="w-full max-w-sm text-center px-6 py-4 rounded-2xl text-white font-bold shadow-md"
                      style={{ backgroundColor: '#2e3e87' }}
                    >
                      CU Patron
                    </div>

                    <div
                      className="text-3xl my-3"
                      style={{ color: '#b4712d' }}
                    >
                      ↓
                    </div>

                    <div
                      className="w-full max-w-sm text-center px-6 py-4 rounded-2xl text-white font-bold shadow-md"
                      style={{ backgroundColor: '#b4712d' }}
                    >
                      Chairperson
                    </div>

                    <div
                      className="text-3xl my-3"
                      style={{ color: '#b4712d' }}
                    >
                      ↓
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div
                        className="text-center px-5 py-4 rounded-2xl bg-white shadow border"
                        style={{ borderColor: '#e5e7eb' }}
                      >
                        <p
                          className="font-bold"
                          style={{ color: '#2e3e87' }}
                        >
                          Executive Committee
                        </p>
                      </div>

                      <div
                        className="text-center px-5 py-4 rounded-2xl bg-white shadow border"
                        style={{ borderColor: '#e5e7eb' }}
                      >
                        <p
                          className="font-bold"
                          style={{ color: '#2e3e87' }}
                        >
                          Board Director
                        </p>
                      </div>
                    </div>

                    <div
                      className="text-3xl my-3"
                      style={{ color: '#b4712d' }}
                    >
                      ↓
                    </div>

                    <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="text-center px-4 py-4 rounded-2xl bg-white shadow border border-gray-100">
                        <p className="font-semibold text-gray-700">
                          Prayer
                        </p>
                      </div>

                      <div className="text-center px-4 py-4 rounded-2xl bg-white shadow border border-gray-100">
                        <p className="font-semibold text-gray-700">
                          Discipleship
                        </p>
                      </div>

                      <div className="text-center px-4 py-4 rounded-2xl bg-white shadow border border-gray-100">
                        <p className="font-semibold text-gray-700">
                          Missions
                        </p>
                      </div>
                    </div>

                    <div
                      className="text-3xl my-3"
                      style={{ color: '#b4712d' }}
                    >
                      ↓
                    </div>

                    <div
                      className="w-full max-w-sm text-center px-6 py-4 rounded-2xl bg-white shadow border"
                      style={{ borderColor: '#e5e7eb' }}
                    >
                      <p
                        className="font-bold"
                        style={{ color: '#2e3e87' }}
                      >
                        MUKCCU Members
                      </p>
                    </div>

                  </div>
                </div>
              </motion.div>
            </section>

          </>
        )}
      </div>
    </div>
  );
}

