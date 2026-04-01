import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, getAllSlugs } from "@/lib/projects";
import { ProjectDetailClient } from "./ProjectDetailClient";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link
          href="/#projects"
          className="
            inline-flex items-center gap-2 font-mono text-sm text-[var(--color-muted)]
            hover:text-[var(--color-cyan)] transition-colors duration-200 mb-12 group
          "
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
          Retour aux projets
        </Link>

        <ProjectDetailClient project={project} />
      </div>
    </div>
  );
}
