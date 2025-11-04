"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArticlePost, CategoryType } from '@/types';
import { Plus, Edit, Trash2, Eye, LogOut, Save, X } from 'lucide-react';
import { ARTIST_CATEGORIES, DEFAULT_ARTICLE_IMAGE } from '@/lib/constants';

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<ArticlePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<ArticlePost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    category: 'Storytellers' as CategoryType,
    tags: '',
    published: false,
  });
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    verifyAuthAndFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verifyAuthAndFetch = async () => {
    try {
      const authResponse = await fetch('/api/auth/verify');
      if (!authResponse.ok) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/article?includeUnpublished=true');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch {
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const handleCreate = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      featured_image: DEFAULT_ARTICLE_IMAGE,
      category: 'Storytellers',
      tags: '',
      published: false,
    });
    setShowEditor(true);
  };

  const handleEdit = (post: ArticlePost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featured_image: post.featured_image,
      category: post.category,
      tags: post.tags.join(', '),
      published: post.published,
    });
    setShowEditor(true);
  };

  const handleImageUpload = async (file: File) => {
    setUploadingImage(true);
    try {
      const formDataUpload = new FormData();
      formDataUpload.append('image', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData({ ...formData, featured_image: data.url });
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to upload image');
      }
    } catch {
      alert('Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async () => {
    try {
      const tagsArray = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
      
      const postData = {
        ...formData,
        tags: tagsArray,
        author: editingPost?.author || {
          name: 'VOA Editorial Team',
          bio: '',
        },
      };

      const url = editingPost ? '/api/admin/article' : '/api/admin/article';
      const method = editingPost ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPost ? { ...postData, id: editingPost.id } : postData),
      });

      if (response.ok) {
        await verifyAuthAndFetch();
        setShowEditor(false);
        alert(editingPost ? 'Post updated successfully!' : 'Post created successfully!');
      } else {
        alert('Failed to save post');
      }
    } catch {
      alert('Error saving post');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/admin/article?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await verifyAuthAndFetch();
        alert('Post deleted successfully!');
      } else {
        alert('Failed to delete post');
      }
    } catch {
      alert('Error deleting post');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white border-b-4 border-black">
        <div className="container max-w-7xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <h1 className="font-mono text-2xl uppercase tracking-wider">VOA Admin Dashboard</h1>
            <div className="flex gap-4">
              <a
                href="/"
                target="_blank"
                className="flex items-center gap-2 bg-white text-black px-4 py-2 font-mono text-xs uppercase border-2 border-white hover:bg-black hover:text-white transition-all"
              >
                <Eye size={16} />
                View Site
              </a>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-black text-white px-4 py-2 font-mono text-xs uppercase border-2 border-white hover:bg-white hover:text-black transition-all"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-6 py-12">
        {/* Actions Bar */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-mono text-xl uppercase tracking-wider mb-2">Article Posts</h2>
            <p className="font-mono text-sm text-gray-600">Manage {posts.length} articles</p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-black text-white px-6 py-3 border-2 border-black font-mono text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
          >
            <Plus size={16} />
            New Post
          </button>
        </div>

        {/* Posts Table */}
        <div className="bg-white border-2 border-black overflow-hidden">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left font-mono text-xs uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right font-mono text-xs uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 font-mono text-sm">{post.title}</td>
                  <td className="px-6 py-4 font-mono text-xs uppercase">{post.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 font-mono text-xs uppercase ${post.published ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{new Date(post.published_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 border border-black hover:bg-black hover:text-white transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* Editor Modal */}
      {showEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center overflow-y-auto p-4 z-50">
          <div className="bg-white border-4 border-black w-full max-w-4xl my-8">
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
              <h2 className="font-mono text-lg uppercase tracking-wider">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h2>
              <button onClick={() => setShowEditor(false)} className="hover:text-gray-300">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              <div>
                <label className="block font-mono text-sm uppercase mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-sm uppercase mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-mono text-sm h-24"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-sm uppercase mb-2">Content (Markdown) *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-black font-mono text-sm h-64"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-sm uppercase mb-2">Featured Image</label>
                
                {/* Image upload option */}
                <div className="mb-4">
                  <label className="block font-mono text-xs uppercase mb-2 text-gray-600">Upload from Computer</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="block w-full text-sm text-gray-900 border-2 border-black cursor-pointer bg-gray-50 font-mono px-2 py-2"
                      disabled={uploadingImage}
                    />
                    {uploadingImage && (
                      <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500 font-mono">Max 5MB. Accepts JPEG, PNG, WebP, GIF</p>
                </div>

                {/* Manual URL option */}
                <div>
                  <label className="block font-mono text-xs uppercase mb-2 text-gray-600">Or Enter Image URL</label>
                  <input
                    type="text"
                    value={formData.featured_image}
                    onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Image preview */}
                {formData.featured_image && (
                  <div className="mt-4">
                    <p className="font-mono text-xs uppercase mb-2 text-gray-600">Preview</p>
                    <div className="border-2 border-black p-2 bg-gray-50">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={formData.featured_image} 
                        alt="Preview" 
                        className="max-h-48 w-auto object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_ARTICLE_IMAGE;
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-sm uppercase mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as CategoryType })}
                    className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                  >
                    {ARTIST_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-sm uppercase mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-black font-mono text-sm"
                    placeholder="tag1, tag2, tag3"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 border-2 border-black"
                />
                <label htmlFor="published" className="font-mono text-sm uppercase">
                  Publish Immediately
                </label>
              </div>
            </div>

            <div className="bg-gray-50 border-t-2 border-black px-6 py-4 flex justify-end gap-4">
              <button
                onClick={() => setShowEditor(false)}
                className="px-6 py-3 border-2 border-black font-mono text-sm uppercase hover:bg-gray-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-black text-white px-6 py-3 border-2 border-black font-mono text-sm uppercase hover:bg-white hover:text-black transition-all"
              >
                <Save size={16} />
                Save Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
