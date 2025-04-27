import "./globals.css";
import "./non-mobile.css";
import "./mobile.css";

export const metadata = {
    title: "Dazzle AI Presets",
    description: "Save your AI context once, then run it from your home screen.",
};

export default function RootLayout({ children }) {
return (
    <html lang="en">
    <body>
        <div style={{position: 'fixed', bottom: '4px', left: '4px', fontSize: '8px'}}>
            20250427.1413
        </div>
        {children}
    </body>
    </html>
);
}
