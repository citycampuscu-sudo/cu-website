import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
  Sparkles,
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

  const createSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const ministry = ministries.find(
  (item: any) =>
    slug &&
    createSlug(item.name) === slug
);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2e3e87]/20 border-t-[#b4712d] rounded-full animate-spin mx-auto mb-4" />

          <p className="text-gray-600">
            Loading ministry...
          </p>
        </div>
      </div>
    );
  }

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

  const pageTitle =
    `${ministry.name} | MUKCCU`;

  const pageDescription =
    ministry.full_description ||
    ministry.description ||
    `Discover ${ministry.name} at Maseno University City Campus Christian Union.`;

  return (
    <div className="min-h-screen bg-white">

      {/* SEO */}
      <Helmet>

        <title>{pageTitle}</title>

        <meta
          name="description"
          content={pageDescription.substring(0, 155)}
        />

        <meta
          property="og:title"
          content={pageTitle}
        />

        <meta
          property="og:description"
          content={pageDescription.substring(0, 200)}
        />

        {ministry.image_url && (
          <meta
            property="og:image"
            content={ministry.image_url}
          />
        )}

        <meta
          property="og:type"
          content="website"
        />

      </Helmet>

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative min-h-[430px] md:min-h-[520px] overflow-hidden bg-[#1a2351]">

        {ministry.image_url ? (
          <img
            src={ministry.image_url}
            alt={ministry.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2351] via-[#1a2351]/75 to-[#1a2351]/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 min-h-[430px] md:min-h-[520px] flex flex-col justify-end">

          <button
            onClick={() => navigate('/ministries')}
            className="absolute top-8 left-6 md:left-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white hover:bg-white/20 transition"
          >
            <ArrowLeft size={17} />
            All Ministries
          </button>

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b4712d] mb-5">

              <Sparkles size={15} />

              <span className="text-xs font-bold uppercase tracking-wider">
                MUKCCU Ministry
              </span>

            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
              {ministry.name}
            </h1>

            {ministry.description && (
              <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed">
                {ministry.description}
              </p>
            )}

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-20">

        <div className="grid lg:grid-cols-[1fr_320px] gap-14">

          {/* MAIN */}
          <div>

            {/* ABOUT */}
            <section className="mb-14">

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                About the Ministry
              </p>

              <h2 className="text-3xl md:text-4xl font-bold text-[#2e3e87] mb-6">
                Serving Through Our Gifts
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed">
                {ministry.full_description ||
                  ministry.description ||
                  'This ministry provides opportunities for students to serve God, grow spiritually and use their gifts to impact others.'}
              </p>

            </section>

            {/* VISION */}
            {ministry.vision && (
              <section className="mb-14">

                <div className="rounded-3xl bg-[#f8f7f4] border-l-4 border-[#b4712d] p-7 md:p-9">

                  <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                    Our Vision
                  </p>

                  <p className="text-xl md:text-2xl font-semibold text-[#2e3e87] leading-relaxed">
                    {ministry.vision}
                  </p>

                </div>

              </section>
            )}

            {/* ACTIVITIES */}
            {activities.length > 0 && (
              <section className="mb-14">

                <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                  What We Do
                </p>

                <h2 className="text-3xl font-bold text-[#2e3e87] mb-7">
                  Our Activities
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  {activities.map(
                    (activity: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-5 rounded-2xl bg-gray-50 border border-gray-100"
                      >
                        <CheckCircle2
                          size={21}
                          className="text-[#b4712d] mt-0.5 flex-shrink-0"
                        />

                        <span className="text-gray-700 font-medium">
                          {activity}
                        </span>
                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* TEAMS */}
            {teams.length > 0 && (
              <section className="mb-14">

                <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                  Structure
                </p>

                <h2 className="text-3xl font-bold text-[#2e3e87] mb-7">
                  Teams & Departments
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">

                  {teams.map(
                    (team: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-gray-200 hover:border-[#b4712d] transition"
                      >

                        <div className="w-11 h-11 rounded-xl bg-[#2e3e87] flex items-center justify-center flex-shrink-0">
                          <Users
                            size={20}
                            className="text-white"
                          />
                        </div>

                        <span className="font-semibold text-[#2e3e87]">
                          {team}
                        </span>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* MOBILE JOIN CTA */}
            <div className="lg:hidden">

              <div className="rounded-3xl bg-[#2e3e87] p-7 text-center">

                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Serve?
                </h3>

                <p className="text-white/70 mb-6">
                  Find your place and use your gifts for God's glory.
                </p>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                >
                  Join This Ministry
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              SIDEBAR
          ================================================== */}
          <aside>

            <div className="lg:sticky lg:top-24 space-y-6">

              {/* LEADER */}
              {(ministry.leader_name || ministry.leader) && (
                <div className="rounded-3xl bg-gray-50 border border-gray-200 p-7">

                  <p className="text-[#b4712d] text-xs font-bold uppercase tracking-[0.2em] mb-5">
                    Ministry Leadership
                  </p>

                  <div className="flex items-center gap-4">

                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#2e3e87] flex-shrink-0">

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
                            size={30}
                            className="text-white/60"
                          />
                        </div>
                      )}

                    </div>

                    <div>

                      <p className="font-bold text-[#2e3e87]">
                        {ministry.leader_name ||
                          ministry.leader}
                      </p>

                      <p className="text-sm text-[#b4712d] font-semibold mt-1">
                        {ministry.leader_title ||
                          ministry.leader}
                      </p>

                    </div>

                  </div>

                </div>
              )}

              {/* JOIN */}
              <div className="hidden lg:block rounded-3xl bg-[#2e3e87] p-7">

                <Sparkles
                  size={28}
                  className="text-[#b4712d] mb-5"
                />

                <h3 className="text-2xl font-bold text-white mb-3">
                  Ready to Serve?
                </h3>

                <p className="text-white/70 leading-relaxed mb-7">
                  Use your gifts, grow in Christ and make an impact
                  through {ministry.name}.
                </p>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                >
                  Join This Ministry
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* REGISTRATION */}
      <MinistryRegistrationModal
        ministry={ministry.name}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />

    </div>
  );
}
