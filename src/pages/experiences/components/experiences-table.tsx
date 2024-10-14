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
import { ExperienceProps } from "@/services/schemas/add-experience.schema";
import { LuTrash } from "react-icons/lu";

export const ExperiencesTable = ({
  experiences,
}: {
  experiences: ExperienceProps[];
}) => {
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
        {experiences.map((experiences, index) => (
          <TableRow key={index}>
            <TableCell>{experiences.company}</TableCell>
            <TableCell>{experiences.jobTitle}</TableCell>
            <TableCell>
              {formatDate(experiences.startDate)} -{" "}
              {experiences.currentJob
                ? "Atualmente"
                : formatDate(experiences.endDate || "")}
            </TableCell>
            <TableCell>{experiences.description}</TableCell>
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

        {experiences.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhuma experiência encontrada
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
