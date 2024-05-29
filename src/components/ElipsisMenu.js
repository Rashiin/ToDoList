import React from 'react'

function ElipsisMenu({type , setOpenEditModal , setOpenDeleteModal}) {
  return (
      <div className={type === 'Boards' ? 'absolute right-5 top-16' : 'absolute top-6 right-4'}> 
          <div className='flex items-center justify-end'>
              <div className='text-md w-40 z-50 shadow-lg bg-slate-500 rounded-xl h-auto pr-12 space-y-4 py-5 px-4'>
                  <p onClick={() => {
                      setOpenEditModal()
                  }}
                      className='cursor-pointer text-green-300 '>
                      Edit {type}
                  </p>
                  <p  onClick={() => {
                      setOpenDeleteModal()
                  }}
                      className='cursor-pointer text-rose-500 '>
                      Delete {type}
                  </p>
              </div>
          </div>
    </div>
  )
}

export default ElipsisMenu