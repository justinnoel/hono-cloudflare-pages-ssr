import { html } from "hono/html";
import { JSXNode } from "hono/jsx";

type LayoutProps = {
	counter: number;
	children?: JSXNode;
	title: string;
};

export const Layout = ({ children, counter, title }: LayoutProps) => {
	const cssUrl =
		"//cdnjs.cloudflare.com/ajax/libs/mini.css/3.0.1/mini-default.min.css";
	return html` <!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta
					name="description"
					content="Example of server side rendereing (SSR) using Hono hosted by Cloudflare Pages."
				/>
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
					<p>This website has been viewed ${counter} times.</p>
				</footer>
			</body>
		</html>`;
};
