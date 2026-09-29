import type en from '$lib/messages/en.json';
import type { Component } from 'svelte';

/** Mensajes i18n tipados desde el JSON canónico (en). `es` debe mantener la misma forma. */
export type Messages = typeof en;

export type Locale = 'es' | 'en';

/** Iconos sociales soportados (unión cerrada, no string abierto). */
export const socialIconNames = ['instagram', 'facebook', 'x', 'github', 'dribbble'] as const;
export type SocialIconName = (typeof socialIconNames)[number];

export interface SocialLink {
	label: string;
	href: string;
	icon: SocialIconName;
}

export interface Profile {
	name: string;
	firstName: string;
	lastName: string;
	role: string;
	fullNameForMeta: string;
	handle: string;
	location: string;
	email: string;
	whatsapp: string;
	siteUrl: string;
	socials: SocialLink[];
}

export interface NavLink {
	label: string;
	href: string;
}

export interface NavMessages {
	aria: string;
	menuOpen: string;
	menuClose: string;
	localeLabel: string;
	links: NavLink[];
	ctaWhatsapp: string;
	whatsappMsg: string;
}

export interface HeroStat {
	label: string;
	value: number;
	prefix: string;
	suffix: string;
}

export interface HeroMessages {
	badge: string;
	line1: string;
	line2a: string;
	line2b: string;
	sub: string;
	subPrice: string;
	subIn: string;
	cta1: string;
	cta2: string;
	location: string;
	scroll: string;
	stats: HeroStat[];
}

export interface Plan {
	name: string;
	price: number;
	tagline: string;
	features: string[];
	featured: boolean;
}

export interface PlansMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	featured: string;
	per: string;
	note: string;
	cta: string;
	ctaMsg: string;
	items: Plan[];
}

export interface CookieMessages {
	title: string;
	text: string;
	accept: string;
	decline: string;
}

export interface MarqueeMessages {
	a: string[];
	b: string[];
}

export interface ProjectPage {
	title: string;
	text: string;
}

export interface PagespeedScore {
	label: string;
	value: string;
}

export interface PagespeedDevice {
	title: string;
	image: string;
	imageAlt: string;
	scores: PagespeedScore[];
}

export interface ProjectPagespeed {
	label: string;
	title: string;
	url: string;
	note: string;
	desktop: PagespeedDevice;
	mobile: PagespeedDevice;
}

export interface ProjectMeasurement {
	label: string;
	title: string;
	score: string;
	level: string;
	image: string;
	imageAlt: string;
	intro: string;
	whyTitle: string;
	whyText: string;
	readyTitle: string;
	readyItems: string[];
	outro: string;
	sourceLabel: string;
	sourceUrl: string;
	pagespeed?: ProjectPagespeed;
}

export interface Project {
	category: string;
	name: string;
	url: string;
	tech: string;
	plan: string;
	gradient: string;
	image?: string;
	tagline: string;
	description: string;
	stack: string[];
	languages?: string[];
	pages: ProjectPage[];
	measurement?: ProjectMeasurement;
}

export interface WorkModalMessages {
	close: string;
	overview: string;
	stack: string;
	languages: string;
	pages: string;
	visit: string;
	hint: string;
	openDetails: string;
}

export interface WorkMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	badge: string;
	projects: Project[];
	modal: WorkModalMessages;
	cta: string;
	ctaMsg: string;
}

export interface SeoGeoCard {
	tag: string;
	title: string;
	text: string;
	items: string[];
}

export interface SeoGeoStat {
	value: string;
	label: string;
}

export interface SeoGeoProof {
	label: string;
	stats: SeoGeoStat[];
	note: string;
}

export interface SeoGeoMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	pain: string;
	cards: SeoGeoCard[];
	proof: SeoGeoProof;
	cta: string;
	ctaMsg: string;
}

export interface WhyItem {
	title: string;
	text: string;
}

export interface WhyMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	items: WhyItem[];
}

export interface StepItem {
	number: string;
	icon: string;
	title: string;
	text: string;
}

export interface StepsMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	items: StepItem[];
}

export interface AboutMessages {
	index: string;
	label: string;
	title: string;
	textA: string;
	highlight: string;
	textB: string;
	missionLabel: string;
}

export interface FaqItem {
	q: string;
	a: string;
}

export interface FaqMessages {
	index: string;
	label: string;
	title: string;
	subtitle: string;
	items: FaqItem[];
}

export interface CtaMessages {
	titleA: string;
	titleB: string;
	sub: string;
	whatsapp: string;
	mail: string;
	note: string;
	whatsappMsg: string;
	seo: string;
}

export interface FooterMessages {
	credit: string;
	backTop: string;
	made: string;
}

export interface PreloaderMessages {
	boot: string[];
	progress: string;
}

export interface MetaMessages {
	title: string;
	description: string;
	skip: string;
}

/** Mapa icono → componente (tipado con el componente de phosphor-svelte). */
export type IconMap = Record<SocialIconName, Component>;
