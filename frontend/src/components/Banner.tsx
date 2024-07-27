import './Banner.css'

export default function Banner() {
    return (

        <div className="   bg-repeat-y   text-center">
            <h1 className="font-extrabold text-5xl text-zinc-50 ">Chat App</h1>

            <ChatAnimation />
        </div>
    )
}




function ChatAnimation() {
    return (
        <div className='py-4 mt-4 rounded-md  animate-down  border px-1'>

            <div className="flex justify-center items-center gap-2 mb-3">
                <div className="text-md font-semibold text-white">Live Room</div>
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-4">

                <Chat user='MH' text='Hello' side='left' id='1' />
                <Chat user='S' text='Hi,How are you' side='right' id='2' />
                <Chat user='JS' text='Whats up man' side='right' id='3' />
                <Chat user='MH' text="I'm good, thanks!" side='left' id='4' />

            </div>
        </div>
    )
}

function Chat({ user, text, side,id }) {
    return (
        <div className={`animate-slide-in-from-${id} flex items-center`}>
            {side === 'left' &&
                <div className='rounded-full font-bold text-lg bg-gray-500 h-12 w-12 flex items-center justify-center me-1'>
                    {user}
                </div>
            }

            <p className={`font-medium py-3 rounded-lg p-2  flex-1 ${side == 'left' ? 'me-1 text-start bg-blue-300' : 'ms-1 text-end bg-slate-50'}`}>{text}</p>

            {side === 'right' &&
                <div className={`rounded-full font-bold text-lg  h-12 w-12 flex items-center justify-center ms-1 ${user == 'JS' ? 'bg-cyan-600':'bg-red-600'} `}>
                    {user}
                </div>}
        </div>
    )
}
