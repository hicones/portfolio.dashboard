import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Project } from "@/types/projects";
import { useState } from "react";
import { ProjectsTable } from "./components/projects-table";
import { AddProject } from "./components/add-project";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Paginator } from "@/components/app/paginator";
import { projectsMock } from "@/lib/constants";

export function ProjectsPage() {
  const [projects] = useState<Project[]>(projectsMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Projetos</h1>
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
          <AddProject />
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize os projetos</CardDescription>
        </CardHeader>
        <CardContent>
          <ProjectsTable projects={filteredProjects} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Paginator totalPages={5} onPageChange={() => {}} page={1} />
        </CardFooter>
      </Card>
    </section>
  );
}
