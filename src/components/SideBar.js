import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../redux/boardSlice';
import AddEditBoard from '../modals/AddEditBoard';
function SideBar({ isSideBarOpen, setIsSideBarOpen }) {
    const dispatch = useDispatch()
  const boards = useSelector((state) => state.boards)
  const [isBoardModal,setIsBoardModal] = useState(false)
  return (
    <div>
          <div className={isSideBarOpen ? 'fixed min-w-[261px] bg-whites h-screen left-0 z-20 items-center top-[72px]' : ' bg-slate-500 top-auto bottom-10 justify-center items-center hover:opacity-70 cursor-pointer transition duration-300 transform fixed rounded-2xl h-[34px] w-[56px]'}>
              
              <div>
                  {
                      isSideBarOpen && ( <div className=' bg-white w-full py-4 rounded-xl'>
                          <h2 className='mx-4 mb-8 font-thin'>
                              All Boards ({boards?.length})
              </h2>
              <div className='flex flex-col justify-center h-[70vh]'>
                <div> {boards.map((board, index) => (
                
                <div key={index}
                onClick={() => {
                  dispatch(boardSlice.actions.setBoardActive({index}))
                }}
                className={` flex items-start justify-start space-x-2 px-5 rounded-2xl transition duration-300 mr-8  py-4 ease-in-out cursor-pointer ${board.isActive && "bg-emerald-600 rounded-full mr-8"}`}>
                <p className=' font-serif'>
                  {board.name}
 </p>
              </div>
               ) )}
                </div>
              </div>
                      </div>
            )}
          <div onClick={() => { setIsBoardModal(true); }}
            className=' flex items space-x-2 duration-300 text-emerald-700 ease-in-out cursor-pointer mr-8 px-5 py-4 '>
          <p className=' font-serif'>
               create New board
 </p>
          </div>
          {/* {
            isSideBarOpen ? (
              <div onClick={() => 
              {
                setIsSideBarOpen(state => !state);
               }
              }
                className='flex items-center font-bold mt-2 absolute rounded-2xl bottom-16 cursor-pointer mr-6 mb-8 px-8 py-4'>
                  {isSideBarOpen && <p>Hide</p>}
              </div>
            ) :
              <div onClick={() => {
                setIsSideBarOpen(state => !state);
              }}
                className=' absolute p-5'>

              </div>
          } */}

              </div>
      </div>
      {
        isBoardModal && <AddEditBoard type='add' setBoardModalOpen={setIsBoardModal} />
      }
    </div>
  )
}

export default SideBar
