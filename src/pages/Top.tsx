import { Fragment } from "hono/jsx";

import type { Post } from "@/index";
import { Layout } from "@/components/Layout";

const List = (props: { post: Post }) => (
	<li style="margin-top: 6px">
		<a href={`/post/${props.post.id}`}>{props.post.title}</a>
	</li>
);

type EnvVariable = {
	name: string;
	value: string;
};

type TopProps = {
	posts: Post[];
	envVariables: EnvVariable[];
	counter: number;
};

const description =
	"Example of server side rendering (SSR) using Hono hosted by Cloudflare Pages.";

export const Top = ({ counter, envVariables, posts }: TopProps) => (
	<Layout title="Hono Blog" counter={counter} description={description}>
		<main>
			<h2>Posts</h2>
			{posts.length ? (
				<Fragment>
					<ul>
						{posts.map((post) => (
							<List post={post} />
						))}
					</ul>

					<p>
						Click{" "}
						<a href="/delete-posts" style="text-decoration: underline">
							here to delete all posts.
						</a>
					</p>
				</Fragment>
			) : (
				<Fragment>
					<p>There are no posts yet. </p>
					<p>
						Click{" "}
						<a href="/generate-posts" style="text-decoration: underline">
							here to generate new posts.
						</a>
					</p>
				</Fragment>
			)}
			<h3>Environment Variables</h3>
			<ul>
				{envVariables.map((variable) => {
					return (
						<li>
							{variable.name} : {variable.value}
						</li>
					);
				})}
			</ul>
		</main>
	</Layout>
);
