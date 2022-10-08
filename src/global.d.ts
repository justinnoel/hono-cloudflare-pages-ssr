// https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements
// https://github.com/honojs/hono/blob/main/src/middleware/jsx/index.ts
declare namespace JSX {
	interface IntrinsicElements {
		// Use `any` instead of `unknown` to avoid "no explicit any".
		[tagName: string]: Record<string, unknown>;
	}
}
