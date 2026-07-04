import { Helmet } from 'react-helmet-async';

export default function Alumni() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Helmet>
        <title>MUKCCU Alumni | Maseno University Kisumu Campus Christian Union</title>

        <meta
          name="description"
          content="Connect with MUKCCU alumni, stay informed about alumni events, mentor current students, and continue pursuing holiness together."
        />
      </Helmet>

      {/* Hero Section */}

      <section
        className="relative h-72 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg,#2e3e87 0%,#1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-4">
            MUKCCU Alumni
          </h1>

          <p className="text-xl text-[#b4712d]">
            Once a MUKCCU Member, Always Family
          </p>
        </div>
      </section>

    </div>
  );
        }
