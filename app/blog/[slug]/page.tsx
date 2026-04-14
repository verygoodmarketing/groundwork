import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allPosts, getPostBySlug, type BlogPostSection } from "@/lib/blog/posts";
import { LeadMagnetOptIn } from "@/components/landing/LeadMagnetOptIn";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const APP_URL =
    process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      url: `${APP_URL}/blog/${post.slug}`,
      siteName: "Groundwork",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

function RenderSection({
  section,
  index,
}: {
  section: BlogPostSection;
  index: number;
}) {
  switch (section.type) {
    case "heading2":
      return (
        <h2
          key={index}
          className="text-2xl font-bold text-gray-900 font-display mt-10 mb-4"
        >
          {section.text}
        </h2>
      );

    case "paragraph":
      return (
        <p key={index} className="text-gray-700 leading-relaxed mb-4">
          {section.text}
        </p>
      );

    case "list":
      return (
        <ul key={index} className="my-4 list-disc pl-6 space-y-3">
          {section.items?.map((item, i) => {
            const itemKey = `list-${index}-${i}`;
            if (typeof item === "string") {
              return (
                <li key={itemKey} className="text-gray-700 leading-relaxed">
                  {item}
                </li>
              );
            }
            return (
              <li key={itemKey} className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900 font-semibold">
                  {item.bold}
                </strong>
                {item.rest}
              </li>
            );
          })}
        </ul>
      );

    case "orderedList":
      return (
        <ol key={index} className="my-4 list-decimal pl-6 space-y-3">
          {section.items?.map((item, i) => {
            const itemKey = `olist-${index}-${i}`;
            if (typeof item === "string") {
              return (
                <li key={itemKey} className="text-gray-700 leading-relaxed">
                  {item}
                </li>
              );
            }
            return (
              <li key={itemKey} className="text-gray-700 leading-relaxed">
                <strong className="text-gray-900 font-semibold">
                  {item.bold}
                </strong>
                {item.rest}
              </li>
            );
          })}
        </ol>
      );

    case "divider":
      return <hr key={index} className="border-gray-200 my-8" />;

    case "cta":
      return (
        <p key={index} className="my-4">
          <Link
            href={section.href ?? "/"}
            className="text-brand-600 font-semibold hover:text-brand-700 transition-colors underline"
          >
            {section.linkText}
          </Link>
        </p>
      );

    default:
      return null;
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Build rendered sections, injecting the lead magnet opt-in after the 3rd paragraph
  let paragraphCount = 0;
  const renderedSections: React.ReactNode[] = [];

  for (let i = 0; i < post.sections.length; i++) {
    const section = post.sections[i];
    const sectionKey = section.id ?? `${section.type}-${section.text?.slice(0, 20) ?? i}`;

    renderedSections.push(
      <RenderSection key={sectionKey} section={section} index={i} />
    );

    if (section.type === "paragraph") {
      paragraphCount += 1;
      if (paragraphCount === 3) {
        renderedSections.push(
          <LeadMagnetOptIn key="lead-magnet-optin" sourcePage={`/blog/${slug}`} />
        );
      }
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <nav className="mb-10">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            ← Back to Blog
          </Link>
        </nav>

        <article>
          <header className="mb-10">
            <time
              dateTime={post.publishedAt}
              className="text-sm text-gray-500"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-3 text-4xl font-bold text-gray-900 font-display leading-tight">
              {post.title}
            </h1>
          </header>

          <div className="text-base">
            {renderedSections}
          </div>
        </article>

        <footer className="mt-16 pt-8 border-t border-gray-100">
          <Link
            href="/blog"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            ← More articles
          </Link>
        </footer>
      </div>
    </main>
  );
}
