"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProjectsStore } from "../../store/use-projects";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag } from "lucide-react";

const supportedLocales = ["en", "ru", "az"] as const;
type SupportedLocale = (typeof supportedLocales)[number];

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const locale = (params?.locale as SupportedLocale) || "en";
  const { project, getProjectById } = useProjectsStore();

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
          Back to Projects
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
              {getContent(project.titles) || "Untitled Project"}
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

        {/* Image Showcase */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {project.images && project.images.length > 0 ? (
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
              No project images available
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
              <span>Created: {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : "N/A"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={14} />
              <span>Project ID: {id.slice(0, 8)}</span>
            </div>
          </div>
          <div>
            Last Updated: {project.updatedAt ? new Date(project.updatedAt).toLocaleDateString() : "-"}
          </div>
        </motion.footer>
      </div>
    </main>
  );
}