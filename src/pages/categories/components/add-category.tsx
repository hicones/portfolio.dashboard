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
import {
  CategorySchema,
  categorySchema,
} from "@/services/schemas/add-category.schema";
import { CategoryProps } from "@/types/categories";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const AddCategories = () => {
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
          <DialogTitle>Adicionar Nova Categoria</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <CategoryForm onSubmit={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

function CategoryForm({
  onSubmit,
}: {
  onSubmit: (skill: Omit<CategoryProps, "id">) => void;
}) {
  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit: SubmitHandler<CategorySchema> = (data) => {
    console.log({
      ...data,
    });

    onSubmit({
      ...data,
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

        <Button type="submit">Adicionar Categoria</Button>
      </form>
    </Form>
  );
}
