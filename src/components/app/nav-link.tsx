import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  badgeContent?: string;
  isActive?: boolean;
}

export function NavLink({
  to,
  icon,
  text,
  badgeContent,
  isActive,
}: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded px-3 py-3 transition-all",
        {
          "bg-primary/20 text-primary": isActive,
          "text-muted-foreground hover:text-primary": !isActive,
        }
      )}
    >
      {icon}
      {text}
      {badgeContent && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {badgeContent}
        </Badge>
      )}
    </Link>
  );
}
