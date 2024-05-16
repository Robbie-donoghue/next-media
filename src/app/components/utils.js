"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function handleDelete(post_id) {
  await sql`DELETE FROM posts01 WHERE post_id = ${post_id}`;
  revalidatePath(`/allPosts/${post_id}`);
  redirect("/allPosts");
}

export async function handleDeleteComments(comment_id, post_id) {
  await sql`DELETE FROM comments01 WHERE comment_id = ${comment_id}`;
  revalidatePath(`/allPosts/${post_id}`);
}

//dormant for now
export async function handleComments(formData, post_id) {
  "use server";

  const comment = formData.get("comment");
  const username = formData.get("username");
  await sql`INSERT INTO comments01 (username, comment, post_id)
             VALUES (${username}, ${comment}, ${post_id}) `;
  console.log("comment saved");
  revalidatePath(`/allPosts/${post_id}`);
}
