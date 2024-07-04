import MainTopbar from "@/components/shared/topbar/mainTopbar";
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody";
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar";


export default function Home() {
  return (
    <main className="flex h-full w-full flex-col items-center justify-between p-24">
      <MainTopbar/>
      <MainDesktopBody/>
      
    </main>
  );
}
