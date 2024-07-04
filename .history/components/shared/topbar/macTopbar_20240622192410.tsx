import Image from "next/image"

const macTopbar = () => {
    return (
        <div className="bg-black/15 backdrop-blur-sm w-full flex flex-row justify-between">
            <div>
                <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/732px-Apple_logo_black.svg.png?20220821121934" width={20} height={20} alt="menu" className="fill-white"/>
            </div>
            <div>

            </div>
        </div>
    )
}
export default macTopbar