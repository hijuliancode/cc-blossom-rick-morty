import { Outlet, useParams } from "react-router";
import { CharacterList } from "@/features/characters/components/character-list";

export const CharactersLayout = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar: List */}
      <aside
        className={`w-full md:w-[400px] flex-shrink-0 border-r bg-white h-full flex flex-col ${
          id ? "hidden md:flex" : "flex"
        }`}
      >
        <CharacterList />
      </aside>

      {/* Main Content: Detail or Placeholder */}
      <main
        className={`flex-1 h-full overflow-hidden ${
          !id ? "hidden md:block" : "block"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};
