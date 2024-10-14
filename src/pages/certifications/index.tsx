import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paginator } from "@/components/app/paginator";
import { Addcertifications } from "./components/add-certifications";
import { CertificationsTable } from "./components/certifications-table";
import { CertificationProps } from "@/services/schemas/add-certification.schema";

export function CertificationsPage() {
  const [certifications] = useState<CertificationProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertifications = certifications.filter((certification) =>
    certification.institution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Certificados</h1>
      <div className="flex gap-4 flex-col">
        <div className="flex items-center gap-4">
          <fieldset className="w-fit lg:w-full max-w-sm">
            <Input
              placeholder="Buscar"
              type="text"
              name="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </fieldset>
          <Addcertifications />
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize os certificados</CardDescription>
        </CardHeader>
        <CardContent>
          <CertificationsTable certifications={filteredCertifications} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Paginator totalPages={5} onPageChange={() => {}} page={1} />
        </CardFooter>
      </Card>
    </section>
  );
}
