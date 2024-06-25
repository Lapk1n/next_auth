import { LoginButton } from '@/components/auth/LoginButton';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🔐 Auth
        </h1>

        <p className="text-white text-lg">
          A simple authentication service
        </p>

        <LoginButton mode="modal" asChild>
          <Button variant="secondary">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
