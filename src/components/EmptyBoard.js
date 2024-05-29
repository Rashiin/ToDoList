import React, { useState } from "react";
import AddEditBoard from '../modals/AddEditBoard'

function EmptyBoard({ type }) {
    const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
    return (
        <div className=' bg-white flex flex-col items-center justify-center h-screen w-screen '>
            <h2 className=' font-mono'>
                {
                    type === 'edit' ? 'Is Empty' : 'There are no Boards !'
                }
            </h2>
            <button
                onClick={
                    () => {
                        setIsBoardModalOpen(true);
                    }
                }
                className=' items-center w-full max-w-xs hover:opacity-50 p-2 rounded-xl'>
                {
                    type === 'edit' ? ' + Add new column' : ' + Add new Board'
                }
            </button>
            {
                isBoardModalOpen && (
                    <AddEditBoard type={type} setBoardModalOpen={setIsBoardModalOpen} />
                )
            }
        </div>
    );
}

export default EmptyBoard;