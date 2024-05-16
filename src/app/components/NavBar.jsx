import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function NavBar() {
  const { userId } = auth();
  return (
    <>
      <nav className="bg-blue-500 py-4 ">
        <div className="container mx-auto flex justify-between items-center px-4  ">
          <Link
            href="/"
            className="text-white font-bold text-lg hover:underline"
          >
            Home
          </Link>
          <Link
            href="/allPosts"
            className="text-white font-bold text-lg hover:underline"
          >
            View posts!
          </Link>
          <Link
            href="/addPost"
            className="text-white font-bold text-lg hover:underline"
          >
            Add a Post
          </Link>
          <div className="text-white font-bold text-lg hover:underline">
            {userId ? <UserButton /> : <SignInButton />}
          </div>
        </div>
      </nav>
    </>
  );
}
