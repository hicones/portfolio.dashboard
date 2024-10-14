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
import { Project } from "@/types/projects";
import { LuTrash } from "react-icons/lu";

export const ProjectsTable = ({ projects }: { projects: Project[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Categorias</TableHead>
          <TableHead>Foto</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>{project.categories.join(", ")}</TableCell>
            <TableCell>
              <img
                src={typeof project.photo === "string" ? project.photo : ""}
                alt={project.name}
                className="w-10 h-10 object-cover rounded"
              />
            </TableCell>
            <TableCell>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Link
              </a>
            </TableCell>
            <TableCell>{project.description}</TableCell>
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

        {projects.length === 0 && (
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
