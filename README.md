# Hono SSR on Cloudflare Pages

Example of a Cloudflare Pages server side rendered (SSR) project powered by Hono.

This project demonstrates:

- Accessing environment variables
- Using [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv) to dynamically add and delete posts
- Using [Cloudflare KV](https://developers.cloudflare.com/workers/runtime-apis/kv) to display a dynamic "visitor counter"
- [Custom Hono middleware](https://honojs.dev/docs/api/middleware/#custom-middleware) to count all visits
- A minimal TypeScript configuration
- Deploying fixed assets (non-generated) like images, CSS, etc.

## General Guidance and Explanation of Code

### Paths

The example is configured to use `@` as an alias to the `src` directory. Throughout the code base, files can be imported using the `@` alias.

Examples

- `import { Layout } from "@/components/Layout";`
- `import type { Post } from "@/index";`

### Environment Variables

Rather than use a `.env` file, this project uses a `.dev.vars` file. All "secrets" or other environment variables should be added to this file. During development, Wrangler automatically makes these variables available to the project in `c.env.`

For real projects, this file should **NOT** be added to your Git repository. It should be added to the `.gitignore` file.

To use these variables in preview or production, they need to be added via the Cloudflare dashboard.

In addition, the `NODE_VERSION` variable should be added with a value of `16` or `17`.

Be sure to add the appropriate variables to both the "Preview" and "Production" sections.

If running this project in preview or production results in "Internal Server Error", it is highly likely the variables were not added in "Preview" / "Production" or the KV namespaces and bindings were not added.

### KV Namespaces and Bindings

In development, the KV Namespaces are included in the `dev:wrangler` script in `package.json`.

For production or preview, use the Cloudflare dashboard to create two namespaces:

- HONO_PAGES_BLOG_POSTS
- HONO_PAGES_COUNTER

NOTE: The namespaces can be called anything per personal/organizational preferences.

Next, these two new namespaces must be bound to the Pages project. Unless changed throughout the code base, the bindings **must** be named as follows.

- HONO_PAGES_BLOG_POSTS
- HONO_PAGES_COUNTER

### Output

All `dev` and `build` processes output to the `public` directory. When the process is built by Cloudflare Pages, the `_worker.js` file is used to run the project from the edge.

### Additional Assets

Any assets such as favicon, CSS, images, etc. should be located in the `public` directory. If desired, additional folder nesting can be used for better organization.

To reference these assets, use the root path (`/`) along with any other nested paths.

Examples

- `<link rel="stylesheet" href="/index.css" />`
- `<link rel="shortcut icon" href="/assets/favicon.ico" />`

## Development

- Install packages
  - Yarn : `yarn`
  - npm : `npm install`
- Run in development mode
  - Yarn : `yarn dev`
  - npm : `npm run dev`
- Format all code per prettier configuration
  - Yarn : `yarn format`
  - npm : `npm run format`

## New Development and Production Steps

If additional development or build steps, such as adding TailwindCSS, are needed, add them to the `scripts` section of `package.json`.

- `"dev:css": "tailwindcss -o ./public/assets/tailwind.css --watch",`
- `"build:css": "tailwindcss -o ./public/assets/tailwind.css",`

## Deploying to Production

### Git Based Workflow

If this project is added to the Cloudflare Dashboard via a Git provider, any changes to the primary branch will result in deployment to production.

Changes to feature branches will result in deployment to a unique preview instance.

When creating the project for the first time in the Cloudflare dashboard, be sure to add all environment variables and KV namespace bindings before completing the project. Otherwise, the first build will fail.

### Manual Deployment

To deploy the project manually, run the `deploy` script to push the project to Cloudflare.

- Yarn : `yarn deploy`
- npm : `npm run deploy`

If the project does not exist already, the first deployed version will not run properly. It will be missing environment variables and KV Namespace bindings.

These can be added to the project before the next deployment.

## Credits

This example project is based on the Hono ["blog" example](https://github.com/honojs/examples/tree/main/blog) by [Yusuke Wada](https://github.com/yusukebe).

This example has been modified to support running on Cloudflare Pages based on guidance from [Rishav Sharan](https://github.com/rishavs) in [this pull request](https://app.raindrop.io/my/0/hono/-1/item/454604533/web).

Many thanks 🙏 to [Yusuke Wada](https://github.com/yusukebe) for the amazing [Hono library](https://github.com/honojs/hono)!

## Author

Justin Noel https://github.com/justinnoel

## License

Distributed under the MIT License.
