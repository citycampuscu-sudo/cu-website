import {
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Heart,
  HeartHandshake,
  MapPin,
  Music,
  Play,
  Quote,
  Target,
  Users,
} from 'lucide-react';

import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';

import { useContent } from '../hooks/useContent';
import { useDocuments } from '../hooks/useDocuments';
import { useSupabaseMinistries } from '../hooks/useSupabaseMinistries';
import { useSupabaseHomeData } from '../hooks/useSupabaseHomeData';

import MemberRegistrationModal from '../components/MemberRegistrationModal';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
export default function Home() {
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();
  const { content, loading } = useContent();

  const {
    documents,
    loading: documentsLoading,
  } = useDocuments();

  const {
    ministries: supabaseMinistries,
    loading: ministriesLoading,
  } = useSupabaseMinistries();
  const {
  events: supabaseEvents,
  leaders: supabaseLeaders,
  galleryImages: supabaseGalleryImages,
  loading: homeDataLoading,
  error: homeDataError,
} = useSupabaseHomeData();

  const [showMemberModal, setShowMemberModal] =
    useState(false);

  /* =====================================================
     DATA
  ====================================================== */

  const ministries = useMemo(() => {
    if (!Array.isArray(supabaseMinistries)) {
      return [];
    }

    return supabaseMinistries;
  }, [supabaseMinistries]);

  const events = useMemo(() => {
  return Array.isArray(supabaseEvents)
    ? supabaseEvents
    : [];
}, [supabaseEvents]);

  const leaders = useMemo(() => {
  return Array.isArray(supabaseLeaders)
    ? supabaseLeaders
    : [];
}, [supabaseLeaders]);

 const galleryImages = useMemo(() => {
  return Array.isArray(supabaseGalleryImages)
    ? supabaseGalleryImages
    : [];
}, [supabaseGalleryImages]);

  const homeDocuments = useMemo(() => {
    return documents.filter(
      (doc: any) => doc.category === 'home'
    );
  }, [documents]);

  const upcomingEvents = useMemo(() => {
  const now = new Date();

  return events
    .filter((event: any) => {
      if (!event.date) return false;

      const eventDate = new Date(event.date);

      return (
        !Number.isNaN(eventDate.getTime()) &&
        eventDate >= now
      );
    })
    .sort((a: any, b: any) => {
      return (
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
      );
    })
    .slice(0, 3);
}, [events]);

  const ministryPreview = useMemo(() => {
    return ministries.slice(0, 3);
  }, [ministries]);

  const leadershipPreview = useMemo(() => {
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

  return [...leaders]
    .sort((a: any, b: any) => {
      const aIndex = positionOrder.findIndex(
        position =>
          position.toLowerCase() ===
          a.position?.trim().toLowerCase()
      );

      const bIndex = positionOrder.findIndex(
        position =>
          position.toLowerCase() ===
          b.position?.trim().toLowerCase()
      );

      return (
        (aIndex === -1 ? 999 : aIndex) -
        (bIndex === -1 ? 999 : bIndex)
      );
    })
    .slice(0, 4);
}, [leaders]);

  const galleryPreview = useMemo(() => {
    return galleryImages.slice(0, 6);
  }, [galleryImages]);

  /* =====================================================
     CORE VALUES
  ====================================================== */

  const coreValues = [
    {
      icon: Heart,
      title: 'Godliness',
      description:
        'Living in reverence and devotion to God.',
    },
    {
      icon: Target,
      title: 'Integrity',
      description:
        'Upholding truth, righteousness and honesty.',
    },
    {
      icon: Users,
      title: 'Unity',
      description:
        'Standing together as one family in Christ.',
    },
    {
      icon: BookOpen,
      title: 'Excellence',
      description:
        'Pursuing the best in all that we do.',
    },
  ];

  /* =====================================================
     WEEKLY ACTIVITIES
  ====================================================== */

  const weeklyActivities = [
    {
      day: 'Sunday',
      title: 'Sunday Service',
      time: '8:00 AM – 10:30 AM',
      description:
        'A time of worship, fellowship, teaching and spiritual renewal.',
      icon: Music,
    },
    {
      day: 'Tuesday',
      title: 'Online Bible Study',
      time: '8:00 PM – 9:00 PM',
      description:
        'Growing deeper in the Word and learning to live out our faith.',
      icon: BookOpen,
    },
    {
      day: 'Friday',
      title: 'Prayer & Fasting',
      time: 'Friday',
      description:
        'Seeking God together through prayer, fasting and intercession.',
      icon: HeartHandshake,
    },
  ];

  /* =====================================================
     NAVIGATION HELPERS
  ====================================================== */

  const goTo = (path: string) => {
    navigate(path);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const createSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  /* =====================================================
     LOADING
  ====================================================== */

  const isLoading =
  loading ||
  ministriesLoading ||
  homeDataLoading;
  

  /* =====================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-screen bg-white">
      {homeDataError && (
  <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-center text-sm text-amber-800">
    Some live homepage content could not be loaded.
  </div>
)}

      {/* =================================================
          SEO
      ================================================== */}

      <Helmet>

        <title>
          MUKCCU | Maseno University City Campus Christian Union
        </title>

        <meta
          name="description"
          content="Maseno University City Campus Christian Union (MUKCCU) is a vibrant Christian fellowship committed to knowing Christ, growing together and serving God with purpose."
        />

        <meta
          name="keywords"
          content="MUKCCU, Maseno University City Campus Christian Union, Christian Union Kisumu, MUKCCU ministries, MUKCCU events"
        />

        <link
          rel="canonical"
          href="https://mukccu.org/"
        />

        <meta
          property="og:title"
          content="MUKCCU | Maseno University City Campus Christian Union"
        />

        <meta
          property="og:description"
          content="Knowing Christ. Growing Together. Serving with Purpose."
        />

        <meta
          property="og:type"
          content="website"
        />

        <meta
          property="og:url"
          content="https://mukccu.org/"
        />

        <meta
          property="og:image"
          content="https://mukccu.org/images/mukccu-social-banner-v2.png"
        />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="MUKCCU | Maseno University City Campus Christian Union"
        />

        <meta
          name="twitter:description"
          content="Knowing Christ. Growing Together. Serving with Purpose."
        />

      </Helmet>

      {/* =================================================
          LOADING BAR
      ================================================== */}

      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-[#b4712d] animate-pulse z-[100]" />
      )}

      {/* =================================================
          HERO — MUKCCU VIDEO
      ================================================== */}

      <section className="relative min-h-[680px] md:min-h-[780px] overflow-hidden bg-[#101735]">

        {/* VIDEO */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <iframe
            className="
              absolute
              top-1/2
              left-1/2
              w-[177.78vh]
              min-w-full
              min-h-full
              -translate-x-1/2
              -translate-y-1/2
              scale-[1.15]
            "
            src="https://www.youtube.com/embed/wXeKRqXTKQw?autoplay=1&mute=1&loop=1&playlist=wXeKRqXTKQw&controls=0&modestbranding=1&rel=0&playsinline=1&disablekb=1"
            title="MUKCCU in Action"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            aria-hidden="true"
          />

        </div>

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-[#101735]/65" />

        {/* GRADIENT */}

        <div className="absolute inset-0 bg-gradient-to-r from-[#101735]/95 via-[#1a2351]/70 to-[#101735]/40" />

        {/* BOTTOM FADE */}

        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#1a2351] to-transparent" />
        {!shouldReduceMotion && (
  <>
    <motion.div
      className="absolute top-24 right-[8%] w-24 h-24 rounded-full bg-[#b4712d]/10 blur-2xl"
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    <motion.div
      className="absolute bottom-32 left-[8%] w-32 h-32 rounded-full bg-white/5 blur-3xl"
      animate={{
        y: [0, 25, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  </>
)}

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[680px] md:min-h-[780px] flex items-center">

          <motion.div
  className="max-w-4xl pt-16"
  initial={shouldReduceMotion ? false : 'hidden'}
  animate="visible"
  variants={staggerContainer}
>

            {/* LABEL */}

            <motion.div
  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/30 backdrop-blur-md text-white mb-7"
  variants={fadeUp}
>
              <Heart
                size={16}
                className="text-[#b4712d]"
              />

              <span className="text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
                Maseno University City Campus Christian Union
              </span>

            </motion.div>

            {/* TITLE */}

            <motion.h1
  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 drop-shadow-2xl"
  variants={fadeUp}
>

              Welcome to
              <span className="block text-[#f0c88c]">
                MUKCCU
              </span>

            </motion.h1>

            {/* TAGLINE */}

            <motion.p
  className="text-2xl md:text-3xl font-semibold text-white mb-6 drop-shadow-lg"
  variants={fadeUp}
>
              Knowing Christ. Growing Together. Serving with Purpose.
            </motion.p>

            {/* DESCRIPTION */}

            <motion.p
  className="text-base md:text-xl text-white/80 max-w-3xl leading-relaxed mb-9"
  variants={fadeUp}
>
              A vibrant Christian fellowship where students
              discover Christ, grow in faith, build meaningful
              community and use their gifts to serve God's
              purposes.
            </motion.p>

            {/* BUTTONS */}

            <motion.div
  className="flex flex-col sm:flex-row gap-4"
  variants={fadeUp}
>

              <motion.button
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          scale: 1.03,
          y: -2,
        }
  }
  whileTap={
    shouldReduceMotion
      ? undefined
      : {
          scale: 0.98,
        }
  }
  onClick={() => setShowMemberModal(true)}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    px-8
    py-4
    rounded-full
    bg-[#b4712d]
    text-white
    font-bold
    shadow-2xl
    hover:bg-[#965d23]
    transition-all
  "
>
  Join MUKCCU
  <ArrowRight size={19} />
</motion.button>

<motion.button
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          scale: 1.03,
          y: -2,
        }
  }
  whileTap={
    shouldReduceMotion
      ? undefined
      : {
          scale: 0.98,
        }
  }
  onClick={() => goTo('/ministries')}
  className="
    inline-flex
    items-center
    justify-center
    gap-2
    px-8
    py-4
    rounded-full
    bg-[#b4712d]
    text-white
    font-bold
    shadow-2xl
    hover:bg-[#965d23]
    transition-all
  "
>
  Explore Ministries
  <ArrowRight size={19} />
</motion.button>

                    </motion.div>

        </div>

        {/* VIDEO LABEL */}

        <div className="absolute bottom-8 right-6 md:right-10 z-10">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/30 border border-white/20 backdrop-blur-md">

            <span className="relative flex h-2.5 w-2.5">

              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b4712d] opacity-75" />

              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b4712d]" />

            </span>

            <span className="text-xs text-white/80 font-medium">
              MUKCCU in Action
            </span>

          </div>

        </div>

      </section>

      {/* =================================================
          WELCOME
      ================================================== */}

      <motion.section
  className="relative bg-white py-20 md:py-24"
  initial={shouldReduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  variants={fadeIn}
>

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT */}

            <motion.div variants={fadeUp}>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Welcome Home
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] leading-tight mb-6">
                A Family. A Fellowship. A Mission.
              </h2>

              <p className="text-lg text-gray-600 leading-relaxed mb-5">
                Maseno University City Campus Christian
                Union is a community of students committed
                to knowing Christ, growing in faith and
                serving God with excellence.
              </p>

              <p className="text-gray-600 leading-relaxed mb-8">
                Established through prayer in February 2015,
                MUKCCU continues to grow spiritually and
                numerically as students come together to
                worship, fellowship, learn God's Word and
                reach others with the Gospel.
              </p>

              <button
                onClick={() =>
                  goTo('/about')
                }
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2e3e87] text-white font-bold hover:bg-[#1a2351] transition"
              >
                Discover Our Story
                <ArrowRight size={18} />
              </button>

            </motion.div>

            {/* HIGHLIGHTS */}

            <motion.div
  className="grid sm:grid-cols-2 gap-5"
  variants={staggerContainer}
>

              {[
                {
                  icon: Heart,
                  title: 'Faith',
                  text: 'Growing deeper in Christ.',
                },
                {
                  icon: Users,
                  title: 'Fellowship',
                  text: 'Growing together as one family.',
                },
                {
                  icon: Globe,
                  title: 'Mission',
                  text: 'Taking Christ beyond ourselves.',
                },
                {
                  icon: Target,
                  title: 'Purpose',
                  text: 'Using our gifts for Kingdom impact.',
                },
              ].map(
                (item, index) => {

                  const Icon =
                    item.icon;

                  return (
                    <motion.div
  key={index}
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          y: -6,
        }
  }
  className="p-7 rounded-3xl bg-[#f8f7f4] border border-gray-100 hover:shadow-lg transition"
>

                      <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center mb-5">

                        <Icon
                          size={22}
                          className="text-white"
                        />

                      </div>

                      <h3 className="text-xl font-bold text-[#2e3e87] mb-2">
                        {item.title}
                      </h3>

                      <p className="text-gray-600">
                        {item.text}
                      </p>

                    </motion.div>
                  );
                }
              )}

            </motion.div>

          </div>

        </div>

      </motion.section>
      {/* =================================================
          THIS WEEK
      ================================================== */}

      <motion.section
  className="bg-[#f8f7f4] py-20 md:py-24"
  initial={shouldReduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.12 }}
  variants={fadeIn}
>

        <div className="max-w-7xl mx-auto px-6">

          <motion.div
  className="text-center max-w-3xl mx-auto mb-12"
  variants={fadeUp}
>

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Join Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-5">
              This Week at MUKCCU
            </h2>

            <p className="text-lg text-gray-600">
              Find a place to worship, learn, pray and
              fellowship throughout the week.
            </p>

         </motion.div>

          <motion.div
  className="grid md:grid-cols-3 gap-6"
  variants={staggerContainer}
>

            {weeklyActivities.map(
              (activity, index) => {

                const Icon =
                  activity.icon;

                return (
                  <motion.div
  key={index}
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          y: -7,
        }
  }
  className="group bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all"
>

                    <div className="flex items-start justify-between mb-6">

                      <div className="w-12 h-12 rounded-2xl bg-[#2e3e87] flex items-center justify-center">

                        <Icon
                          size={23}
                          className="text-white"
                        />

                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#b4712d]/10 text-[#b4712d] text-xs font-bold">
                        {activity.day}
                      </span>

                    </div>

                    <h3 className="text-2xl font-bold text-[#2e3e87] mb-2">
                      {activity.title}
                    </h3>

                    <div className="flex items-center gap-2 text-[#b4712d] font-semibold mb-4">

                      <Clock size={16} />

                      {activity.time}

                    </div>

                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>

                  </motion.div>
                );
              }
            )}

          </motion.div>

          <div className="text-center mt-10">

            <button
              onClick={() =>
                goTo('/weekly-activities')
              }
              className="inline-flex items-center gap-2 text-[#2e3e87] font-bold hover:text-[#b4712d] transition"
            >
              View Full Weekly Schedule
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </motion.section>

      {/* =================================================
          UPCOMING EVENTS
      ================================================== */}

      <motion.section
  className="bg-white py-20 md:py-24"
  initial={shouldReduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.12 }}
  variants={fadeIn}
>

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">

            <div>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                What's Happening
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
                Upcoming Events
              </h2>

            </div>

            <button
              onClick={() =>
                goTo('/events')
              }
              className="inline-flex items-center gap-2 text-[#2e3e87] font-bold hover:text-[#b4712d] transition"
            >
              View All Events
              <ArrowRight size={18} />
            </button>

          </div>

          {upcomingEvents.length > 0 ? (

            <motion.div
  className="grid md:grid-cols-3 gap-6"
  variants={staggerContainer}
>

              {upcomingEvents.map(
                (event: any, index: number) => (

                  <motion.article
  key={
    event.id ||
    `${event.title}-${index}`
  }
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          y: -7,
        }
  }
  className="rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-xl transition"
>
                    <div className="h-2 bg-[#b4712d]" />

                    <div className="p-7">

                      <div className="flex items-center gap-3 mb-5">

                        <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center">

                          <Calendar
                            size={22}
                            className="text-white"
                          />

                        </div>

                        <div>

                          <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                            Upcoming
                          </p>

                          <p className="text-sm font-bold text-[#b4712d]">
                            {event.date}
                          </p>

                        </div>

                      </div>

                      <h3 className="text-2xl font-bold text-[#2e3e87] mb-3">
                        {event.title}
                      </h3>

                      {event.time && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">

                          <Clock size={15} />

                          {event.time}

                        </div>
                      )}

                      {event.location && (
                        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">

                          <MapPin size={15} />

                          {event.location}

                        </div>
                      )}

                      {event.description && (
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {event.description}
                        </p>
                      )}

                    </div>

                  </motion.article>

                )
              )}

            </motion.div>

          ) : (

            <div className="rounded-3xl bg-[#f8f7f4] p-12 text-center">

              <Calendar
                size={42}
                className="mx-auto mb-4 text-[#b4712d]"
              />

              <h3 className="text-2xl font-bold text-[#2e3e87] mb-2">
                Events Coming Soon
              </h3>

              <p className="text-gray-600">
                Check back soon for upcoming MUKCCU events.
              </p>

            </div>

          )}

        </div>

      </motion.section>

      {/* =================================================
          MINISTRIES
      ================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Find Your Place
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-5">
              Discover Our Ministries
            </h2>

            <p className="text-lg text-gray-600">
              God has given each of us gifts to use.
              Find a ministry where your passion and
              calling can serve others.
            </p>

          </div>

          {ministryPreview.length > 0 ? (

            <div className="grid md:grid-cols-3 gap-6">

              {ministryPreview.map(
                (ministry: any, index: number) => (

                  <motion.article
  key={
    ministry.id ||
    `${ministry.name}-${index}`
  }
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          y: -8,
        }
  }
  className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all"
>

                    <button
                      onClick={() =>
                        goTo(
                          `/ministries/${createSlug(
                            ministry.name
                          )}`
                        )
                      }
                      className="relative block w-full h-56 overflow-hidden bg-[#2e3e87] text-left"
                    >

                      {ministry.image_url ? (
                        <img
                          src={ministry.image_url}
                          alt={ministry.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">

                          <HeartHandshake
                            size={60}
                            className="text-white/25"
                          />

                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      <div className="absolute bottom-5 left-5 right-5">

                        <h3 className="text-2xl font-bold text-white">
                          {ministry.name}
                        </h3>

                      </div>

                    </button>

                    <div className="p-6">

                      <p className="text-gray-600 leading-relaxed line-clamp-3 mb-5">
                        {ministry.description ||
                          'Discover how you can serve Christ through this ministry.'}
                      </p>

                      <button
                        onClick={() =>
                          goTo(
                            `/ministries/${createSlug(
                              ministry.name
                            )}`
                          )
                        }
                        className="inline-flex items-center gap-2 text-[#2e3e87] font-bold hover:text-[#b4712d] transition"
                      >
                        Explore Ministry
                        <ArrowRight size={17} />
                      </button>

                    </div>

                  </motion.article>

                )
              )}

            </div>

          ) : (

            <div className="text-center py-12">

              <p className="text-gray-500">
                Ministry information is being updated.
              </p>

            </div>

          )}

          <div className="text-center mt-10">

            <button
              onClick={() =>
                goTo('/ministries')
              }
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#2e3e87] text-white font-bold hover:bg-[#1a2351] transition"
            >
              Explore All Ministries
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </section>

      {/* =================================================
          MUKCCU IN ACTION
      ================================================== */}

      <motion.section
  className="bg-[#1a2351] py-20 md:py-24 overflow-hidden"
  initial={shouldReduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.15 }}
  variants={fadeIn}
>

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* TEXT */}

            <motion.div variants={fadeUp}>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                MUKCCU in Action
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Worship. Fellowship. Ministry.
              </h2>

              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Experience some of what God is doing
                through the MUKCCU family. From worship
                and creative ministry to fellowship and
                outreach, we are a community that lives
                out our faith together.
              </p>

              <a
                href="https://youtu.be/wXeKRqXTKQw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
              >
                <Play size={18} fill="currentColor" />
                Watch on YouTube
              </a>

            </motion.div>

            {/* VIDEO */}

            <motion.div
  variants={scaleIn}
  className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
>

              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/wXeKRqXTKQw?rel=0&modestbranding=1"
                title="MUKCCU — Usikubali Cover"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />

           </motion.div>

          </div>

        </div>

      </motion.section>

      {/* =================================================
          LEADERSHIP
      ================================================== */}

      <section className="bg-white py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">

            <div>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Servant Leadership
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
                Meet Our Leaders
              </h2>

            </div>

            <button
              onClick={() =>
                goTo('/leadership')
              }
              className="inline-flex items-center gap-2 text-[#2e3e87] font-bold hover:text-[#b4712d] transition"
            >
              Meet the Full Team
              <ArrowRight size={18} />
            </button>

          </div>

          {leadershipPreview.length > 0 ? (

            <motion.div
  className="grid grid-cols-2 lg:grid-cols-4 gap-5"
  variants={staggerContainer}
>

              {leadershipPreview.map(
                (leader: any, index: number) => {

                 const image = leader.image;

                  const position =
                    leader.position ||
                    leader.role_type ||
                    'MUKCCU Leader';

                  return (
                    <motion.div
  key={
    leader.id ||
    `${leader.name}-${index}`
  }
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          y: -7,
        }
  }
  className="group rounded-3xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-xl transition"
>

                      <div className="relative h-64 bg-[#2e3e87] overflow-hidden">

                        {image ? (
                          <img
  src={image}
  alt={leader.name}
  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
  loading="lazy"
/>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">

                            <Users
                              size={60}
                              className="text-white/25"
                            />

                          </div>
                        )}

                      </div>

                      <div className="p-5">

                        <p className="text-xs uppercase tracking-wider font-bold text-[#b4712d] mb-2">
                          {position}
                        </p>

                        <h3 className="text-lg font-bold text-[#2e3e87]">
                          {leader.name}
                        </h3>

                        {(leader.course ||
                          leader.year) && (
                          <p className="text-sm text-gray-500 mt-1">
                            {leader.course}
                            {leader.course &&
                              leader.year
                              ? ' • '
                              : ''}
                            {leader.year}
                          </p>
                        )}

                      </div>

                    </motion.div>
                  );
                }
              )}

            </motion.div>

          ) : (

            <div className="rounded-3xl bg-[#f8f7f4] p-12 text-center">

              <Users
                size={42}
                className="mx-auto mb-4 text-[#b4712d]"
              />

              <p className="text-gray-600">
                Leadership information is being updated.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =================================================
          SCRIPTURE
      ================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-5xl mx-auto px-6">

          <div className="relative rounded-[2rem] bg-white shadow-xl border-l-[6px] border-[#b4712d] p-8 md:p-14 text-center">

            <Quote
              size={42}
              className="mx-auto mb-6 text-[#b4712d]"
            />

            <p className="text-2xl md:text-3xl italic text-gray-700 leading-relaxed mb-6">
              "But seek first his kingdom and his
              righteousness, and all these things will be
              given to you as well."
            </p>

            <p className="font-bold text-[#2e3e87] text-lg">
              Matthew 6:33
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Scripture of the Week
            </p>

          </div>

        </div>

      </section>

      {/* =================================================
          VISION / MISSION
      ================================================== */}

      <section className="bg-white py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Who We Are
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
              Our Vision & Mission
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-3xl bg-[#2e3e87] p-8 md:p-10 text-white">

              <Target
                size={34}
                className="text-[#b4712d] mb-6"
              />

              <h3 className="text-3xl font-bold mb-4">
                Vision
              </h3>

              <p className="text-white/80 text-lg leading-relaxed">
                To live as true disciples of Jesus Christ.
              </p>

            </div>

            <div className="rounded-3xl bg-[#b4712d] p-8 md:p-10 text-white">

              <Heart
                size={34}
                className="text-white mb-6"
              />

              <h3 className="text-3xl font-bold mb-4">
                Mission
              </h3>

              <p className="text-white/90 text-lg leading-relaxed">
                To nurture belief in Christ and develop
                Christ-like character amongst students
                and communities.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          CORE VALUES
      ================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              What Guides Us
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
              Our Core Values
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {coreValues.map(
              (value, index) => {

                const Icon =
                  value.icon;

                return (
                  <div
                    key={index}
                    className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                  >

                    <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center mb-5">

                      <Icon
                        size={22}
                        className="text-white"
                      />

                    </div>

                    <h3 className="text-xl font-bold text-[#2e3e87] mb-3">
                      {value.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>

                  </div>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* =================================================
          GALLERY
      ================================================== */}

      <section className="bg-white py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12">

            <div>

              <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                Moments We Share
              </p>

              <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87]">
                MUKCCU Gallery
              </h2>

            </div>

            <button
              onClick={() =>
                goTo('/gallery')
              }
              className="inline-flex items-center gap-2 text-[#2e3e87] font-bold hover:text-[#b4712d] transition"
            >
              View Full Gallery
              <ArrowRight size={18} />
            </button>

          </div>

          {galleryPreview.length > 0 ? (

            <motion.div
  className="grid grid-cols-2 md:grid-cols-3 gap-4"
  variants={staggerContainer}
>

              {galleryPreview.map(
                (image: any, index: number) => (

                  <motion.button
  key={
    image.id ||
    `${image.title}-${index}`
  }
  variants={scaleIn}
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          scale: 1.015,
        }
  }
  onClick={() => goTo('/gallery')}
  className={`
    group
    relative
    overflow-hidden
    rounded-2xl
    bg-[#2e3e87]
    ${
      index === 0
        ? 'md:row-span-2 h-80 md:h-full'
        : 'h-48 md:h-64'
    }
  `}
>

                    {image.image_url ? (
                      <img
  src={image.image_url}
  alt={image.title || 'MUKCCU'}
  loading="lazy"
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">

                        <Camera
                          size={45}
                          className="text-white/30"
                        />

                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70" />

                    {image.title && (
                      <div className="absolute bottom-4 left-4 right-4 text-left">

                        <p className="text-white font-bold">
                          {image.title}
                        </p>

                      </div>
                    )}

                  </motion.button>

                )
              )}

            </motion.div>

          ) : (

            <div className="rounded-3xl bg-[#f8f7f4] p-12 text-center">

              <Camera
                size={42}
                className="mx-auto mb-4 text-[#b4712d]"
              />

              <p className="text-gray-600">
                Gallery moments are being updated.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =================================================
          DOCUMENTS
      ================================================== */}

      <section className="bg-[#f8f7f4] py-20 md:py-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center max-w-3xl mx-auto mb-12">

            <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
              Resources
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-[#2e3e87] mb-5">
              Official Documents
            </h2>

            <p className="text-lg text-gray-600">
              Access important MUKCCU documents and
              resources.
            </p>

          </div>

          {documentsLoading ? (

            <div className="text-center py-10 text-gray-500">
              Loading documents...
            </div>

          ) : homeDocuments.length > 0 ? (

            <div className="grid md:grid-cols-2 gap-6">

              {homeDocuments
                .slice(0, 4)
                .map((doc: any) => (

                  <div
                    key={doc.id}
                    className="bg-white rounded-3xl p-7 border border-gray-100 shadow-sm"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-12 h-12 rounded-xl bg-[#2e3e87] flex items-center justify-center flex-shrink-0">

                        <FileText
                          size={22}
                          className="text-white"
                        />

                      </div>

                      <div className="flex-1">

                        <h3 className="text-xl font-bold text-[#2e3e87] mb-2">
                          {doc.title}
                        </h3>

                        <p className="text-gray-600 mb-5">
                          {doc.description}
                        </p>

                        <div className="flex flex-wrap gap-3">

                          <a
                            href={doc.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#2e3e87] text-white font-semibold text-sm hover:bg-[#1a2351] transition"
                          >
                            <ExternalLink
                              size={16}
                            />
                            View
                          </a>

                          <a
                            href={doc.file_url}
                            download
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#b4712d] text-white font-semibold text-sm hover:bg-[#965d23] transition"
                          >
                            <Download
                              size={16}
                            />
                            Download
                          </a>

                        </div>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          ) : (

            <div className="text-center py-10">

              <FileText
                size={40}
                className="mx-auto mb-4 text-gray-400"
              />

              <p className="text-gray-500">
                Documents will appear here when available.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* =================================================
          VISIT US
      ================================================== */}

      <section className="bg-white py-20 md:py-24">

        <div className="max-w-6xl mx-auto px-6">

          <div className="rounded-[2rem] bg-[#2e3e87] overflow-hidden">

            <div className="grid md:grid-cols-2">

              <div className="p-8 md:p-12">

                <p className="text-[#b4712d] text-sm font-bold uppercase tracking-[0.2em] mb-3">
                  Find Us
                </p>

                <h2 className="text-4xl font-bold text-white mb-6">
                  Come Fellowship With Us
                </h2>

                <p className="text-white/75 text-lg leading-relaxed mb-8">
                  Whether you are a first-time visitor or
                  already part of the MUKCCU family, there
                  is always a place for you.
                </p>

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 rounded-xl bg-[#b4712d] flex items-center justify-center flex-shrink-0">

                    <MapPin
                      size={20}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <p className="text-white font-bold mb-1">
                      MUKCCU Fellowship
                    </p>

                    <p className="text-white/70">
                      Maseno University City Campus,
                      Kisumu City
                    </p>

                  </div>

                </div>

              </div>

              <div className="p-8 md:p-12 bg-[#1a2351] flex flex-col justify-center">

                <div className="flex items-start gap-4 mb-6">

                  <div className="w-11 h-11 rounded-xl bg-[#b4712d] flex items-center justify-center flex-shrink-0">

                    <Calendar
                      size={20}
                      className="text-white"
                    />

                  </div>

                  <div>

                    <p className="text-white font-bold mb-1">
                      Sunday Worship
                    </p>

                    <p className="text-white/70">
                      8:00 AM – 10:30 AM
                    </p>

                  </div>

                </div>

                <button
                  onClick={() =>
                    goTo('/contacts')
                  }
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
                >
                  Get in Touch
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =================================================
          FINAL CTA
      ================================================== */}

      <motion.section
  className="px-6 pb-20 md:pb-24"
  initial={shouldReduceMotion ? false : 'hidden'}
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={scaleIn}
>

        <div className="max-w-7xl mx-auto">

          <div className="relative overflow-hidden rounded-[2rem] bg-[#1a2351] px-7 py-16 md:px-16 md:py-24 text-center">

            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#b4712d]/20 blur-3xl" />

            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#2e3e87] blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto">

              <Heart
                size={42}
                className="mx-auto mb-6 text-[#b4712d]"
              />

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                There's a Place for You Here.
              </h2>

              <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-9">
                Come as you are. Grow in Christ.
                Build community. Discover your gifts.
                Serve with purpose.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">

                <motion.button
  whileHover={
    shouldReduceMotion
      ? undefined
      : {
          scale: 1.04,
        }
  }
  whileTap={
    shouldReduceMotion
      ? undefined
      : {
          scale: 0.97,
        }
  }
  onClick={() => setShowMemberModal(true)}
  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
>
                  Join MUKCCU
                  <ArrowRight size={18} />
                </motion.button>

                <button
                  onClick={() =>
                    goTo('/ministries')
                  }
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition"
                >
                  Find a Ministry
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </div>

      </motion.section>

      {/* =================================================
          MEMBER REGISTRATION MODAL
      ================================================== */}

      <MemberRegistrationModal
        isOpen={showMemberModal}
        onClose={() =>
          setShowMemberModal(false)
        }
      />

    </div>
  );
}
