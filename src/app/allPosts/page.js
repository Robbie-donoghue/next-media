import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
export default async function Page({ params }) {
  console.log(params.posts);
  const posts = (await sql`SELECT * FROM posts01`).rows;
  revalidatePath(`allPosts`);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4"> Posts</h1>
      <div key={posts.post_id}>
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
            {<Image src={post.image_url} alt="" width={300} height={300} />}
          </div>
        ))}
      </div>
    </div>
  );
}
