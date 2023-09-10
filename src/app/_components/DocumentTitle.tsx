"use client";
import { useDocumentTitle } from "@mantine/hooks";

export default function DocumentTitle({ title }: { title: string }) {
  useDocumentTitle(title);
  return null;
}
