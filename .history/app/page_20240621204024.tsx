import MainTopbar from "@/components/shared/topbar/mainTopbar";
import MainDesktopBody from "@/components/shared/desktopBody/mainDesktopBody";
import MainTaskbar from "@/components/shared/taskbar/mainTaskbar";


export default function Home() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-between max">
      <MainTopbar/>
      <MainDesktopBody/>
      <MainTaskbar/>
    </main>
  );
}
