import { Input } from "@/components/ui/input";
import { cn, removeMask } from "@/lib/utils";
import { HTMLInputTypeAttribute } from "react";
import { Controller } from "react-hook-form";
import { IconType } from "react-icons";
import { PatternFormat, PatternFormatProps } from "react-number-format";

type InputProps = React.ComponentProps<typeof Input> &
  Omit<PatternFormatProps, "type" | "format">;

interface ItemTextProps extends InputProps {
  label?: string;
  mask?: string;
  error?: string;
  name: string;
  control?: any;
  type?: HTMLInputTypeAttribute;
  icon?: IconType;
}

export function UnmaskedFieldText({
  label,
  className,
  name,
  control,
  type,
  error,
  ...props
}: ItemTextProps) {
  return (
    <fieldset className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={name} className="text-label mb-2">
          {label}
        </label>
      )}
      <div className="relative h-fit w-full">
        {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Input type={type} id={name} {...props} {...field} />
            )}
          />
        ) : (
          <Input type={type} {...props} />
        )}
      </div>
      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : (
        <div className="h-5" />
      )}
    </fieldset>
  );
}

export function UncontrolledFieldText({
  label,
  mask,
  id,
  className,
  error,
  ...props
}: Omit<PatternFormatProps, "type" | "format"> & {
  label?: string;
  mask: string;
  error?: string;
  id?: string;
}) {
  return (
    <fieldset className={cn("flex flex-col", className)}>
      {label && (
        <label htmlFor={id} className="text-label mb-2">
          {label}
        </label>
      )}

      <PatternFormat
        format={mask}
        customInput={Input}
        id={id}
        className={cn({
          "border-red-500": error,
          "mb-5": !error,
        })}
        {...props}
      />

      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : (
        <div className="h-5" />
      )}
    </fieldset>
  );
}

export function MaskedFieldText({
  label,
  mask,
  className,
  error,
  name,
  control,
  ...props
}: Omit<PatternFormatProps, "type" | "format"> & {
  label?: string;
  mask: string;
  error?: string;
  control: any;
  name: string;
  icon?: IconType;
}) {
  return (
    <fieldset className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={name} className="text-label mb-2">
          {label}
        </label>
      )}
      {props.required && <span className="text-red-500">*</span>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <PatternFormat
            format={mask}
            className={cn("", {
              "border-red-500": error,
            })}
            {...props}
            value={field.value}
            onValueChange={(values) => {
              const unmaskedValue = removeMask(values.value);
              field.onChange(unmaskedValue);
            }}
            id={name}
            customInput={Input}
          />
        )}
      />
      {error ? (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      ) : (
        <div className="h-5" />
      )}
    </fieldset>
  );
}

export function FormField({
  label,
  mask,
  error,
  control,
  icon: Icon,
  ...props
}: ItemTextProps) {
  return (
    <>
      {mask ? (
        <MaskedFieldText
          customInput={Input}
          label={label}
          mask={mask}
          error={error}
          control={control}
          icon={Icon}
          {...props}
        />
      ) : (
        <UnmaskedFieldText
          label={label}
          error={error}
          control={control}
          icon={Icon}
          {...props}
        />
      )}
    </>
  );
}
