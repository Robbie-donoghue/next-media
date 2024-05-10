import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";
import Image from "next/image";
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
    await sql`INSERT INTO comments (username, comment, post_id)
         VALUES (${username}, ${comment}, ${post.post_id}) `;
    console.log("comment saved");
  }
  if (!post) {
    notFound();
  }
  return (
    //display posts
    <div>
      <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
      <h3 className="text-lg mb-4">{post.content}</h3>
      {/* display image_url */}
      {<Image src={post.image_url} alt="" width={500} height={500} />}

      <div>
        <h4 className="text-xl font-bold mb-4">Comments</h4>
        <div className="mb-4">
          <form action={handleComments} className="text-black flex">
            <input
              name="username"
              placeholder="Username"
              className="mr-2 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              name="comment"
              placeholder="Comment..."
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
