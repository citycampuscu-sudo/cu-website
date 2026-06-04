import { useState } from 'react';
import { supabase } from '../lib/supabase';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MemberRegistrationModal({
  isOpen,
  onClose
}: Props) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    school: '',
    phone: '',
    year_of_study: '',
    residence: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
  .from('member_registrations')
  .insert([
    {
      full_name: formData.full_name,
      school: formData.school,
      phone: formData.phone,
      year_of_study: formData.year_of_study,
      residence: formData.residence
    }
  ]);

    setLoading(false);

    if (error) {
  console.error(error);
  alert(error.message);
  return;
}

    alert('Registration submitted successfully');

    const phone = '254796849449';

    const message = `
Hello,

I have successfully registered as a new CU member.

Name: ${formData.full_name}
School: ${formData.school}
Phone: ${formData.phone}
Year of Study: ${formData.year_of_study}
Residence: ${formData.residence}

I would like to become a member of Maseno University Kisumu Campus Christian Union.
`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      '_blank'
    );

    setFormData({
      full_name: '',
      school: '',
      phone: '',
      year_of_study: '',
      residence: ''
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">

        <h2
          className="text-2xl font-bold mb-6"
          style={{ color: '#2e3e87' }}
        >
          Join the Christian Union
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            required
            placeholder="Full Name"
            className="w-full border rounded-lg p-3"
            value={formData.full_name}
            onChange={(e) =>
              setFormData({
                ...formData,
                full_name: e.target.value
              })
            }
          />

          <input
            required
            type="text"
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
            value={formData.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                phone: e.target.value
              })
            }
          />

          <input
            placeholder="Year of Study"
            className="w-full border rounded-lg p-3"
            value={formData.year_of_study}
            onChange={(e) =>
              setFormData({
                ...formData,
                year_of_study: e.target.value
              })
            }
          />

          <input
            placeholder="Residence / Hostel"
            className="w-full border rounded-lg p-3"
            value={formData.residence}
            onChange={(e) =>
              setFormData({
                ...formData,
                residence: e.target.value
              })
            }
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