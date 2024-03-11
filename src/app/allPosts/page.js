import { sql } from "@vercel/postgres";
import Link from "next/link";
export default async function Page({ params }) {
  console.log(params.posts);
  const posts = (await sql`SELECT * FROM posts`).rows;
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4"> Posts</h1>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <Link
              href={`/allPosts/${post.post_id}`}
              className="text-xl font-bold hover:underline mb-2"
            >
              <h3 className="text-xl font-bold hover:underline mb-2">
                {post.title}
              </h3>
              <h5 className="text-lg">{post.content}</h5>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
