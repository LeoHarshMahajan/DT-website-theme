'use client';

import { useState } from 'react';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  postsPerPage: number;
  enableComments: boolean;
  enableNewsletter: boolean;
  contactEmail: string;
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Digital Triangle',
    siteDescription: 'A modern AI/SaaS marketing platform',
    siteUrl: 'https://digital-triangle.com',
    postsPerPage: 10,
    enableComments: true,
    enableNewsletter: true,
    contactEmail: 'contact@digital-triangle.com',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save settings to API
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage({ type: 'success', message: 'Settings saved successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    }, 500);
  };

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="p-4 md:p-6" style={{ backgroundColor: 'var(--bg-0)' }}>
      <Reveal direction="down">
        <h1 className="h-sm md:h-md mb-6" style={{ color: 'var(--fg-0)' }}>Settings</h1>
      </Reveal>

      {/* Success/Error Messages */}
      {saveMessage && (
        <Reveal direction="down">
          <div
            className="mb-6 p-4 rounded-lg border text-sm"
            style={{
              backgroundColor: saveMessage.type === 'success' ? '#f0fdf420' : '#fef2f220',
              borderColor: saveMessage.type === 'success' ? '#86efac40' : '#fca5a540',
              color: saveMessage.type === 'success' ? '#166534' : '#991b1b',
            }}
          >
            {saveMessage.message}
          </div>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.1}>
        <div className="max-w-3xl mx-auto space-y-6 md:space-y-8">
          {/* General Settings */}
          <section className="border rounded-lg p-4 md:p-6" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-1)' }}>
            <h2 className="h-sm md:h-md mb-6" style={{ color: 'var(--fg-0)' }}>General</h2>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Site Name</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleChange('siteName', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Site Description</label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Site URL</label>
                <input
                  type="url"
                  value={settings.siteUrl}
                  onChange={(e) => handleChange('siteUrl', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Contact Email</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="w-full px-3 md:px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>
            </div>
          </section>

          {/* Blog Settings */}
          <section className="border rounded-lg p-4 md:p-6" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-1)' }}>
            <h2 className="h-sm md:h-md mb-6" style={{ color: 'var(--fg-0)' }}>Blog</h2>

            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2" style={{ color: 'var(--fg-0)' }}>Posts Per Page</label>
                <input
                  type="number"
                  value={settings.postsPerPage}
                  onChange={(e) => handleChange('postsPerPage', parseInt(e.target.value))}
                  min="1"
                  max="100"
                  className="w-full px-3 md:px-4 py-2 rounded-lg border text-sm focus:outline-none transition-colors"
                  style={{
                    borderColor: 'var(--line)',
                    backgroundColor: 'var(--bg-2)',
                    color: 'var(--fg-0)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--brand-blue)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                />
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 p-4 rounded-lg border" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-2)' }}>
                <div>
                  <p className="font-medium mb-1 text-sm" style={{ color: 'var(--fg-0)' }}>Enable Comments</p>
                  <p className="text-xs md:text-sm" style={{ color: 'var(--fg-2)' }}>Allow readers to comment on blog posts</p>
                </div>
                <button
                  onClick={() => handleChange('enableComments', !settings.enableComments)}
                  className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
                  style={{
                    backgroundColor: settings.enableComments ? 'var(--brand-blue)' : 'var(--bg-3)',
                  }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.enableComments ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Feature Flags */}
          <section className="border rounded-lg p-4 md:p-6" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-1)' }}>
            <h2 className="h-sm md:h-md mb-6" style={{ color: 'var(--fg-0)' }}>Features</h2>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 p-4 rounded-lg border" style={{ borderColor: 'var(--line)', backgroundColor: 'var(--bg-2)' }}>
                <div>
                  <p className="font-medium mb-1 text-sm" style={{ color: 'var(--fg-0)' }}>Newsletter Signup</p>
                  <p className="text-xs md:text-sm" style={{ color: 'var(--fg-2)' }}>Display newsletter subscription form</p>
                </div>
                <button
                  onClick={() => handleChange('enableNewsletter', !settings.enableNewsletter)}
                  className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors"
                  style={{
                    backgroundColor: settings.enableNewsletter ? 'var(--brand-blue)' : 'var(--bg-3)',
                  }}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      settings.enableNewsletter ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="border rounded-lg p-4 md:p-6" style={{ borderColor: '#ef4444', backgroundColor: '#fef2f2' }}>
            <h2 className="h-sm md:h-md mb-4" style={{ color: '#991b1b' }}>Danger Zone</h2>

            <div className="space-y-3 md:space-y-4">
              <button
                className="w-full px-4 py-2 md:py-3 rounded-lg border font-medium text-sm transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: '#fca5a5',
                  color: '#dc2626',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Icon name="trash" size="sm" />
                Delete All Posts
              </button>

              <button
                className="w-full px-4 py-2 md:py-3 rounded-lg border font-medium text-sm transition-colors flex items-center justify-center gap-2"
                style={{
                  borderColor: '#fca5a5',
                  color: '#dc2626',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <Icon name="alert-circle" size="sm" />
                Reset All Settings
              </button>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 md:pt-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn btn-primary flex items-center justify-center gap-2 disabled:opacity-50 text-sm w-full sm:w-auto"
            >
              <Icon name="save" size="sm" />
              {isSaving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
