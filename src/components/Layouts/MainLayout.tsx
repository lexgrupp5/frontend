interface Props {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen pt-32 
      flex items-center justify-center 
      bg-indigo-900">
      {children}
    </div>
  );
};
