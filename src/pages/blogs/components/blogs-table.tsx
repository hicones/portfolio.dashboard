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
import { ArticleProps } from "@/services/schemas/add.article.schema";
import { LuTrash } from "react-icons/lu";
import { TbEdit } from "react-icons/tb";

export const BlogsTable = ({ blogs }: { blogs: ArticleProps[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Titulo</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Link</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogs.map((article, index) => (
          <TableRow key={index}>
            <TableCell>{article.title}</TableCell>
            <TableCell>
              {article.description
                .substring(0, 30)
                .concat(article.description.length > 30 ? "..." : "")}
            </TableCell>
            <TableCell>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Link
              </a>
            </TableCell>
            <TableCell className="flex gap-4 items-center">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <TbEdit className="h-4 w-4" />
                Editar
              </Button>
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

        {blogs.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhum artigo encontrado
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
