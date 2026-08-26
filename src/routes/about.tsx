import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — aesthet0write" },
      {
        name: "description",
        content:
          "aesthet0write is a quiet writing desk: type anything, save it as a file, come back and edit it.",
      },
      { property: "og:title", content: "About — aesthet0write" },
      {
        property: "og:description",
        content: "A quiet writing desk: type, save as a file, return and edit.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24">
      <article className="paper rounded-xl border px-8 py-10">
        <h1 className="font-display text-3xl tracking-tight">About</h1>
        <p className="mt-5 leading-7 text-muted-foreground">
          aesthet0write is a desk, not a workspace. One page, one sheet of paper, nothing blinking
          for attention. You write, you name it, you save it. Everything stays on your own device.
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">
          Saved pieces live behind the history icon. Open one to keep editing, or pull it down as a
          plain text file you can take anywhere.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Write", "A blank sheet of paper and your mind."],
            ["Save", "Named files, kept locally."],
            ["Return", "Reopen and edit any time."],
          ].map(([term, def]) => (
            <div key={term} className="rounded-lg border px-4 py-3">
              <dt className="text-sm font-medium text-primary">{term}</dt>
              <dd className="mt-1 text-sm text-muted-foreground">{def}</dd>
            </div>
          ))}
        </dl>
      </article>
    </main>
  );
}
