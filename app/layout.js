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
                <div style={{ position: 'fixed', bottom: '4px', left: '4px', fontSize: '8px' }}>
                    Last Build: {process.env.NEXT_PUBLIC_BUILD_TIME}
                    <br />
                    model: {process.env.NEXT_PUBLIC_GEMINI_MODEL}
                </div>
                {children}
            </body>
        </html>
    );
}
