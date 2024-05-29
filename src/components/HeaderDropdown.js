import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../redux/boardSlice';

function HeaderDropdown({ setOpenDropdown, setBoardModalOpen }) {
    
    const dispatch = useDispatch()
    const boards = useSelector((state) => state.boards)

  return (
      <div className='py-10 px-5 absolute left-0 right-0 bottom-[-100vh] top-16  bg-stone-500' onClick={(e) => {
          if (e.toggle !== e.currentTarget) {
            return 
          }
          setOpenDropdown(false)
      }}>
          <div className=' bg-slate-300 shadow-md w-full py-4 rounded-md'>
              <h2 className='font-semibold mx-3 mb-7'>
                  Boards ({boards?.length})
              </h2>
              <div>
                  {boards.map((board, index) => (
                      <div className={`flex items-baseline space-x-2 px-5 py-4 ${board.isActive && 'bg-gray-800 text-slate-300 rounded-r-full mr-8'}`}
                          key={index}
                          onClick={() => {
                            dispatch(boardSlice.actions.setBoardActive({index}))
                        }}
                      >
                          <p className='text-xl font-bold'>{ board.name}</p>
                      </div>
                  ))}
                  <div className='cursor-pointer flex items-baseline space-x-2 text-cyan-700 px-5 py-4' onClick={() => {
                      setBoardModalOpen(true)
                      setOpenDropdown(false)
                  }}>
                      <p className='text-lg font-bold'>
                          + Create New Board
                      </p>
                  </div>
              </div>
          </div>
    </div>
  )
}

export default HeaderDropdown