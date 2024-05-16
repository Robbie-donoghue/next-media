import { sql } from "@vercel/postgres";
import Link from "next/link";
import Image from "next/image";
import { revalidatePath } from "next/cache";
export default async function Page({ params }) {
  console.log(params.posts);
  const posts = (await sql`SELECT * FROM posts01`).rows;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-center"> Posts</h1>
      <div
        key={posts.post_id}
        className="grid grid-cols-1 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post) => (
          <div
            key={post.id}
            className="max-w-md mx-auto bg-gray-100 border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <Link
              href={`/allPosts/${post.post_id}`}
              className="text-xl font-bold hover:underline mb-2"
            >
              <h3 className="text-xl font-bold hover:underline mb-2">
                {post.title}
              </h3>

              {post.image_url ? (
                <Image
                  src={post.image_url}
                  alt={`image of ${post.title}`}
                  width={400}
                  height={400}
                  className="object-cover object-fit-cover"
                />
              ) : (
                <h3>Image unavailable</h3>
              )}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
