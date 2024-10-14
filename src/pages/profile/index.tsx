/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { languages } from "@/lib/constants";
import {
  ProfileFormValues,
  profileSchema,
} from "@/services/schemas/edit-profile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function ProfilePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      languages: [],
    },
  });

  const { resume } = form.watch();

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(data);
    setIsSubmitting(false);
    // Here you would typically send the data to your backend
  };

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Perfil</h1>
      <div className="flex gap-4 flex-col">
        <p className="text-sm text-muted-foreground">
          Atualize suas informações de perfil aqui.
        </p>
        <Separator />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-screen-md w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="(00) 00000-0000"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input placeholder="Endereço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="languages"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idiomas</FormLabel>
                  <FormControl>
                    <MultiSelect
                      onValueChange={(value) => console.log(value)}
                      options={[...languages]}
                      placeholder="Selecione uma língua"
                      variant="inverted"
                      maxCount={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu.email@exemplo.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cargo</FormLabel>
                <FormControl>
                  <Input placeholder="Seu cargo atual" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="resume"
            render={({ field: { onChange, value, ref, ...rest } }) => (
              <FormItem>
                <FormLabel>Currículo</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploadClick}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload cv
                    </Button>
                    {resume && (
                      <span className="text-sm text-muted-foreground">
                        {resume.name
                          .substring(0, 20)
                          .concat(resume.name.length > 20 ? "..." : "")}
                      </span>
                    )}
                    <Input
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
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
                  </div>
                </FormControl>
                <FormDescription>
                  Envie seu currículo em formato PDF, DOC ou DOCX (máx. 5MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting} className="px-10 py-5">
            {isSubmitting ? "Salvando..." : "Salvar Perfil"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
