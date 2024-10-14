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
import { SkillSchema, skillSchema } from "@/services/schemas/add-skill.schema";
import { SkillProps } from "@/types/skills";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { TbSquareRoundedPlus } from "react-icons/tb";

export const AddSkills = () => {
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
          <DialogTitle>Adicionar Nova Skill</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <SkillForm onSubmit={() => {}} />
      </DialogContent>
    </Dialog>
  );
};

function SkillForm({
  onSubmit,
}: {
  onSubmit: (skill: Omit<SkillProps, "id">) => void;
}) {
  const form = useForm<SkillSchema>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      name: "",
      progress: 0,
    },
  });

  const handleSubmit: SubmitHandler<SkillSchema> = (data) => {
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
          name="progress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progresso</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Adicionar Skill</Button>
      </form>
    </Form>
  );
}
