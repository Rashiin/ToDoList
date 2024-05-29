import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import shuffle from 'lodash/shuffle';
import Task from './Task';
import boardSlice from '../redux/boardSlice';

function Column({ colIndex }) {
    const colors = [
        'bg-teal-500',
        'bg-purple-500',
        'bg-indigo-500',
        'bg-blue-500',
        'bg-orange-500',
        'bg-red-500',
        'bg-rose-500',
        'bg-pink-500',
        'bg-yellow-500',
        'bg-sky-500',

    ]
  const dispatch = useDispatch();
  const [color, setColor] = useState(null);
  const boards = useSelector(state => state.boards);
  const board = boards.find(board => board.isActive);
  const col = board.columns.find((col, i) => i === colIndex);

  useEffect(() => {
    setColor(
      shuffle(colors).pop()
    );
  }, [dispatch]);

  const handelOnDragOver = (e) => {
    e.preventDefault();
  }

  const handelOnDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if (data) {
      const { prevColIndex, taskIndex } = JSON.parse(data);
      if (colIndex !== prevColIndex) {
        dispatch(
          boardSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex })
        );
      }
    }
  }

  return (
    <div
      onDrop={handelOnDrop}
      onDragOver={handelOnDragOver}
      className='scrollbar-hide pt-[90px] min-w-[280px] mx-5'
    >
      <p className='flex text-stone-700 items-center gap-2 tracking-widest md:tracking-[.2em] font-bold'>
        <div className={`rounded-xl w-4 h-4 ${color}`} />
        {col.name} ({col?.tasks?.length})
      </p>
      {col.tasks?.map((task, index) => (
        <Task key={index} taskIndex={index} colIndex={colIndex} />
      ))}
    </div>
  );
}

export default Column;