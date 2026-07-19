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
                <div style={{ position: 'fixed', bottom: '4px', left: '4px', right: '4px', fontSize: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Last Build: {process.env.NEXT_PUBLIC_BUILD_TIME}</span>
                    <span>Model: {process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-3.5-flash"}</span>
                </div>
                {children}
            </body>
        </html>
    );
}
