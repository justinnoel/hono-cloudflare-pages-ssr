// https://www.typescriptlang.org/docs/handbook/jsx.html#intrinsic-elements
// Based on https://github.com/honojs/hono/blob/main/src/middleware/jsx/index.ts#L6
declare namespace JSX {
	interface IntrinsicElements {
		// Use `any` instead of `unknown` to avoid "no explicit any".
		[tagName: string]: Record<string, unknown>;
	}
}
