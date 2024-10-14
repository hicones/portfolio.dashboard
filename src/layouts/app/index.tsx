import { Header } from "@/components/app/header";
import { Sidebar } from "@/components/app/sidebar";
import { useEffect, useState } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export default function AppLayout() {
  const data = useLoaderData() as { theme: string };
  const theme = sessionStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState(
    theme ? (theme === "dark" ? true : false) : data.theme
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    sessionStorage.setItem("theme", isDarkMode ? "light" : "dark");
  };

  useEffect(() => {
    if (theme && theme === "dark") {
      document.documentElement.classList.add(theme);
    } else if (!theme && data.theme) {
      document.documentElement.classList.add(data.theme);
      sessionStorage.setItem("theme", data.theme);
    }
  }, [data?.theme, theme]);

  return (
    <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className="p-2 size-full py-4 md:p-5 main-scrollable">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
