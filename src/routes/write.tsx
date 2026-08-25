import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { History, Save, Plus, Trash2, X } from "lucide-react";
import { loadDocs, saveDocs, newId, type Doc } from "@/lib/docs-store";

export const Route = createFileRoute("/write")({
  validateSearch: (search: Record<string, unknown>): { doc?: string } =>
    typeof search["doc"] === "string" ? { doc: search["doc"] } : {},

  head: () => ({
    meta: [
      { title: "Write — aesthet0write" },
      {
        name: "description",
        content:
          "A quiet sheet of paper. Write anything, save it as a file in the web, and reopen or edit it whenever.",
      },
      { property: "og:title", content: "Write — aesthet0write" },
      {
        property: "og:description",
        content: "A clean red-and-white desk for writing and keeping your files.",
      },
    ],
  }),
  component: WritePage,
});

function WritePage() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24 pt-10">
      <Writer />
    </main>
  );
}

function Writer() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { doc: docParam } = Route.useSearch();

  useEffect(() => {
    const all = loadDocs();
    setDocs(all);
    const found = docParam ? all.find((d) => d.id === docParam) : undefined;
    if (found) {
      setActiveId(found.id);
      setTitle(found.title);
      setContent(found.content);
    }
  }, [docParam]);

  function persist(next: Doc[]) {
    const sorted = [...next].sort((a, b) => b.updatedAt - a.updatedAt);
    setDocs(sorted);
    saveDocs(sorted);
  }

  function save() {
    if (!title.trim() && !content.trim()) return;
    const now = Date.now();
    const existing = docs.find((d) => d.id === activeId);
    const doc: Doc = existing
      ? { ...existing, title: title.trim() || "Untitled", content, updatedAt: now }
      : {
          id: newId(),
          title: title.trim() || "Untitled",
          content,
          createdAt: now,
          updatedAt: now,
        };
    setActiveId(doc.id);
    persist([doc, ...docs.filter((d) => d.id !== doc.id)]);
    setSaved(true);
    if (savedTimer.current) clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1600);
  }

  function open(doc: Doc) {
    setActiveId(doc.id);
    setTitle(doc.title);
    setContent(doc.content);
    setHistoryOpen(false);
  }

  function reset() {
    setActiveId(null);
    setTitle("");
    setContent("");
  }

  function remove(id: string) {
    persist(docs.filter((d) => d.id !== id));
    if (id === activeId) reset();
  }

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;

  return (
    <section className="pb-8">
      <div className="paper relative rounded-xl border">
        <div className="flex items-center gap-2 border-b px-4 py-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="font-display flex-1 bg-transparent text-lg tracking-tight outline-none placeholder:text-muted-foreground/60"
            aria-label="File name"
          />
          <IconButton label="New file" onClick={reset}>
            <Plus className="size-4" />
          </IconButton>
          <IconButton label="History" onClick={() => setHistoryOpen((v) => !v)}>
            <History className="size-4" />
          </IconButton>
          <button
            onClick={save}
            className="ml-1 inline-flex items-center gap-2 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Save className="size-4" />
            {saved ? "Saved to web" : "Save to web"}
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write anything…"
          className="min-h-[58vh] w-full resize-none bg-transparent px-6 py-6 text-[15px] leading-7 outline-none placeholder:text-muted-foreground/60"
          aria-label="Your writing"
        />

        <div className="flex items-center justify-between border-t px-4 py-2 text-xs text-muted-foreground">
          <span>{words} words</span>
          <span>{docs.length} saved</span>
        </div>

        {historyOpen && (
          <aside className="paper absolute right-0 top-0 z-10 h-full w-full max-w-xs overflow-y-auto rounded-xl border-l">
            <div className="flex items-center justify-between border-b px-4 py-3">
              <span className="text-sm font-medium">History</span>
              <IconButton label="Close history" onClick={() => setHistoryOpen(false)}>
                <X className="size-4" />
              </IconButton>
            </div>
            {docs.length === 0 ? (
              <p className="px-4 py-6 text-sm text-muted-foreground">Nothing saved yet.</p>
            ) : (
              <ul className="divide-y">
                {docs.map((d) => (
                  <li key={d.id} className="group flex items-center gap-2 px-4 py-3">
                    <button onClick={() => open(d)} className="flex-1 text-left">
                      <span className="block truncate text-sm">{d.title}</span>
                      <span className="block text-xs text-muted-foreground">
                        {new Date(d.updatedAt).toLocaleString()}
                      </span>
                    </button>
                    <IconButton label={`Delete ${d.title}`} onClick={() => remove(d.id)}>
                      <Trash2 className="size-4" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
      </div>
    </section>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {children}
    </button>
  );
}
