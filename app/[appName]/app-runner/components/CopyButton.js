import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { MdContentCopy } from 'react-icons/md'; // Or your preferred icon library

function CopyButton({ text }) {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1500); // Reset after 1.5 seconds
    };

    return (
        <CopyToClipboard text={text} onCopy={handleCopy} >
            <span style={{fontSize: '1.2rem', position:'relative', top:'5px'}}>
                <MdContentCopy style={{cursor:'pointer', color: isCopied ? 'green' : ''}}/>
            </span>
        </CopyToClipboard>
    );
}

export default CopyButton