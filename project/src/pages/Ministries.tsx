import {
  Music,
  Camera,
  Users,
  Globe,
  Book,
  Heart,
  HeartHandshake,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

import { useContent } from '../hooks/useContent';
import { useSupabaseMinistries } from '../hooks/useSupabaseMinistries';
import { useState } from 'react';
import MinistryRegistrationModal from '../components/MinistryRegistrationModal';
import MinistryDetailsModal from '../components/MinistryDetailsModal';
import { Helmet } from 'react-helmet-async';

export default function Ministries() {
  const { content, loading } = useContent();

  const {
    ministries: supabaseMinistries,
    loading: ministriesLoading,
  } = useSupabaseMinistries();

  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [detailsMinistry, setDetailsMinistry] = useState<any>(null);
const [showDetails, setShowDetails] = useState(false);

  const iconMap: any = {
    Music,
    Camera,
    Users,
    Globe,
    Book,
    Heart,
    HeartHandshake,
  };

  const defaultMinistries = [
    {
      icon: 'Music',
      name: 'Board Ministry',
      description:
        'Praise & worship, choir, creative arts, and instrumentalists.',
      leader: 'Board Director',
      activities: 'Worship, choir, instruments',
    },
    {
      icon: 'Camera',
      name: 'Media and IT',
      description:
        'Photography, livestreaming, design, and social media management.',
      leader: 'Media Coordinator',
      activities: 'Media, livestream, design',
    },
    {
      icon: 'HeartHandshake',
      name: 'Hospitality Ministry',
      description:
        'Ushering, welfare, and event coordination.',
      leader: 'Hospitality Director',
      activities: 'Ushering, welfare, catering',
    },
    {
      icon: 'Globe',
      name: 'Missions Ministry',
      description:
        'Evangelism, outreach, and mission work in schools and communities.',
      leader: 'Missions Coordinator',
      activities: 'Outreach, missions, evangelism',
    },
    {
      icon: 'Book',
      name: 'Bible Study Ministry',
      description:
        'Bible study, teaching, and spiritual growth sessions.',
      leader: 'Bible Study Coordinator',
      activities: 'Bible study, teaching',
    },
    {
      icon: 'Users',
      name: 'Discipleship Ministry',
      description:
        'Mentorship, counselling, and nurturing new believers.',
      leader: 'Discipleship Coordinator',
      activities: 'Mentorship, counselling',
    },
    {
      icon: 'Heart',
      name: 'Intercessory Ministry',
      description:
        'Prayer meetings, intercession, and spiritual warfare.',
      leader: 'Prayer Coordinator',
      activities: 'Prayer, intercession',
    },
  ];

  const ministries =
    supabaseMinistries.length > 0
      ? supabaseMinistries
      : defaultMinistries;

  const isLoading = loading || ministriesLoading;

  const handleJoinMinistry = (name: string) => {
    setSelectedMinistry(name);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* SEO */}
      <Helmet>
        <title>
          MUKCCU Ministries | Serve at Maseno University City Campus Christian Union
        </title>

        <meta
          name="description"
          content="Explore ministries at Maseno University City Campus Christian Union (MUKCCU). Discover opportunities to serve through worship, media, missions, prayer, discipleship, hospitality and more."
        />

        <meta
          name="keywords"
          content="MUKCCU ministries, Maseno University City Campus Christian Union ministries, MUKCCU worship, MUKCCU missions, MUKCCU discipleship, MUKCCU prayer, MUKCCU media"
        />

        <meta
          property="og:title"
          content="MUKCCU Ministries | Serve Through Your Gifts"
        />

        <meta
          property="og:description"
          content="Discover ministries at Maseno University City Campus Christian Union and find a place to serve, grow and make an impact."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://mukccu.org/ministries"
        />
      </Helmet>

      {/* LOADING BAR */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#b4712d] animate-pulse z-50" />
      )}

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[430px] md:min-h-[500px] flex items-center overflow-hidden bg-[#1a2351]">

        {/* Decorative background */}
        <div className="absolute inset-0">
          <div className="absolute -top-32 -right-32 w-[450px] h-[450px] rounded-full bg-[#2e3e87] opacity-60" />

          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#b4712d] opacity-10" />

          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20">

          <div className="max-w-4xl mx-auto text-center">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-7">
              <Sparkles
                size={16}
                className="text-[#b4712d]"
              />

              <span className="text-sm font-semibold tracking-wide text-white">
                SERVE • GROW • IMPACT
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white leading-tight">
              {content.ministries?.pageTitle || 'Our Ministries'}
            </h1>

            <p className="mt-5 text-xl md:text-2xl text-[#b4712d] font-medium">
              {content.ministries?.pageSubtitle ||
                'Serving God Through Diverse Gifts'}
            </p>

            <p className="mt-7 text-base md:text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">
              Discover a place where your gifts, passion and calling can
              be used to serve Christ, build His church and impact the
              university community.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="py-20 md:py-24 bg-white">

        <div className="max-w-5xl mx-auto px-6 text-center">

          <p className="text-[#b4712d] uppercase tracking-[0.2em] text-sm font-bold mb-4">
            Find Your Place
          </p>

          <h2 className="text-3xl md:text-5xl font-bold text-[#2e3e87] mb-6">
            There Is a Place for You
          </h2>

          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            God has uniquely gifted every believer for His work.
            At MUKCCU, our ministries provide opportunities to discover,
            develop and use those gifts while growing together in Christ.
          </p>

        </div>
      </section>

      {/* =====================================================
          MINISTRIES
      ====================================================== */}
      <section className="pb-24 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

            <div>
              <p className="text-[#b4712d] uppercase tracking-[0.2em] text-sm font-bold mb-3">
                Explore
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e87]">
                Areas of Service
              </h2>
            </div>

            <p className="text-gray-600 max-w-xl md:text-right">
              Find a ministry that matches your gifts, interests and
              desire to serve God's kingdom.
            </p>

          </div>

          {/* Ministry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

            {ministries.map((ministry: any, index: number) => {

              const Icon =
                iconMap[ministry.icon as keyof typeof iconMap] || Heart;

              return (
                <div
                  key={ministry.id || index}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2"
                >

                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden bg-[#2e3e87]">

                    {ministry.image_url ? (
                      <img
                        src={ministry.image_url}
                        alt={ministry.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2e3e87] to-[#1a2351]">
                        <Icon
                          size={72}
                          className="text-white/30"
                        />
                      </div>
                    )}

                    {/* Image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a2351]/90 via-[#1a2351]/20 to-transparent" />

                    {/* Icon */}
                    <div className="absolute left-5 bottom-5 w-14 h-14 rounded-2xl bg-[#b4712d] flex items-center justify-center shadow-lg">
                      <Icon
                        size={28}
                        className="text-white"
                      />
                    </div>

                    {/* Number */}
                    <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-xs font-bold text-[#2e3e87]">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-6">

                    <h3 className="text-2xl font-bold text-[#2e3e87] mb-2">
                      {ministry.name}
                    </h3>

                    {ministry.leader && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-[#b4712d]" />

                        <p className="text-sm font-semibold text-[#b4712d]">
                          {ministry.leader}
                        </p>
                      </div>
                    )}

                    <p className="text-gray-600 leading-relaxed mb-5">
                      {ministry.description}
                    </p>

                    {/* Activities */}
                    {ministry.activities && (
                      <div className="mb-6">

                        <p className="text-xs uppercase tracking-wider font-bold text-gray-400 mb-2">
                          Activities
                        </p>

                        <p className="text-sm text-gray-600">
                          {ministry.activities}
                        </p>

                      </div>
                    )}

                    {/* Button */}
                    <div className="flex gap-3">

  <button
    onClick={() => {
      setDetailsMinistry(ministry);
      setShowDetails(true);
    }}
    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-[#2e3e87] text-[#2e3e87] font-semibold hover:bg-[#2e3e87] hover:text-white transition-all duration-300"
  >
    Explore

    <ArrowRight size={17} />
  </button>

  <button
    onClick={() =>
      handleJoinMinistry(ministry.name)
    }
    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#b4712d] text-white font-semibold hover:bg-[#965d23] transition-all duration-300"
  >
    Join

    <ArrowRight size={17} />
  </button>

</div>

                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* =====================================================
          SERVE CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-[#2e3e87]">

        {/* Decorative elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-white/5" />

        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#b4712d]/10" />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-24 text-center">

          <Sparkles
            size={34}
            className="mx-auto text-[#b4712d] mb-6"
          />

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">
            Ready to Make an Impact?
          </h2>

          <p className="text-lg text-white/75 max-w-2xl mx-auto mb-9 leading-relaxed">
            Whether you're gifted in worship, evangelism, media,
            hospitality, prayer, discipleship or another area,
            there is a place for you at MUKCCU.
          </p>

          <button
            onClick={() =>
              handleJoinMinistry('General Registration')
            }
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#b4712d] text-white font-bold shadow-lg hover:bg-[#965d23] hover:shadow-xl transition-all duration-300"
          >
            Join a Ministry

            <ArrowRight size={20} />
          </button>

        </div>
      </section>

      {/* MINISTRY DETAILS */}
<MinistryDetailsModal
  ministry={detailsMinistry}
  isOpen={showDetails}
  onClose={() => {
    setShowDetails(false);
    setDetailsMinistry(null);
  }}
  onJoin={() => {
    setShowDetails(false);
    setSelectedMinistry(detailsMinistry?.name || '');
    setShowModal(true);
  }}
/>

{/* REGISTRATION */}
<MinistryRegistrationModal
  ministry={selectedMinistry}
  isOpen={showModal}
  onClose={() => setShowModal(false)}
/>

    </div>
  );
}
