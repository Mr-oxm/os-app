import MacWindow from "@/components/shared/windows/macWindow";



export default function Home() {
  const {closeProgram, minimizeProgram} = useOSMemoryStore();
  return (
    // <section className="absolute w-full h-full hidden">
      
    // </section>
    <>
      {openedPrograms.map(program => (
          <MacWindow key={program.id} programId={program.id}>
              <program.component />
          </MacWindow>
      ))}
    </>
  );
}

