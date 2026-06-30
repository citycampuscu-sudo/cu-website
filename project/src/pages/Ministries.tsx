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

  const {
  ministries: supabaseMinistries,
  loading: ministriesLoading,
} = useSupabaseMinistries();
  
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

  
  const ministries = supabaseMinistries;

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
        className="relative flex min-h-[280px] items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)',
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">
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
            God has uniquely gifted every believer for His work. Discover a ministry where your talents, passion, and calling can make a lasting impact as we serve Christ together.
          </p>
        </div>
        
        
        {/* MINISTRIES LIST */}
        <div className="space-y-8">
  {ministries.length === 0 ? (
    <div className="text-center py-20">
      <Heart className="mx-auto mb-4 text-gray-400" size={56} />
      <h3 className="text-2xl font-bold text-gray-700">
        No ministries available
      </h3>

      <p className="text-gray-500 mt-2">
        Ministries will appear here once they have been added.
      </p>
    </div>
  ) : (
    ministries.map((ministry: any, index: number) => {
      const Icon =
        iconMap[ministry.icon as keyof typeof iconMap] || Heart;

      return (
        <div
          key={ministry.id}
          className="relative overflow-hidden rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          {ministry.image_url && (
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${ministry.image_url})`,
              }}
            />
          )}

          {/* Better overlay */}
          <div className="absolute inset-0 bg-white/72 backdrop-blur-[1px]" />

          <div className="relative z-10 p-6 md:p-8">

            <div className="flex items-start gap-5">

              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl"
                style={{ backgroundColor: "#2e3e87" }}
              >
                <Icon
  className="text-white"
  size={38}
  aria-hidden="true"
/>
              </div>

              <div className="flex-1">

                <h2
                  className="text-3xl font-extrabold leading-tight"
                  style={{ color: "#2e3e87" }}
                >
                  {ministry.name}
                </h2>

                {ministry.leader && (
                  <p
                    className="mt-2 font-semibold text-lg"
                    style={{ color: "#b4712d" }}
                  >
                    Led by {ministry.leader}
                  </p>
                )}

                <p className="mt-4 text-gray-700 leading-8">
                  {ministry.description}
                </p>

                {ministry.activities && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {ministry.activities
                      .split(",")
                      .map((activity: string) => (
                        <span
                          key={activity}
                          className="rounded-full bg-[#2e3e87]/10 px-4 py-1 text-sm font-medium text-[#2e3e87]"
                        >
                          {activity.trim()}
                        </span>
                      ))}
                  </div>
                )}

                <button
                  onClick={() => {
                    setSelectedMinistry(ministry.name);
                    setShowModal(true);
                  }}
                  className="mt-6 rounded-full bg-[#25D366] px-8 py-3 text-lg font-bold text-white transition hover:scale-105"
                >
                  Join Ministry
                </button>

              </div>

            </div>

          </div>
        </div>
      );
    })
  )}
</div>
                {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block max-w-2xl rounded-2xl bg-[#2e3e87] p-8 shadow-xl">
            <h3 className="mb-4 text-3xl font-bold text-white">
              Ready to Make an Impact?
            </h3>

            <p className="mb-6 text-white">
              Whether you're gifted in worship, evangelism, media, hospitality,
              prayer, or discipleship, there is a place for you at MUKCCU.
            </p>

            <button
              onClick={() => {
                setSelectedMinistry('General Registration');
                setShowModal(true);
              }}
              className="rounded-full bg-[#b4712d] px-8 py-3 font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#9b6226]"
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
