import { html } from "hono/html";
import { JSXNode } from "hono/jsx";

type LayoutProps = {
	counter: number;
	children?: JSXNode;
	description: string;
	title: string;
};

export const Layout = ({
	children,
	counter,
	description,
	title,
}: LayoutProps) => {
	const cssUrl =
		"//cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css";
	return html` <!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta name="description" content="${description}" />
				<title>${title}</title>
				<link rel="preload" href="${cssUrl}" as="style" />
				<link rel="stylesheet" href="${cssUrl}" />
				<link rel="shortcut icon" href="/assets/favicon.ico" />
			</head>
			<body style="padding: 1em 2em">
				<header>
					<h1>
						<a href="/">Hono Example</a>
					</h1>
				</header>
				<turbo-frame id="main"> ${children} </turbo-frame>
				<footer>
					<p>Built with <a href="https://github.com/honojs/hono">Hono</a></p>
					<p>
						Source:
						<a href="https://github.com/justinnoel/hono-cloudflare-pages-ssr">
							https://github.com/justinnoel/hono-cloudflare-pages-ssr
						</a>
					</p>
					<p>This website has been viewed ${counter} times.</p>
				</footer>
			</body>
		</html>`;
};
