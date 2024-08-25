export function ElementShowcase({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-8 py-8 px-8 border border-gray-800 rounded">
      {children}
    </div>
  );
}
