import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"

const CalendarWidget = () => {
  return (
    <ScrollArea className=" rounded-lg !border-transparent bg-transparent shadow-none select-none backdrop-blur-0 hover:!bgOpacity hover:bgblur transition-all ease-in-out card hidden md:flex flex-col items-center justify-center h-full">
      <Calendar className=""/>
    </ScrollArea>
  )
}
export default CalendarWidget