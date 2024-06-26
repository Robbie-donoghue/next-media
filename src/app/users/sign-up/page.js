import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
export default function Page() {
  const { userId } = auth();
  async function handleCreateUser(formData) {
    "use server";
    console.log("the happening");
    const { username, bio } = Object.fromEntries(formData);
    try {
      await sql`INSERT INTO users01 (clerk_id, username, bio)
                    VALUES
                    (${userId} , ${username}, ${bio}
                    );`;
    } catch (e) {
      throw new Error("error creating your profile" + e);
    }
  }
  return (
    <div>
      <form action={handleCreateUser} className="text-black">
        <input name="username" placeholder="username" />
        <input name="bio" placeholder="bio.." />
        <button type="submit"></button>
      </form>
    </div>
  );
}
