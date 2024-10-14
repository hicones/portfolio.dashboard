import { Separator } from "@/components/ui/separator";
import ArticleEditor from "./components/text-editor";

export function CreateArticlePage() {
  return (
    <section className="flex flex-col gap-2">
      <h1 className="font-bold text-2xl">Novo artigo</h1>

      <Separator />

      <ArticleEditor />
    </section>
  );
}
