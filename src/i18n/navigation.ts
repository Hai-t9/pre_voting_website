// src/i18n/navigation.ts
// Wraps next-intl navigation APIs (Link, useRouter, usePathname) configured
// with our locale routing so links/redirects automatically handle ar/en/fr prefixes.
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);