import { useEffect } from "react";
import BasicTabs from "./components/BasicTabs";
import ContactView from "./components/ContactView";
import PlayView from "./components/PlayView";
import PrePlayView from "./components/PrePlayView";
import RulesView from "./components/RulesView";
import { useGameData } from "./contexts/gameDataContext";
import WinnerModal from "./components/WinnerModal";
function App() {
  const { gameStarted, winner } = useGameData();

  return (
    <>
      <div className="flex flex-col p-4 items-center w-full h-[100vh]">
        <header className="md:w-2/5 w-full flex items-center flex-col">
          <h1 className="text-3xl text-primary-400">Connect Four</h1>
        </header>
        <main className="md:w-7/12 lg:w-4/12 w-10/12 mt-4">
          <BasicTabs list={["Play", "Rules", "Contact"]}>
            {winner ? <WinnerModal/> :  gameStarted ? <PlayView /> : <PrePlayView />}
            <RulesView />
            <ContactView />
          </BasicTabs>
        </main>
      </div>
    </>
  );
}

export default App;
