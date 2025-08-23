
interface BubbleProps {
    title: string;
    subtitle: string;
}

function Bubble({ title, subtitle }: BubbleProps) {
    return (
        <>
            <div>
                <div className="relative text-justify bg-pink-100 mx-auto my-2 p-5 rounded-2xl rounded-l-0 rounded-bl-none border-b-8 border-rose-300 shadow-xl min-w-[24vw]">
                    <p className="text-xl font-semibold text-rose-800 flex items-center">
                       
                        {subtitle}
                    </p>
                    <h1 className="text-4xl font-extrabold text-rose-950">{title.toUpperCase()}</h1>
                </div>
            </div>
        </>
    );
}

export default Bubble;
