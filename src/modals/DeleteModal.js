import React from 'react'

function DeleteModal({ type, title , onDeleteBtnClick ,setisDeleteModalOpen}) {
  return (
      <div onClick={
          (e) => {
              if (e.target != e.currentTarget) {
                  return
              }
              setisDeleteModalOpen(false)
          }}

          className=' flex left-0 right-0 bottom-0 top-0 p-3 overflow-scroll justify-center items-center fixed scrollbar-hide z-50 bg-[#00000080] max-w-lg'>
          <div className=' scrollbar-hide max-h-[95vh] my-auto bg-slate-50 text-slate-900 overflow-y-scroll w-full p-6 rounded-lg'>
              <h2 className='text-lg font-semibold text-red-700'>
                  Delete {type} ?
              </h2>
              {type === 'task' ? (
                  <p className=' tracking-wider pt-6 font-light'>
                      Are you sure you want to Delete "{title}" task?!
                    
                  </p>
              ) :
                  <p className=' tracking-wider pt-6 font-light'>
                         Are you sure you want to Delete "{title}" board?!
                  </p>
              }
              
              <div className=' w-full flex items-center justify-center space-x-4  mt-4'>
                  <button onClick={
                      onDeleteBtnClick
                  }
                      className=' bg-red-700 text-white hover:opacity-60 rounded-2xl w-full font-mono py-2 items-center'>
                      Delete
                  </button>
                  <button onClick={() => setisDeleteModalOpen(false)}
                      className=' bg-teal-300 text-white hover:opacity-60 rounded-2xl w-full font-mono py-2 items-center'>
                      Cancel
                  </button>
              </div>
          </div>
    </div>
  )
}

export default DeleteModal