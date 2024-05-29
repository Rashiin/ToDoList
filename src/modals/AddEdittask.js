import React, { useState } from "react";
import { v4 as uuidv4, validate } from "uuid";
import crossIcon from "../images/icon-cross.svg";
import { useSelector  , useDispatch} from "react-redux";
import boardSlice from "../redux/boardSlice";

function AddEdittask({ type, device, setOpenAddEditTask, setIsTaskModalOpen, prevColIndex = 0, taskIndex }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [isValid, setIsValid] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const board = useSelector((state) => state.boards).find((board) => board.isActive);
  const columns = board?.columns || [];
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns.length > 0 ? columns[prevColIndex].name : "");

  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    { title: "", isCompleted: false, id: uuidv4() },
  ]);

  if (type === 'edit' && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };
  
  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onChange = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const valid = () => {
    if (!title.trim()) {
      setIsValid(false);
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        setIsValid(false);
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onSubmit = (type) => {
    if (type === 'add') {
      dispatch(
        boardSlice.actions.addTask({
          title,
          description,
          subtasks,
          status,
          newColIndex,
        })
      );
    } else {
      dispatch(
        boardSlice.actions.editTask({
          title,
          description,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
        })
      );
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setOpenAddEditTask(false);
      }}
      className={
        device === "mobile"
          ? "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 top-0 bottom-[-100vh] bg-[#00000090]"
          : "py-6 px-6 pb-40 absolute overflow-y-scroll left-0 flex right-0 top-0 bg-[#00000090] bottom-0"
      }
    >
      <div className="overflow-y-scroll max-h-[95vh] scrollbar-hide my-auto bg-white text-slate-600 font-serif shadow-md max-w-md mx-auto rounded-md p-6 w-full">
        <h2 className="text-xl">{type === "edit" ? "Edit" : "Add New"} Task</h2>
        <div className="mt-6 flex flex-col space-y-1">
          <label className="text-md">Your Task Name</label>
          <input
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-lg border border-gray-800 ring-0 focus:outline-teal-800"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your task ..."
          />
        </div>

        <div className="mt-6 flex flex-col space-y-1">
          <label className="text-md">Description</label>
          <textarea
            className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-lg border border-gray-800 ring-0 focus:outline-teal-800 min-h-[180px]"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="More data ..."
          />
        </div>

        <div className="mt-6 flex flex-col space-y-1">
          <label className="text-md">Subtasks</label>
          {subtasks.map((subtask, index) => (
            <div key={index} className="flex items-center w-full">
              <input
                onChange={(e) => onChange(subtask.id, e.target.value)}
                value={subtask.title}
                className="bg-transparent outline-none p-3 flex-grow rounded-lg text-sm focus:outline-teal-600 border-zinc-600 border focus:border-0 mb-2"
                type="text"
              />
              <img
                onClick={() => onDelete(subtask.id)}
                src={crossIcon}
                className="m-3 cursor-pointer"
              />
            </div>
          ))}
          <button
            className="w-full items-center bg-emerald-900 p-2 rounded-lg text-white"
            onClick={() =>
              setSubtasks((state) => [
                ...state,
                { title: "", isCompleted: false, id: uuidv4() },
              ])
            }
          >
            + Add new
          </button>
        </div>

        <div className="mt-6 flex space-y-3 flex-col">
          <label className="text-gray-400 text-md">Your Status</label>
          <select
            className="flex p-4 border border-teal-950 status focus:outline-green-900 outline-none focus:border-0"
            value={status}
            onChange={onChangeStatus}
          >
            {columns.map((column, index) => (
              <option value={column.name} key={index}>
                {column.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              if (valid()) {
                onSubmit(type);
                setOpenAddEditTask(false);
              }
            }}
            className="w-full bg-emerald-700 rounded-xl items-center text-gray-200 p-2"
          >
            {type === "edit" ? "Save Edit" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEdittask;