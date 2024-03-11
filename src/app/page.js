import Image from "next/image";
import NavBar from "./components/NavBar";
import Signin from "./components/Signin";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-4">Next Media!</h1>
      <h4 className="text-lg mb-8">Welcome to Next Media</h4>
      <Signin />
    </div>
  );
}
