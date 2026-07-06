import { Target, Heart, Users, Book, Cross, Globe } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { Helmet } from 'react-helmet-async';

export default function About() {
  const { content, loading } = useContent();

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  const coreValues = [
    {
      icon: Cross,
      title: 'Godliness',
      description:
        'Living in reverence and devotion to God in all aspects of our lives',
    },
    {
      icon: Target,
      title: 'Integrity',
      description:
        'Upholding truth, righteousness, and moral principles in our conduct',
    },
    {
      icon: Users,
      title: 'Unity',
      description:
        'Standing together in Christ as one body, supporting one another',
    },
    {
      icon: Book,
      title: 'Excellence',
      description:
        'Pursuing the best in all we do for the glory of God',
    },
  ];

  const objectives = [
    {
      icon: Heart,
      title: 'Discipleship',
      description:
        'To deepen and strengthen the spiritual life of its members by study of the Bible, by prayers and Christian fellowship',
    },
    {
      icon: Globe,
      title: 'Mission',
      description:
        'To prepare Christian students to take good news to all nations of the world and to play an active role in the communities where they live',
    },
    {
      icon: Cross,
      title: 'Evangelism',
      description:
        'To be witnesses of the Lord Jesus Christ as the Savior and seek to lead others to a personal faith in Him, both in and outside the University',
    },
    {
      icon: Users,
      title: 'Leadership Development',
      description:
        'To identify and develop Christian leaders',
    },
  ];

  return (
    <div className="min-h-screen">

      {/* SEO META TAGS */}
      <Helmet>
        <title>About MUKCCU | Maseno University City Campus Christian Union</title>
        <meta
          name="description"
          content="Learn about Maseno University City Campus Christian Union (MUKCCU), its vision, mission, core values, objectives, and history."
        />
        <meta
          name="keywords"
          content="MUKCCU,  Maseno University City Campus CU fellowship, MUKCCU history, Maseno University City Campus Christian Union vision mission"
        />

        {/* Open Graph */}
        <meta property="og:title" content="About MUKCCU - Maseno University City Campus Christian Union" />
        <meta property="og:description" content="Discover the vision, mission, values, and history of MUKCCU." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/about" />
      </Helmet>

      {/* HEADER */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
        }}
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-2">
            {content.about?.pageTitle || 'About MUKCCU'}
          </h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>
            {content.about?.pageSubtitle || 'Pursuing Holiness'}
          </p>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* WHO WE ARE */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#2e3e87' }}>
              Who We Are
            </h2>

            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              The full name of the Christian Union is{' '}
              <span className="font-semibold" style={{ color: '#2e3e87' }}>
                Maseno University Kisumu Campus Christian Union (MUKCCU)
              </span>{' '}
              and our motto is{' '}
              <span className="font-semibold" style={{ color: '#b4712d' }}>
                Pursuing Holiness
              </span>.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderLeft: '4px solid #2e3e87',
                }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                  Vision
                </h3>
                <p className="text-gray-700">
                  {content.about?.vision || 'To live as true disciples of Jesus Christ'}
                </p>
              </div>

              <div
                className="p-6 rounded-xl"
                style={{
                  backgroundColor: '#f8f9fa',
                  borderLeft: '4px solid #b4712d',
                }}
              >
                <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                  Mission
                </h3>
                <p className="text-gray-700">
                  {content.about?.mission ||
                    'To nurture belief in Christ-like character amongst students and communities'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CORE VALUES */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-2xl shadow-lg bg-white"
                  style={{ borderTop: '4px solid #b4712d' }}
                >
                  <Icon className="mb-4" style={{ color: '#2e3e87' }} size={40} />
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* OBJECTIVES */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-12" style={{ color: '#2e3e87' }}>
            Our Objectives
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {objectives.map((obj, index) => {
              const Icon = obj.icon;
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl shadow-lg bg-white"
                  style={{ borderTop: '4px solid #b4712d' }}
                >
                  <Icon className="mb-4" style={{ color: '#2e3e87' }} size={40} />
                  <h3 className="text-2xl font-bold mb-3" style={{ color: '#2e3e87' }}>
                    {obj.title}
                  </h3>
                  <p className="text-gray-700 text-lg">{obj.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* HISTORY */}
<div className="mb-16">
  <div
    className="rounded-2xl shadow-xl p-8 md:p-12"
    style={{
      background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
    }}
  >
    <h2 className="text-4xl font-bold mb-8 text-white text-center">
      Our History
    </h2>

    <div className="text-white text-lg leading-8 space-y-6">

      <p>
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}>Maseno University Kisumu Campus Christian Union (MUKCCU)</span>
        traces its roots back to <span style={{ color: '#b4712d', fontWeight: 'bold' }}>2013</span>,
        when a small group of Christian students, most of whom had transferred
        from the Main Campus, longed for a place where they could worship,
        grow spiritually and fellowship together within the City Campus.
      </p>

      <p>
        The vision to establish a Christian Union was strongly championed by
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}> Sammy Muraya </span>,
        whose burden for Christian fellowship inspired the birth of the ministry.
        Together with the pioneer members, regular Bible studies, prayer meetings
        and fellowship gatherings began despite having very few members.
      </p>

      <p>
        The early years were marked by numerous challenges. Meetings were held in
        borrowed classrooms and offices, members often faced interruptions while
        praying, and resources were extremely limited. Nevertheless, the pioneers
        remained steadfast in prayer, unity and commitment, laying a strong
        spiritual foundation for future generations.
      </p>

      <p>
        A major milestone came in
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}> 2015</span>,
        when the University administration allocated the fellowship a dedicated
        meeting space and MUKCCU officially began holding Sunday services.
        Support from leaders such as <span style={{ color: '#b4712d', fontWeight: 'bold' }}>Perminus Kariuki</span>
         and the long-serving patron
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}>Dr. Ayere</span>
        provided stability and encouragement during this formative period.
      </p>

      <p>
        Through faithful leadership, discipleship and evangelism, the fellowship
        steadily grew from only a handful of students to well over one hundred
        active members. Leaders including
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}> Nicodemus Simiyu</span>,
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}> Nick Mahan</span>,
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}> Asira Nelson</span>
         and many others helped strengthen the ministry while alumni continued
        supporting the work even after graduation.
      </p>

      <p>
        Today, MUKCCU continues to pursue its calling of raising Christ-centred
        students through discipleship, prayer, worship, missions and servant
        leadership. More than a decade after its humble beginnings, the fellowship
        remains committed to its motto,
        <span style={{ color: '#b4712d', fontWeight: 'bold' }}>
          {' '}“Pursuing Holiness.”
        </span>
      </p>

    </div>
  </div>
</div>
        {/* JOURNEY */}
<div className="mb-16">
  <h2
    className="text-4xl font-bold text-center mb-12"
    style={{ color: '#2e3e87' }}
  >
    Journey Through the Years
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#b4712d]">
      <h3 className="text-2xl font-bold mb-3 text-[#2e3e87]">
        2013
      </h3>
      <p className="text-gray-700">
        MUKCCU was born through the vision of pioneer students seeking a place
        for Christian fellowship at the City Campus.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#b4712d]">
      <h3 className="text-2xl font-bold mb-3 text-[#2e3e87]">
        2015
      </h3>
      <p className="text-gray-700">
        Sunday services officially began after the University allocated the
        fellowship a dedicated worship space.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#b4712d]">
      <h3 className="text-2xl font-bold mb-3 text-[#2e3e87]">
        Growth
      </h3>
      <p className="text-gray-700">
        Membership grew from fewer than 15 students to well over 100 through
        faithful discipleship, prayer and evangelism.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-[#b4712d]">
      <h3 className="text-2xl font-bold mb-3 text-[#2e3e87]">
        Today
      </h3>
            <p className="text-gray-700">
        MUKCCU continues to impact students while alumni remain actively involved
        in mentoring, supporting and strengthening the ministry.
      </p>

    </div>
  </div>

</div>

</div>

</div>

);
              }
