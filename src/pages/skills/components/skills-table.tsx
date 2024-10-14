import { DialogComponent } from "@/components/app/dialog-component";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SkillProps } from "@/types/skills";
import { LuTrash } from "react-icons/lu";

export const SkillsTable = ({ skills }: { skills: SkillProps[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Progress</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skills.map((skill) => (
          <TableRow key={skill.id}>
            <TableCell>{skill.name}</TableCell>
            <TableCell>{skill.progress}</TableCell>
            <TableCell>
              <DialogComponent
                trigger={
                  <Button
                    variant="destructiveOutline"
                    size="sm"
                    className="flex gap-2 items-center justify-center"
                  >
                    <LuTrash size={18} /> Excluir
                  </Button>
                }
                title={`Excluir`}
                description={`Tem certeza que deseja excluir?`}
                type="destructive"
              />
            </TableCell>
          </TableRow>
        ))}

        {skills.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhum projeto encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
