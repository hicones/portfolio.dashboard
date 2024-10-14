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
import { AddArticles } from "./components/add-articles";
import { BlogsTable } from "./components/blogs-table";
import { Button } from "@/components/ui/button";
import { LuPenSquare } from "react-icons/lu";
import { ArticleProps } from "@/services/schemas/add.article.schema";
import { BlogsMock } from "@/lib/constants";
import { Link } from "react-router-dom";

export function BlogsPage() {
  const [blogs] = useState<ArticleProps[]>(BlogsMock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBlogs = blogs.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Artigos</h1>
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
          <AddArticles />
          <Link to="/blogs/new">
            <Button className="flex items-center gap-2" variant="secondary">
              <LuPenSquare className="w-4 h-4" />
              Escrever Novo Artigo
            </Button>
          </Link>
        </div>

        <Separator />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resultados</CardTitle>
          <CardDescription>Visualize os artigos</CardDescription>
        </CardHeader>
        <CardContent>
          <BlogsTable blogs={filteredBlogs} />
        </CardContent>
      </Card>
    </section>
  );
}
