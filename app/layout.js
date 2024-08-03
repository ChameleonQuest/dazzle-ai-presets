import "./globals.css";
import "./non-mobile.css";
import "./mobile.css";


// TODO: Uncomment this without creating build errors.
export const metadata = {
title: "Dazzle AI Presets",
description: "Save your AI context once, then run it from your home screen.",
};

export default function RootLayout({ children }) {
return (
    <html lang="en">
    <body>
        {children}
    </body>
    </html>
);
}
