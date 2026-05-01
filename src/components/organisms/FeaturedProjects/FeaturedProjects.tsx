"use client";

import { featuredProjects } from "@/data/featured-projects";
import type { GitHubRepo, Locale } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

interface FeaturedProjectsProps {
  locale: Locale;
  githubRepos?: GitHubRepo[];
  dictionary: {
    workAnchor: string;
    workTitle: string;
  };
}

type DisplayProject = {
  id: string;
  name: string;
  description: string;
  homepage?: string;
  topics: string[];
  year: string;
  previewImage?: string;
};

const FIXED_NAMES = new Set(featuredProjects.map((p) => p.id.toLowerCase()));

function normalizeRepos(githubRepos: GitHubRepo[], locale: Locale): DisplayProject[] {
  const fixed: DisplayProject[] = featuredProjects.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description[locale],
    homepage: p.homepage,
    topics: p.topics,
    year: p.year,
    previewImage: p.previewImage,
  }));

  const fromGitHub: DisplayProject[] = githubRepos
    .filter((r) => !FIXED_NAMES.has(r.name.toLowerCase().replace(/[.-]/g, "")))
    .map((r) => ({
      id: String(r.id),
      name: r.name,
      description: r.description ?? "",
      homepage: r.homepage ?? r.html_url,
      topics: r.topics,
      year: new Date(r.updated_at).getFullYear().toString(),
    }));

  return [...fixed, ...fromGitHub];
}

export function FeaturedProjects({ locale, githubRepos = [], dictionary }: FeaturedProjectsProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewTop, setPreviewTop] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const allProjects = normalizeRepos(githubRepos, locale);
  const hoveredProject = hoveredId ? allProjects.find((p) => p.id === hoveredId) : null;

  return (
    <section id="work" className="home-section px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Anchor label */}
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "#71717a",
          }}
          className="inline-flex items-center gap-2 pb-8"
        >
          <span style={{ color: "#a3e635", fontWeight: 500 }}>//</span>
          {dictionary.workAnchor}
        </div>

        {/* Heading */}
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "#fafafa",
          }}
          className="mb-12"
        >
          {dictionary.workTitle}
        </h2>

        {/* Work list */}
        <div ref={listRef} className="relative">
          {/* Floating preview */}
          <AnimatePresence>
            {hoveredProject?.previewImage && (
              <motion.div
                key={hoveredProject.id}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute right-0 rounded-xl overflow-hidden pointer-events-none z-10 hidden md:block"
                style={{
                  top: previewTop,
                  width: 360,
                  aspectRatio: "16/10",
                  background: "#18181b",
                  border: "1px solid #27272a",
                  boxShadow:
                    "0 30px 60px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(163,230,53,0.08)",
                }}
              >
                <Image
                  src={hoveredProject.previewImage}
                  alt={hoveredProject.name}
                  fill
                  className="object-cover object-top"
                  sizes="360px"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Rows */}
          {allProjects.map((project, index) => {
            const isHovered = hoveredId === project.id;
            const isLast = index === allProjects.length - 1;

            return (
              <div
                key={project.id}
                onClick={() => {
                  if (project.homepage) {
                    window.open(project.homepage, "_blank", "noopener,noreferrer");
                  }
                }}
                onMouseEnter={(e) => {
                  setHoveredId(project.id);
                  if (listRef.current) {
                    const rowRect = (
                      e.currentTarget as HTMLDivElement
                    ).getBoundingClientRect();
                    const listRect = listRef.current.getBoundingClientRect();
                    setPreviewTop(rowRect.top - listRect.top);
                  }
                }}
                onMouseLeave={() => setHoveredId(null)}
                className="work-row relative grid items-center gap-4 transition-all duration-300 cursor-pointer"
                style={{
                  borderTop: "1px solid #18181b",
                  ...(isLast ? { borderBottom: "1px solid #18181b" } : {}),
                  padding: isHovered ? "28px 16px" : "28px 0",
                  background: isHovered
                    ? "rgba(39,39,42,0.2)"
                    : "transparent",
                  transition:
                    "padding 300ms ease, background 200ms ease",
                }}
              >
                {/* Index */}
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "#3f3f46",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: "28px",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                    color: isHovered ? "#a3e635" : "#fafafa",
                    transition: "color 200ms ease",
                  }}
                >
                  {project.name}
                </div>

                {/* Description — hidden on mobile */}
                <div
                  className="hidden md:block"
                  style={{
                    fontSize: "13px",
                    color: "#a1a1aa",
                    lineHeight: 1.55,
                  }}
                >
                  {project.description}
                </div>

                {/* Stack tags — hidden on mobile */}
                <div className="hidden md:flex flex-wrap gap-1.5">
                  {project.topics.map((topic) => (
                    <span
                      key={topic}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        color: "#a1a1aa",
                        border: "1px solid #27272a",
                        background: "rgba(39,39,42,0.5)",
                        padding: "2px 8px",
                        textTransform: "lowercase",
                        borderRadius: "4px",
                      }}
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Year — hidden on mobile */}
                <div
                  className="hidden md:block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    color: "#71717a",
                    textAlign: "right",
                  }}
                >
                  {project.year}
                </div>

                {/* Arrow — only if homepage exists */}
                {project.homepage && (
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "32px",
                      color: isHovered ? "#a3e635" : "#3f3f46",
                      transform: isHovered
                        ? "translate(4px, -4px)"
                        : "translate(0, 0)",
                      transition: "color 200ms ease, transform 200ms ease",
                    }}
                  >
                    <ArrowUpRight size={20} strokeWidth={1.6} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
