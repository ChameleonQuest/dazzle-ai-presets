'use client';
import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { usePathname, useSearchParams } from 'next/navigation';

const QrCode = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();    
    // const router = useRouter();
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setUrl(`${window.location.origin}${pathname}?${searchParams.toString()}`);
        }
    }, [pathname, searchParams]);
    
    return (
        <QRCodeSVG value={url} size={250} />
    );
};

export default QrCode;
