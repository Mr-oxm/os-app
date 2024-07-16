"use client"
import TempWindow from "@/components/shared/windows/tempWindow";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";



export default function Home() {
  const {openedPrograms} = useOSMemoryStore();
  return (
    // <section className="absolute w-full h-full hidden">
      
    // </section>
    <>
      {openedPrograms.map(program => (
          <TempWindow key={program.id} programId={program.id} >
              <program.component />
          </TempWindow>
      ))}
    </>
  );
}

