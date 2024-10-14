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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ProjectSchema,
  projectSchema,
} from "@/services/schemas/add-project.schema";
import { Project } from "@/types/projects";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { UploadIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const AddProject = () => {
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
          <DialogTitle>Adicionar Novo Projeto</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ProjectForm onSubmit={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

function ProjectForm({
  onSubmit,
}: {
  onSubmit: (project: Omit<Project, "id">) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const form = useForm<ProjectSchema>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: "",
      categories: "",
      photo: undefined,
      link: "",
      description: "",
    },
  });

  const { watch } = form;

  const productImage = watch("photo");

  const handleSubmit: SubmitHandler<ProjectSchema> = (data) => {
    console.log({
      ...data,
      categories: data.categories.split(",").map((cat) => cat.trim()),
    });

    onSubmit({
      ...data,
      photo: URL.createObjectURL(data.photo),
      categories: data.categories.split(",").map((cat) => cat.trim()),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categorias (separadas por vírgula)</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field: { onChange, value, ref, ...rest } }) => (
            <FormItem>
              <FormLabel>Foto</FormLabel>
              <FormControl>
                <>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleUploadClick}
                    >
                      <UploadIcon className="mr-2 h-4 w-4" />
                      Upload Image
                    </Button>
                    {productImage && (
                      <span className="text-sm text-muted-foreground">
                        {productImage.name
                          .substring(0, 20)
                          .concat(productImage.name.length > 20 ? "..." : "")}
                      </span>
                    )}
                    <Input
                      id="image"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          onChange(file);
                        }
                      }}
                      className="hidden"
                      accept="image/*"
                      ref={(e) => {
                        if (e) {
                          fileInputRef.current = e;
                          ref(e);
                        }
                      }}
                      {...rest}
                    />
                  </div>
                  {productImage && (
                    <div className="mt-2">
                      <img
                        src={URL.createObjectURL(productImage)}
                        alt="Product preview"
                        className="max-w-full h-auto max-h-48 rounded-md"
                      />
                    </div>
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar Projeto</Button>
      </form>
    </Form>
  );
}
