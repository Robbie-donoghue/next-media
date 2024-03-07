import Link from "next/link";

export default function NavBar() {
  return (
    <>
      <nav>
        <Link href="sign-up">Sign up here!</Link>
        <Link href="posts"> View posts!</Link>
        <Link></Link>
      </nav>
    </>
  );
}
