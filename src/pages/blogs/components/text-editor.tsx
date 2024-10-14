import { useState, useRef, useEffect } from "react";
import {
  LuBold,
  LuItalic,
  LuUnderline,
  LuLink,
  LuList,
  LuListOrdered,
  LuCode,
  LuImage as ImageIcon,
} from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ArticleEditor() {
  const [conteudo, setConteudo] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [activeToggles, setActiveToggles] = useState<string[]>([]);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = conteudo;
      document.execCommand("defaultParagraphSeparator", false, "p");
    }
  }, []);

  const aplicarFormatacao = (
    comando: string,
    valor: string | undefined = undefined
  ) => {
    document.execCommand(comando, false, valor);
    if (editorRef.current) {
      setConteudo(editorRef.current.innerHTML);
    }
    if (["bold", "italic", "underline"].includes(comando)) {
      toggleActive(comando);
    }
  };

  const toggleActive = (comando: string) => {
    setActiveToggles((prev) =>
      prev.includes(comando)
        ? prev.filter((item) => item !== comando)
        : [...prev, comando]
    );
  };

  const handleInput = () => {
    if (editorRef.current) {
      setConteudo(editorRef.current.innerHTML);
    }
  };

  const inserirLink = () => {
    if (linkUrl && linkText) {
      document.execCommand("createLink", false, linkUrl);
      setLinkUrl("");
      setLinkText("");
      setIsLinkDialogOpen(false);
      if (editorRef.current) {
        setConteudo(editorRef.current.innerHTML);
      }
    }
  };

  const inserirImagem = () => {
    if (imageUrl) {
      document.execCommand("insertImage", false, imageUrl);
      setImageUrl("");
      setIsImageDialogOpen(false);
      if (editorRef.current) {
        setConteudo(editorRef.current.innerHTML);
      }
    }
  };

  const inserirBlocoCodigo = () => {
    const codeBlock = "<pre><code>// Seu código aqui</code></pre>";
    document.execCommand("insertHTML", false, codeBlock);
    if (editorRef.current) {
      setConteudo(editorRef.current.innerHTML);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target && typeof event.target.result === "string") {
            document.execCommand("insertImage", false, event.target.result);
            if (editorRef.current) {
              setConteudo(editorRef.current.innerHTML);
            }
          }
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full mt-4">
      <Card className="w-full">
        <CardContent>
          <div className="mb-4 py-2 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => aplicarFormatacao("bold")}
              className={
                activeToggles.includes("bold")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              <LuBold className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => aplicarFormatacao("italic")}
              className={
                activeToggles.includes("italic")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              <LuItalic className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => aplicarFormatacao("underline")}
              className={
                activeToggles.includes("underline")
                  ? "bg-primary text-primary-foreground"
                  : ""
              }
            >
              <LuUnderline className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => aplicarFormatacao("insertUnorderedList")}
            >
              <LuList className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => aplicarFormatacao("insertOrderedList")}
            >
              <LuListOrdered className="h-4 w-4" />
            </Button>
            <Dialog open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <LuLink className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inserir Link</DialogTitle>
                </DialogHeader>
                <Input
                  type="url"
                  placeholder="https://exemplo.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="mb-2"
                />
                <Input
                  type="text"
                  placeholder="Texto do link"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={inserirLink}>Inserir</Button>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isImageDialogOpen}
              onOpenChange={setIsImageDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Inserir Imagem</DialogTitle>
                </DialogHeader>
                <Input
                  type="url"
                  placeholder="https://exemplo.com/imagem.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mb-2"
                />
                <Button onClick={inserirImagem}>Inserir</Button>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon" onClick={inserirBlocoCodigo}>
              <LuCode className="h-4 w-4" />
            </Button>
            <Select
              onValueChange={(value) => aplicarFormatacao("formatBlock", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Estilo de texto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="p">Parágrafo</SelectItem>
                <SelectItem value="h1">Título 1</SelectItem>
                <SelectItem value="h2">Título 2</SelectItem>
                <SelectItem value="h3">Título 3</SelectItem>
                <SelectItem value="h4">Título 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="min-h-[400px] p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 prose max-w-none w-full"
          />
        </CardContent>
      </Card>
      <Button className="mt-4 px-10">Salvar</Button>
    </div>
  );
}
