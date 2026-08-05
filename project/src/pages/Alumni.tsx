import { Helmet } from 'react-helmet-async';
import {
  Users,
  Heart,
  GraduationCap,
  Briefcase,
  Globe,
  CheckCircle,
  FileText,
  ExternalLink,
  Download,
} from 'lucide-react';
import { useState } from 'react';
import { useDocuments } from '../hooks/useDocuments';
import { createAlumni } from '../hooks/useSupabaseAlumni';
import { useSupabaseAlumniEvents } from "../hooks/useSupabaseAlumniEvents";

export default function Alumni() {
  const benefits = [
    {
      icon: Users,
      title: 'Networking',
      description:
        'Connect with fellow MUKCCU alumni across different professions and regions.',
    },
    {
      icon: Heart,
      title: 'Fellowship',
      description:
        'Remain rooted in Christian fellowship through alumni gatherings and prayer.',
    },
    {
      icon: GraduationCap,
      title: 'Mentorship',
      description:
        'Guide current students spiritually, academically and professionally.',
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description:
        'Share opportunities, advice and professional experiences.',
    },
   {
  icon: Heart,
  title: 'Support the Ministry',
  description:
    'Partner with MUKCCU through prayer, service and giving.',
},
   { 
    icon: Globe,
      title: 'Kingdom Impact',
      description:
        'Continue influencing society with Christ-like leadership wherever God has placed you.',
    },
  ];
const [loading, setLoading] = useState(false);

const { events, loading: eventsLoading } =
  useSupabaseAlumniEvents();
  const { documents, loading: documentsLoading } = useDocuments();

const alumniDocuments = documents.filter(
  doc => doc.category === 'alumni'
);

const [formData, setFormData] = useState({
  full_name: '',
  email: '',
  phone: '',
  course: '',
  graduation_year: '',
  occupation: '',
  location: '',
  church: '',
  mentor: false,
  message: '',
});
  const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement
  >
) => {

  const { name, value, type } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]:
      type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : value,
  }));

};
  const handleSubmit = async (
  e: React.FormEvent
) => {

  e.preventDefault();

  setLoading(true);

  try {

    await createAlumni({
  ...formData,
  graduation_year: Number(formData.graduation_year),
});

    alert(
      'Thank you for joining the MUKCCU Alumni Network!'
    );

    setFormData({
      full_name: '',
      email: '',
      phone: '',
      course: '',
      graduation_year: '',
      occupation: '',
      location: '',
      church: '',
      mentor: false,
      message: '',
    });

  } catch (error) {

    console.error(error);

    alert(
      'Registration failed. Please try again.'
    );

  }

  setLoading(false);

};
  const [copied, setCopied] = useState('');

const copyText = async (text: string, field: string) => {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(field);

    setTimeout(() => {
      setCopied('');
    }, 2000);

  } catch (err) {
    alert('Failed to copy.');
  }
};
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>
          MUKCCU Alumni | Maseno University Kisumu Campus Christian Union
        </title>

        <meta
          name="description"
          content="Connect with MUKCCU alumni, mentor students, attend alumni events and continue pursuing holiness together."
        />
      </Helmet>

      {/* HERO */}

      <section
        className="relative h-[75vh] flex items-center justify-center text-white"
        style={{
          background:
            'linear-gradient(135deg,#2e3e87 0%,#1a2351 100%)',
        }}
      >
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            MUKCCU Alumni
          </h1>

          <p className="text-2xl text-[#b4712d] font-semibold mb-6">
            Once a MUKCCU Member, Always Family
          </p>

          <p className="text-lg md:text-xl leading-relaxed text-gray-200">
            Stay connected with fellow alumni, mentor the next generation,
            strengthen lifelong friendships, and continue serving Christ
            wherever God has placed you.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button
  onClick={() =>
    document
      .getElementById('join-alumni')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
  className="px-8 py-4 rounded-xl font-semibold text-white transition hover:scale-105"
  style={{ backgroundColor: '#b4712d' }}
>
  Stay Connected 
</button>

            <button
  onClick={() =>
    document
      .getElementById('alumni-gallery')
      ?.scrollIntoView({ behavior: 'smooth' })
  }
  className="px-8 py-4 rounded-xl border-2 border-white hover:bg-white hover:text-[#2e3e87] transition"
>
  Meet Our Alumni
</button>
          </div>
        </div>
      </section>

      {/* WELCOME */}

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <img
              src="/images/alumni-group.jpg"
              alt="MUKCCU Alumni"
              className="rounded-2xl shadow-xl object-cover w-full h-[450px]"
            />
          </div>

          <div>
            <h2
              className="text-4xl font-bold mb-6"
              style={{ color: '#2e3e87' }}
            >
              Welcome Home
            </h2>

            <p className="text-gray-700 leading-8 mb-6">
              Graduating from Maseno University does not mean graduating from
              MUKCCU. The Alumni Network exists to keep former members connected
              through fellowship, mentorship, professional networking, prayer,
              and ministry.
            </p>

            <p className="text-gray-700 leading-8 mb-8">
              Whether you graduated recently or many years ago, you remain an
              important part of our family. Together we continue pursuing
              holiness while making a lasting impact for Christ.
            </p>

            <div className="space-y-4">
              {[
                'Christian Fellowship',
                'Mentorship',
                'Professional Networking',
                'Service & Ministry',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle className="text-green-600" size={22} />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ALUMNI SPOTLIGHT */}

<section className="py-20 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2
        className="text-4xl font-bold mb-4"
        style={{ color: "#2e3e87" }}
      >
        🌟 Alumni Spotlight
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto">
        Every alumnus has a story of faith, growth and purpose.
        Our Alumni Spotlight celebrates graduates whose lives
        continue to reflect Christ in their professions,
        churches and communities.
      </p>
    </div>

    <div className="bg-[#f8f9fa] rounded-3xl shadow-xl p-10 lg:p-14">

      <div className="grid lg:grid-cols-3 gap-10 items-center">

        <div className="flex justify-center">
          <img
            src="/images/gallery1.jpg"
            alt="Featured Alumni"
            className="w-72 h-72 rounded-full object-cover shadow-xl border-8 border-white"
          />
        </div>

        <div className="lg:col-span-2">

          <span
            className="inline-block px-4 py-2 rounded-full text-white mb-4"
            style={{ backgroundColor: "#b4712d" }}
          >
            Featured Alumnus
          </span>

          <h3
            className="text-4xl font-bold mb-3"
            style={{ color: "#2e3e87" }}
          >
            Dr. Joshua Okise
          </h3>

          <p className="text-lg text-gray-500 mb-5">
            Business and Economis• Class of 2016
          </p>

          <p className="text-xl font-semibold mb-6">
            Acting CEO JOOTRH
          </p>

          <blockquote className="italic text-gray-700 leading-8 border-l-4 border-[#b4712d] pl-6 mb-8">
            "Serving in MUKCCU transformed my walk with Christ and
            taught me servant leadership. The friendships,
            discipleship and opportunities to serve continue to
            shape who I am today."
          </blockquote>

          <div className="font-medium text-[#2e3e87]">
            Favourite Scripture:
          </div>

          <p className="italic mt-2">
            Proverbs 3:5–6
          </p>

        </div>

      </div>

    </div>

  </div>
</section>

      {/* OUR IMPACT */}
<section className="py-20 bg-[#f8f9fa]">
  <div className="max-w-6xl mx-auto px-6">
    <h2
      className="text-4xl font-bold text-center mb-14"
      style={{ color: "#2e3e87" }}
    >
      Our Impact
    </h2>

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
      {[
        ["200+", "Alumni"],
        ["15+", "Graduation Classes"],
        ["10+", "Schools Represented"],
      ].map(([number, label]) => (
        <div
          key={label}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h3
            className="text-5xl font-bold mb-3"
            style={{ color: "#b4712d" }}
          >
            {number}
          </h3>

          <p className="text-gray-700 font-medium">{label}</p>
        </div>
      ))}
    </div>

    <p className="text-center text-gray-600 leading-8 max-w-4xl mx-auto mt-12">
      God has faithfully raised men and women through MUKCCU who now
      serve Christ in healthcare, education, law, engineering,
      business, ministry, public service and many other professions
      across Kenya and beyond.
    </p>
  </div>
</section>

      {/* Stay Connected */}

<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2
      className="text-4xl font-bold text-center mb-14"
      style={{ color: '#2e3e87' }}
    >
      Why Join the Alumni Network?
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {benefits.map((benefit, index) => {
        const benefits = [
  {
    icon: GraduationCap,
    title: "Become a Mentor",
    description:
      "Walk alongside current students by offering spiritual, academic and professional guidance.",
  },
  {
    icon: Briefcase,
    title: "Share Opportunities",
    description:
      "Connect students and fellow alumni with internships, jobs, scholarships and career advice.",
  },
  {
    icon: Heart,
    title: "Support the Ministry",
    description:
      "Partner with MUKCCU through prayer, volunteering and financial support.",
  },
  {
    icon: Users,
    title: "Grow Your Network",
    description:
      "Reconnect with former members and build meaningful professional and ministry relationships.",
  },
  {
    icon: Globe,
    title: "Attend Alumni Events",
    description:
      "Participate in reunions, worship experiences, networking events and outreach programmes.",
  },
  {
    icon: CheckCircle,
    title: "Share Your Story",
    description:
      "Encourage the next generation by sharing your journey of faith, leadership and service.",
  },
];
      })}
    </div>
  </div>
</section>
      {/* ALUMNI RESOURCES */}

<section className="py-20 bg-[#f8f9fa]">
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2
        className="text-4xl font-bold mb-4"
        style={{ color: "#2e3e87" }}
      >
        Alumni Resources
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto">
        Access official documents that guide the MUKCCU Alumni Association.
      </p>

    </div>

    {documentsLoading ? (

      <div className="text-center py-10">
        Loading resources...
      </div>

    ) : (

      <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">

        {alumniDocuments.map((doc) => (

          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-lg p-8 border-t-4"
            style={{ borderColor: "#b4712d" }}
          >

            <div className="flex items-center mb-5">

              <FileText
                size={36}
                className="mr-4"
                style={{ color: "#2e3e87" }}
              />

              <div>

                <h3
                  className="text-2xl font-bold"
                  style={{ color: "#2e3e87" }}
                >
                  {doc.title}
                </h3>

                <p className="text-gray-600 mt-1">
                  {doc.description}
                </p>

              </div>

            </div>

            <div className="flex gap-4 flex-wrap">

              <a
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: "#2e3e87" }}
              >
                <ExternalLink size={18} className="mr-2" />
                View Document
              </a>

              <a
                href={doc.file_url}
                download={doc.title}
                className="inline-flex items-center px-6 py-3 rounded-lg text-white font-semibold"
                style={{ backgroundColor: "#b4712d" }}
              >
                <Download size={18} className="mr-2" />
                Download PDF
              </a>

            </div>

          </div>

        ))}

      </div>

    )}

  </div>
</section>
              {/* ALUMNI GALLERY */}

<section
  id="alumni-gallery"
  className="py-24 bg-gradient-to-b from-[#f8f9fa] to-white"
>
  <div className="max-w-7xl mx-auto px-6">

    {/* Section Header */}
    <div className="text-center mb-16">

      <span
        className="inline-block px-5 py-2 rounded-full text-sm font-semibold text-white mb-5"
        style={{ backgroundColor: "#b4712d" }}
      >
        📸 Reliving Memories
      </span>

      <h2
        className="text-4xl md:text-5xl font-bold mb-5"
        style={{ color: "#2e3e87" }}
      >
        Alumni Gallery
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto leading-8">
        Celebrating unforgettable moments of fellowship, graduations,
        conferences, outreach and lifelong friendships built through
        Maseno University City Campus Christian Union.
      </p>

    </div>

    {/* Gallery */}
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">

      {[
        {
          image: "gallery1.jpg",
          title: "Annual Alumni Reunion",
          category: "Reunion",
        },
        {
          image: "gallery2.jpg",
          title: "Graduation Celebration",
          category: "Graduation",
        },
        {
          image: "gallery3.jpg",
          title: "Community Outreach",
          category: "Outreach",
        },
        {
          image: "gallery4.jpg",
          title: "Leadership Forum",
          category: "Leadership",
        },
        {
          image: "gallery5..jpg",
          title: "Prayer Fellowship",
          category: "Fellowship",
        },
        {
          image: "gallery6.jpg",
          title: "Mentorship Session",
          category: "Mentorship",
        },
        {
          image: "gallery 7.jpg",
          title: "Conference",
          category: "Conference",
        },
        {
          image: "gallery 8.jpg",
          title: "Family Gathering",
          category: "Community",
        },
      ].map((item, index) => (

        <motion.div
          key={item.image}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: index * 0.08,
          }}
          className="relative overflow-hidden rounded-3xl shadow-xl group"
        >

          <img
            src={`/images/${item.image}`}
            alt={item.title}
            className="w-full h-72 object-cover transition duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

          <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition duration-500">

            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mb-3"
              style={{ backgroundColor: "#b4712d" }}
            >
              {item.category}
            </span>

            <h3 className="text-white text-xl font-bold">
              {item.title}
            </h3>

          </div>

        </motion.div>

      ))}

    </div>

    {/* CTA */}

    <div className="text-center mt-14">

      <button
        onClick={() =>
          document
            .getElementById("join-alumni")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="px-8 py-4 rounded-xl text-white font-semibold hover:scale-105 transition"
        style={{ backgroundColor: "#2e3e87" }}
      >
        Join Our Alumni Network
      </button>

    </div>

  </div>
</section>
      {/* UPCOMING ALUMNI EVENTS */}

<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center mb-14">
      <h2
        className="text-4xl font-bold mb-4"
        style={{ color: "#2e3e87" }}
      >
        Upcoming Alumni Events
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto">
        Stay connected through reunions, fellowship, mentorship,
        networking and ministry events organized by the MUKCCU Alumni
        Network.
      </p>
    </div>

{eventsLoading ? (

  <div className="text-center py-16">
    <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-[#2e3e87] border-t-transparent"></div>

    <p className="mt-4 text-gray-600">
      Loading upcoming events...
    </p>
  </div>

) : events.length === 0 ? (

  <div className="text-center py-16">
    <h3
      className="text-2xl font-semibold mb-3"
      style={{ color: "#2e3e87" }}
    >
      No Upcoming Events
    </h3>

    <p className="text-gray-600 max-w-xl mx-auto">
      There are currently no scheduled alumni events.
      Please check back later or join the Alumni Network to
      receive notifications whenever new events are announced.
    </p>
  </div>

) : (

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

    {events.map((event) => (
      <div
        key={event.id}
        className="bg-[#f8f9fa] rounded-2xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300"
      >

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-52 object-cover"
          />
        )}

        <div className="p-8">

          <span
            className="inline-block px-4 py-2 rounded-full text-white text-sm font-semibold mb-5"
            style={{ backgroundColor: "#b4712d" }}
          >
            {event.event_date}
          </span>

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: "#2e3e87" }}
          >
            {event.title}
          </h3>

          <p className="text-gray-500 mb-2">
            📍 {event.venue}
          </p>

          <p className="text-gray-500 mb-4">
            🕒 {event.event_time}
          </p>

          <p className="text-gray-600 leading-7 mb-6">
            {event.description}
          </p>

          {event.registration_link && (
            <a
              href={event.registration_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: "#2e3e87" }}
            >
              Register
            </a>
          )}

        </div>

      </div>
    ))}

  </div>

)}
</div>
</section>
                  {/* JOIN ALUMNI NETWORK */}

<section
  id="join-alumni"
  className="py-20 bg-white"
>
  <div className="max-w-6xl mx-auto px-6">

    <div className="text-center mb-14">

      <h2
        className="text-4xl font-bold mb-4"
        style={{ color: '#2e3e87' }}
      >
        Join the Alumni Network
      </h2>

      <p className="text-gray-600 max-w-3xl mx-auto leading-8">
        Keep your connection with MUKCCU alive. Register today to receive
        alumni news, event invitations, mentorship opportunities and ministry
        updates.
      </p>

    </div>

    <div className="bg-[#f8f9fa] rounded-3xl shadow-xl p-8 md:p-12">

      <form
  onSubmit={handleSubmit}
  className="grid md:grid-cols-2 gap-6"
>
        <input
  type="text"
  name="full_name"
  value={formData.full_name}
  onChange={handleChange}
  placeholder="Full Name"
  className="border rounded-xl p-4"
/>

<input
  type="email"
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="Email Address"
  className="border rounded-xl p-4"
/>

<input
  type="tel"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="Phone Number"
  className="border rounded-xl p-4"
/>

<input
  type="text"
  name="course"
  value={formData.course}
  onChange={handleChange}
  placeholder="Course Studied"
  className="border rounded-xl p-4"
/>

<input
  type="number"
  name="graduation_year"
  value={formData.graduation_year}
  onChange={handleChange}
  placeholder="Graduation Year"
  className="border rounded-xl p-4"
/>

<input
  type="text"
  name="occupation"
  value={formData.occupation}
  onChange={handleChange}
  placeholder="Current Occupation"
  className="border rounded-xl p-4"
/>

<input
  type="text"
  name="location"
  value={formData.location}
  onChange={handleChange}
  placeholder="Current County / Country"
  className="border rounded-xl p-4 md:col-span-2"
/>
        <input
  type="text"
  name="church"
  value={formData.church}
  onChange={handleChange}
  placeholder="Local Church (Optional)"
  className="border rounded-xl p-4 md:col-span-2"
/>
        <div className="md:col-span-2">
  <label className="flex items-center gap-3 cursor-pointer">

    <input
      type="checkbox"
      name="mentor"
      checked={formData.mentor}
      onChange={handleChange}
      className="h-5 w-5"
    />

    <span className="text-gray-700">
      I am willing to mentor current MUKCCU students.
    </span>

  </label>
</div>
        <textarea
  name="message"
  value={formData.message}
  onChange={handleChange}
  rows={5}
  placeholder="Prayer Requests or Comments"
  className="border rounded-xl p-4 md:col-span-2"
/>

        <div className="md:col-span-2 text-center">

          <button
  type="submit"
  disabled={loading}
  className="px-10 py-4 rounded-xl text-white font-semibold hover:scale-105 transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
  style={{ backgroundColor: '#b4712d' }}
>
  {loading ? 'Submitting...' : 'Join the Alumni Network'}
</button>
        </div>

      </form>

    </div>

  </div>
</section>
                  {/* FAQ */}

<section className="py-20 bg-[#f8f9fa]">

<div className="max-w-5xl mx-auto px-6">

<h2
className="text-4xl font-bold text-center mb-14"
style={{ color:'#2e3e87' }}
>
Frequently Asked Questions
</h2>

<div className="space-y-6">

{[
{
q:"Who can join the Alumni Network?",
a:"Any former member of Maseno University City Campus Christian Union is welcome to join."
},
{
q:"Is there a registration fee?",
a:"No. Registration is completely free."
},
{
q:"How will I receive alumni updates?",
a:"Through our official email, WhatsApp groups and social media platforms."
},
{
q:"Can I mentor current students?",
a:"Yes. We encourage alumni to mentor students spiritually, academically and professionally."
},
{
q:"How can I support MUKCCU?",
a:"You can support through prayer, mentorship, volunteering and participation in alumni activities."
}

].map((item)=>(

<div
key={item.q}
className="bg-white rounded-2xl shadow-md p-6"
>
<h3
className="font-bold text-lg mb-3"
style={{color:"#2e3e87"}}
>
{item.q}
</h3>

<p className="text-gray-600">
{item.a}
</p>

</div>

))}

</div>

</div>

</section>
      {/* SUPPORT MUKCCU */}

<section className="py-20 bg-white">
  <div className="max-w-5xl mx-auto px-6 text-center">

    <h2
      className="text-4xl font-bold mb-6"
      style={{ color: "#2e3e87" }}
    >
      Support MUKCCU
    </h2>

    <p className="text-gray-600 leading-8 max-w-3xl mx-auto mb-10">
      Your generosity enables MUKCCU to continue reaching students with the
      Gospel through discipleship, missions, fellowships, conferences and
      outreach ministries. Every contribution makes a difference.
    </p>

    <div className="bg-[#f8f9fa] rounded-3xl shadow-xl p-10">

  <h3
    className="text-2xl font-bold mb-8"
    style={{ color: "#b4712d" }}
  >
    Give via M-Pesa Paybill
  </h3>

  {/* Paybill */}

  <div className="mb-8">

    <p className="font-semibold text-gray-700 mb-2">
      Business Number
    </p>

    <div className="flex flex-col md:flex-row items-center justify-center gap-4">

      <span className="text-4xl font-bold text-[#2e3e87]">
        247247
      </span>

      <button
        type="button"
        onClick={() => copyText("247247", "paybill")}
        className="px-5 py-2 rounded-lg bg-[#2e3e87] text-white hover:bg-[#1a2351] transition"
      >
        {copied === "paybill" ? "✓ Copied" : "📋 Copy Paybill"}
      </button>

    </div>

  </div>

  {/* Account */}

  <div>

    <p className="font-semibold text-gray-700 mb-2">
      Account Number
    </p>

    <div className="flex flex-col md:flex-row items-center justify-center gap-4">

      <span className="text-4xl font-bold text-[#2e3e87]">
        123258
      </span>

      <button
        type="button"
        onClick={() => copyText("123258", "account")}
        className="px-5 py-2 rounded-lg bg-[#2e3e87] text-white hover:bg-[#1a2351] transition"
      >
        {copied === "account" ? "✓ Copied" : "📋 Copy Account"}
      </button>

    </div>

  </div>

  <p className="mt-10 text-gray-600 leading-8">
    Thank you for partnering with us in raising Christ-centred students through
    discipleship, missions, conferences, outreach and fellowship.
  </p>

</div>

  </div>
</section>
                        {/* FINAL CTA */}

      <section
        className="py-24 text-center text-white"
        style={{
          background: "linear-gradient(135deg,#2e3e87,#1a2351)",
        }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">
            Still Part of the Family
          </h2>

          <p className="text-xl text-gray-200 leading-8 mb-10">
            Graduation marks a new beginning not the end of your journey with
            MUKCCU.
          </p>

          <p className="text-xl text-gray-200 leading-8 mb-10">
            Stay connected.<br />
            Mentor students.<br />
            Serve Christ.<br />
            Continue pursuing holiness wherever God leads you.
          </p>

          <button
  onClick={() =>
    document
      .getElementById("join-alumni")
      ?.scrollIntoView({ behavior: "smooth" })
  }
  className="px-10 py-4 rounded-xl font-semibold text-white hover:scale-105 transition"
  style={{ background: "#b4712d" }}
>
  Join the Alumni Network
</button>
        </div>
      </section>
    </div>
  );
        }
