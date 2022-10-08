import type { Post } from "@/index";
import { Layout } from "@/components/Layout";

type PagePros = {
	counter: number;
	post: Post;
};

export const Page = ({ counter, post }: PagePros) => {
	return (
		<Layout title={post.title} counter={counter}>
			<title>{post.title}</title>
			<main>
				<h2>{post.title}</h2>
				<p>{post.body}</p>
			</main>
		</Layout>
	);
};
