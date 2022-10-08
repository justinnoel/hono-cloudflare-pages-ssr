import { Hono } from "hono";

import { Env } from "./types";
import { Top } from "./pages/Top";
import { Page } from "./pages/Page";
import importedPosts from "./data/posts.json";
import { counter } from "./middleware/counter";

export type Post = {
	id: string;
	title: string;
	body: string;
};

type GetPost = {
	id: string;
	namespace: KVNamespace;
};

const getPost = async ({ id, namespace }: GetPost) => {
	const posts = await getPosts(namespace);
	return posts.find((post) => post.id == id);
};

const app = new Hono<{ Bindings: Env }>();

app.use("*", async (c, next) => {
	return counter(c, next);
});

app.get("/assets/*", async (c) => {
	return await c.env.ASSETS.fetch(c.req);
});

app.get("/robots.txt", async (c) => {
	return await c.env.ASSETS.fetch(c.req);
});

const getPosts = async (namespace: KVNamespace) => {
	return (await namespace.get<Post[]>("posts", { type: "json" })) || [];
};

app.get("/", async (c) => {
	const posts = await getPosts(c.env.HONO_PAGES_BLOG_POSTS);
	const counter = Number(c.get("counter") || "1");
	const envVariables = [
		{ name: "ENVIRONMENT_VARIABLE_1", value: c.env.ENVIRONMENT_VARIABLE_1 },
		{ name: "ENVIRONMENT_VARIABLE_2", value: c.env.ENVIRONMENT_VARIABLE_2 },
	];

	return c.html(
		<Top posts={posts} envVariables={envVariables} counter={counter} />,
	);
});

app.get("/delete-posts", async (c) => {
	await c.env.HONO_PAGES_BLOG_POSTS.delete("posts");

	return c.redirect("/", 302);
});

app.get("/generate-posts", async (c) => {
	const previouslyStoredPosts = await c.env.HONO_PAGES_BLOG_POSTS.get("posts", {
		type: "json",
	});

	if (!previouslyStoredPosts) {
		await c.env.HONO_PAGES_BLOG_POSTS.put(
			"posts",
			JSON.stringify(importedPosts),
		);
	}

	return c.redirect("/", 302);
});

app.get("/post/:id{[0-9]+}", async (c) => {
	const id = c.req.param("id");
	const counter = Number(c.get("counter") || "1");
	const post = await getPost({ id, namespace: c.env.HONO_PAGES_BLOG_POSTS });
	if (!post) {
		return c.notFound();
	}

	return c.html(<Page post={post} counter={counter} />);
});

export default app;
