import { Calendar } from "@/components/ui/calendar"

const CalendarWidget = () => {
  return (
    <div className=" p-4 rounded-lg col-span-2 row-span-2 !border-transparent bg-transparent shadow-none select-none backdrop-blur-0 hover:!bgOpacity hover:bgblur transition-all ease-in-out card flex just ">
      <Calendar/>
    </div>
  )
}
export default CalendarWidget