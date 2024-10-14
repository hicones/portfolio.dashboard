import {
  TbBook,
  TbBriefcase,
  TbCategoryPlus,
  TbLogout2,
  TbUser,
} from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { useCookies } from "react-cookie";
import { SiAiohttp } from "react-icons/si";
import { PiArticleBold, PiCertificate, PiStarBold } from "react-icons/pi";

export function Sidebar() {
  const { pathname } = useLocation();

  const [, , removeCookie] = useCookies();

  const handleLogout = () => {
    removeCookie("hicones-dashboard");
    window.location.reload();
  };

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full min-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <img src="/logo.svg" className="h-14 aspect-video" alt="logo" />
          </Link>
        </div>
        <div className="flex-1 pt-4">
          <nav className="grid gap-2 items-start px-2 text-sm font-medium lg:px-4">
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
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Button
            variant="outline"
            size="icon"
            className="w-full flex items-center justify-center px-4 gap-2"
            onClick={handleLogout}
          >
            <TbLogout2 className="h-5 w-5" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
}
