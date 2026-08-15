import {
  X,
  Users,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface MinistryDetailsModalProps {
  ministry: any;
  isOpen: boolean;
  onClose: () => void;
  onJoin: () => void;
}

export default function MinistryDetailsModal({
  ministry,
  isOpen,
  onClose,
  onJoin,
}: MinistryDetailsModalProps) {
  if (!isOpen || !ministry) return null;

  const activities =
    ministry.activities
      ?.split(',')
      .map((item: string) => item.trim())
      .filter(Boolean) || [];

  const teams =
    ministry.teams
      ?.split(',')
      .map((item: string) => item.trim())
      .filter(Boolean) || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white rounded-3xl shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-700 hover:bg-white shadow-lg transition"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* HERO IMAGE */}
        <div className="relative h-64 md:h-80 bg-[#1a2351]">

          {ministry.image_url ? (
            <img
              src={ministry.image_url}
              alt={ministry.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#2e3e87] to-[#1a2351]" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2351] via-black/20 to-transparent" />

          <div className="absolute bottom-7 left-6 md:left-10 right-6">

            <p className="text-[#b4712d] uppercase tracking-[0.2em] text-xs font-bold mb-2">
              Ministry
            </p>

            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {ministry.name}
            </h2>

          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10">

          {/* INTRO */}
          <div className="mb-10">

            <h3 className="text-2xl font-bold text-[#2e3e87] mb-4">
              About the Ministry
            </h3>

            <p className="text-gray-600 leading-relaxed text-lg">
              {ministry.full_description ||
                ministry.description ||
                'This ministry provides opportunities for students to serve God, grow spiritually and use their gifts to impact others.'}
            </p>

          </div>

          {/* VISION */}
          {ministry.vision && (
            <div className="mb-10 rounded-2xl bg-[#f8f7f4] border-l-4 border-[#b4712d] p-6">

              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#b4712d] mb-2">
                Our Vision
              </p>

              <p className="text-lg text-[#2e3e87] font-semibold leading-relaxed">
                {ministry.vision}
              </p>

            </div>
          )}

          {/* TWO COLUMNS */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">

            {/* ACTIVITIES */}
            {activities.length > 0 && (
              <div>

                <h3 className="text-xl font-bold text-[#2e3e87] mb-4">
                  What We Do
                </h3>

                <div className="space-y-3">

                  {activities.map(
                    (activity: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          size={20}
                          className="text-[#b4712d] mt-0.5 flex-shrink-0"
                        />

                        <span className="text-gray-600">
                          {activity}
                        </span>
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

            {/* TEAMS */}
            {teams.length > 0 && (
              <div>

                <h3 className="text-xl font-bold text-[#2e3e87] mb-4">
                  Teams & Departments
                </h3>

                <div className="space-y-3">

                  {teams.map(
                    (team: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center gap-3"
                      >
                        <div className="w-9 h-9 rounded-lg bg-[#2e3e87] flex items-center justify-center">
                          <Users
                            size={17}
                            className="text-white"
                          />
                        </div>

                        <span className="text-gray-600">
                          {team}
                        </span>
                      </div>
                    )
                  )}

                </div>
              </div>
            )}

          </div>

          {/* LEADER */}
          {(ministry.leader_name || ministry.leader) && (
            <div className="border-t border-gray-200 pt-8 mb-10">

              <h3 className="text-xl font-bold text-[#2e3e87] mb-5">
                Ministry Leadership
              </h3>

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-[#2e3e87] flex-shrink-0">

                  {ministry.leader_image_url ? (
                    <img
                      src={ministry.leader_image_url}
                      alt={
                        ministry.leader_name ||
                        ministry.leader
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users
                        size={30}
                        className="text-white/60"
                      />
                    </div>
                  )}

                </div>

                <div>

                  <p className="text-lg font-bold text-[#2e3e87]">
                    {ministry.leader_name ||
                      ministry.leader}
                  </p>

                  <p className="text-sm text-[#b4712d] font-semibold">
                    {ministry.leader_title ||
                      ministry.leader ||
                      'Ministry Coordinator'}
                  </p>

                </div>

              </div>
            </div>
          )}

          {/* JOIN */}
          <div className="rounded-2xl bg-[#2e3e87] p-7 md:p-8 text-center">

            <h3 className="text-2xl font-bold text-white mb-2">
              Ready to Serve?
            </h3>

            <p className="text-white/70 mb-6">
              Use your gifts, grow with others and make an impact
              through {ministry.name}.
            </p>

            <button
              onClick={onJoin}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#b4712d] text-white font-bold hover:bg-[#965d23] transition"
            >
              Join This Ministry

              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
