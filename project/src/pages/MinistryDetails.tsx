import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
  Play,
  ExternalLink,
} from 'lucide-react';

import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';

import { useSupabaseMinistries } from '../hooks/useSupabaseMinistries';
import MinistryRegistrationModal from '../components/MinistryRegistrationModal';

export default function MinistryDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const {
    ministries,
    loading,
  } = useSupabaseMinistries();

  const [showModal, setShowModal] = useState(false);

  /* =====================================================
     SLUG GENERATOR
  ====================================================== */

  const createSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  /* =====================================================
     FIND MINISTRY
  ====================================================== */

  const ministry = ministries.find(
    (item: any) =>
      slug &&
      createSlug(item.name) === slug
  );

  /* =====================================================
     SCROLL TO TOP WHEN MINISTRY CHANGES
  ====================================================== */

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }, [slug]);

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-[#2e3e87]/20 border-t-[#b4712d] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600">
            Loading ministry...
          </p>

        </div>
      </div>
    );
  }

  /* =====================================================
     MINISTRY NOT FOUND
  ====================================================== */

  if (!ministry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="text-center max-w-lg">

          <div className="w-20 h-20 rounded-full bg-[#2e3e87] flex items-center justify-center mx-auto mb-6">
            <Users
              size={34}
              className="text-white"
            />
          </div>

          <h1 className="text-3xl font-bold text-[#2e3e87] mb-4">
            Ministry Not Found
          </h1>

          <p className="text-gray-600 mb-8">
            We couldn't find the ministry you're looking for.
            It may have been moved or is currently unavailable.
          </p>

          <button
            onClick={() => navigate('/ministries')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2e3e87] text-white font-semibold hover:bg-[#1a2351] transition"
          >
            <ArrowLeft size={18} />
            Back to Ministries
          </button>

        </div>

      </div>
    );
  }

  /* =====================================================
     DATA PREPARATION
  ====================================================== */

  const activities =
    ministry.activities
      ?.split(',')
      .map((item: string) => item.trim())
      .filter(Boolean) || [];

  const teams =
    ministry.teams
      ?.split(',')
      .map((item: string) => item.trim())
      .filter(Boolean) || [];
    /* =====================================================
     MEDIA & IT — CU PODCASTS & VIDEOS
  ====================================================== */

  const isMediaMinistry =
    ministry.name
      ?.toLowerCase()
      .includes('media') &&
    ministry.name
      ?.toLowerCase()
      .includes('it');

  const cuVideos = [
    {
      id: 'GbIZo8ys22c',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 'OFRLMjo7zp4',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 'cXGXABGZuKs',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 'MVdmtwK2F_I',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 'w0XPkw8e0iM',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 's-bYZyUGyrM',
      title: 'MUKCCU CU Podcast',
    },
    {
      id: 'AXu9zE2lBGY',
      title: 'MUKCCU CU Podcast',
    },
  ];

  const pageTitle =
    `${ministry.name} | MUKCCU`;

  const pageDescription =
    ministry.full_description ||
    ministry.description ||
    `Discover ${ministry.name} at Maseno University City Campus Christian Union.`;

  /* =====================================================
     STRUCTURED DATA
  ====================================================== */

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `${ministry.name} - MUKCCU`,
    description: pageDescription,
    url: `https://mukccu.org/ministries/${slug}`,
    parentOrganization: {
      '@type': 'Organization',
      name: 'Maseno University City Campus Christian Union',
      url: 'https://mukccu.org/',
    },
  };

  return (
    <div className="min-h-screen bg-white">

      {/* =====================================================
          SEO
      ====================================================== */}

      <Helmet>

        <title>
          {pageTitle}
        </title>

        <meta
          name="description"
          content={pageDescription.substring(0, 155)}
        />

        <link
          rel="canonical"
          href={`https://mukccu.org/ministries/${slug}`}
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription.substring(0, 200)}
        />

        <meta
          property="og:url"
          content={`https://mukccu.org/ministries/${slug}`}
        />

        <meta
          property="og:type"
          content="website"
        />

        {ministry.image_url && (
          <meta
            property="og:image"
            content={ministry.image_url}
          />
        )}

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content={pageTitle}
        />

        <meta
          name="twitter:description"
          content={pageDescription.substring(0, 200)}
        />

        {ministry.image_url && (
          <meta
            name="twitter:image"
            content={ministry.image_url}
          />
        )}

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>

      </Helmet>

      {/* =====================================================
          PREMIUM HERO
      ====================================================== */}

      <section className="relative min-h-[560px] md:min-h-[650px] overflow-hidden bg-[#1a2351]">

        {ministry.image_url && (
          <img
            src={ministry.image_url}
            alt={ministry.name}
            className="absolute inset-0 w-full h-full object-cover scale-105"
          />
        )}

        {!ministry.image_url && (
          <div className="absolute inset-0 bg-[#2e3e87]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#101733] via-[#1a2351]/75 to-[#1a2351]/30" />

        <div className="absolute inset-0 bg-[#1a2351]/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 md:py-24 min-h-[560px] md:min-h-[650px] flex flex-col justify-end">

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate('/ministries')}
            className="absolute top-8 left-6 md:left-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white hover:bg-white/20 transition-all"
          >
            <ArrowLeft size={17} />
            All Ministries
          </button>

          <div className="max-w-4xl">

            {/* LABEL */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b4712d] text-white mb-6 shadow-lg">

              <Sparkles size={15} />

              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
                MUKCCU Ministry
              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              {ministry.name}
            </h1>

            {/* DESCRIPTION */}

            {ministry.description && (
              <p className="text-lg md:text-2xl text-white/85 max-w-3xl leading-relaxed mb-8">
                {ministry.description}
              </p>
            )}

            {/* HERO ACTIONS */}

            <div className="flex flex-col sm:flex-row gap-4">

              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition-all shadow-xl"
              >
                Join This Ministry
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById('about-ministry')
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    })
                }
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all"
              >
                Discover More
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          QUICK INFORMATION
      ====================================================== */}

      <section className="bg-white border-b border-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">

            {/* LEADER */}

            <div className="py-7 sm:px-8 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center flex-shrink-0">
                <Users
                  size={22}
                  className="text-white"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Ministry Leader
                </p>

                <p className="font-bold text-[#2e3e87]">
                  {ministry.leader_name ||
                    ministry.leader ||
                    'Ministry Team'}
                </p>

              </div>

            </div>

            {/* ACTIVITIES */}

            <div className="py-7 sm:px-8 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#b4712d] flex items-center justify-center flex-shrink-0">
                <Sparkles
                  size={22}
                  className="text-white"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Activities
                </p>

                <p className="font-bold text-[#2e3e87]">
                  {activities.length} Areas of Service
                </p>

              </div>

            </div>

            {/* TEAMS */}

            <div className="py-7 sm:px-8 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center flex-shrink-0">
                <Users
                  size={22}
                  className="text-white"
                />
              </div>

              <div>

                <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                  Teams
                </p>

                <p className="font-bold text-[#2e3e87]">
                  {teams.length} Teams
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          ABOUT
      ====================================================== */}

      <section
        id="about-ministry"
        className="max-w-6xl mx-auto px-6 py-20 md:py-24"
      >

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-20 items-start">

          <div>

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              About the Ministry
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] leading-tight">
              Serving Christ.
              <br />
              Building People.
            </h2>

          </div>

          <div>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              {ministry.full_description ||
                ministry.description ||
                'This ministry provides opportunities for students to serve God, grow spiritually and use their gifts to impact others.'}
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          VISION
      ====================================================== */}

      {ministry.vision && (
        <section className="max-w-6xl mx-auto px-6 pb-20">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2e3e87] p-8 md:p-14">

            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="relative z-10 max-w-4xl">

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-5">
                Our Vision
              </p>

              <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                {ministry.vision}
              </h2>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          ACTIVITIES
      ====================================================== */}

      {activities.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">

          <div className="mb-10">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              What We Do
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
              How We Serve
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {activities.map(
              (activity: string, index: number) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="text-5xl font-black text-[#2e3e87]/10 mb-6">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  <CheckCircle2
                    size={24}
                    className="text-[#b4712d] mb-4"
                  />

                  <h3 className="text-lg font-bold text-[#2e3e87]">
                    {activity}
                  </h3>

                </div>
              )
            )}

          </div>

        </section>
      )}
                  {/* =================================================
    CU PODCASTS & VIDEOS
================================================== */}
{isMediaMinistry && (
  <section className="mb-14">

    <div className="mb-7">
      <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
        Media & IT Ministry
      </p>

      <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e87] mb-3">
        CU Podcasts & Videos
      </h2>

      <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
        Watch and listen to conversations, teachings,
        discussions and other media content from
        Maseno University City Campus Christian Union.
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-6">

      {cuVideos.map((video, index) => (
        <div
          key={video.id}
          className="group overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300"
        >

          {/* VIDEO */}
          <div className="relative aspect-video bg-[#1a2351] overflow-hidden">

            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${video.id}`}
              title={video.title}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

          </div>

          {/* VIDEO INFO */}
          <div className="p-5">

            <div className="flex items-start justify-between gap-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#b4712d] mb-2">
                  MUKCCU Media
                </p>

                <h3 className="text-lg font-bold text-[#2e3e87]">
                  {video.title} {index + 1}
                </h3>
              </div>

              <a
                href={`https://youtu.be/${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 w-10 h-10 rounded-full bg-[#2e3e87] text-white flex items-center justify-center hover:bg-[#b4712d] transition"
                aria-label={`Watch ${video.title} on YouTube`}
              >
                <ExternalLink size={17} />
              </a>

            </div>

          </div>

        </div>
      ))}

    </div>

  </section>
  )}
      {/* =====================================================
          TEAMS
      ====================================================== */}

      {teams.length > 0 && (
        <section className="bg-gray-50 py-20 md:py-24">

          <div className="max-w-6xl mx-auto px-6">

            <div className="max-w-2xl mb-10">

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Structure
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
                Teams & Departments
              </h2>

              <p className="mt-4 text-gray-600 text-lg">
                Find a team where your gifts, passion and calling can flourish.
              </p>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {teams.map(
                (team: string, index: number) => (
                  <div
                    key={index}
                    className="group bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#b4712d] hover:shadow-lg transition-all"
                  >

                    <div className="flex items-center justify-between mb-6">

                      <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center">
                        <Users
                          size={21}
                          className="text-white"
                        />
                      </div>

                      <span className="text-sm font-bold text-[#b4712d]">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                    </div>

                    <h3 className="text-xl font-bold text-[#2e3e87]">
                      {team}
                    </h3>

                  </div>
                )
              )}

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          LEADERSHIP
      ====================================================== */}

      {(ministry.leader_name || ministry.leader) && (
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">

          <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-14 items-center">

            {/* IMAGE */}

            <div className="relative">

              <div className="absolute -inset-3 rounded-[2rem] bg-[#b4712d]/20 rotate-3" />

              <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-[#2e3e87]">

                {ministry.leader_image_url ? (
                  <img
                    src={ministry.leader_image_url}
                    alt={
                      ministry.leader_name ||
                      ministry.leader
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Users
                      size={70}
                      className="text-white/40"
                    />
                  </div>
                )}

              </div>

            </div>

            {/* CONTENT */}

            <div>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Ministry Leadership
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-4">
                {ministry.leader_name ||
                  ministry.leader}
              </h2>

              <p className="text-lg font-semibold text-[#b4712d] mb-6">
                {ministry.leader_title ||
                  ministry.leader}
              </p>

              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
                Serving the MUKCCU community by providing
                spiritual direction, coordination and
                encouragement within the ministry.
              </p>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          WHY SERVE
      ====================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Why Serve?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
              Your Gift Has a Place
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Ministry is more than filling a role. It is an opportunity
              to grow in Christ, build meaningful relationships and
              make an impact in the lives of others.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: 'Grow Spiritually',
                text: 'Develop your gifts while growing deeper in your walk with Christ.',
              },
              {
                title: 'Build Community',
                text: 'Serve alongside students who share your faith, passion and calling.',
              },
              {
                title: 'Make an Impact',
                text: 'Use what God has given you to bless others and advance His Kingdom.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
              >

                <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center mb-6">

                  <CheckCircle2
                    size={22}
                    className="text-white"
                  />

                </div>

                <h3 className="text-xl font-bold text-[#2e3e87] mb-3">
                  {item.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="py-20 md:py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2e3e87] px-7 py-14 md:px-16 md:py-20 text-center">

            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <p className="text-[#b4712d] font-bold uppercase tracking-[0.2em] text-sm mb-4">
                Find Your Place
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Ready to Serve?
              </h2>

              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Use your gifts, grow in Christ and make an impact
                through the {ministry.name}.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">

                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                >
                  Join This Ministry
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => navigate('/ministries')}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  Explore Other Ministries
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          REGISTRATION MODAL
      ====================================================== */}

      <MinistryRegistrationModal
        ministry={ministry.name}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}
