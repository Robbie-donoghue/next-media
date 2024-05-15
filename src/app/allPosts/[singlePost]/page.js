import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Image from "next/image";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import RemoveBtn from "@/app/components/RemoveBtn";
import RemoveBtnComments from "@/app/components/RemoveBtnComments";
export default async function Page({ params }) {
  //get single post
  console.log(params.singlePost);
  const post = (
    await sql`SELECT * FROM posts01 WHERE post_id = ${params.singlePost} `
  ).rows[0];
  const comments = (
    await sql`SELECT * FROM comments01 WHERE post_id = ${params.singlePost}`
  ).rows;
  //handle posts
  async function handleComments(formData) {
    "use server";
    const comment = formData.get("comment");
    const username = formData.get("username");
    await sql`INSERT INTO comments01 (username, comment, post_id)
         VALUES (${username}, ${comment}, ${post.post_id}) `;
    console.log("comment saved");

    revalidatePath(`/allPosts/${params.singlePost}`);
  }
  if (!post) {
    notFound();
  }
  return (
    //display posts
    <>
      {/* //div that contains all */}
      <div>
        {/* //div that contains post */}
        <div>
          <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
          <div className="flex justify-end gap-5">
            {/* delete post */}
            <RemoveBtn post_id={post.post_id} />
            {/* //edit button */}
            <Link href={`${params.singlePost}/editPost`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
          <h3 className="text-lg mb-4">{post.content}</h3>
          {/* display image_url */}
          {post.image_url ? (
            <Image
              src={post.image_url}
              alt={`image of ${post.title}`}
              width={300}
              height={300}
            />
          ) : (
            <h3>Image unavailable</h3>
          )}
        </div>
        {/* //comments */}
        <div>
          <h4 className="text-xl font-bold mb-4">Comments</h4>
          <div className="mb-4">
            <form action={handleComments} className="text-black flex">
              <input
                name="username"
                placeholder="Username"
                value={comments.username}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
              />
              <input
                name="comment"
                placeholder="Comment..."
                value={comments.comment}
                className="flex-1 mr-2 px-4 py-2 border border-gray-300 rounded-md"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
          {/* //display comments */}
          <div>
            {comments.map((comment) => (
              <div
                className="bg-gray-100 rounded-md p-4 mb-4"
                key={comment.comment_id}
              >
                <p className="font-bold text-lg mb-2">{comment.username}</p>
                <div>
                  <p>{comment.comment}</p>
                </div>
                {/* delete comment */}
                <div className="flex justify-end gap-5">
                  <RemoveBtnComments comment_id={comment.comment_id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
