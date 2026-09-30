import "./globals.css";

export const metadata = {
  title: "ManakAI - BIS Standards Hub",
  description:
    "AI-powered Intelligent Assistant for Indian Standards and BIS Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="antialiased bg-slate-50 text-slate-900">{children}
        </div>
      </body>
    </html>
  );
}
