import MacWindow from "@/components/shared/windows/macWindow";
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";



export default function Home() {
  const {openedPrograms} = useOSMemoryStore();
  return (
    // <section className="absolute w-full h-full hidden">
      
    // </section>
    <>
      {openedPrograms.map(program => (
          <Temp key={program.id} programId={program.id}>
              <program.component />
          </Temp>
      ))}
    </>
  );
}

