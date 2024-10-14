import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import AppLayout from "@/layouts/app";
import AuthLayout from "@/layouts/auth";
import { themeLoader } from "@/lib/utils";
import { Cookies } from "react-cookie";
import { AuthPage } from "./auth";
import { ErrorPage } from "./error";
import { ProjectsPage } from "./projects";
import { SkillsPage } from "./skills";
import { CategoriesPage } from "./categories";
import { ProfilePage } from "./profile";
import { ExperiencesPage } from "./experiences";
import { EducationPage } from "./education";
import { CertificationsPage } from "./certifications";
import { BlogsPage } from "./blogs";
import { CreateArticlePage } from "./blogs/create-article";

const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: async () => {
        const themePreference = await themeLoader();
        const cookies = new Cookies().get("hicones-dashboard");

        if (!cookies) {
          return redirect("auth");
        }

        return {
          theme: themePreference.theme,
        };
      },
      element: <AppLayout />,
      errorElement:
        process.env.NODE_ENV === "development" ? undefined : <ErrorPage />,
      children: [
        {
          element: <ProjectsPage />,
          index: true,
        },
        {
          path: "blogs",
          children: [
            {
              element: <BlogsPage />,
              index: true,
            },
            {
              path: "new",
              element: <CreateArticlePage />,
            },
          ],
        },
        {
          path: "skills",
          element: <SkillsPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "experiences",
          element: <ExperiencesPage />,
        },
        {
          path: "education",
          element: <EducationPage />,
        },
        {
          path: "certifications",
          element: <CertificationsPage />,
        },
      ],
    },
    {
      path: "auth",
      loader: async () => {
        const themePreference = await themeLoader();
        const cookies = new Cookies().get(import.meta.env.VITE_AUTH_KEY);

        if (cookies) {
          return redirect("/");
        }

        return {
          theme: themePreference.theme,
        };
      },
      element: <AuthLayout />,
      children: [
        {
          element: <AuthPage />,
          index: true,
        },
      ],
    },
    {
      element: <ErrorPage />,
      path: "*",
    },
  ],
  {
    basename: process.env.NODE_ENV === "development" ? undefined : "/",
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
