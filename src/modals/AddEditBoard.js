import React, { useState } from 'react'
import {v4 as uuidv4} from 'uuid' 
import crossIcon from "../images/icon-cross.svg"
import { useDispatch, useSelector } from 'react-redux';
import boardSlice from '../redux/boardSlice';


function AddEditBoard({ setBoardModalOpen, type }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [isValid, setIsValid] = useState(true);
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const board = useSelector((state) => state.boards).find(
        (board) => board.isActive
      );
      
    const [newColumn, setnewColumn] = useState(
        [
            {name : 'Todo', task: [] , id:uuidv4()},
            {name : 'Doing', task: [] , id:uuidv4()},
        ]
    );
 

    if (type === 'edit' && isFirstLoad) {
        setnewColumn(
          (board.columns || []).map((col) => {
            return {...col , id : uuidv4()}
          })
        )
        setName(board.name)
        setIsFirstLoad(false)
    }
    
    const valid = () => {
        setIsValid(false);
        if(!name.trim()){
            return false;
        }
        for ( let i = 0; i <  newColumn.length ; i++){
            if (!newColumn[i].name.trim()) {
                return false;
            }
        }
        setIsValid(true);
        return true
    }
      
    const onChange =(id, newValue) => {
        setnewColumn((pervState) => {
            const newState = [...pervState];
            const column = newState.find((col) => col.id === id);
            column.name = newValue;
            return newState;
        })
    }
    
    const onDelete = (id) => {
        setnewColumn((perState) => perState.filter((el) => el.id !== id));
    }
    

    const onSubmit = (type) => {
        setBoardModalOpen(false);
        if (type === 'add') {
            dispatch(boardSlice.actions.addBoard({ name, newColumn }));
        }
        else {
            dispatch(boardSlice.actions.editBoard({ name, newColumn }))
        }
    };
  return (
    <div className='fixed right-0 left-0 top-0 bottom-0 px-2 py-4 overflow-scroll z-50 justify-center items-center flex bg-[#00000080] scrollbar-hide' onClick = {(e) => {
          if (e.target !== e.currentTarget) {
          return
          }
          setBoardModalOpen(false)
      }}>
          <div className='scrollbar-hide overflow-y-scroll max-h-[95vh] font-bold shadow-lg max-w-md mx-auto w-full px-8 py-8 rounded-lg bg-slate-100'>
              <h3 className='text-xl '>
                  {type === 'edit' ? 'Edit' : 'Add New'} Board
              </h3>
              <div className='mt-6 flex flex-col space-y-4'>
                  <label className='text-sm '>
                      Board
                  </label>
                  <input className='bg-transparent px-4 py-2 rounded-sm text-sm  border border-cyan-900 focus:outline-cyan-500 outline-1 ring-0' placeholder='type your board' value={name} onChange={(e) => {
                    setName(e.target.value);
                  }} 
                  id='board-name-input'/>
              </div>
              <div className=' mt-8 flex flex-col space-y-3'>
                <label className='text-sm '>
                    Board
                    </label>
                    {
newColumn.map((column,index) => (
    <div key={index} className='flex items-center w-full' >
           <input   className='bg-transparent flex-grow px-4 py-2 rounded-md text-md border border-gray-400 '  onChange={(e) => {
            onChange(column.id , e.target.value)
           }} 
         value={column.name} type="text"/>

        <img src={crossIcon} className='cursor-pointer m-4' onClick={() => {
            onDelete(column.id)}}/>
        </div>
))
                    }
              </div>
              <div>
                  <button className='w-full items-center hover:opacity-60 bg-lime-800 rounded-xl mt-5 text-white p-2' onClick={() => {
                      setnewColumn((state) => [
                        ...state,{ name: "", tasks: [], id: uuidv4() },
                    ])
                  }}>
                      +Add New
                  </button>
                  <button className='w-full items-center hover:opacity-60  mt-6 relative text-white bg-emerald-700 p-2 rounded-xl' onClick={
                      () => {
                          const isValid = valid()
                          if(isValid === true) onSubmit(type)
                      }
                  }>
                      {type === 'add' ? 'Create New' : 'Save'}
                  </button>
              </div>
          </div>
    </div>
  )
}

export default AddEditBoard