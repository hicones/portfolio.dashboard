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
import { categoriesMock } from "@/lib/constants";
import { CategoriesTable } from "./components/categories-table";
import { AddCategories } from "./components/add-category";
import { CategoryProps } from "@/types/categories";

export function CategoriesPage() {
  const [categories] = useState<CategoryProps[]>(categoriesMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredcategories = categories.filter((skill) =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Categorias</h1>
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
          <AddCategories />
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize as categories</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoriesTable categories={filteredcategories} />
        </CardContent>
      </Card>
    </section>
  );
}
