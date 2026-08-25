import { createFileRoute, Link } from "@tanstack/react-router";
import { PenLine, FileText, RotateCcw, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "aesthet0write — write, save, revisit" },
      {
        name: "description",
        content:
          "A clean red-and-white desk for writing. Save what you write as a file in the web and reopen or edit it whenever.",
      },
      { property: "og:title", content: "aesthet0write — write, save, revisit" },
      {
        property: "og:description",
        content: "A clean red-and-white desk for writing and keeping your files.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="mx-auto max-w-5xl px-5 pb-24">
      <section className="py-12 sm:py-20">
        <div className="paper rounded-xl border px-6 py-12 sm:px-10 sm:py-16">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <h1 className="font-display text-3xl tracking-tight sm:text-5xl">
                A clean desk for{" "}
                <span className="text-primary">whatever you have to say.</span>
              </h1>
              <p className="mt-5 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                aesthet0write is a quiet sheet of paper: write anything, save it as a file, and come
                back later to keep going. Everything lives on your device.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/write"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Start writing
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/files"
                  className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Your files
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:w-72">
              {[
                { icon: PenLine, label: "Write" },
                { icon: FileText, label: "Save" },
                { icon: RotateCcw, label: "Return" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-lg border px-3 py-4 text-center"
                >
                  <Icon className="size-5 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
