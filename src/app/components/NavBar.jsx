import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav className="bg-blue-500 py-4 ">
        <div className="container mx-auto flex justify-between items-center px-4  ">
          <Link
            href="/allPosts"
            className="text-white font-bold text-lg hover:underline"
          >
            View posts!
          </Link>

          <Link
            href="/"
            className="text-white font-bold text-lg hover:underline"
          >
            Home
          </Link>

          <Link
            href="/addPost"
            className="text-white font-bold text-lg hover:underline"
          >
            Add a Post
          </Link>
        </div>
      </nav>
    </>
  );
}
