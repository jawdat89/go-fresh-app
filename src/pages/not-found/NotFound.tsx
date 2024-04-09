import JuiceCup from "@/assets/images/juice-cup.jpg";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <span className="text-9xl font-bold text-secondary-darker">4</span>
        <span className="text-9xl font-bold text-secondary">0</span>
        <span className="text-9xl font-bold text-secondary-lighter">4</span>
        <img width="500px" height="500px" src={JuiceCup} alt="juice-cup-img" />
        <p className="text-4xl tracking-widest font-semibold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-stone-400 to-secondary-darker">
          דף לא נמצא
        </p>
        <p className="text-md text-stone-600 mt-2">הדף שאתה מחפש לא נמצא</p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-primary text-white font-semibold rounded hover:bg-primary-lighter transition duration-200"
        >
          חזרה
        </button>
      </div>
    </div>
  );
}
