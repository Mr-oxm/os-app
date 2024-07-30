import { Calendar } from "@/components/ui/calendar"

const CalendarWidget = () => {
  return (
    <div className=" rounded-lg col-span-2 row-span-2 !border-transparent bg-transparent shadow-none select-none backdrop-blur-0 hover:!bgOpacity hover:bgblur transition-all ease-in-out card flex justify-center ">
      <Calendar className="w-full"/>
    </div>
  )
}
export default CalendarWidget