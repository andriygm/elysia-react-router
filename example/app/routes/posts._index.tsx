import { type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async ({ context }: LoaderFunctionArgs) => {
  return {
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
  };
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
