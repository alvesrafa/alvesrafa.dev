"use client";

import { featuredProjects } from "@/data/featured-projects";
import { cn } from "@/lib/utils/cn";
import type { Locale } from "@/types";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}

interface FeaturedProjectsProps {
  repos: Repository[];
  locale: Locale;
  dictionary: {
    title: string;
    description: string;
    viewProject: string;
    viewCode: string;
    viewAll: string;
    noProjects: string;
  };
}

function ProjectRow({
  repo,
  index,
  dictionary,
}: {
  repo: Repository;
  index: number;
  dictionary: { viewProject: string; viewCode: string };
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group grid grid-cols-1 lg:grid-cols-[64px_1fr_auto] gap-4 lg:gap-8 items-start py-8 border-t border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50/40 dark:hover:bg-neutral-900/20 transition-colors duration-200 px-2 -mx-2 rounded-lg"
    >
      {/* Index */}
      <div className="font-mono text-xs text-neutral-300 dark:text-neutral-600 tracking-widest pt-1 select-none">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-50 mb-2 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
          {repo.name}
        </h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed max-w-2xl">
          {repo.description || "No description available"}
        </p>
        <div className="flex flex-wrap gap-2">
          {repo.language && <span className="tech-tag">{repo.language}</span>}
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="tech-tag">
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex items-center gap-4 lg:flex-col lg:items-end lg:gap-3 pt-0.5 shrink-0">
        {repo.homepage && (
          <Link
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {dictionary.viewProject}
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}
        {repo.html_url && (
          <Link
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-50 transition-colors duration-200"
          >
            <Github className="w-3.5 h-3.5" />
            Code
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export function FeaturedProjects({
  repos,
  locale,
  dictionary,
}: FeaturedProjectsProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  const featuredAsRepos: Repository[] = featuredProjects.map((p, i) => ({
    id: -(i + 1),
    name: p.name,
    description: p.description[locale],
    html_url: "",
    homepage: p.homepage,
    language: p.language,
    stargazers_count: 0,
    forks_count: 0,
    topics: p.topics,
  }));

  const allRepos = [...featuredAsRepos, ...repos];

  return (
    <section className="section-padding border-t border-neutral-200 dark:border-neutral-800">
      <div className="container-custom">
        {/* Section header */}
        <div ref={headerRef} className="flex items-end justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
          >
            <p className="label-mono mb-2">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">
              {dictionary.title}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href={`/${locale}/projects`}
              className={cn(
                "hidden sm:inline-flex items-center gap-1.5",
                "font-mono text-xs font-medium uppercase tracking-wide",
                "text-neutral-500 dark:text-neutral-400",
                "hover:text-primary-500 dark:hover:text-primary-400",
                "transition-colors duration-200"
              )}
            >
              {dictionary.viewAll}
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        {/* Projects list */}
        {allRepos.length > 0 ? (
          <div>
            {allRepos.map((repo, index) => (
              <ProjectRow
                key={repo.id}
                repo={repo}
                index={index}
                dictionary={{
                  viewProject: dictionary.viewProject,
                  viewCode: dictionary.viewCode,
                }}
              />
            ))}
            <div className="border-t border-neutral-200 dark:border-neutral-800" />
          </div>
        ) : (
          <p className="py-16 text-center font-mono text-sm text-neutral-400 dark:text-neutral-500">
            {dictionary.noProjects}
          </p>
        )}

        {/* Mobile: view all */}
        <div className="mt-8 sm:hidden">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
          >
            {dictionary.viewAll}
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}
