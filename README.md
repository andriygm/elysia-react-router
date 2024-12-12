# elysia-react-router

Use [React Router]([https://remix.run/](https://reactrouter.com/)) with [Elysia](https://elysiajs.com/) with `HMR` support!

## Usage

In `development` mode it use [`vite`](https://vitejs.dev/guide/api-javascript.html) under the hood and in `production` serve build directory and perform SSR requests

```ts
import { Elysia } from "elysia";
import { remix } from "elysia-remix";

new Elysia()
    .use(await remix())
    .get("/some", "Hello, world!")
    .listen(3000, console.log);
```

## Quick start

```bash
bun create remix@latest --template kravetsone/elysia-remix/example
```

## Options

| Key              | Type                                                            | Default                                 | Description                                                                                                         |
| ---------------- | --------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| mode?            | "development" \| "production"                                   | process.env.NODE_ENV \|\| "development" | In `development` mode it starts `vite` and in `production` it just served static and perform SSR requests.          |
| basename?        | string                                                          | "/"                                     | The base path for the Remix app. This should match the `basename` in your `vite` config.                            |
| buildDirectory?  | string                                                          | "build"                                 | The directory where the Remix app is built. This should match the `buildDirectory` directory in your `vite` config. |
| serverBuildFile? | string                                                          | "index.js"                              | The Remix server output filename. This should match the `serverBuildFile` filename in your `vite` config.           |
| vite?            | InlineConfig                                                    |                                         | Configure `vite` server in `development` mode.                                                                      |
| static?          | [StaticOptions](https://elysiajs.com/plugins/static)            |                                         | Configure [static plugin](https://elysiajs.com/plugins/static) options in `production` mode                         |
| getLoadContext?  | (context: Context) => AppLoadContext \| Promise<AppLoadContext> |                                         | A function that returns the value to use as `context` in route `loader` and `action` functions.                     |

### getLoadContext usage

in Elysia:

```ts
new Elysia()
    .use(
        await remix({
            getLoadContext: () => ({ hotPostName: "some post name" }),
        })
    )
    .listen(port, console.log);

declare module "@remix-run/server-runtime" {
    interface AppLoadContext {
        hotPostName?: string;
    }
}
```

in Remix

```tsx
export const loader = async ({ context }: LoaderFunctionArgs) => {
    return json({
        ...context,
        posts: [
            {
                slug: "my-first-post",
                title: "My First Post",
            },
            {
                slug: "90s-mixtape",
                title: "A Mixtape I Made Just For You",
            },
        ],
    });
};

export default function Posts() {
    const { posts, hotPostName } = useLoaderData<typeof loader>();

    return (
        <main>
            <h1>Posts</h1>
            <p>🔥🔥 {hotPostName} 🔥🔥</p>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <p>{post.title}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}
```
