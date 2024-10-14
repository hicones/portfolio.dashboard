import { Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";

export default function AuthLayout() {
  const data = useLoaderData() as { theme: string };
  const theme = sessionStorage.getItem("theme");

  useEffect(() => {
    if (theme && theme === "dark") {
      document.documentElement.classList.add(theme);
    } else if (!theme && data.theme) {
      document.documentElement.classList.add(data.theme);
      sessionStorage.setItem("theme", data.theme);
    }
  }, [data.theme, theme]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center gap-4 flex-col">
      <img src="/logo.svg" alt="logo" className="h-16" />
      <Outlet />
    </div>
  );
}
