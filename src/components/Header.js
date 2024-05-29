import React, { useState } from "react";
import { IoMdArrowDropdown } from 'react-icons/io'
import iconUp from "../images/icon-chevron-up.svg";
import iconDown from "../images/icon-chevron-down.svg";
import elipsis from "../images/icon-vertical-ellipsis.svg";
import HeaderDropdown from "./HeaderDropdown";
import AddEditBoard from "../modals/AddEditBoard";
import { useDispatch, useSelector } from "react-redux";
import AddEdittask from "../modals/AddEdittask";
import ElipsisMenu from './ElipsisMenu';
import DeleteModal from "../modals/DeleteModal";
import boardSlice from "../redux/boardSlice";

function Header({ setBoardModalOpen, boardModalOpen }) {
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const [openAddEditTask, setOpenAddEditTask] = useState(false);
  const [isElipsisOpen, setIsElipsisOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [boardType, setBoardType] = useState('add');
  const boards = useSelector((state) => state.boards);
  const setOpenEditModal = () => {
    setBoardModalOpen(true);
    setIsElipsisOpen(false);
  };
  const setOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsElipsisOpen(false);
  };
  const onDeleteBtnClick = () => {
    dispatch(boardSlice.actions.deleteBoard());
    dispatch(boardSlice.actions.setBoardActive({ index: 0 }));
    setIsDeleteModalOpen(false);
  };
  const board = boards.find(board => board.isActive);

  const onDropdownClick = () => {
    setOpenDropdown(state => !state);
    setIsElipsisOpen(false);
    setBoardType('add');
  };

  return (
    <div className="p-4 fixed left-0 bg-[#ffcc99] z-50 right-0">
      <header className="flex justify-between items-center">
        {/* left section */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <h2 className="hidden md:inline-block font-bold font-sans md:text-4xl">Todo</h2>
          <div className="flex items-center">
            <h2 className="truncate max-w-[220px] md:text-2xl text-xl font-bold md:ml-18 font-sans">
              {board?.name || 'No Board Selected'}
            </h2>
            <img src={openDropdown ? iconUp : iconDown} className="w-3 ml-2 md:hidden" onClick={onDropdownClick} />
          </div>
        </div>
        {/* right part */}
        <div className="flex space-x-4 items-center md:space-x-6">
          <button
            onClick={() => setOpenAddEditTask(state => !state)}
            className="button hidden md:block"
          >
            + Add new Task
          </button>
          <button
            className="button1 py-2 px-3 md:hidden"
            onClick={() => setOpenAddEditTask(state => !state)}
          >
            +
          </button>
          <img
            src={elipsis}
            onClick={() => {
              setBoardType('edit');
              setOpenDropdown(false);
              setIsElipsisOpen(state => !state);
            }}
            className="cursor-pointer h-6"
          />
          {isElipsisOpen && (
            <ElipsisMenu setOpenDeleteModal={setOpenDeleteModal} setOpenEditModal={setOpenEditModal} type='Boards' />
          )}
        </div>
      </header>
      {openDropdown && <HeaderDropdown setBoardModalOpen={setBoardModalOpen} setOpenDropdown={setOpenDropdown} />}
      {boardModalOpen && <AddEditBoard type={boardType} setBoardModalOpen={setBoardModalOpen} />}
      {openAddEditTask && <AddEdittask setOpenAddEditTask={setOpenAddEditTask} device='mobile' type='add' />}
      {isDeleteModalOpen && (
        <DeleteModal
          title={board.name}
          type='board'
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}

export default Header;
