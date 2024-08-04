"use client";
import React, { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

function CloudinaryIconEditor({ initialIconPath, onUpload }) {
    const [imageUrl, setImageUrl] = useState(initialIconPath);
    const handleUpload = (result) => {
        // console.log("result.info", result.info);
        setImageUrl(result.info.secure_url);
        onUpload(result.info.secure_url);
    };

    const openWidget = (open) => (event) => {
        event.preventDefault();
        open();
    };
    
    return (
        <div>
            <CldUploadWidget
                uploadPreset="stlqw3fx"
                width="75"
                height="75"
                onSuccess={handleUpload}
                options={{ sources: ['local', 'url', 'camera'] }}
            >
            {({ open }) => (
                <span onClick={openWidget(open)} className="upload-button" style={{cursor: 'pointer'}}>
                    <img src={imageUrl} alt="Uploaded Icon" width="75" height="75" className="icon-image" />
                </span>
            )}
            </CldUploadWidget>
        </div>    
    );
}

export default CloudinaryIconEditor;
