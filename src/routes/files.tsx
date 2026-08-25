import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trash2, FileText, Plus } from "lucide-react";
import { loadDocs, saveDocs, type Doc } from "@/lib/docs-store";

export const Route = createFileRoute("/files")({
  head: () => ({
    meta: [
      { title: "Your files — aesthet0write" },
      {
        name: "description",
        content:
          "Every note you saved on aesthet0write, kept right here in the web. Open, edit or delete a file.",
      },
      { property: "og:title", content: "Your files — aesthet0write" },
      {
        property: "og:description",
        content: "Browse and reopen everything you've saved on aesthet0write.",
      },
    ],
  }),
  component: FilesPage,
});

function FilesPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setDocs(loadDocs());
  }, []);

  function remove(id: string) {
    const next = docs.filter((d) => d.id !== id);
    setDocs(next);
    saveDocs(next);
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-24">
      <section className="py-12 sm:py-16">
        <div className="paper rounded-xl border px-6 py-10 sm:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-display text-3xl tracking-tight sm:text-4xl">
                Your <span className="text-primary">files</span>
              </h1>
              <p className="mt-3 text-sm text-muted-foreground">
                Saved inside aesthet0write itself — open any file to keep writing.
              </p>
            </div>
            <Link
              to="/write"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Plus className="size-4" />
              New file
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-8">
        {docs.length === 0 ? (
          <div className="paper rounded-xl border px-6 py-16 text-center">
            <FileText className="mx-auto size-6 text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">
              No files yet. Write something and hit save.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {docs.map((d) => (
              <li key={d.id} className="paper flex flex-col rounded-xl border p-5">
                <button
                  onClick={() => navigate({ to: "/write", search: { doc: d.id } })}
                  className="text-left"
                >
                  <span className="font-display block truncate text-lg tracking-tight">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    Updated {new Date(d.updatedAt).toLocaleString()}
                  </span>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {d.content.trim() || "Empty file"}
                  </p>
                </button>
                <div className="mt-4 flex items-center gap-2 border-t pt-3">
                  <button
                    onClick={() => navigate({ to: "/write", search: { doc: d.id } })}
                    className="text-sm text-primary hover:underline"
                  >
                    Open
                  </button>
                  <span className="flex-1" />
                  <button
                    aria-label={`Delete ${d.title}`}
                    title="Delete"
                    onClick={() => remove(d.id)}
                    className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
