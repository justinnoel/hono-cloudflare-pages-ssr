// The secrets and variables from the cloudflare worker process.
// Available from `c.env`
export type Env = {
	ASSETS: Fetcher;
	ENVIRONMENT_VARIABLE_1: string;
	ENVIRONMENT_VARIABLE_2: string;
	HONO_PAGES_BLOG_POSTS: KVNamespace;
	HONO_PAGES_COUNTER: KVNamespace;
};

// Custom variables that can be set and retrieved from context using `c.set` and `c.get`
// https://honojs.dev/docs/api/context/#csetcget
export type CustomVariables = {
	counter: number;
};
