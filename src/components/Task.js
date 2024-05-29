import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import TaskModal from './TaskModal';

function Task({ taskIndex, colIndex }) {
  const boards = useSelector(state => state.boards);
  const board = boards.find(board => board.isActive);
  const columns = board.columns;
  const col = columns.find((col, i) => i === colIndex);
  const task = col.tasks.find((task, i) => i === taskIndex);

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  let compeleted = 0;
  let subtasks = task.subtasks;
  subtasks.forEach((subtasks) => {
    if (subtasks.isCopleted) {
      compeleted++;
    }
  });

  const handelOnDragStart = (e) => {
    e.dataTransfer.setData(
      "text", JSON.stringify({ taskIndex, prevColIndex: colIndex })
    );
  }

  return (
    <div>
      <div
        onDragStart={handelOnDragStart}
        draggable
        onClick={() => {
          setIsTaskModalOpen(true);
        }}
        className='w-[280px] first:my-5 rounded-xl bg-white shadow-lg py-6 px-3 hover:text-emerald-700 cursor-pointer'
      >
        <p className='font-bold tracking-wide'>
          {task.title}
        </p>
        <p className='font-bold tracking-lighter mt-2 text-gray-500 text-xs'>
          {compeleted} of {subtasks.length} compeleted tasks
        </p>
      </div>
      {isTaskModalOpen && (
        <TaskModal colIndex={colIndex} taskIndex={taskIndex} setIsTaskModalOpen={setIsTaskModalOpen} />
      )}
    </div>
  );
}

export default Task;
