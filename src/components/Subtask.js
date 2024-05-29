import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import boardSlice from '../redux/boardSlice';
function Subtask({ index, taskIndex, colIndex }) {
    const dispatch = useDispatch()
    const boards = useSelector(state => state.boards)
    const board = boards.find(board => board.isActive)
    const columns = board.columns
    const col = columns.find((column, i) => colIndex === i)
    const task = col.tasks.find((col, i) => taskIndex === i)
    const subtask = task.subtasks.find((subtask, i) => i === index)
    const checked = subtask.isCompleted
    const onChange = () => {
        dispatch(
          boardSlice.actions.setSubtaskCompleted({index,taskIndex , colIndex})
        )
    }
  return (
    <div className=' w-full flex  relative justify-center items-center p-3 gap-3 bg-lime-600'>
          <input onChange={onChange}
              type='checkbox' className='w-4 h-4 bg-green-400' checked={checked} />
          <p className={checked && `line-through opacity-25`}>
              {subtask.title}
          </p>
    </div>
  )
}

export default Subtask
