import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit } from 'lucide-react';

export default function Admin() {
  const [content, setContent] = useState<any>({});
  const [activeTab, setActiveTab] = useState('home');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const savedContent = localStorage.getItem('siteContent');
        if (savedContent) {
          setContent(JSON.parse(savedContent));
        } else {
          const data = await import('../data/siteContent.json');
          setContent(data.default);
          localStorage.setItem('siteContent', JSON.stringify(data.default));
        }
      } catch (error) {
        console.error('Error loading content:', error);
        setContent({
          home: { heroTitle: '', heroSubtitle: '', aboutPreview: '' },
          activities: [],
          contacts: { email: '', phone: '', location: '' }
        });
      }
    };
    loadContent();
  }, []);

  const saveContent = () => {
    localStorage.setItem('siteContent', JSON.stringify(content));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
      [section]: [...(prev[section] || []), newItem]
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setContent((prev: any) => ({
      ...prev,
      [section]: prev[section].filter((_: any, i: number) => i !== index)
    }));
  };

  const tabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Us' },
    { id: 'activities', label: 'Weekly Activities' },
    { id: 'events', label: 'Events' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'contacts', label: 'Contacts' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Website Admin</h1>
            <button
              onClick={saveContent}
              className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-all ${
                saved 
                  ? 'bg-green-500 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Save className="mr-2" size={20} />
              {saved ? 'Saved!' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          {activeTab === 'home' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Home Page Content</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Title</label>
                <input
                  type="text"
                  value={content.home?.heroTitle || ''}
                  onChange={(e) => updateContent('home', 'heroTitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                <input
                  type="text"
                  value={content.home?.heroSubtitle || ''}
                  onChange={(e) => updateContent('home', 'heroSubtitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Welcome Text (below subtitle)</label>
                <input
                  type="text"
                  value={content.home?.welcomeText || ''}
                  onChange={(e) => updateContent('home', 'welcomeText', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">About Preview</label>
                <textarea
                  value={content.home?.aboutPreview || ''}
                  onChange={(e) => updateContent('home', 'aboutPreview', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Weekly Activities</h2>
                <button
                  onClick={() => addArrayItem('activities', {
                    day: '',
                    title: '',
                    time: '',
                    location: '',
                    description: ''
                  })}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="mr-2" size={20} />
                  Add Activity
                </button>
              </div>
              
              {content.activities?.map((activity: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Activity {index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem('activities', index)}
                      className="text-red-600 hover:text-red-800"
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
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                    className="w-full p-2 border rounded h-20"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'about' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">About Page Content</h2>
              <div>
                <label className="block text-sm font-medium mb-2">Page Title</label>
                <input
                  type="text"
                  value={content.about?.pageTitle || ''}
                  onChange={(e) => updateContent('about', 'pageTitle', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mission</label>
                <textarea
                  value={content.about?.mission || ''}
                  onChange={(e) => updateContent('about', 'mission', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Vision</label>
                <textarea
                  value={content.about?.vision || ''}
                  onChange={(e) => updateContent('about', 'vision', e.target.value)}
                  className="w-full p-3 border rounded-lg h-24"
                />
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Events Management</h2>
                <button
                  onClick={() => {
                    const newEvents = [...(content.events?.list || [])];
                    newEvents.push({ title: '', date: '', time: '', location: '', description: '' });
                    setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="mr-2" size={20} />
                  Add Event
                </button>
              </div>
              
              {content.events?.list?.map((event: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Event {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newEvents = content.events.list.filter((_: any, i: number) => i !== index);
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="text-red-600 hover:text-red-800"
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
                      className="p-2 border rounded"
                    />
                    <input
                      type="date"
                      value={event.date}
                      onChange={(e) => {
                        const newEvents = [...content.events.list];
                        newEvents[index].date = e.target.value;
                        setContent(prev => ({ ...prev, events: { ...prev.events, list: newEvents } }));
                      }}
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
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
                    className="w-full p-2 border rounded h-20"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'leadership' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Leadership Team</h2>
                <button
                  onClick={() => {
                    const newLeaders = [...(content.leadership?.list || [])];
                    newLeaders.push({ name: '', position: '', email: '', phone: '', bio: '' });
                    setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                  }}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Plus className="mr-2" size={20} />
                  Add Leader
                </button>
              </div>
              
              {content.leadership?.list?.map((leader: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">Leader {index + 1}</h3>
                    <button
                      onClick={() => {
                        const newLeaders = content.leadership.list.filter((_: any, i: number) => i !== index);
                        setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Name"
                      value={leader.name}
                      onChange={(e) => {
                        const newLeaders = [...content.leadership.list];
                        newLeaders[index].name = e.target.value;
                        setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                      }}
                      className="p-2 border rounded"
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
                      className="p-2 border rounded"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={leader.email}
                      onChange={(e) => {
                        const newLeaders = [...content.leadership.list];
                        newLeaders[index].email = e.target.value;
                        setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                      }}
                      className="p-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Phone"
                      value={leader.phone}
                      onChange={(e) => {
                        const newLeaders = [...content.leadership.list];
                        newLeaders[index].phone = e.target.value;
                        setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                      }}
                      className="p-2 border rounded"
                    />
                  </div>
                  <textarea
                    placeholder="Bio"
                    value={leader.bio}
                    onChange={(e) => {
                      const newLeaders = [...content.leadership.list];
                      newLeaders[index].bio = e.target.value;
                      setContent(prev => ({ ...prev, leadership: { ...prev.leadership, list: newLeaders } }));
                    }}
                    className="w-full p-2 border rounded h-20"
                  />
                </div>
              ))}
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Page Title</label>
                  <input
                    type="text"
                    value={content.contacts?.pageTitle || ''}
                    onChange={(e) => updateContent('contacts', 'pageTitle', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Page Subtitle</label>
                  <input
                    type="text"
                    value={content.contacts?.pageSubtitle || ''}
                    onChange={(e) => updateContent('contacts', 'pageSubtitle', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={content.contacts?.email || ''}
                    onChange={(e) => updateContent('contacts', 'email', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="text"
                    value={content.contacts?.phone || ''}
                    onChange={(e) => updateContent('contacts', 'phone', e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <input
                  type="text"
                  value={content.contacts?.location || ''}
                  onChange={(e) => updateContent('contacts', 'location', e.target.value)}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}