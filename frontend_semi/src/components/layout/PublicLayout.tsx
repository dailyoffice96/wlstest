// PublicLayout.tsx
import Header from "./Header";

type PublicLayoutProps = {
  children: React.ReactNode;
  isLogin: boolean;
  username: string;
  onLogout?: () => void;
};

function PublicLayout({ children, isLogin, username, onLogout }: PublicLayoutProps) {
  return (
    <>
      <Header isLogin={isLogin} username={username} onLogout={onLogout} />

      <main className="public-content">
        {children}
      </main>
    </>
  );
}

export default PublicLayout;