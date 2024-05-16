import Image from "next/image";
import NavBar from "./components/NavBar";
import { UserButton } from "@clerk/nextjs";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Next Media!</h1>
      <h4 className="text-lg mb-8">Created by Robbie Donoghue</h4>
      <div className="flex items-center justify-center h-20 w-64 bg-blue-500 text-white font-bold text-lg hover:underline rounded-lg shadow-lg">
        {userId ? <UserButton /> : <SignInButton />}
      </div>
    </div>
  );
}
