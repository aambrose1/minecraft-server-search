import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="overflow-none scrollbar-hide font-sans items-center justify-items-center min-h-screen gap-2 sm:p-20 grid m-2">
      <main className="items-center sm:items-start bg-slate-100 m-4 rounded-(--radius) p-4">
        <h1 className="row-span-1 text-4xl font-extrabold text-primary text-center">Minecraft Server Lookup</h1>
        <div className="row-span-2"><Search/></div>
      </main>
    </div>
  );
}
