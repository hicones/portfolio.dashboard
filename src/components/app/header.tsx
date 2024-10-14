import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  TbBook,
  TbBriefcase,
  TbCategoryPlus,
  TbLogout2,
  TbMenu2,
  TbMoon,
  TbSun,
  TbUser,
} from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { NavLink } from "./nav-link";
import { useCookies } from "react-cookie";
import { PiArticleBold, PiCertificate, PiStarBold } from "react-icons/pi";
import { SiAiohttp } from "react-icons/si";

export function Header({
  isDarkMode,
  toggleTheme,
}: {
  isDarkMode: boolean | string;
  toggleTheme: () => void;
}) {
  const { pathname } = useLocation();

  const [, , removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie("hicones-dashboard");
    window.location.reload();
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:min-h-[60px] lg:px-6 md:justify-end justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <TbMenu2 className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <NavLink
              to="/"
              icon={<SiAiohttp className="size-5" />}
              text="Projetos"
              isActive={pathname === "/"}
            />
            <NavLink
              to="/blogs"
              icon={<PiArticleBold className="size-5" />}
              text="Artigos"
              isActive={pathname.includes("/blogs")}
            />
            <NavLink
              to="/skills"
              icon={<PiStarBold className="size-5" />}
              text="Skills"
              isActive={pathname.includes("/skills")}
            />
            <NavLink
              to="/categories"
              icon={<TbCategoryPlus className="size-5" />}
              text="Categorias"
              isActive={pathname.includes("/categories")}
            />
            <NavLink
              to="/experiences"
              icon={<TbBriefcase className="size-5" />}
              text="Experiências"
              isActive={pathname.includes("/experiences")}
            />
            <NavLink
              to="/education"
              icon={<TbBook className="size-5" />}
              text="Formação"
              isActive={pathname.includes("/education")}
            />
            <NavLink
              to="/certifications"
              icon={<PiCertificate className="size-5" />}
              text="Certificados"
              isActive={pathname.includes("/certifications")}
            />
            <NavLink
              to="/profile"
              icon={<TbUser className="size-5" />}
              text="Perfil"
              isActive={pathname.includes("/profile")}
            />
            <Button
              variant="outline"
              size="icon"
              className="w-fit p-2 rounded-full"
              onClick={() => toggleTheme()}
            >
              {isDarkMode ? (
                <TbSun className="h-5 w-5" />
              ) : (
                <TbMoon className="h-5 w-5" />
              )}
            </Button>
            <div className="mt-auto p-4">
              <Button
                variant="outline"
                size="icon"
                className="w-full flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <TbLogout2 />
                Sair
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      <img src="/logo.svg" alt="logo" className="h-8 block md:hidden" />
      <Button
        variant="outline"
        size="icon"
        className="w-fit p-2 rounded-full hidden md:block"
        onClick={() => toggleTheme()}
      >
        {isDarkMode ? (
          <TbSun className="h-5 w-5" />
        ) : (
          <TbMoon className="h-5 w-5" />
        )}
      </Button>
    </header>
  );
}
