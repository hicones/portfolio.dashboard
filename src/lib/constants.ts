import { Project } from "@/types/projects";

export const projectsMock: Project[] = [
  {
    id: 1,
    name: "Projeto 1",
    categories: ["Frontend", "Backend"],
    photo: "https://source.unsplash.com/random/100x100",
    link: "https://google.com",
    description: "Descrição do projeto 1",
  },
  {
    id: 2,
    name: "Projeto 2",
    categories: ["Frontend"],
    photo: "https://source.unsplash.com/random/100x100",
    link: "https://google.com",
    description: "Descrição do projeto 2",
  },
  {
    id: 3,
    name: "Projeto 3",
    categories: ["Backend"],
    photo: "https://source.unsplash.com/random/100x100",
    link: "https://google.com",
    description: "Descrição do projeto 3",
  },
];

export const skillsMock = [
  {
    id: 1,
    name: "React",
    progress: 80,
  },
  {
    id: 2,
    name: "Node",
    progress: 90,
  },
  {
    id: 3,
    name: "Next",
    progress: 70,
  },
  {
    id: 4,
    name: "Express",
    progress: 60,
  },
  {
    id: 5,
    name: "TypeScript",
    progress: 50,
  },
];

export const categoriesMock = [
  {
    id: 1,
    name: "Frontend",
  },
  {
    id: 2,
    name: "Backend",
  },
  {
    id: 3,
    name: "Fullstack",
  },
  {
    id: 4,
    name: "Mobile",
  },
  {
    id: 5,
    name: "Desktop",
  },
];

export const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Italian", value: "it" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Chinese", value: "zh" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
] as const;

export const experiencesMock = [
  {
    id: 1,
    company: "Company 1",
    jobTitle: "Frontend Developer",
    description: "Description 1",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    currentJob: false,
  },
  {
    id: 2,
    company: "Company 2",
    jobTitle: "Backend Developer",
    description: "Description 2",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    currentJob: false,
  },
  {
    id: 3,
    company: "Company 3",
    jobTitle: "Fullstack Developer",
    description: "Description 3",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    currentJob: false,
  },
];

export const educationsMock = [
  {
    id: 1,
    institution: "Institution 1",
    title: "Title 1",
    description: "Description 1",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    current: false,
  },
  {
    id: 2,
    institution: "Institution 2",
    title: "Title 2",
    description: "Description 2",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    current: false,
  },
  {
    id: 3,
    institution: "Institution 3",
    title: "Title 3",
    description: "Description 3",
    startDate: "2020-01-01",
    endDate: "2020-01-01",
    current: false,
  },
];

export const BlogsMock = [
  {
    id: 1,
    title: "Blog 1",
    description: "Description 1",
    link: "https://google.com", 
  },
  {
    id: 2,
    title: "Blog 2",
    description: "Description 2",
    link: "https://google.com",
  },
  {
    id: 3,
    title: "Blog 3",
    description: "Description 3",
    link: "https://google.com",
  },
];
