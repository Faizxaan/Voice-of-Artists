import React from 'react';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b-2 border-black bg-white">
        <div className="container mx-auto px-6 py-4">
          <h1 className="font-mono text-2xl uppercase tracking-wider text-black">
            VOA Admin Dashboard
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="border-2 border-black bg-white p-8 mb-12">
            <h2 className="font-mono text-xl uppercase tracking-wider text-black mb-4">
              Welcome to Voice of Artist
            </h2>
            <p className="font-mono text-sm leading-relaxed text-gray-700 mb-6">
              This is the admin dashboard for managing VOA content, applications, and community features.
            </p>
            <div className="bg-black text-white p-4 inline-block">
              <span className="font-mono text-xs uppercase tracking-wider">
                #ART ABOVE CHART
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="border border-black p-6 hover:bg-gray-50 transition-colors">
              <h3 className="font-mono text-lg uppercase tracking-wide text-black mb-3">
                Manage Episodes
              </h3>
              <p className="font-mono text-sm text-gray-600 mb-4">
                Create, edit, and publish artist episodes and stories.
              </p>
              <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
                Manage Episodes
              </button>
            </div>

            <div className="border border-black p-6 hover:bg-gray-50 transition-colors">
              <h3 className="font-mono text-lg uppercase tracking-wide text-black mb-3">
                Artist Applications
              </h3>
              <p className="font-mono text-sm text-gray-600 mb-4">
                Review and process new artist applications.
              </p>
              <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
                View Applications
              </button>
            </div>

            <div className="border border-black p-6 hover:bg-gray-50 transition-colors">
              <h3 className="font-mono text-lg uppercase tracking-wide text-black mb-3">
                Community Management
              </h3>
              <p className="font-mono text-sm text-gray-600 mb-4">
                Manage artists, advisors, and allies in the community.
              </p>
              <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
                Manage Community
              </button>
            </div>

            <div className="border border-black p-6 hover:bg-gray-50 transition-colors">
              <h3 className="font-mono text-lg uppercase tracking-wide text-black mb-3">
                Content Library
              </h3>
              <p className="font-mono text-sm text-gray-600 mb-4">
                Organize quotes, stories, and promotional materials.
              </p>
              <button className="bg-black text-white px-4 py-2 font-mono text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors">
                View Library
              </button>
            </div>
          </div>

          {/* Application Form Placeholder */}
          <div className="bg-black text-white p-8">
            <h3 className="font-mono text-xl uppercase tracking-wider mb-6">
              Artist Application Portal
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-mono text-sm uppercase tracking-wider text-gray-300 mb-3">
                  Requirements:
                </h4>
                <ul className="space-y-2 text-xs font-mono">
                  <li>• Passion for Art</li>
                  <li>• Desire for Positive Change</li>
                  <li>• Commitment to Professionalism</li>
                  <li>• Respect for others' Voices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-mono text-sm uppercase tracking-wider text-gray-300 mb-3">
                  Application Process:
                </h4>
                <ul className="space-y-2 text-xs font-mono">
                  <li>• Submit artist portfolio</li>
                  <li>• Record podcast-style video</li>
                  <li>• Write creative journey blog</li>
                  <li>• Join VOA community</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 text-center">
              <div className="bg-white text-black px-6 py-3 inline-block">
                <span className="font-mono text-sm uppercase tracking-wider">
                  Platform by Artists of Artists for Artists
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-white mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-wider text-gray-600">
              Voice of Artist Admin Dashboard
            </p>
            <div className="mt-4 bg-black text-white px-4 py-2 inline-block">
              <span className="font-mono text-xs uppercase tracking-wider">
                #VOICEOFARTIST
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
