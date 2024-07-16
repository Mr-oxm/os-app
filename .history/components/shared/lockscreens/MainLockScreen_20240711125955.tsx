
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { motion } from "framer-motion";

const MainLockScreen = ({ wallpaper, setIsLocked }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    if (password === "yourpassword") {
      setIsLocked(false);
    } else {
      // Show error message
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`cursor-macos flex h-screen w-screen flex-col items-center justify-between max-h-screen max-w-screen overflow-hidden bg-cover bg-center`}
      style={{ backgroundImage: `url('/wallpapers/${wallpaper}')` }}
    >
      <div className='bgOpacity bgblur w-full h-full flex flex-col items-center gap-4 justify-center'>
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-foreground mb-8"
        >
          {currentTime.toLocaleTimeString()}
          <div className="text-xl mt-2">{currentTime.toLocaleDateString()}</div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Image
            src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Profile"
            width={1000}
            height={1000}
            className='w-52 h-52 !rounded-full card bgOpacity '
          />
        </motion.div>

        <Label className='text-2xl font-bold text-foreground mt-4'>Guest</Label>

        {showPasswordInput ? (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 text-center"
            />
            <Button onClick={handleUnlock} className='bgBlur bgOpacity text-foreground w-24 card hover:!bg-primary hover:!text-primary-foreground'>
              Unlock
            </Button>
          </motion.div>
        ) : (
          <Button
            onClick={() => setShowPasswordInput(true)}
            className='bgBlur bgOpacity text-foreground w-24 card hover:!bg-primary hover:!text-primary-foreground mt-4'
          >
            Enter
          </Button>
        )}

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-8 left-8 text-foreground"
        >
          {/* Add weather information here */}
          Weather: 22°C, Sunny
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-8 right-8 text-foreground"
        >
          {/* Add battery status here */}
          Battery: 85%
        </motion.div>
      </div>
    </motion.main>
  );
};

export default MainLockScreen;