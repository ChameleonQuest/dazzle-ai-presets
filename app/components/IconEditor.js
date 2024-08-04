import React, { useEffect, useState, useRef } from 'react';

function IconEditor({ initialIconPath, onSave }) {
    const [localIconPath, setLocalIconPath] = useState(initialIconPath);
    const dialogRef = useRef(null);
    const inputRef = useRef(null);

    const handleEditClick = () => {
        setLocalIconPath(initialIconPath); // Reset local state when opening
        dialogRef.current.showModal();
        inputRef.current?.select();
    };

    const handleSaveClick = () => {
        onSave(localIconPath);
        console.log("Saving new icon path:", localIconPath);
        dialogRef.current.close();
    };

    return (
    <>
        <img 
            src={initialIconPath} 
            style={{ height: '75px', width: '75px', cursor: 'pointer' }} 
            onClick={handleEditClick} 
            alt="Icon" 
        />

        <dialog ref={dialogRef} >
            <h2>Icon Path </h2>
            <div style={{fontSize:'.7rem'}}>Icon should be between 144px and 512px. Also the extension of the file must represent what it really is, this thing is delicate.</div>
            <input ref={inputRef} type="text" style={{marginBottom: '16px', width:'100%'}} value={localIconPath} onChange={(e) => setLocalIconPath(e.target.value)} />
            <div className="button-row">
                <span className="text-button" onClick={handleSaveClick}>Save</span>
                <span className="text-button" onClick={() => dialogRef.current.close()}>Cancel</span>
            </div>
        </dialog>
    </>
    );
}

export default IconEditor;
