import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export default async function Page({ params }) {
  //check params
  console.log(params.singlePost);
  //sql for editing post
  async function handleEditPost(formdata) {
    "use server";
    //save input in variables
    const title = formdata.get("title");
    const content = formdata.get("content");
    const image_url = formdata.get("image_url");
    try {
      await sql`UPDATE posts01
    SET title = ${title}, content =${content}, image_url= ${image_url}
    WHERE post_id = ${params.singlePost}
     `;
    } catch {
      console.log("error editing data");
    }
    console.log("post saved");
    //update all paths that show this post's info
    revalidatePath(`/allPosts/${params.singlePost}/editPost`);
    revalidatePath(`/allPosts/${params.singlePost}`);
    revalidatePath(`/allPosts`);
    redirect(`/allPosts`);
  }
  //display UI form
  return (
    <>
      <h1>Edit posts form for {params.singlePost}</h1>
      <div className="p-4">
        <form action={handleEditPost} className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <div className="mb-4">
            <label htmlFor="title" className="text-lg font-bold">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="text-lg font-bold">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="image_url" className="text-lg font-bold">
              Image URL
            </label>
            <input
              id="image_url"
              name="image_url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
