export default function Test(){
    return (
        <div>
            <div className="w-full h-64 flex justify-evenly items-center">
                <div className="h-40 w-40 bg-dip-20 flex items-center justify-center text-xs">classname: bg-dip-20</div>
                <div className="h-40 w-40 bg-dip-40 flex items-center justify-center text-xs">classname: bg-dip-40</div>
                <div className="h-40 w-40 bg-dip-60 flex items-center justify-center text-xs">classname: bg-dip-60</div>
                <div className="h-40 w-40 bg-dip-80 flex items-center justify-center text-xs text-dip-20">classname: bg-dip-80</div>
                <div className="h-40 w-40 bg-dip-100 flex items-center justify-center text-xs text-dip-20">classname: bg-dip-100</div>
                <div className="h-40 w-40 bg-dip-blk flex items-center justify-center text-xs text-dip-20">classname: bg-dip-blk</div>
            </div>
        </div>
    )
}