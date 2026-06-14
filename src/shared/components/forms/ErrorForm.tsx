export default function ErrorForm({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-red-500 text-sm font-sans font-semibold">
      {children}
    </div>
  );
}
