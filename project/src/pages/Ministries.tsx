import {
  Music,
  Camera,
  Users,
  Globe,
  Book,
  Heart,
  HeartHandshake,
} from 'lucide-react';

import { useContent } from '../hooks/useContent';
import { useSupabaseMinistries } from '../hooks/useSupabaseMinistries';
import { useState } from 'react';
import MinistryRegistrationModal from '../components/MinistryRegistrationModal';
import { Helmet } from 'react-helmet-async';

export default function Ministries() {
  const { content, loading } = useContent();
  console.log('Supabase ministries:', supabaseMinistries);
console.log('Supabase ministries length:', supabaseMinistries.length);
  const [selectedMinistry, setSelectedMinistry] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      description: 'Ushering, welfare, and event coordination.',
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
      description: 'Bible study, teaching, and spiritual growth sessions.',
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
      description: 'Prayer meetings, intercession, and spiritual warfare.',
      leader: 'Prayer Coordinator',
      activities: 'Prayer, intercession',
    },
  ];

  const ministries =
    supabaseMinistries.length > 0
      ? supabaseMinistries
      : defaultMinistries;

  const isLoading = loading || ministriesLoading;

  return (
    <div className="min-h-screen">

      {/* SEO */}
      <Helmet>
        <title>MUKCCU Ministries | Serve at Maseno University City Campus Christian Union</title>
        <meta
          name="description"
          content="Explore ministries at Maseno University City Campus Christian Union (MUKCCU). Join worship, media, missions, prayer, and discipleship ministries."
        />
        <meta
          name="keywords"
          content="MUKCCU ministries, Maseno University City Campus Christian Union worship,Maseno University Kisumu Campus Christian Union ministries, campus ministry MUKCCU"
        />

        <meta property="og:title" content="MUKCCU Ministries" />
        <meta
          property="og:description"
          content="Serve God through various ministries at Maseno University City Campus Christian Union."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mukccu.org/ministries" />
      </Helmet>

      {/* LOADING BAR */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>
      )}

      {/* HEADER */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">
            {content.ministries?.pageTitle || 'Ministries'}
          </h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>
            {content.ministries?.pageSubtitle ||
              'Serving God Through Diverse Gifts'}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-4 py-16">

        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Every believer is gifted to serve. Join a ministry and use your
            talents to build God's Kingdom.
          </p>
        </div>
        
        
        {/* MINISTRIES LIST */}
        <div className="space-y-6">
          {ministries.map((ministry: any, index: number) => {
            const Icon =
              iconMap[ministry.icon as keyof typeof iconMap] || Heart;

            return (
              <div
  key={index}
  className="relative rounded-2xl shadow-lg overflow-hidden"
  style={{ borderLeft: '6px solid #b4712d' }}
>
  {ministry.image_url && (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage: `url(${ministry.image_url})`,
        opacity: 0.35,
      }}
    />
  )}

  <div className="absolute inset-0 bg-white/40"></div>

  <div className="relative z-10 p-6 flex flex-col sm:flex-row">
    <div
      className="p-4 rounded-xl mb-4 sm:mb-0 sm:mr-6 self-start"
      style={{ backgroundColor: '#2e3e87' }}
    >
      <Icon className="text-white" size={32} />
    </div>

    <div className="flex-1">
      <h3
        className="text-2xl font-bold mb-2"
        style={{ color: '#2e3e87' }}
      >
        {ministry.name}
      </h3>

      {ministry.leader && (
        <p
          className="text-sm font-semibold mb-2"
          style={{ color: '#b4712d' }}
        >
          Led by: {ministry.leader}
        </p>
      )}

      <p className="text-gray-700 mb-3">
        {ministry.description}
      </p>

      <button
        onClick={() => {
          setSelectedMinistry(ministry.name);
          setShowModal(true);
        }}
        className="px-6 py-2 rounded-full text-white font-semibold"
        style={{ backgroundColor: '#25D366' }}
      >
        Join Ministry
      </button>
    </div>
  </div>
</div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div
            className="inline-block p-8 rounded-2xl shadow-xl"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Serve?
            </h3>

            <p className="text-white mb-6 max-w-xl">
              Every member has a role in the body of Christ.
            </p>

            <button
              onClick={() => {
                setSelectedMinistry('General Registration');
                setShowModal(true);
              }}
              className="px-8 py-3 rounded-full font-semibold"
              style={{ backgroundColor: '#b4712d', color: 'white' }}
            >
              Join a Ministry
            </button>
          </div>
        </div>
      </div>

      {/* MODAL */}
      <MinistryRegistrationModal
        ministry={selectedMinistry}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
