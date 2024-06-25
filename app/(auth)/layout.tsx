interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-b from-sky-400 to-blue-800">
      {children}
    </div>
  );
}
