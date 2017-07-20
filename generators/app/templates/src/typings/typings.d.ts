declare module 'dx-util/*';

declare module '*.styl' {
	const css: {
		[key: string]: string
	};
	export = css;
}