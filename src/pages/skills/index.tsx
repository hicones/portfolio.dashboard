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
import { skillsMock } from "@/lib/constants";
import { AddSkills } from "./components/add-skills";
import { SkillsTable } from "./components/skills-table";
import { SkillProps } from "@/types/skills";

export function SkillsPage() {
  const [skills] = useState<SkillProps[]>(skillsMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSkills = skills.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Skills</h1>
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
          <AddSkills />
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize as Skills</CardDescription>
        </CardHeader>
        <CardContent>
          <SkillsTable skills={filteredSkills} />
        </CardContent>
      </Card>
    </section>
  );
}
