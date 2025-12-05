import { useState } from 'react';
import { X } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useSupabaseGallery } from '../hooks/useSupabaseGallery';

export default function Gallery() {
  const { content, loading: contentLoading } = useContent();
  const { images: supabaseImages, loading: supabaseLoading } = useSupabaseGallery();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const defaultImages = [
    {
      url: '/gallery/IMG_0174_transcpr.jpg',
      title: 'MUKCCU Worship Service',
      description: 'Sunday worship service',
      category: 'Worship'
    },
    {
      url: '/gallery/IMG_0235.jpg',
      title: 'MUKCCU Fellowship',
      description: 'Fellowship time',
      category: 'Fellowship'
    },
    {
      url: '/gallery/IMG_8493.JPG',
      title: 'MUKCCU Event',
      description: 'Special event',
      category: 'Events'
    },
    {
      url: '/gallery/IMG_8841.JPG',
      title: 'MUKCCU Gathering',
      description: 'Community gathering',
      category: 'Fellowship'
    },
  ];
  
  // Combine Supabase images with local content images
  const localImages = content.gallery?.images || [];
  const combinedImages = [
    ...supabaseImages.map(img => ({
      url: img.image_url,
      title: img.title,
      description: img.description,
      category: img.category
    })),
    ...localImages
  ];
  
  const images = combinedImages.length > 0 ? combinedImages : defaultImages;
  const isLoading = (contentLoading || supabaseLoading) && images.length === 0;

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer aspect-[4/3]"
              onClick={() => setSelectedImage(image.url)}
            >
              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="text-lg font-semibold">{image.title}</p>
                  <p className="text-sm opacity-90">{image.description}</p>
                  <span className="inline-block mt-2 px-2 py-1 bg-white bg-opacity-20 rounded text-xs">
                    {image.category}
                  </span>
                </div>
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
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
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
