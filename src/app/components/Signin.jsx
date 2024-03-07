import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/dist/types/server";

export default function Signin() {
  return (
    <div>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton afterSignInUrl="/" afterSignUpUrl="/users/sign-up" />
      </SignedOut>
    </div>
  );
}
