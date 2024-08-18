"use client"
import MainWindow from "@/components/shared/windows/MainWindow"; 
import useOSMemoryStore from "@/lib/Store/useOSMemoryStore";

import SettingsApp from '@/components/shared/fullPrograms/SettingsApp';
import TerminalApp from '@/components/shared/fullPrograms/TerminalApp';
import CalculatorApp from '@/components/shared/fullPrograms/CalculatorApp';
import FinderApp from '@/components/shared/fullPrograms/FinderApp';
import VideoPlayer from '@/components/shared/fullPrograms/VideoPlayer';
import Gallery from '@/components/shared/fullPrograms/Gallary'; 
import Camera from '@/components/shared/fullPrograms/Camera';
import MusicApp from '@/components/shared/fullPrograms/MusicApp';
import VoiceRecorder from '@/components/shared/fullPrograms/VoiceRecorder';
import LaunchPad from '@/components/shared/fullPrograms/LaunchPad';


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
  const {openedPrograms} = useOSMemoryStore();

  const workingPrograms=  openedPrograms.map(program => {
    const initialProgram = initialPrograms.find(ip => ip.id === program.id);
    return {
      ...program,
      component:initialProgram? initialProgram.component: null
    };
  });


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

