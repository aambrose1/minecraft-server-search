import Search from "@/components/Search";

export default function Home() {
  return (
    <div className="overflow-none scrollbar-hide grid grid-rows-[20px_1fr_20px] bg-background font-sansitems-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-extrabold text-primary">Minecraft Server Lookup</h1>
        <Search/>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
