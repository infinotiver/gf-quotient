import { Link } from "react-router-dom";

function CreateQuizButton() {
    return (
        <div className="p-4 bg-rose-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-pink-950">
                <span className="bg-rose-500 p-1 rounded-lg">CREATE</span> YOUR OWN{" "}
                <span className="bg-pink-500 p-1 rounded-lg">QUIZ</span> NOW
            </h1>
            <Link
                to="/create-quiz"
                className="p-4 rounded-xl bg-red-500 text-2xl font-bold text-white text-center block border-b-8 border-red-700 hover:border-red-600"
            >
                Create a quiz
            </Link>
        </div>
    );
}

export default CreateQuizButton;
