import { useState, useEffect } from 'react';
import { 
  Save, Plus, Trash2, Edit3, Home, Users, Calendar, 
  Phone, Settings, Image, Globe, Award, BookOpen,
  Menu, X, Eye, Upload, Search, LogOut
} from 'lucide-react';
import AdminLogin from '../components/AdminLogin';
import { supabase } from '../lib/supabase';
import { useSupabaseGallery } from '../hooks/useSupabaseGallery';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState<any>({});
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const loadContent = async () => {
        try {
          const savedContent = localStorage.getItem('siteContent');
          let baseContent;
          if (savedContent) {
            baseContent = JSON.parse(savedContent);
          } else {
            const data = await import('../data/siteContent.json');
            baseContent = data.default;
            localStorage.setItem('siteContent', JSON.stringify(data.default));
          }
          
          // Load leadership data from Supabase
          try {
            const [leadersResponse, rolesResponse] = await Promise.all([
              supabase.from('leaders').select('*').order('created_at', { ascending: true }),
              supabase.from('leadership_roles').select('*').order('created_at', { ascending: true })
            ]);
            
            if (leadersResponse.data && leadersResponse.data.length > 0) {
              baseContent.leadership = baseContent.leadership || {};
              baseContent.leadership.list = leadersResponse.data;
            }
            
            if (rolesResponse.data && rolesResponse.data.length > 0) {
              baseContent.leadership = baseContent.leadership || {};
              
              const currentPatron = rolesResponse.data.find(r => r.role_type === 'current_patron');
              if (currentPatron) {
                baseContent.leadership.currentPatron = {
                  name: currentPatron.name,
                  description: currentPatron.description
                };
              }
              
              const previousPatron = rolesResponse.data.find(r => r.role_type === 'previous_patron');
              if (previousPatron) {
                baseContent.leadership.previousPatron = {
                  name: previousPatron.name,
                  description: previousPatron.description
                };
              }
              
              const alumniDirector = rolesResponse.data.find(r => r.role_type === 'alumni_director');
              if (alumniDirector) {
                baseContent.leadership.alumniDirector = {
                  name: alumniDirector.name,
                  description: alumniDirector.description
                };
              }
              
              const previousChairpersons = rolesResponse.data.filter(r => r.role_type === 'previous_chairperson');
              if (previousChairpersons.length > 0) {
                baseContent.leadership.previousChairpersons = previousChairpersons.map(chair => ({
                  name: chair.name,
                  year: chair.year
                }));
              }
            }
          } catch (supabaseError) {
            console.log('Supabase leadership data not available:', supabaseError);
          }
          
          setContent(baseContent);
        } catch (error) {
          console.error('Error loading content:', error);
        }
      };
      loadContent();
    }
  }, [isAuthenticated]);

  const compressImage = (file: File, maxWidth = 800, quality = 0.7): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;
      const img = new Image();
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height);
        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const convertGooglePhotosUrl = (url: string): string => {
    if (!url) return url;
    
    // Handle Google Drive sharing URLs (these work better)
    if (url.includes('drive.google.com')) {
      const match = url.match(/\/d\/([a-zA-Z0-9-_]+)/);
      if (match) {
        return `https://drive.google.com/uc?export=view&id=${match[1]}`;
      }
    }
    
    // For Google Photos, show a warning since they often don't work due to CORS
    if (url.includes('photos.google.com') || url.includes('photos.app.goo.gl')) {
      // Return the URL as-is but we'll show a warning
      return url;
    }
    
    return url;
  };

  const validateImageUrl = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!url) {
        resolve(false);
        return;
      }
      
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
      
      // Timeout after 5 seconds
      setTimeout(() => resolve(false), 5000);
    });
  };

  const saveContent = async () => {
    setSaving(true);
    try {
      const pendingImages = (content.gallery?.images || []).filter(img => 
        img.url.startsWith('data:')
      );
      
      console.log(`Found ${pendingImages.length} images to upload to Supabase`);
      
      if (pendingImages.length > 0) {
        // Sign in as admin first to bypass all RLS
        const { error: authError } = await supabase.auth.signInWithPassword({
          email: 'admin@mukccu.org',
          password: 'MUKCCU2024!'
        });
        
        if (authError) {
          throw new Error(`Authentication failed: ${authError.message}`);
        }
        
        for (let i = 0; i < pendingImages.length; i++) {
          const image = pendingImages[i];
          console.log(`Uploading ${i + 1}/${pendingImages.length}: ${image.title}`);
          
          // Use existing compression function
          const response = await fetch(image.url);
          const originalBlob = await response.blob();
          
          const blob = originalBlob;
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.jpg`;
          console.log(`Uploading: ${(blob.size / 1024 / 1024).toFixed(2)}MB`);
          const filePath = `gallery/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('gallery-images')
            .upload(filePath, blob);

          if (uploadError) {
            console.error('Upload error:', uploadError);
            throw new Error(`Failed to upload ${image.title}: ${uploadError.message}`);
          }

          const { data: { publicUrl } } = supabase.storage
            .from('gallery-images')
            .getPublicUrl(filePath);
          
          const { error: dbError } = await supabase
            .from('gallery_images')
            .insert({
              title: image.title,
              description: image.description,
              category: image.category,
              image_url: publicUrl,
              storage_path: filePath
            });
            
          if (dbError) {
            console.error('Database error:', dbError);
            throw new Error(`Failed to save ${image.title} to database: ${dbError.message}`);
          }
        }
        
        alert(`Successfully uploaded ${pendingImages.length} images to Supabase!`);
      }
      
      // Save leadership data to Supabase
      if (content.leadership?.list && content.leadership.list.length > 0) {
        // Clear existing leadership data
        await supabase.from('leaders').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        // Insert new leadership data
        const { error: leadershipError } = await supabase
          .from('leaders')
          .insert(content.leadership.list.map((leader: any) => ({
            name: leader.name,
            position: leader.position,
            course: leader.course,
            year: leader.year,
            bio: leader.bio,
            image: leader.image
          })));
          
        if (leadershipError) {
          console.error('Leadership save error:', leadershipError);
          alert('Failed to save leadership data to database');
        }
      }
      
      // Save special leadership roles to Supabase
      try {
        await supabase.from('leadership_roles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        
        const rolesToSave = [];
        
        if (content.leadership?.currentPatron?.name) {
          rolesToSave.push({
            role_type: 'current_patron',
            name: content.leadership.currentPatron.name,
            description: content.leadership.currentPatron.description || '',
            year: ''
          });
        }
        
        if (content.leadership?.previousPatron?.name) {
          rolesToSave.push({
            role_type: 'previous_patron',
            name: content.leadership.previousPatron.name,
            description: content.leadership.previousPatron.description || '',
            year: ''
          });
        }
        
        if (content.leadership?.alumniDirector?.name) {
          rolesToSave.push({
            role_type: 'alumni_director',
            name: content.leadership.alumniDirector.name,
            description: content.leadership.alumniDirector.description || '',
            year: ''
          });
        }
        
        if (content.leadership?.previousChairpersons) {
          content.leadership.previousChairpersons.forEach((chair: any) => {
            if (chair.name) {
              rolesToSave.push({
                role_type: 'previous_chairperson',
                name: chair.name,
                description: '',
                year: chair.year || ''
              });
            }
          });
        }
        
        if (rolesToSave.length > 0) {
          const { error: rolesError } = await supabase
            .from('leadership_roles')
            .insert(rolesToSave);
            
          if (rolesError) {
            console.error('Leadership roles save error:', rolesError);
            alert(`Failed to save leadership roles: ${rolesError.message}`);
          }
        }
      } catch (error) {
        console.error('Leadership roles error:', error);
        alert('Leadership roles table may not exist. Please run the SQL script first.');
      }
      
      // Save other content (excluding images and leadership) to localStorage
      const { leadership, ...contentWithoutLeadership } = content;
      const contentToSave = {
        ...contentWithoutLeadership,
        gallery: { ...content.gallery, images: [] }
      };
      
      localStorage.setItem('siteContent', JSON.stringify(contentToSave));
      
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Save error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setContent({});
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  const updateContent = (section: string, field: string, value: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const addArrayItem = (section: string, newItem: any) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        list: [...(prev[section]?.list || []), newItem]
      }
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        list: prev[section].list.filter((_: any, i: number) => i !== index)
      }
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'home', label: 'Home Page', icon: Home },
    { id: 'about', label: 'About Us', icon: BookOpen },
    { id: 'leadership', label: 'Leadership', icon: Users },
    { id: 'activities', label: 'Weekly Activities', icon: Calendar },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'ministries', label: 'Ministries', icon: Award },
    { id: 'gallery', label: 'Gallery', icon: Image },
    { id: 'contacts', label: 'Contacts', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Pages</p>
              <p className="text-3xl font-bold">8</p>
            </div>
            <Globe className="h-12 w-12 text-blue-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Leadership</p>
              <p className="text-3xl font-bold">{content.leadership?.list?.length || 0}</p>
            </div>
            <Users className="h-12 w-12 text-green-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Events</p>
              <p className="text-3xl font-bold">{content.events?.list?.length || 0}</p>
            </div>
            <Calendar className="h-12 w-12 text-purple-200" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Activities</p>
              <p className="text-3xl font-bold">{content.activities?.length || 0}</p>
            </div>
            <BookOpen className="h-12 w-12 text-orange-200" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button 
              onClick={() => setActiveSection('leadership')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Plus className="h-5 w-5 mr-3 text-blue-600" />
              Add Leadership Member
            </button>
            <button 
              onClick={() => setActiveSection('events')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Calendar className="h-5 w-5 mr-3 text-green-600" />
              Create New Event
            </button>
            <button 
              onClick={() => setActiveSection('activities')}
              className="w-full flex items-center p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BookOpen className="h-5 w-5 mr-3 text-purple-600" />
              Add Weekly Activity
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-2 w-2 bg-green-500 rounded-full mr-3"></div>
              <span className="text-sm">Content management system initialized</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
              <div className="h-2 w-2 bg-blue-500 rounded-full mr-3"></div>
              <span className="text-sm">Leadership data structure created</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLeadershipEditor = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Leadership Management</h2>
          <button
            onClick={() => {
              const currentCount = content.leadership?.list?.length || 0;
              if (currentCount >= 11) {
                alert('Maximum 11 leadership positions allowed');
                return;
              }
              const newLeader = {
                name: '',
                position: '',
                course: '',
                year: '',
                bio: '',
                image: ''
              };
              setContent(prev => ({
                ...prev,
                leadership: {
                  ...prev.leadership,
                  list: [...(prev.leadership?.list || []), newLeader]
                }
              }));
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="mr-2" size={20} />
            Add Leader
          </button>
        </div>

        {/* Current Patron Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <h3 className="text-xl font-semibold mb-4 text-green-800">Current CU Patron</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={content.leadership?.currentPatron?.name || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    currentPatron: {
                      ...prev.leadership?.currentPatron,
                      name: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter current patron name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={content.leadership?.currentPatron?.description || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    currentPatron: {
                      ...prev.leadership?.currentPatron,
                      description: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Dean of School of Business"
              />
            </div>
          </div>
        </div>

        {/* Previous Patron Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Previous CU Patron</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={content.leadership?.previousPatron?.name || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    previousPatron: {
                      ...prev.leadership?.previousPatron,
                      name: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter patron name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={content.leadership?.previousPatron?.description || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    previousPatron: {
                      ...prev.leadership?.previousPatron,
                      description: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10 years of dedicated service"
              />
            </div>
          </div>
        </div>

        {/* Alumni Director Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200">
          <h3 className="text-xl font-semibold mb-4 text-purple-800">Alumni Director</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={content.leadership?.alumniDirector?.name || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    alumniDirector: {
                      ...prev.leadership?.alumniDirector,
                      name: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter alumni director name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={content.leadership?.alumniDirector?.description || ''}
                onChange={(e) => setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    alumniDirector: {
                      ...prev.leadership?.alumniDirector,
                      description: e.target.value
                    }
                  }
                }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Connecting alumni with current students"
              />
            </div>
          </div>
        </div>

        {/* Previous Chairpersons Section */}
        <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-green-800">Previous Chairpersons</h3>
            <button
              onClick={() => setContent(prev => ({
                ...prev,
                leadership: {
                  ...prev.leadership,
                  previousChairpersons: [
                    ...(prev.leadership?.previousChairpersons || []),
                    { name: '', year: '' }
                  ]
                }
              }))}
              className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
            >
              <Plus className="mr-1" size={16} />
              Add Chairperson
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.leadership?.previousChairpersons?.map((chair: any, index: number) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-sm font-medium text-gray-500">Chairperson {index + 1}</span>
                  <button
                    onClick={() => setContent(prev => ({
                      ...prev,
                      leadership: {
                        ...prev.leadership,
                        previousChairpersons: prev.leadership.previousChairpersons.filter((_: any, i: number) => i !== index)
                      }
                    }))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  value={chair.name}
                  onChange={(e) => setContent(prev => {
                    const newChairs = [...prev.leadership.previousChairpersons];
                    newChairs[index].name = e.target.value;
                    return {
                      ...prev,
                      leadership: {
                        ...prev.leadership,
                        previousChairpersons: newChairs
                      }
                    };
                  })}
                  className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2023/2024)"
                  value={chair.year}
                  onChange={(e) => setContent(prev => {
                    const newChairs = [...prev.leadership.previousChairpersons];
                    newChairs[index].year = e.target.value;
                    return {
                      ...prev,
                      leadership: {
                        ...prev.leadership,
                        previousChairpersons: newChairs
                      }
                    };
                  })}
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Current Leadership */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Current Leadership Team</h3>
            <button
              onClick={() => {
                const currentCount = content.leadership?.list?.length || 0;
                if (currentCount >= 11) {
                  alert('Maximum 11 leadership positions allowed');
                  return;
                }
                const newLeader = {
                  name: '',
                  position: '',
                  course: '',
                  year: '',
                  bio: '',
                  image: ''
                };
                setContent(prev => ({
                  ...prev,
                  leadership: {
                    ...prev.leadership,
                    list: [...(prev.leadership?.list || []), newLeader]
                  }
                }));
              }}
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Plus className="mr-1" size={16} />
              Add Leader
            </button>
          </div>
          <div className="space-y-4">
            {content.leadership?.list?.map((leader: any, index: number) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-lg">Leader {index + 1}</h4>
                  <button
                    onClick={() => {
                      const newLeaders = (content.leadership?.list || []).filter((_: any, i: number) => i !== index);
                      setContent(prev => ({
                        ...prev,
                        leadership: {
                          ...prev.leadership,
                          list: newLeaders
                        }
                      }));
                    }}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={leader.name}
                    onChange={(e) => {
                      const newLeaders = [...content.leadership.list];
                      newLeaders[index].name = e.target.value;
                      setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                    }}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={leader.position}
                    onChange={(e) => {
                      const newLeaders = [...content.leadership.list];
                      newLeaders[index].position = e.target.value;
                      setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                    }}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Course"
                    value={leader.course}
                    onChange={(e) => {
                      const newLeaders = [...content.leadership.list];
                      newLeaders[index].course = e.target.value;
                      setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                    }}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Year (e.g., 3rd Year)"
                    value={leader.year}
                    onChange={(e) => {
                      const newLeaders = [...content.leadership.list];
                      newLeaders[index].year = e.target.value;
                      setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                    }}
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">Leader Photo</label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                      <Upload className="mr-2" size={16} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            try {
                              let imageUrl;
                              try {
                                imageUrl = await compressImage(file);
                              } catch {
                                const reader = new FileReader();
                                imageUrl = await new Promise((resolve) => {
                                  reader.onload = (e) => resolve(e.target?.result as string);
                                  reader.readAsDataURL(file);
                                });
                              }
                              const newLeaders = [...content.leadership.list];
                              newLeaders[index].image = imageUrl;
                              setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                            } catch (error) {
                              console.error('Error processing image:', error);
                              alert('Failed to process image');
                            }
                          }
                          e.target.value = '';
                        }}
                      />
                    </label>
                    {leader.image && (
                      <div className="flex items-center space-x-2">
                        <img src={leader.image} alt="Leader" className="w-12 h-12 rounded-full object-cover" />
                        <button
                          onClick={() => {
                            const newLeaders = [...content.leadership.list];
                            newLeaders[index].image = '';
                            setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <textarea
                  placeholder="Biography / Description"
                  value={leader.bio}
                  onChange={(e) => {
                    const newLeaders = [...content.leadership.list];
                    newLeaders[index].bio = e.target.value;
                    setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                  }}
                  className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'leadership':
        return renderLeadershipEditor();
      case 'home':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-6">Home Page Content</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={content.home?.heroTitle || ''}
                  onChange={(e) => updateContent('home', 'heroTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={content.home?.heroSubtitle || ''}
                  onChange={(e) => updateContent('home', 'heroSubtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Welcome Text</label>
                <input
                  type="text"
                  value={content.home?.welcomeText || ''}
                  onChange={(e) => updateContent('home', 'welcomeText', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-6">About Page Content</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.about?.pageTitle || ''}
                    onChange={(e) => updateContent('about', 'pageTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Page Subtitle</label>
                  <input
                    type="text"
                    value={content.about?.pageSubtitle || ''}
                    onChange={(e) => updateContent('about', 'pageSubtitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mission</label>
                <textarea
                  value={content.about?.mission || ''}
                  onChange={(e) => updateContent('about', 'mission', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vision</label>
                <textarea
                  value={content.about?.vision || ''}
                  onChange={(e) => updateContent('about', 'vision', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 'activities':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Weekly Activities</h2>
              <button
                onClick={() => setContent(prev => ({
                  ...prev,
                  activities: [...(prev.activities || []), { day: '', title: '', time: '', location: '', description: '' }]
                }))}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2" size={20} />
                Add Activity
              </button>
            </div>
            <div className="space-y-4">
              {(content.activities || []).map((activity: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-lg">Activity {index + 1}</h4>
                    <button
                      onClick={() => setContent(prev => ({
                        ...prev,
                        activities: prev.activities.filter((_: any, i: number) => i !== index)
                      }))}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Day"
                      value={activity.day}
                      onChange={(e) => {
                        const newActivities = [...content.activities];
                        newActivities[index].day = e.target.value;
                        setContent(prev => ({ ...prev, activities: newActivities }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      value={activity.title}
                      onChange={(e) => {
                        const newActivities = [...content.activities];
                        newActivities[index].title = e.target.value;
                        setContent(prev => ({ ...prev, activities: newActivities }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Time"
                      value={activity.time}
                      onChange={(e) => {
                        const newActivities = [...content.activities];
                        newActivities[index].time = e.target.value;
                        setContent(prev => ({ ...prev, activities: newActivities }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={activity.location}
                      onChange={(e) => {
                        const newActivities = [...content.activities];
                        newActivities[index].location = e.target.value;
                        setContent(prev => ({ ...prev, activities: newActivities }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={activity.description}
                    onChange={(e) => {
                      const newActivities = [...content.activities];
                      newActivities[index].description = e.target.value;
                      setContent(prev => ({ ...prev, activities: newActivities }));
                    }}
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Events Management</h2>
              <button
                onClick={() => setContent(prev => ({
                  ...prev,
                  events: {
                    ...prev.events,
                    list: [...(prev.events?.list || []), { title: '', date: '', time: '', location: '', description: '' }]
                  }
                }))}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2" size={20} />
                Add Event
              </button>
            </div>
            <div className="space-y-4">
              {(content.events?.list || []).map((event: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-lg">Event {index + 1}</h4>
                    <button
                      onClick={() => setContent(prev => ({
                        ...prev,
                        events: {
                          ...prev.events,
                          list: prev.events.list.filter((_: any, i: number) => i !== index)
                        }
                      }))}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Event Title"
                      value={event.title}
                      onChange={(e) => {
                        const newEvents = [...content.events.list];
                        newEvents[index].title = e.target.value;
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => {
                        const newEvents = [...content.events.list];
                        newEvents[index].date = e.target.value;
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Time"
                      value={event.time}
                      onChange={(e) => {
                        const newEvents = [...content.events.list];
                        newEvents[index].time = e.target.value;
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={event.location}
                      onChange={(e) => {
                        const newEvents = [...content.events.list];
                        newEvents[index].location = e.target.value;
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={event.description}
                    onChange={(e) => {
                      const newEvents = [...content.events.list];
                      newEvents[index].description = e.target.value;
                      setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                    }}
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      case 'contacts':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.contacts?.pageTitle || ''}
                    onChange={(e) => updateContent('contacts', 'pageTitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Page Subtitle</label>
                  <input
                    type="text"
                    value={content.contacts?.pageSubtitle || ''}
                    onChange={(e) => updateContent('contacts', 'pageSubtitle', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={content.contacts?.email || ''}
                    onChange={(e) => updateContent('contacts', 'email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    value={content.contacts?.phone || ''}
                    onChange={(e) => updateContent('contacts', 'phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={content.contacts?.location || ''}
                  onChange={(e) => updateContent('contacts', 'location', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 'gallery':
        let supabaseImages = [];
        let supabaseLoading = false;
        let deleteImage = null;
        let updateImage = null;
        
        try {
          const galleryData = useSupabaseGallery();
          supabaseImages = galleryData?.images || [];
          supabaseLoading = galleryData?.loading || false;
          deleteImage = galleryData?.deleteImage;
          updateImage = galleryData?.updateImage;
        } catch (error) {
          console.error('Gallery hook error:', error);
        }
        
        const localImages = content.gallery?.images || [];
        const allImages = [
          ...supabaseImages.map(img => ({
            url: img?.image_url || '',
            title: img?.title || '',
            description: img?.description || '',
            category: img?.category || '',
            isSupabase: true,
            supabaseId: img?.id,
            storagePath: img?.storage_path
          })),
          ...localImages.map(img => ({ ...img, isSupabase: false }))
        ];
        
        return (
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="px-8 py-6 border-b border-gray-100">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                    <Image className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gallery Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your photo gallery and image content ({allImages.length} images)</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <label className="flex items-center px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md font-medium">
                    <Upload className="mr-2" size={18} />
                    Upload Multiple Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={async (e) => {
                        const files = Array.from(e.target.files || []);
                        if (files.length === 0) return;
                        
                        for (const file of files) {
                          try {
                            // Store locally first, upload to Supabase on save
                            let imageUrl;
                            
                            try {
                              imageUrl = await compressImage(file);
                              console.log(`Compressed for later upload: ${file.name}`);
                            } catch (compressionError) {
                              // Fallback - direct file read without compression
                              console.log(`Compression failed, using direct read for: ${file.name}`);
                              const reader = new FileReader();
                              imageUrl = await new Promise((resolve) => {
                                reader.onload = (e) => resolve(e.target?.result as string);
                                reader.readAsDataURL(file);
                              });
                            }

                            setContent(prev => {
                              const currentGallery = prev.gallery || {};
                              const currentImages = currentGallery.images || [];
                              return {
                                ...prev,
                                gallery: {
                                  ...currentGallery,
                                  images: [...currentImages, {
                                    url: imageUrl,
                                    title: file.name.replace(/\.[^/.]+$/, ''),
                                    description: '',
                                    category: 'Events'
                                  }]
                                }
                              };
                            });
                            
                          } catch (error) {
                            console.error(`Error processing ${file.name}:`, error);
                            alert(`Failed to process ${file.name}. Please try again.`);
                          }
                        }
                        
                        e.target.value = '';
                      }}
                    />
                  </label>
                  
                  <button
                    onClick={() => {
                      setContent(prev => {
                        const currentGallery = prev.gallery || {};
                        const currentImages = currentGallery.images || [];
                        return {
                          ...prev,
                          gallery: {
                            ...currentGallery,
                            images: [...currentImages, { url: '', title: '', description: '', category: '' }]
                          }
                        };
                      });
                    }}
                    className="flex items-center px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    <Plus className="mr-2" size={18} />
                    Add URL
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              {supabaseLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Loading images from Supabase...</p>
                </div>
              )}
              
              {!supabaseLoading && allImages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Image className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No images yet</h3>
                  <p className="text-gray-500 mb-6">Upload your first images to get started</p>
                  <div className="flex justify-center space-x-4">
                    <label className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
                      <Upload className="mr-2" size={16} />
                      Upload Images
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files || []);
                          if (files.length === 0) return;
                          
                          for (const file of files) {
                            try {
                              let imageUrl;
                              try {
                                imageUrl = await compressImage(file);
                              } catch {
                                const reader = new FileReader();
                                imageUrl = await new Promise((resolve) => {
                                  reader.onload = (e) => resolve(e.target?.result as string);
                                  reader.readAsDataURL(file);
                                });
                              }
                              setContent(prev => {
                                const currentGallery = prev.gallery || {};
                                const currentImages = currentGallery.images || [];
                                return {
                                  ...prev,
                                  gallery: {
                                    ...currentGallery,
                                    images: [...currentImages, {
                                      url: imageUrl,
                                      title: file.name.replace(/\.[^/.]+$/, ''),
                                      description: '',
                                      category: 'Events'
                                    }]
                                  }
                                };
                              });
                            } catch (error) {
                              console.error(`Error processing ${file.name}:`, error);
                              alert(`Failed to process ${file.name}`);
                            }
                          }
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <button
                      onClick={() => {
                        setContent(prev => {
                          const currentGallery = prev.gallery || {};
                          const currentImages = currentGallery.images || [];
                          return {
                            ...prev,
                            gallery: {
                              ...currentGallery,
                              images: [...currentImages, { url: '', title: '', description: '', category: '' }]
                            }
                          };
                        });
                      }}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      <Plus className="mr-2" size={16} />
                      Add URL
                    </button>
                  </div>
                </div>
              )}
              
              <div className="space-y-4">
                {allImages.map((image: any, index: number) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-semibold text-lg">Image {index + 1}</h4>
                      {image.isSupabase ? (
                        <button
                          onClick={async () => {
                            if (confirm('Delete this image from Supabase? This cannot be undone.')) {
                              try {
                                await deleteImage(image.supabaseId, image.storagePath);
                                alert('Image deleted successfully!');
                              } catch (error) {
                                console.error('Delete error:', error);
                                alert('Error deleting image.');
                              }
                            }
                          }}
                          className="text-orange-500 hover:text-orange-700 p-2"
                          title="Delete from Supabase"
                        >
                          <Trash2 size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const localIndex = index - supabaseImages.length;
                            setContent(prev => ({
                              ...prev,
                              gallery: {
                                ...prev.gallery,
                                images: prev.gallery.images.filter((_: any, i: number) => i !== localIndex)
                              }
                            }));
                          }}
                          className="text-red-500 hover:text-red-700 p-2"
                          title="Remove from list"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={image.url}
                        onChange={(e) => {
                          if (!image.isSupabase) {
                            const localIndex = index - supabaseImages.length;
                            const newImages = [...(content.gallery?.images || [])];
                            newImages[localIndex].url = e.target.value;
                            setContent(prev => ({ ...prev, gallery: { ...prev.gallery, images: newImages } }));
                          }
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={image.isSupabase}
                      />
                      <input
                        type="text"
                        placeholder="Image Title"
                        value={image.title}
                        onChange={async (e) => {
                          if (image.isSupabase) {
                            try {
                              await updateImage(image.supabaseId, e.target.value, image.description, image.category);
                            } catch (error) {
                              console.error('Update error:', error);
                              alert('Failed to update image title');
                            }
                          } else {
                            const localIndex = index - supabaseImages.length;
                            const newImages = [...(content.gallery?.images || [])];
                            newImages[localIndex].title = e.target.value;
                            setContent(prev => ({ ...prev, gallery: { ...prev.gallery, images: newImages } }));
                          }
                        }}
                        className={`p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          image.isSupabase ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <select
                        value={image.category}
                        onChange={async (e) => {
                          if (image.isSupabase) {
                            try {
                              await updateImage(image.supabaseId, image.title, image.description, e.target.value);
                            } catch (error) {
                              console.error('Update error:', error);
                              alert('Failed to update image category');
                            }
                          } else {
                            const localIndex = index - supabaseImages.length;
                            const newImages = [...(content.gallery?.images || [])];
                            newImages[localIndex].category = e.target.value;
                            setContent(prev => ({ ...prev, gallery: { ...prev.gallery, images: newImages } }));
                          }
                        }}
                        className={`p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          image.isSupabase ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                        }`}
                      >
                        <option value="Events">Events</option>
                        <option value="Activities">Activities</option>
                        <option value="Leadership">Leadership</option>
                        <option value="Ministries">Ministries</option>
                        <option value="Campus">Campus</option>
                      </select>
                      {image.isSupabase && (
                        <div className="flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg">
                          <span>✓ Stored in Supabase</span>
                        </div>
                      )}
                    </div>
                    <textarea
                      placeholder="Image Description"
                      value={image.description}
                      onChange={async (e) => {
                        if (image.isSupabase) {
                          try {
                            await updateImage(image.supabaseId, image.title, e.target.value, image.category);
                          } catch (error) {
                            console.error('Update error:', error);
                            alert('Failed to update image description');
                          }
                        } else {
                          const localIndex = index - supabaseImages.length;
                          const newImages = [...(content.gallery?.images || [])];
                          newImages[localIndex].description = e.target.value;
                          setContent(prev => ({ ...prev, gallery: { ...prev.gallery, images: newImages } }));
                        }
                      }}
                      className={`w-full mt-4 p-3 border rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        image.isSupabase ? 'border-blue-300 bg-blue-50' : 'border-gray-300'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'ministries':
        return (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Ministries Management</h2>
              <button
                onClick={() => setContent(prev => ({
                  ...prev,
                  ministries: {
                    ...prev.ministries,
                    list: [...(prev.ministries?.list || []), { name: '', description: '', leader: '', activities: '', contact: '', icon: 'Heart' }]
                  }
                }))}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="mr-2" size={20} />
                Add Ministry
              </button>
            </div>
            
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Page Title</label>
                <input
                  type="text"
                  value={content.ministries?.pageTitle || ''}
                  onChange={(e) => updateContent('ministries', 'pageTitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Our Ministries"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Page Subtitle</label>
                <input
                  type="text"
                  value={content.ministries?.pageSubtitle || ''}
                  onChange={(e) => updateContent('ministries', 'pageSubtitle', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Serving God Through Various Ministries"
                />
              </div>
            </div>

            <div className="space-y-4">
              {(content.ministries?.list || []).map((ministry: any, index: number) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-lg">Ministry {index + 1}</h4>
                    <button
                      onClick={() => setContent(prev => ({
                        ...prev,
                        ministries: {
                          ...prev.ministries,
                          list: prev.ministries.list.filter((_: any, i: number) => i !== index)
                        }
                      }))}
                      className="text-red-500 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Ministry Name"
                      value={ministry.name}
                      onChange={(e) => {
                        const newMinistries = [...content.ministries.list];
                        newMinistries[index].name = e.target.value;
                        setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Ministry Leader"
                      value={ministry.leader}
                      onChange={(e) => {
                        const newMinistries = [...content.ministries.list];
                        newMinistries[index].leader = e.target.value;
                        setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                      }}
                      className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-blue-700">📱 Coordinator Phone Number (for Join button)</label>
                      <input
                        type="tel"
                        placeholder="+254700000000"
                        value={ministry.contact || ''}
                        onChange={(e) => {
                          const newMinistries = [...content.ministries.list];
                          newMinistries[index].contact = e.target.value;
                          setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                        }}
                        className="w-full p-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Icon</label>
                      <select
                        value={ministry.icon}
                        onChange={(e) => {
                          const newMinistries = [...content.ministries.list];
                          newMinistries[index].icon = e.target.value;
                          setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="Heart">Heart</option>
                        <option value="Music">Music</option>
                        <option value="Users">Users</option>
                        <option value="Book">Book</option>
                        <option value="Globe">Globe</option>
                        <option value="Award">Award</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    placeholder="Ministry Description"
                    value={ministry.description}
                    onChange={(e) => {
                      const newMinistries = [...content.ministries.list];
                      newMinistries[index].description = e.target.value;
                      setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                    }}
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <textarea
                    placeholder="Ministry Activities"
                    value={ministry.activities}
                    onChange={(e) => {
                      const newMinistries = [...content.ministries.list];
                      newMinistries[index].activities = e.target.value;
                      setContent(prev => ({ ...prev, ministries: { ...prev.ministries, list: newMinistries } }));
                    }}
                    className="w-full mt-4 p-3 border border-gray-300 rounded-lg h-20 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return <div className="bg-white rounded-xl shadow-sm border p-6">Select a section to edit</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h1 className="text-xl font-bold text-gray-800">MUKCCU Admin</h1>
                <p className="text-sm text-gray-500">Content Management</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors text-left ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-700 border border-blue-200'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-lg border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                    <Settings className="text-white" size={20} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 capitalize">
                      {activeSection === 'dashboard' ? 'Dashboard' : `${activeSection} Management`}
                    </h2>
                    <p className="text-sm text-gray-500">MUKCCU Content Management System</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-sm"
                  />
                </div>
                
                <div className="flex items-center space-x-2 border-l border-gray-200 pl-3">
                  <button
                    onClick={() => window.open('/', '_blank')}
                    className="flex items-center px-3 py-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    title="Preview Website"
                  >
                    <Eye className="mr-2" size={18} />
                    Preview
                  </button>
                  
                  <button
                    onClick={() => {
                      if (confirm('Clear all stored content? This action cannot be undone.')) {
                        localStorage.removeItem('siteContent');
                        localStorage.removeItem('adminAuthenticated');
                        window.location.reload();
                      }
                    }}
                    className="flex items-center px-3 py-2.5 text-orange-600 hover:text-orange-700 hover:bg-orange-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    title="Clear All Data"
                  >
                    <Trash2 className="mr-2" size={18} />
                    Clear
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 text-sm font-medium"
                    title="Logout"
                  >
                    <LogOut className="mr-2" size={18} />
                    Logout
                  </button>
                </div>
                
                <button
                  onClick={saveContent}
                  disabled={saving}
                  className={`flex items-center px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-sm ${
                    saved 
                      ? 'bg-green-500 text-white shadow-green-200' 
                      : saving
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200 hover:shadow-lg'
                  }`}
                >
                  <Save className="mr-2" size={18} />
                  {saving ? 'Uploading...' : saved ? 'Saved!' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}