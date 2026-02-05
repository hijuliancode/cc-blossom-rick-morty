import { useNavigate } from "react-router";
import notFoundImage from "@/assets/rick-and-morty-404.jpg";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#24282f]">
      <img
        src={notFoundImage}
        alt="Page not found"
        className="max-w-full max-h-[80vh] object-contain"
      />
      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 bg-[#97ce4c] text-black font-bold text-lg rounded-full hover:bg-[#a6e255] transition-transform hover:scale-105 cursor-pointer shadow-lg active:scale-95"
      >
        Return
      </button>
    </div>
  );
};
