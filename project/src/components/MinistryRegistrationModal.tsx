import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  ministry: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MinistryRegistrationModal({
  ministry,
  isOpen,
  onClose
}: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    school: '',
    contact: '',
    ministry_name: ministry
  });
  useEffect(() => {
  setFormData((prev) => ({
    ...prev,
    ministry_name: ministry
  }));
}, [ministry]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from('ministry_registrations')
      .insert([formData]);

    setLoading(false);

    if (error) {
  alert('Failed to submit registration');
  return;
}

alert('Registration submitted successfully');

const phone = '254796849449';

const message = `
Hello,

My ministry registration has been submitted successfully.

Name: ${formData.full_name}
School: ${formData.school}
Phone: ${formData.contact}
Ministry: ${formData.ministry_name}

I would like to join this ministry.
`;

window.open(
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
  '_blank'
);

setFormData({
  full_name: '',
  school: '',
  contact: '',
  ministry_name: ministry
});

onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">

        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: '#2e3e87' }}
        >
          Join {ministry}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

<input
  required
  type="tel"
  pattern="[0-9]{10,13}"
  placeholder="Phone Number"
  className="w-full border rounded-lg p-3"
  value={formData.contact}
  onChange={(e) =>
    setFormData({
      ...formData,
      contact: e.target.value
    })
  }
/>

          <input
            required
            placeholder="School / Faculty"
            className="w-full border rounded-lg p-3"
            value={formData.school}
            onChange={(e) =>
              setFormData({
                ...formData,
                school: e.target.value
              })
            }
          />

          <input
  required
  type="tel"
  placeholder="Phone Number"
  className="w-full border rounded-lg p-3"
  value={formData.contact}
  onChange={(e) =>
    setFormData({
      ...formData,
      contact: e.target.value
    })
  }
/>

          <label className="block text-sm font-medium text-gray-700 mb-1">
  Ministry Selected
</label> 
         <input
            disabled
            className="w-full border rounded-lg p-3 bg-gray-100"
            value={ministry}
          />

          <div className="flex gap-3">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 border rounded-lg py-3"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg py-3 text-white"
              style={{ backgroundColor: '#2e3e87' }}
            >
              {loading ? 'Submitting...' : 'Register'}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}