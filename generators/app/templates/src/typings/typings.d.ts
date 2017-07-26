declare module '~DemoComponent';
declare module 'dx-components/src/components/Button/Button.page';
declare module 'redbox-react' {
	type TRedboxProps = {
		error?: Error
	};
	const RedBox: React.SFC<TRedboxProps>;
	export = RedBox;
}
