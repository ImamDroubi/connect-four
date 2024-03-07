import BasicModal from "./BasicModal";
import grid_blured from "../assets/grid_blured.jpg";
import SecondModal from "./SecondModal";
import { useState } from "react";
export default function PrePlayView() {
  const [modalNumber, setModalNumber] = useState(false);
  return (
    <div
      // style={{ backgroundImage: `url(${grid_blured})` }}
      className="flex justify-center items-center w-full relative"
    >
      <img className="absolute top-0 left-0 -z-10" src={grid_blured} alt="" />
      <div className="flex items-center justify-center mt-[40%] -translate-y-1/2 z-10  bg-[rgba(0,0,0,0.5)]">
        {modalNumber == 0 ? <BasicModal setModalNumber={setModalNumber}/>:null}
        {modalNumber == 1 ? <SecondModal setModalNumber={setModalNumber} isOpen={true} /> : null}
      </div>
    </div>
  );
}
