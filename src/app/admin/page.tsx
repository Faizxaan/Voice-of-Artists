"use client";

import { useState } from "react";
import {
  Users,
  FileText,
  Video,
  Newspaper,
  Settings,
  BarChart3,
  Search,
  Plus,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

interface DashboardStats {
  totalApplications: number;
  pendingApplications: number;
  totalEpisodes: number;
  totalArtists: number;
  totalPressItems: number;
  totalPromoVideos: number;
}

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in real implementation, this would come from your CMS/API
  const stats: DashboardStats = {
    totalApplications: 47,
    pendingApplications: 12,
    totalEpisodes: 23,
    totalArtists: 18,
    totalPressItems: 15,
    totalPromoVideos: 8,
  };

  const recentApplications = [
    {
      id: 1,
      artistName: "Luna Morrison",
      email: "luna@example.com",
      genre: "Indie Folk",
      status: "pending",
      submittedAt: "2024-02-20",
    },
    {
      id: 2,
      artistName: "Echo Chamber",
      email: "echo@example.com",
      genre: "Electronic",
      status: "reviewing",
      submittedAt: "2024-02-19",
    },
    {
      id: 3,
      artistName: "River Stone",
      email: "river@example.com",
      genre: "Alternative Rock",
      status: "approved",
      submittedAt: "2024-02-18",
    },
  ];

  const recentEpisodes = [
    {
      id: 1,
      title: "Finding Voice in Silence",
      artist: "Maya Chen",
      publishedAt: "2024-02-15",
      status: "published",
      views: "2.3K",
    },
    {
      id: 2,
      title: "Urban Stories",
      artist: "Marcus Williams",
      publishedAt: "2024-02-10",
      status: "published",
      views: "1.8K",
    },
    {
      id: 3,
      title: "Acoustic Dreams",
      artist: "Sofia Rodriguez",
      publishedAt: null,
      status: "draft",
      views: "0",
    },
  ];

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center gap-1 px-2 py-1 text-xs font-mono rounded";

    switch (status) {
      case "pending":
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "reviewing":
        return (
          <span className={`${baseClasses} bg-blue-100 text-blue-800`}>
            <Eye className="w-3 h-3" />
            Reviewing
          </span>
        );
      case "approved":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      case "published":
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <CheckCircle className="w-3 h-3" />
            Published
          </span>
        );
      case "draft":
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            <Edit className="w-3 h-3" />
            Draft
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800`}>
            {status}
          </span>
        );
    }
  };

  const StatCard = ({
    title,
    value,
    icon: Icon,
    color,
  }: {
    title: string;
    value: number;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }) => (
    <div className="bg-white p-6 border-2 border-black/20 hover:border-black transition-colors">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-mono font-bold text-black/70">{title}</h3>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="font-display text-3xl text-black">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-black">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl text-black">
              VOA Admin Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-black/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-black/20 font-mono text-sm
                           focus:border-black focus:outline-none"
                />
              </div>
              <button className="bg-black text-white px-4 py-2 font-mono text-sm hover:bg-black/90">
                <Plus className="w-4 h-4 inline mr-2" />
                New Content
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <aside className="w-64 bg-white border-2 border-black/20 p-6">
            <nav className="space-y-2">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "applications", label: "Applications", icon: Users },
                { id: "episodes", label: "Episodes", icon: Video },
                { id: "artists", label: "Artists", icon: Users },
                { id: "press", label: "Press", icon: Newspaper },
                { id: "promos", label: "Promo Videos", icon: Video },
                { id: "quotes", label: "Quotes", icon: FileText },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 font-mono text-sm text-left
                           transition-colors ${
                             activeTab === item.id
                               ? "bg-black text-white"
                               : "text-black hover:bg-black/10"
                           }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon={Users}
                    color="text-blue-600"
                  />
                  <StatCard
                    title="Pending Applications"
                    value={stats.pendingApplications}
                    icon={Clock}
                    color="text-yellow-600"
                  />
                  <StatCard
                    title="Published Episodes"
                    value={stats.totalEpisodes}
                    icon={Video}
                    color="text-green-600"
                  />
                  <StatCard
                    title="Featured Artists"
                    value={stats.totalArtists}
                    icon={Users}
                    color="text-purple-600"
                  />
                </div>

                {/* Recent Activity */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Recent Applications */}
                  <div className="bg-white border-2 border-black/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl text-black">
                        Recent Applications
                      </h2>
                      <button
                        onClick={() => setActiveTab("applications")}
                        className="font-mono text-sm text-black hover:text-black/70"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentApplications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between p-4 bg-gray-50 border border-black/10"
                        >
                          <div>
                            <h3 className="font-mono font-bold text-black">
                              {app.artistName}
                            </h3>
                            <p className="font-mono text-sm text-black/60">
                              {app.genre}
                            </p>
                            <p className="font-mono text-xs text-black/40">
                              {app.submittedAt}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(app.status)}
                            <button className="text-black hover:text-black/70">
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Episodes */}
                  <div className="bg-white border-2 border-black/20 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-display text-2xl text-black">
                        Recent Episodes
                      </h2>
                      <button
                        onClick={() => setActiveTab("episodes")}
                        className="font-mono text-sm text-black hover:text-black/70"
                      >
                        View All →
                      </button>
                    </div>
                    <div className="space-y-4">
                      {recentEpisodes.map((episode) => (
                        <div
                          key={episode.id}
                          className="flex items-center justify-between p-4 bg-gray-50 border border-black/10"
                        >
                          <div>
                            <h3 className="font-mono font-bold text-black">
                              {episode.title}
                            </h3>
                            <p className="font-mono text-sm text-black/60">
                              by {episode.artist}
                            </p>
                            <p className="font-mono text-xs text-black/40">
                              {episode.publishedAt || "Not published"} •{" "}
                              {episode.views} views
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {getStatusBadge(episode.status)}
                            <button className="text-black hover:text-black/70">
                              <Edit className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "applications" && (
              <div className="bg-white border-2 border-black/20 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-2xl text-black">
                    Artist Applications
                  </h2>
                  <div className="flex items-center gap-4">
                    <select className="border-2 border-black/20 px-3 py-2 font-mono text-sm">
                      <option>All Status</option>
                      <option>Pending</option>
                      <option>Reviewing</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                    <button className="flex items-center gap-2 bg-black text-white px-4 py-2 font-mono text-sm">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                </div>
                <div className="space-y-3">
                  {recentApplications.map((app) => (
                    <div
                      key={app.id}
                      className="flex items-center justify-between p-4 border border-black/20 hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4">
                          <h3 className="font-mono font-bold text-black">
                            {app.artistName}
                          </h3>
                          {getStatusBadge(app.status)}
                        </div>
                        <p className="font-mono text-sm text-black/60 mt-1">
                          {app.email} • {app.genre}
                        </p>
                        <p className="font-mono text-xs text-black/40 mt-1">
                          Submitted: {app.submittedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-black hover:text-black/70 hover:bg-gray-100">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50">
                          <XCircle className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab !== "overview" && activeTab !== "applications" && (
              <div className="bg-white border-2 border-black/20 p-6">
                <h2 className="font-display text-2xl text-black mb-4">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}{" "}
                  Management
                </h2>
                <p className="font-mono text-black/70">
                  This section would contain the management interface for{" "}
                  {activeTab}. In a full implementation, this would connect to
                  your Sanity CMS.
                </p>
                <div className="mt-6 p-4 bg-black/5 border border-black/20">
                  <p className="font-mono text-sm text-black/60">
                    <strong>Note:</strong> This is a demo admin interface. To
                    fully implement this dashboard:
                  </p>
                  <ul className="font-mono text-sm text-black/60 mt-2 space-y-1 list-disc list-inside">
                    <li>Connect to Sanity CMS for real data management</li>
                    <li>Add authentication and authorization</li>
                    <li>Implement CRUD operations for each content type</li>
                    <li>Add file upload handling for media content</li>
                    <li>Include real-time notifications and updates</li>
                  </ul>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
