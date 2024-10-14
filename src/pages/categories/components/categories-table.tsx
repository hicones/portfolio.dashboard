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
import { CategoryProps } from "@/types/categories";
import { LuTrash } from "react-icons/lu";

export const CategoriesTable = ({
  categories,
}: {
  categories: CategoryProps[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
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

        {categories.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhuma categoria encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
