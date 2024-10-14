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
  ArticleProps,
  articleSchema,
} from "@/services/schemas/add.article.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const AddArticles = () => {
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
          <DialogTitle>Adicionar novo Artigo</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <ArticleForm onSubmit={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

function ArticleForm({
  onSubmit,
}: {
  onSubmit: (skill: Omit<ArticleProps, "id">) => void;
}) {
  const form = useForm<ArticleProps>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const handleSubmit: SubmitHandler<ArticleProps> = (data) => {
    console.log({
      ...data,
    });
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
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
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="url"
                  placeholder="https://your.article.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar artigo</Button>
      </form>
    </Form>
  );
}
