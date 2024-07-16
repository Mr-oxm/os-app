"use client"
import MacWindow from "@/components/shared/windows/macWindow"; 
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";



export default function Home() {
  const {openedPrograms} = useOSMemoryStore();
  return ( 
    <>
      {openedPrograms.map(program => (
          <MacWindow key={program.id} programId={program.id} minimized={program.minimized}>
              <program.component />
          </MacWindow>
      ))}
    </>
  );
}

