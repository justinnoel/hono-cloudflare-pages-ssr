import { Env } from "@/types";
import { Context } from "hono";
import { Next, ValidatedData } from "hono/dist/hono";

export const counter = async (
	c: Context<string, { Bindings: Env }, ValidatedData>,
	next: Next,
) => {
	const url = c.req.url;

	if (url.includes(".css") || url.includes(".ico")) {
		return await next();
	}

	const currentCounter = Number((await c.env.KV_COUNTER.get("counter")) || "0");
	const newCounter = currentCounter + 1;

	c.set("counter", newCounter);

	await c.env.KV_COUNTER.put("counter", String(newCounter));
	await next();
};
