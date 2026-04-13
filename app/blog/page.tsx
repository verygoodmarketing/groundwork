import type { Metadata } from "next";
import Link from "next/link";
import { allPosts } from "@/lib/blog/posts";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://groundworklocal.com";

export const metadata: Metadata = {
  title: "Blog — Tips & Guides for Local Service Businesses | Groundwork",
  description:
    "Practical advice for plumbers, electricians, cleaners, and contractors on getting found online, building a professional website, and growing your customer base.",
  openGraph: {
    title: "Blog — Groundwork",
    description:
      "Practical advice for local service businesses on websites, SEO, and getting more customers.",
    type: "website",
    url: `${APP_URL}/blog`,
    siteName: "Groundwork",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <header className="mb-12">
          <Link
            href="/"
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            ← Back to Groundwork
          </Link>
          <h1 className="mt-6 text-4xl font-bold text-gray-900 font-display">
            Blog
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Tips, guides, and insights for local service businesses.
          </p>
        </header>

        <div className="divide-y divide-gray-100">
          {allPosts.map((post) => (
            <article key={post.slug} className="py-8 first:pt-0">
              <Link href={`/blog/${post.slug}`} className="group block">
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
                <h2 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-brand-600 transition-colors font-display">
                  {post.title}
                </h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                  Read more →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
