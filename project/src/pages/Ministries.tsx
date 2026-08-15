import {
  ArrowRight,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronRight,
  Globe,
  Heart,
  HeartHandshake,
  Music,
  Search,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import { useContent } from '../hooks/useContent';
import { useSupabaseMinistries } from '../hooks/useSupabaseMinistries';
import MinistryRegistrationModal from '../components/MinistryRegistrationModal';

export default function Ministries() {
  const navigate = useNavigate();

  const { content, loading } = useContent();

  const {
    ministries: supabaseMinistries,
    loading: ministriesLoading,
  } = useSupabaseMinistries();

  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  /* =====================================================
     ICON MAP
  ====================================================== */

  const iconMap: Record<string, any> = {
    Music,
    Camera,
    Users,
    Globe,
    BookOpen,
    Book: BookOpen,
    Heart,
    HeartHandshake,
  };

  /* =====================================================
     HELPERS
  ====================================================== */

  const createSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  const getIcon = (iconName?: string) => {
    return (
      iconMap[iconName || ''] ||
      HeartHandshake
    );
  };

  /* =====================================================
     MINISTRY DATA
  ====================================================== */

  const ministries = useMemo(() => {
    return Array.isArray(supabaseMinistries)
      ? supabaseMinistries
      : [];
  }, [supabaseMinistries]);

  /* =====================================================
     CATEGORIES
     
     Uses the category field when available.
     Ministries without a category are placed under
     "Other".
  ====================================================== */

  const categories = useMemo(() => {
    const uniqueCategories = ministries
      .map((ministry: any) => ministry.category?.trim())
      .filter(Boolean);

    return [
      'All',
      ...Array.from(
        new Set(uniqueCategories)
      ),
    ];
  }, [ministries]);

  /* =====================================================
     FILTERED MINISTRIES
  ====================================================== */

  const filteredMinistries = useMemo(() => {
    const term = searchTerm
      .toLowerCase()
      .trim();

    return ministries.filter(
      (ministry: any) => {
        const matchesSearch =
          !term ||
          ministry.name
            ?.toLowerCase()
            .includes(term) ||
          ministry.description
            ?.toLowerCase()
            .includes(term) ||
          ministry.category
            ?.toLowerCase()
            .includes(term);

        const matchesCategory =
          selectedCategory === 'All' ||
          ministry.category === selectedCategory;

        return (
          matchesSearch &&
          matchesCategory
        );
      }
    );
  }, [
    ministries,
    searchTerm,
    selectedCategory,
  ]);

  /* =====================================================
     FEATURED MINISTRY
  ====================================================== */

  const featuredMinistry =
    useMemo(() => {
      if (ministries.length === 0) {
        return null;
      }

      const explicitlyFeatured =
        ministries.find(
          (ministry: any) =>
            ministry.featured === true ||
            ministry.featured === 'true'
        );

      return (
        explicitlyFeatured ||
        ministries[0]
      );
    }, [ministries]);

  /* =====================================================
     NAVIGATION
  ====================================================== */

  const openMinistry = (
    ministry: any
  ) => {
    navigate(
      `/ministries/${createSlug(
        ministry.name
      )}`
    );
  };

  const openJoinModal = (
    ministryName: string
  ) => {
    setSelectedMinistry(
      ministryName
    );

    setShowModal(true);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSelectedCategory('All');
  };

  /* =====================================================
     LOADING STATE
  ====================================================== */

  const isLoading =
    loading || ministriesLoading;

  /* =====================================================
     SEO
  ====================================================== */

  return (
    <div className="min-h-screen bg-white">

      <Helmet>

        <title>
          {content.ministries?.pageTitle ||
            'MUKCCU Ministries | Serve at Maseno University City Campus Christian Union'}
        </title>

        <meta
          name="description"
          content={
            content.ministries?.pageSubtitle ||
            'Discover ministries at Maseno University City Campus Christian Union. Find a place to serve, grow spiritually, build community and use your gifts for Christ.'
          }
        />

        <meta
          name="keywords"
          content="MUKCCU ministries, Maseno University City Campus Christian Union ministries, worship ministry, missions ministry, discipleship ministry, prayer ministry, media ministry, Christian Union ministries"
        />

        <link
          rel="canonical"
          href="https://mukccu.org/ministries"
        />

        <meta
          property="og:title"
          content="MUKCCU Ministries"
        />

        <meta
          property="og:description"
          content="Discover your place to serve, grow and make an impact at Maseno University City Campus Christian Union."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://mukccu.org/ministries"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="MUKCCU Ministries"
        />

        <meta
          name="twitter:description"
          content="Discover ministries and opportunities to serve at MUKCCU."
        />

      </Helmet>

      {/* =====================================================
          LOADING BAR
      ====================================================== */}

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#b4712d] animate-pulse z-[100]" />
      )}

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#1a2351]">

        <div className="absolute inset-0">

          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#b4712d]/20 blur-3xl" />

          <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] rounded-full bg-[#2e3e87] blur-3xl" />

        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">

          <div className="max-w-4xl">

            {/* LABEL */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md mb-7">

              <Sparkles
                size={16}
                className="text-[#b4712d]"
              />

              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.18em]">
                Serve • Grow • Impact
              </span>

            </div>

            {/* TITLE */}

            <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">

              {content.ministries?.pageTitle ||
                'Ministries'}

            </h1>

            {/* SUBTITLE */}

            <p className="text-xl md:text-2xl text-white/75 max-w-3xl leading-relaxed mb-8">

              {content.ministries?.pageSubtitle ||
                'Serving God Through Diverse Gifts'}

            </p>

            <p className="text-base md:text-lg text-white/60 max-w-3xl leading-relaxed">
              God has uniquely gifted every believer.
              Discover a place where your gifts,
              passion and calling can make a lasting
              impact as we serve Christ together.
            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          FEATURED MINISTRY
      ====================================================== */}

      {featuredMinistry && (
        <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">

          <div className="overflow-hidden rounded-[2rem] bg-white shadow-2xl border border-gray-100">

            <div className="grid lg:grid-cols-2">

              {/* IMAGE */}

              <div className="relative min-h-[300px] lg:min-h-[430px] overflow-hidden bg-[#2e3e87]">

                {featuredMinistry.image_url ? (
                  <img
                    src={featuredMinistry.image_url}
                    alt={featuredMinistry.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">

                    <Sparkles
                      size={80}
                      className="text-white/20"
                    />

                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#b4712d] text-white text-xs font-bold uppercase tracking-wider">

                    <Sparkles size={14} />

                    Ministry Spotlight

                  </span>

                </div>

              </div>

              {/* CONTENT */}

              <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center">

                <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-4">
                  Featured Ministry
                </p>

                <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-5">
                  {featuredMinistry.name}
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-7">
                  {featuredMinistry.description ||
                    'Discover how you can serve Christ and make an impact through this ministry.'}
                </p>

                {featuredMinistry.leader && (
                  <div className="flex items-center gap-3 mb-8">

                    <div className="w-10 h-10 rounded-full bg-[#2e3e87] flex items-center justify-center">
                      <Users
                        size={18}
                        className="text-white"
                      />
                    </div>

                    <div>

                      <p className="text-xs text-gray-500 uppercase tracking-wider">
                        Ministry Leader
                      </p>

                      <p className="font-bold text-[#2e3e87]">
                        {featuredMinistry.leader_name ||
                          featuredMinistry.leader}
                      </p>

                    </div>

                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() =>
                      openMinistry(
                        featuredMinistry
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#2e3e87] text-white font-bold hover:bg-[#1a2351] transition"
                  >
                    Explore Ministry
                    <ArrowRight size={18} />
                  </button>

                  <button
                    onClick={() =>
                      openJoinModal(
                        featuredMinistry.name
                      )
                    }
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                  >
                    Join
                  </button>

                </div>

              </div>

            </div>

          </div>

        </section>
      )}

      {/* =====================================================
          DIRECTORY
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 py-20 md:py-24">

        {/* HEADER */}

        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Find Your Place
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-5">
            Explore Our Ministries
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Whether you love worship, prayer, evangelism,
            discipleship, technology or hospitality,
            there is a place where you can serve.
          </p>

        </div>

        {/* SEARCH */}

        <div className="max-w-3xl mx-auto mb-8">

          <div className="relative">

            <Search
              size={21}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              placeholder="Search ministries..."
              className="w-full rounded-2xl border border-gray-200 bg-white pl-14 pr-12 py-4 text-gray-800 outline-none shadow-sm focus:border-[#b4712d] focus:ring-2 focus:ring-[#b4712d]/20 transition"
            />

            {searchTerm && (
              <button
                onClick={() =>
                  setSearchTerm('')
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-700"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

          </div>

        </div>

        {/* CATEGORY FILTERS */}

        {categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">

            {categories.map(
              (category) => (
                <button
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category
                    )
                  }
                  className={`
                    px-5 py-2.5
                    rounded-full
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      selectedCategory ===
                      category
                        ? 'bg-[#2e3e87] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }
                  `}
                >
                  {category}
                </button>
              )
            )}

          </div>
        )}

        {/* RESULTS COUNT */}

        {!isLoading && ministries.length > 0 && (
          <div className="flex items-center justify-between mb-6">

            <p className="text-sm text-gray-500">
              Showing{' '}
              <span className="font-bold text-[#2e3e87]">
                {filteredMinistries.length}
              </span>{' '}
              {filteredMinistries.length === 1
                ? 'ministry'
                : 'ministries'}
            </p>

            {(searchTerm ||
              selectedCategory !==
                'All') && (
              <button
                onClick={clearSearch}
                className="text-sm font-semibold text-[#b4712d] hover:underline"
              >
                Clear filters
              </button>
            )}

          </div>
        )}

        {/* =====================================================
            MINISTRY GRID
        ====================================================== */}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-3xl overflow-hidden border border-gray-100 bg-white animate-pulse"
                >

                  <div className="h-64 bg-gray-200" />

                  <div className="p-7">

                    <div className="h-6 bg-gray-200 rounded mb-4 w-3/4" />

                    <div className="h-4 bg-gray-200 rounded mb-2" />

                    <div className="h-4 bg-gray-200 rounded mb-6 w-5/6" />

                    <div className="h-10 bg-gray-200 rounded-full w-40" />

                  </div>

                </div>
              )
            )}

          </div>
        ) : ministries.length === 0 ? (

          /* =====================================================
             NO SUPABASE DATA
          ====================================================== */

          <div className="text-center py-20">

            <div className="w-20 h-20 rounded-full bg-[#2e3e87] flex items-center justify-center mx-auto mb-6">

              <Users
                size={34}
                className="text-white"
              />

            </div>

            <h3 className="text-2xl font-bold text-[#2e3e87] mb-3">
              Ministries Coming Soon
            </h3>

            <p className="text-gray-600 max-w-lg mx-auto">
              Ministry information is currently being
              updated. Please check back soon to discover
              opportunities to serve at MUKCCU.
            </p>

          </div>

        ) : filteredMinistries.length === 0 ? (

          /* =====================================================
             NO SEARCH RESULTS
          ====================================================== */

          <div className="text-center py-16">

            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">

              <Search
                size={28}
                className="text-gray-400"
              />

            </div>

            <h3 className="text-xl font-bold text-[#2e3e87] mb-2">
              No ministries found
            </h3>

            <p className="text-gray-600 mb-6">
              Try another search term or category.
            </p>

            <button
              onClick={clearSearch}
              className="px-6 py-3 rounded-full bg-[#2e3e87] text-white font-semibold hover:bg-[#1a2351] transition"
            >
              View All Ministries
            </button>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredMinistries.map(
              (
                ministry: any,
                index: number
              ) => {

                const Icon =
                  getIcon(
                    ministry.icon
                  );

                const slug =
                  createSlug(
                    ministry.name
                  );

                return (
                  <article
                    key={
                      ministry.id ||
                      `${slug}-${index}`
                    }
                    className="group overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                  >

                    {/* IMAGE */}

                    <button
                      onClick={() =>
                        openMinistry(
                          ministry
                        )
                      }
                      className="relative block w-full h-64 overflow-hidden bg-[#2e3e87] text-left"
                      aria-label={`Explore ${ministry.name}`}
                    >

                      {ministry.image_url ? (
                        <img
                          src={
                            ministry.image_url
                          }
                          alt={
                            ministry.name
                          }
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">

                          <Icon
                            size={70}
                            className="text-white/30"
                          />

                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                      {/* CATEGORY */}

                      {ministry.category && (
                        <div className="absolute top-5 left-5">

                          <span className="inline-flex px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-[#2e3e87] text-xs font-bold">
                            {ministry.category}
                          </span>

                        </div>
                      )}

                      {/* ICON */}

                      <div className="absolute bottom-5 left-5 w-12 h-12 rounded-xl bg-[#b4712d] flex items-center justify-center shadow-lg">

                        <Icon
                          size={22}
                          className="text-white"
                        />

                      </div>

                    </button>

                    {/* CONTENT */}

                    <div className="p-7">

                      <h3 className="text-2xl font-bold text-[#2e3e87] mb-3">
                        {ministry.name}
                      </h3>

                      <p className="text-gray-600 leading-relaxed mb-5 line-clamp-3">
                        {ministry.description ||
                          'Discover how you can serve Christ and make an impact through this ministry.'}
                      </p>

                      {/* LEADER */}

                      {(
                        ministry.leader_name ||
                        ministry.leader
                      ) && (
                        <div className="flex items-center gap-3 mb-6">

                          <div className="w-9 h-9 rounded-full bg-[#2e3e87] flex items-center justify-center flex-shrink-0">

                            <Users
                              size={16}
                              className="text-white"
                            />

                          </div>

                          <div>

                            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
                              Led by
                            </p>

                            <p className="text-sm font-bold text-[#2e3e87]">
                              {ministry.leader_name ||
                                ministry.leader}
                            </p>

                          </div>

                        </div>
                      )}

                      {/* ACTIONS */}

                      <div className="flex flex-col sm:flex-row gap-3">

                        <button
                          onClick={() =>
                            openMinistry(
                              ministry
                            )
                          }
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#2e3e87] text-white font-semibold hover:bg-[#1a2351] transition"
                        >
                          Explore
                          <ArrowRight
                            size={16}
                          />
                        </button>

                        <button
                          onClick={() =>
                            openJoinModal(
                              ministry.name
                            )
                          }
                          className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border-2 border-[#b4712d] text-[#b4712d] font-semibold hover:bg-[#b4712d] hover:text-white transition"
                        >
                          Join
                        </button>

                      </div>

                    </div>

                  </article>
                );
              }
            )}

          </div>

        )}

      </section>

      {/* =====================================================
          HELP ME FIND A MINISTRY
      ====================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT */}

            <div>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Not Sure Where to Start?
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] leading-tight mb-6">
                Your Gift Has a Place.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                You don't have to know exactly where you
                fit. Think about what you enjoy, what
                you're good at and where God may be
                calling you to serve.
              </p>

              <button
                onClick={() => {
                  document
                    .getElementById(
                      'ministry-directory'
                    )
                    ?.scrollIntoView({
                      behavior: 'smooth',
                    });
                }}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2e3e87] text-white font-bold hover:bg-[#1a2351] transition"
              >
                Explore Ministries
                <ArrowRight size={18} />
              </button>

            </div>

            {/* CARDS */}

            <div className="grid sm:grid-cols-2 gap-4">

              {[
                {
                  icon: Music,
                  title: 'Worship',
                  text: 'Music, praise and creative expression.',
                },
                {
                  icon: BookOpen,
                  title: 'Spiritual Growth',
                  text: 'Bible study, discipleship and prayer.',
                },
                {
                  icon: Globe,
                  title: 'Missions',
                  text: 'Evangelism, outreach and community impact.',
                },
                {
                  icon: Camera,
                  title: 'Media & Technology',
                  text: 'Digital communication, design and media.',
                },
              ].map(
                (item, index) => {

                  const Icon =
                    item.icon;

                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
                    >

                      <div className="w-11 h-11 rounded-xl bg-[#2e3e87] flex items-center justify-center mb-5">

                        <Icon
                          size={20}
                          className="text-white"
                        />

                      </div>

                      <h3 className="font-bold text-[#2e3e87] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.text}
                      </p>

                    </div>
                  );
                }
              )}

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          WHY SERVE
      ====================================================== */}

      <section className="max-w-6xl mx-auto px-6 py-20 md:py-24">

        <div className="text-center max-w-3xl mx-auto mb-12">

          <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
            Why Serve?
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
            More Than a Role
          </h2>

          <p className="mt-5 text-lg text-gray-600">
            Ministry gives us an opportunity to grow
            together, use our gifts and participate in
            God's work on campus.
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
          ].map(
            (item, index) => (
              <div
                key={index}
                className="rounded-3xl bg-white border border-gray-100 p-8 shadow-sm hover:shadow-lg transition"
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
            )
          )}

        </div>

      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}

      <section className="px-6 pb-20 md:pb-24">

        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#2e3e87] px-7 py-14 md:px-16 md:py-20 text-center">

            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <p className="text-[#b4712d] font-bold uppercase tracking-[0.2em] text-sm mb-4">
                Serve With Purpose
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-5">
                Ready to Make an Impact?
              </h2>

              <p className="text-white/75 text-lg leading-relaxed mb-8">
                Whether you're gifted in worship,
                evangelism, media, hospitality, prayer
                or discipleship, there is a place for you
                at MUKCCU.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">

                <button
                  onClick={() => {
                    document
                      .getElementById(
                        'ministry-directory'
                      )
                      ?.scrollIntoView({
                        behavior: 'smooth',
                      });
                  }}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                >
                  Find a Ministry
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() =>
                    openJoinModal(
                      'General Registration'
                    )
                  }
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  Join MUKCCU Ministry
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
        ministry={selectedMinistry}
        isOpen={showModal}
        onClose={() =>
          setShowModal(false)
        }
      />

    </div>
  );
}
