import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import elipsis from "../images/icon-vertical-ellipsis.svg";
import ElipsisMenu from './ElipsisMenu';
import Subtask from './Subtask';
import boardSlice from '../redux/boardSlice';
import DeleteModal from '../modals/DeleteModal';
import AddEdittask from '../modals/AddEdittask';

function TaskModal({colIndex , taskIndex , setIsTaskModalOpen}) {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards)
    const board = boards.find(board => board.isActive)
    const columns = board.columns
    const col = columns.find((column, i) => colIndex === i)
    const task = col.tasks.find((col, i) => taskIndex === i)
    const subtasks = task.subtasks
    let compeleted = 0

    subtasks.forEach((subtasks) => {
        if (subtasks.isCopleted) {
            compeleted ++
        }
    })

    const [status, setStatus] = useState(task.status)
    const [newColIndex, setNewColIndex] = useState(columns.indexOf(col))
    const [elipsisMenuOpen, setElipsisMenuOpen] = useState(false)
    
     const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
    const setOpenEditModal = () => {
        setIsAddTaskModalOpen(true)
        setElipsisMenuOpen(false)
    }
    const setOpenDeleteModal = () => {
        setElipsisMenuOpen(false)
        setIsDeleteModalOpen(true)
    }
    const onChange = (e) => {
        setStatus(e.target.value)
        setNewColIndex(e.target.selectedIndex)
    }
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const onClose = (e) => {
        if (e.target !== e.currentTarget) {
         return
        }
        dispatch(
            boardSlice.actions.setTaskStatus({
                taskIndex
                , colIndex,
                newColIndex,
                status
            })
        )
        setIsTaskModalOpen(false)
    }
    const onDeleteBtnClick = () => {
        dispatch(boardSlice.actions.deleteTask({ taskIndex, colIndex }))
        setIsTaskModalOpen(false)
        setIsDeleteModalOpen(false)
      }
  return (
      <div onClick={onClose}
          className=' fixed flex justify-center items-center bg-[#00000090] left-0 right-0 top-0 bottom-0 p-3 overflow-scroll z-50 scrollbar-hide  '>
          <div className=' scrollbar-hide overflow-y-hidden max-h-[95vh] my-auto  bg-slate-600 shadow-lg font-mono max-w-md mx-auto w-full p-8 rounded-xl'>
          <div className=' flex relative justify-between w-full items-center'>
              <h2 className='text-xl'>
                  {task.title}
              </h2>
                  <img src={elipsis} className=' cursor-pointer'
                      onClick={
                          () => {
                          setElipsisMenuOpen(state => !state)
                      }
                  }>
                  </img>
                  {
                  elipsisMenuOpen && <ElipsisMenu setOpenDeleteModal={setOpenDeleteModal}
                  setOpenEditModal={setOpenEditModal} type='Task'/>
              }
              </div>
              <p className=' text-slate-600 tracking-wide pt-6 text-sm font-mono'>
                  {task.description}
              </p>
              <p className=' text-slate-500 tracking-widest text-sm pt-6'>
                  subtasks ({compeleted} of {subtasks.length})
              </p>
              <div className='mt-3 space-y-2 '>
                  {subtasks.map((subtask, i) => {
                      return (
                          <Subtask index={i} taskIndex={taskIndex} colIndex={colIndex} key={i} />
                      )
                  })}
              </div>
              <div className='mt-8 flex flex-col space-y-3'>
                  <label className='text-md '>
                      Your Status
                  </label>
                  <select onChange={onChange}
                      className=' flex-grow p-4 rounded-md text-sm bg-transparent border-gray-500 outline-none' value={status}>
                      
                      {
                          columns.map((column, index) => (
                              <option>
                                  {column.name}
                              </option>
                          ))
                    }
                  </select>
</div>
          </div>
          {isDeleteModalOpen && (<DeleteModal onDeleteBtnClick={onDeleteBtnClick} title={task.title} type='task' setisDeleteModalOpen={setIsDeleteModalOpen} />)}
          {
              isAddTaskModalOpen && (<AddEdittask setOpenAddEditTask={setIsAddTaskModalOpen} type='edit' taskIndex={taskIndex} pervColIndex={colIndex} setIsTaskModalOpen={setIsTaskModalOpen} />)
          }
    </div>
  )
}

export default TaskModal