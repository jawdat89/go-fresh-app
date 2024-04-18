import JuiceCup from "@/assets/images/juice-cup.jpg";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-[91.5vh] bg-gray-100 px-4">
      <div className="text-center">
        <div className="flex flex-wrap justify-center items-center">
          <span className="text-6xl md:text-9xl font-bold text-secondary-darker">
            4
          </span>
          <span className="text-6xl md:text-9xl font-bold text-secondary">
            0
          </span>
          <span className="text-6xl md:text-9xl font-bold text-secondary-lighter">
            4
          </span>
        </div>
        <img
          className="w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-4"
          src={JuiceCup}
          alt="juice-cup-img"
        />
        <p className="text-2xl md:text-4xl tracking-widest font-semibold mt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-stone-400 to-secondary-darker">
          דף לא נמצא
        </p>
        <p className="text-sm md:text-md text-stone-600 mt-2">
          הדף שאתה מחפש לא נמצא
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-6 px-4 py-2 md:px-6 md:py-2 bg-primary text-white font-semibold rounded hover:bg-primary-lighter transition duration-200"
        >
          חזרה
        </button>
      </div>
    </div>
  );
}
