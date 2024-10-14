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
import { formatDate } from "@/lib/utils";
import { CourceProps } from "@/services/schemas/add-course.schema";
import { LuTrash } from "react-icons/lu";

export const CoursesTable = ({ courses }: { courses: CourceProps[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Empresa</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Período</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courses.map((courses, index) => (
          <TableRow key={index}>
            <TableCell>{courses.institution}</TableCell>
            <TableCell>{courses.title}</TableCell>
            <TableCell>
              {formatDate(courses.startDate)} -{" "}
              {courses.current
                ? "Atualmente"
                : formatDate(courses.endDate || "")}
            </TableCell>
            <TableCell>{courses.description}</TableCell>
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

        {courses.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhuma formação encontrada
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
