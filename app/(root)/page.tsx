"use client"
import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";
import MainWindow from "@/components/shared/windows/MainWindow"; 
import { Loader2 } from 'lucide-react';

// Dynamically import components
const LaunchPad = dynamic(() => import('@/components/shared/fullPrograms/LaunchPad'), { ssr: false, loading: () => <Loading /> });
const SettingsApp = dynamic(() => import('@/components/shared/fullPrograms/SettingsApp'), { ssr: false, loading: () => <Loading /> });
const TerminalApp = dynamic(() => import('@/components/shared/fullPrograms/TerminalApp'), { ssr: false, loading: () => <Loading /> });
const CalculatorApp = dynamic(() => import('@/components/shared/fullPrograms/CalculatorApp'), { ssr: false, loading: () => <Loading /> });
const FinderApp = dynamic(() => import('@/components/shared/fullPrograms/FinderApp'), { ssr: false, loading: () => <Loading /> });
const VideoPlayer = dynamic(() => import('@/components/shared/fullPrograms/VideoPlayer'), { ssr: false, loading: () => <Loading /> });
const Gallery = dynamic(() => import('@/components/shared/fullPrograms/Gallary'), { ssr: false, loading: () => <Loading /> });
const Camera = dynamic(() => import('@/components/shared/fullPrograms/Camera'), { ssr: false, loading: () => <Loading /> });
const MusicApp = dynamic(() => import('@/components/shared/fullPrograms/MusicApp'), { ssr: false, loading: () => <Loading /> });
const VoiceRecorder = dynamic(() => import('@/components/shared/fullPrograms/VoiceRecorder'), { ssr: false, loading: () => <Loading /> });

const Loading = () => (
  <div className='h-full w-full flex flex-col gap-2 items-center justify-center'>
    <span className=' text-3xl'>Opening App</span>
    <Loader2 className='animate-spin w-12 h-12'/>
  </div>
);

interface Program {
  id: string;
  name: string;
  component: React.ComponentType;
}

const initialPrograms:Program[] = [
  { id: 'launchpad', name: 'Launchpad', component: LaunchPad },
  { id: 'settings', name: 'Settings', component: SettingsApp },
  { id: 'terminal', name: 'Terminal', component: TerminalApp },
  { id: 'calculator', name: 'Calculator', component: CalculatorApp },
  { id: 'finder', name: 'Finder', component: FinderApp },
  { id: 'trash', name: 'Trash', component: FinderApp },
  { id: 'player', name: 'Player', component: VideoPlayer },
  { id: 'gallery', name: 'Gallery', component: Gallery },
  { id: 'camera', name: 'Camera', component: Camera },
  { id: 'music', name: 'Music', component: MusicApp },
  { id: 'recorder', name: 'Recorder', component: VoiceRecorder },
];



export default function Home() {
  const { openedPrograms } = useOSMemoryStore();

  const workingPrograms = useMemo(() => 
    openedPrograms.map(program => {
      const initialProgram = initialPrograms.find(ip => ip.id === program.id);
      return {
        ...program,
        component:initialProgram? initialProgram.component: null
      };
    }),
    [openedPrograms]
  );

  return ( 
    <>
       {workingPrograms.map(program => (
          <MainWindow key={program.id} programId={program.id} minimized={program.minimized} name={program.name}>
              {program.component&&<program.component />}
          </MainWindow>
      ))}
    </>
  );
}