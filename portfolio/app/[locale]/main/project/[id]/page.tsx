"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectsStore } from "../../store/use-projects";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

const supportedLocales = ["en", "ru", "az"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const locale = (params?.locale as SupportedLocale) || "en";
  const { projects, getProjectById } = useProjectsStore();
  const project = projects[0];
  const t = useTranslations();

  useEffect(() => {
    getProjectById(id);
  }, [id, getProjectById]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-sm uppercase tracking-widest text-muted-foreground animate-pulse"
        >
          Loading Project...
        </motion.p>
      </div>
    );
  }

  // Helpers to get localized content safely
  const getContent = (field: any) => field?.[0]?.[locale] || field?.[locale] || "";

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto px-6 pt-8 mt-50">
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          {t('dashboard.projects.backToProjects')}
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {getContent(project.titles) || t('dashboard.projects.untitledProject')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light italic">
              {getContent(project.role)}
            </p>
          </div>

          <p className="text-lg leading-relaxed max-w-2xl text-foreground/80">
            {getContent(project.description)}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-4">
            {project.techStack?.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium border border-border rounded-full bg-secondary/30 hover:bg-secondary transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.header>

        {/* Video Showcase */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {project.video ? (
            <div className="col-span-2 flex flex-col items-center">
              <video
                src={project.video}
                controls
                className="w-full max-w-3xl rounded-2xl border border-border bg-secondary/20"
                poster={project.images?.[0]?.src}
              />
            </div>
          ) : project.images && project.images.length > 0 ? (
            project.images.map((img, i) => (
              <div 
                key={i} 
                className={`group relative overflow-hidden rounded-2xl border border-border bg-secondary/20 ${
                  i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-square"
                }`}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer" 
                />
              </div>
            ))
          ) : (
            <div className="col-span-2 py-20 text-center border border-dashed rounded-2xl text-muted-foreground">
              {t('dashboard.projects.noImages')}
            </div>
          )}
        </motion.section>

        {/* Footer Meta */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between gap-6 text-[12px] uppercase tracking-widest text-muted-foreground"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{t('dashboard.projects.created')} {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : t('dashboard.projects.notAvailable')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} />
              <span>{t('dashboard.projects.projectId')} {id.slice(0, 8)}</span>
            </div>
            {/* Github & LinkedIn URLs */}
            {project.githubURL && (
              <a href={project.githubURL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.61-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                {t('dashboard.projects.github')}
              </a>
            )}
            {project.linkedIn && (
              <a href={project.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.156 1.459-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.601 2.001 3.601 4.601v5.595z"/></svg>
                {t('dashboard.projects.linkedin')}
              </a>
            )}
          </div>
          <div>
            {t('dashboard.projects.lastUpdated')} {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : t('dashboard.projects.dash')}
          </div>
        </motion.footer>
      </div>
    </main>
  );
}