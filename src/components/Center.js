import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { useSelector } from 'react-redux';
import Column from './Column';
import EmptyBoard from './EmptyBoard';
import AddEditBoard from '../modals/AddEditBoard';


function Center({ boardModalOpen, setBoardModalOpen }) {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board?.columns;
  const backgroundImage = board?.backgroundImage; 

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div>
   <div
  className={
    windowSize[0] >= 768 && isSideBarOpen
      ? 'bg-[#175b5a80] scrollbar-hide h-screen flex overflow-x-scroll gap-6 ml-[261px]'
      : 'bg-[#175b5a70] scrollbar-hide h-screen flex overflow-x-scroll gap-6'
  }
  style={{
    backgroundImage: backgroundImage ? `url('/${backgroundImage}')` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
        {windowSize[0] >= 768 && (
          <SideBar
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
            setIsBoardModalOpen={setBoardModalOpen}
            isBoardModalOpen={boardModalOpen}
          />
        )}

        {columns?.length > 0 ? (
          <>
            {columns.map((col, index) => (
              <Column key={index} colIndex={index} backgroundImage={backgroundImage} />
            ))}
            <div
              onClick={() => {
                setBoardModalOpen(true);
              }}
              className="h-screen flex items-center justify-center rounded-xl text-xl font-serif scrollbar-hide transition duration-300 cursor-pointer min-w-[280px] mt-[135px]"
            >
              + Add new column
            </div>
          </>
        ) : (
          <>
            <EmptyBoard type="edit" />
          </>
       ) }

        {boardModalOpen && <AddEditBoard type="edit" setBoardModalOpen={setBoardModalOpen} />}
      </div>
    </div>
  );
}

export default Center;