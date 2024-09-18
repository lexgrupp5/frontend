interface Props {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-950">
      {children}
    </div>
  );
};
