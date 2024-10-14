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
import { CertificationProps } from "@/services/schemas/add-certification.schema";
import { LuTrash } from "react-icons/lu";

export const CertificationsTable = ({
  certifications,
}: {
  certifications: CertificationProps[];
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagem</TableHead>
          <TableHead>Título</TableHead>
          <TableHead>Instituição</TableHead>
          <TableHead>Ano</TableHead>
          <TableHead>Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certifications.map((cert, index) => (
          <TableRow key={index}>
            <TableCell>
              <img
                src={URL.createObjectURL(cert.image)}
                alt={cert.title}
                className="w-16 h-16 object-cover rounded"
              />
            </TableCell>
            <TableCell>{cert.title}</TableCell>
            <TableCell>{cert.institution}</TableCell>
            <TableCell>{cert.year}</TableCell>
            <TableCell>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Ver Certificado
              </a>
            </TableCell>
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

        {certifications.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Nenhum certificado encontrado.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
