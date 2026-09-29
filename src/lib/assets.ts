import bluehorizon640 from './assets/bluehorizonweb-640.avif';
import bluehorizon1280 from './assets/bluehorizonweb-1280.avif';

export interface ResponsiveImage {
	src: string;
	srcset?: string;
	sizes?: string;
	width?: number;
	height?: number;
}

const responsive: Record<string, ResponsiveImage> = {
	'/bluehorizonweb.avif': {
		src: bluehorizon1280,
		srcset: `${bluehorizon640} 640w, ${bluehorizon1280} 1280w`,
		width: 1280,
		height: 647
	}
};

/** Resuelve una ruta de mensaje a un asset Vite con variantes responsive (si existe). */
export function imagePath(path: string, sizes?: string): ResponsiveImage {
	const hit = responsive[path];
	if (!hit) return { src: path };
	return sizes ? { ...hit, sizes } : hit;
}
