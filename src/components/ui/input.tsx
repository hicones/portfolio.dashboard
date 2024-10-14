import * as React from "react";

import { cn } from "@/lib/utils";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { TbSearch } from "react-icons/tb";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, name, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <fieldset className="relative h-full w-full">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <PiEyeClosed size={18} /> : <PiEye size={18} />}
          </button>
        )}
        {name === "search" && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <TbSearch size={18} />
          </div>
        )}
      </fieldset>
    );
  }
);
Input.displayName = "Input";

export { Input };
