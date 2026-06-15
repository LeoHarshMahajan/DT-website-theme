'use client';

import React from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { Icon, IconName } from '@/components/ui/Icon';

interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

interface FeaturesProps {
  title: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function Features({ title, description, features, columns = 3 }: FeaturesProps) {
  return (
    <section style={{ padding: 'clamp(48px, 8vw, 96px) 0' }}>
      <div className="shell">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '56px' }}>
          <Reveal direction="up">
            <h2 style={{
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--fg-0)',
              marginBottom: '16px',
            }}>{title}</h2>
          </Reveal>
          {description && (
            <Reveal direction="up" delay={0.1}>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--fg-1)' }}>{description}</p>
            </Reveal>
          )}
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: '24px',
        }} className="features-grid">
          {features.map((feature, index) => (
            <Reveal key={feature.title} direction="up" delay={0.06 * index}>
              <div
                style={{
                  backgroundColor: 'var(--bg-2)',
                  border: '1px solid var(--line)',
                  borderRadius: '16px',
                  padding: '28px',
                  transition: 'all 0.25s ease',
                  height: '100%',
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(75,107,255,0.4)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(75,107,255,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(75, 107, 255, 0.12)',
                  border: '1px solid rgba(75, 107, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  flexShrink: 0,
                }}>
                  <Icon name={feature.icon} size="md" style={{ color: 'var(--brand-blue)' }} />
                </div>

                {/* Title */}
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: 'var(--fg-0)',
                  marginBottom: '10px',
                  lineHeight: 1.3,
                }}>{feature.title}</h3>

                {/* Description */}
                <p style={{
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: 'var(--fg-2)',
                  margin: 0,
                }}>{feature.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .features-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 769px) and (max-width: 1024px) { .features-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}

export function PerformanceMarketingFeatures() {
  return (
    <Features
      title="Performance Marketing, Powered by AI"
      description="Everything you need to optimize campaigns and maximize growth."
      features={[
        { icon: 'target', title: 'AI-Powered Optimization', description: 'Real-time bidding and budget allocation using machine learning to maximize ROI across every channel.' },
        { icon: 'brain', title: 'Audience Intelligence', description: 'ML-based audience insights and behavioral targeting for precision marketing that converts.' },
        { icon: 'chart', title: 'Multi-Touch Attribution', description: 'Understand the complete customer journey with advanced attribution modeling and reporting.' },
      ]}
      columns={3}
    />
  );
}

export function ContentSystemsFeatures() {
  return (
    <Features
      title="Content Systems That Scale"
      description="Create, optimize, and distribute content at unprecedented speed."
      features={[
        { icon: 'sparkles', title: 'AI Content Generation', description: 'Generate high-quality content at scale with AI-powered writing assistants trained on your brand voice.' },
        { icon: 'target', title: 'SEO Optimization', description: 'Automatically optimize every piece of content for search with real-time keyword recommendations.' },
        { icon: 'layers', title: 'Content Calendar', description: 'Plan, schedule, and publish content across all your channels from one unified workspace.' },
      ]}
      columns={3}
    />
  );
}

export function AnalyticsFeatures() {
  return (
    <Features
      title="Analytics & Intelligence"
      description="Transform data into actionable insights with real-time analytics."
      features={[
        { icon: 'chart', title: 'Custom Dashboards', description: 'Build real-time dashboards with the KPIs that matter most to your business goals.' },
        { icon: 'brain', title: 'Predictive Analytics', description: 'Forecast trends and customer behavior with advanced predictive models and scenario planning.' },
        { icon: 'node', title: 'Data Integration', description: 'Connect all your tools and data sources for a single unified view of business performance.' },
      ]}
      columns={3}
    />
  );
}
