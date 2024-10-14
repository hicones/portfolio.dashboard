/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CertificationProps,
  certificationSchema,
} from "@/services/schemas/add-certification.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const Addcertifications = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-fit px-10 flex items-center gap-2">
          <TbSquareRoundedPlus className="w-4 h-4" />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo certificado</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CertificationsForm />
      </DialogContent>
    </Dialog>
  );
};

function CertificationsForm() {
  const [certifications, setCertifications] = useState<CertificationProps[]>(
    []
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<CertificationProps>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      link: "",
      title: "",
      institution: "",
      year: new Date().getFullYear(),
    },
  });

  const { image: certificationImage } = form.watch();

  const onSubmit = (data: CertificationProps) => {
    setCertifications([...certifications, data]);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título do Certificado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instituição</FormLabel>
              <FormControl>
                <Input placeholder="Nome da Instituição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link do Certificado</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  placeholder="https://exemplo.com/certificado"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1900}
                  max={new Date().getFullYear()}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ref, ...rest } }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Imagem do Certificado</FormLabel>
              <FormControl>
                <>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-fit px-8"
                      onClick={handleUploadClick}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    {certificationImage && (
                      <span className="text-sm text-muted-foreground">
                        {certificationImage.name
                          .substring(0, 20)
                          .concat(
                            certificationImage.name.length > 20 ? "..." : ""
                          )}
                      </span>
                    )}
                  </div>
                  <Input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        onChange(file);
                      }
                    }}
                    ref={(e) => {
                      if (e) {
                        fileInputRef.current = e;
                        ref(e);
                      }
                    }}
                    {...rest}
                  />
                  {certificationImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(certificationImage)}
                        alt="Product preview"
                        className="max-w-full h-auto max-h-48 rounded-md"
                      />
                    </div>
                  )}
                </>
              </FormControl>
              <FormDescription>
                Envie uma imagem do seu certificado (máx. 5MB)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Adicionar certificado</Button>
      </form>
    </Form>
  );
}
