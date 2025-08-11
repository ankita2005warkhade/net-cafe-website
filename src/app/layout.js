import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider"; // if you use next-themes wrapper

export const metadata = {
  title: "NetCafé",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="pt-16"> {/* matches navbar height so content is below it */}
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
