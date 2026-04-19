import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import { TRPCProvider } from '@/lib/trpc/provider'
import { Analytics } from '@vercel/analytics/react'

const jakartaSans = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
	variable: '--font-display',
	display: 'swap',
})

const inter = Inter({
	subsets: ['latin'],
	weight: ['400', '500', '600'],
	variable: '--font-body',
	display: 'swap',
})

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://groundworklocal.com'

export const metadata: Metadata = {
	metadataBase: new URL(APP_URL),
	title: {
		default: 'GroundWork — Show up first. Win more work.',
		template: '%s | GroundWork',
	},
	description:
		'Show up first. Win more work. GroundWork helps plumbers, electricians, cleaners, and contractors get a professional website live in under an hour — with built-in local SEO and lead capture. Free to try.',
	keywords: [
		'website builder for small businesses',
		'local SEO for service businesses',
		'website for plumbers',
		'website for electricians',
		'marketing tools for small service businesses',
		'website builder for contractors',
		'local business website',
		'service business marketing',
	],
	icons: {
		icon: [
			{ url: '/brand/logo-icon-32.png', sizes: '32x32' },
			{ url: '/brand/logo-icon-192.png', sizes: '192x192' },
		],
		apple: '/brand/logo-icon-192.png',
	},
	openGraph: {
		title: 'GroundWork — Show up first. Win more work.',
		description:
			'Show up first. Win more work. The marketing platform for local service businesses. Website builder, local SEO, and lead capture — in one simple tool.',
		type: 'website',
		url: APP_URL,
		siteName: 'GroundWork',
		locale: 'en_US',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'GroundWork — Show up first. Win more work.',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'GroundWork — Show up first. Win more work.',
		description:
			'Show up first. Win more work. The marketing platform for local service businesses. Website builder, local SEO, and lead capture — in one simple tool.',
		images: ['/og-image.png'],
	},
	robots: {
		index: true,
		follow: true,
	},
}

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'GroundWork',
	description: 'All-in-one marketing platform for local service businesses',
	applicationCategory: 'BusinessApplication',
	operatingSystem: 'Web',
	url: APP_URL,
	offers: {
		'@type': 'Offer',
		price: '0',
		priceCurrency: 'USD',
		description: 'Free to try',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang="en"
			className={`${jakartaSans.variable} ${inter.variable} h-full antialiased`}
		>
			<head>
				<script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
			</head>
			<body
				className="min-h-full flex flex-col"
				suppressHydrationWarning
			>
				<TRPCProvider>{children}</TRPCProvider>
				<Analytics />
			</body>
		</html>
	)
}
