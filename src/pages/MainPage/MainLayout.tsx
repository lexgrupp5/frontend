interface Props {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen pt-[var(--header-height)]
      bg-indigo-900">
      {children}
    </div>
  );
};
