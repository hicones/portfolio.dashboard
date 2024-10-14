export type Project = {
  id: number;
  name: string;
  categories: string[];
  photo: File | null | string;
  link: string;
  description: string;
};
