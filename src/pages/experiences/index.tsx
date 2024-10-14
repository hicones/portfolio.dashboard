import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { experiencesMock } from "@/lib/constants";
import { ExperienceProps } from "@/services/schemas/add-experience.schema";
import { AddExperiences } from "./components/add-experiences";
import { ExperiencesTable } from "./components/experiences-table";

export function ExperiencesPage() {
  const [experiences] = useState<ExperienceProps[]>(experiencesMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperiences = experiences.filter((experience) =>
    experience.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Experiências</h1>
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
          <AddExperiences />
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize as experiências</CardDescription>
        </CardHeader>
        <CardContent>
          <ExperiencesTable experiences={filteredExperiences} />
        </CardContent>
      </Card>
    </section>
  );
}
