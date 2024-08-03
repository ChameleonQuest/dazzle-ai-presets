import React, { useEffect, useState, useRef } from 'react';
import './InstallAlert.css';

const InstallAlert = () => {
    const [isOpen, setIsOpen] = useState(true);
    const closePopup = () => setIsOpen(false);

    return (
        isOpen && (
            <div id="install-info">
                Use the "Add to home screen" or "Install" option on your browser to save this app.
                <div className="close-button" onClick={closePopup}> &times; </div>
            </div>
        )
    );
}

export default InstallAlert;
