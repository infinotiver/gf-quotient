function InfoBox() {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md min-w-[24vw]">
            <h1 className="text-2xl font-bold mb-4">
                LET <span className="bg-pink-300 p-1 rounded-lg">LOVE</span>{" "}
                <span className="bg-red-300 p-1 rounded-lg">BLOOM</span>
            </h1>
            <div className="">
                <div className="space-y-4 p-2">
                    <div className="mb-2 bg-rose-50 p-2 rounded-lg flex items-center space-x-2">
                        <span className="bg-rose-500 p-2 text-xl font-bold rounded-full text-white">1</span>
                        <div className="text-rose-700 text-lg">Create a love quiz.</div>
                    </div>
                    <div className="mb-2 bg-rose-50 p-2 rounded-lg flex items-center space-x-2">
                        <span className="bg-pink-500 p-2 text-xl font-bold rounded-full text-white">2</span>
                        <div className="text-rose-700 text-lg">Send it to your boyfriend.</div>
                    </div>
                    <div className="mb-2 bg-rose-50 p-2 rounded-lg flex items-center space-x-2">
                        <span className="bg-red-500 p-2 text-xl font-bold rounded-full text-white">3</span>
                        <div className="text-rose-700 text-lg">Enjoy the results together.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoBox;
