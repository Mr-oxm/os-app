"use client"
import MacWindow from "@/components/shared/windows/tempWindow"; 
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";



export default function Home() {
  const {openedPrograms} = useOSMemoryStore();
  return ( 
    <>
      {openedPrograms.map(program => (
          <MainWindow key={program.id} programId={program.id} minimized={program.minimized} name={program.name}>
              <program.component />
          </MainWindow>
      ))}
    </>
  );
}

