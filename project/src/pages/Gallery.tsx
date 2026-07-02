import { useState } from 'react';
import { X } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseGallery } from '../hooks/useSupabaseGallery';

export default function Gallery() {
  const { content, loading: contentLoading } = useContent();
  const { images: supabaseImages, loading: supabaseLoading } = useSupabaseGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = supabaseImages.map((img) => ({
  url: img.image_url,
  title: img.title,
  description: img.description,
  category: img.category,
}));

const isLoading = supabaseLoading;

  return (
    <div className="min-h-screen">
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-blue-600 animate-pulse z-50"></div>
      )}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          background: 'linear-gradient(135deg, #2e3e87 0%, #1a2351 100%)'
        }}
      >
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold mb-2">{content.gallery?.pageTitle || 'Gallery'}</h1>
          <p className="text-xl" style={{ color: '#b4712d' }}>{content.gallery?.pageSubtitle || 'Moments of Faith and Fellowship'}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Capturing the joy, worship, and community that defines MUKCCU. These moments tell the story of God's work in our midst.
          </p>
        </div>
{!supabaseLoading && images.length === 0 && (
  <div className="text-center py-20">
    <p className="text-gray-500 text-xl">
      No gallery images available yet.
    </p>
  </div>
)}
        <div className="space-y-16">
  {images.map((image, index) => (
    <div
      key={index}
      className={`flex flex-col lg:flex-row ${
        index % 2 === 1 ? 'lg:flex-row-reverse' : ''
      } items-center gap-8`}
    >
      <div
        className="w-full lg:w-1/2 overflow-hidden rounded-2xl shadow-lg cursor-pointer"
        onClick={() => setSelectedImage(image.url)}
      >
        <img
  src={image.url}
  alt={image.title}
  loading="lazy"
  decoding="async"
  className="w-full h-[350px] object-cover hover:scale-105 transition-transform duration-500"
/>
      </div>

      <div className="w-full lg:w-1/2">
        <span
  className="inline-block mb-3 px-3 py-1 rounded-full text-sm text-white"
  style={{ backgroundColor: '#b4712d' }}
>
          {image.category}
        </span>

        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          {image.title}
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed">
          {image.description}
        </p>
      </div>
    </div>
  ))}
</div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div
            className="text-center p-8 rounded-2xl shadow-lg"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <p className="text-5xl font-bold text-white mb-2">11+</p>
            <p className="text-xl" style={{ color: '#b4712d' }}>Years of Ministry</p>
          </div>
          <div
            className="text-center p-8 rounded-2xl shadow-lg"
            style={{ backgroundColor: '#b4712d' }}
          >
            <p className="text-5xl font-bold text-white mb-2">100+</p>
            <p className="text-xl text-white">Active Members</p>
          </div>
          <div
            className="text-center p-8 rounded-2xl shadow-lg"
            style={{ backgroundColor: '#2e3e87' }}
          >
            <p className="text-5xl font-bold text-white mb-2">7</p>
            <p className="text-xl" style={{ color: '#b4712d' }}>Ministries</p>
          </div>
        </div>

        <div className="mt-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl shadow-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#2e3e87' }}>
            Share Your Moments
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
            Have photos from CU events? We'd love to see them! Share your moments with us and help document God's work in our community.
          </p>
          <a
            href="mailto:citycampusc.u@gmail.com"
            className="inline-block px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ backgroundColor: '#2e3e87', color: 'white' }}
          >
            Submit Photos
          </a>
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
  className="absolute top-4 right-4 text-white bg-black/40 p-2 rounded-full hover:bg-black/60 transition-all"
  onClick={() => setSelectedImage(null)}
>
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
