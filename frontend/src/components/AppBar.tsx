import { Link } from "react-router-dom"

export const Appbar = () => {
    return (
        <div className="border-b-2 border-slate-300 flex justify-between px-10 py-4">
            <Link to={'/blogs'}>
                <div className="flex justify-center flex-col cursor-pointer">
                    Medium
                </div>
            </Link>
            <div>
                <Link to={"/publish"}>
                    <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">
                        Publish
                    </button>
                </Link>
                <AvatarName size={"big"} name="Rakesh" />
            </div>
        </div>
    )
}

export const AvatarName = ({name, size = "small"}: {name: string, size: "small" | "big" }) => {
    return (
        <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-900 rounded-full ${size === "small" ? " w-6 h-6" : "w-10 h-10"}`}>
            <span className={` ${size === "small" ? "text-xs" : "text-md"}     font-medium text-gray-200 dark:text-gray-300`}>{name[0]}</span>
        </div>
    )
}