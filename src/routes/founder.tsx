import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Founder — aesthet0write" },
      {
        name: "description",
        content: "The person behind aesthet0write and why the desk stays this clean.",
      },
      { property: "og:title", content: "Founder — aesthet0write" },
      {
        property: "og:description",
        content: "The person behind aesthet0write and why the desk stays this clean.",
      },
    ],
  }),
  component: Founder,
});

function Founder() {
  return (
    <main className="mx-auto max-w-2xl px-5 pb-24">
      <article className="paper rounded-xl border px-8 py-10">
        <h1 className="font-display text-3xl tracking-tight">Founder</h1>
        <div className="mt-6 flex items-center gap-4">
          <div className="font-display flex size-14 items-center justify-center rounded-full bg-primary text-xl text-primary-foreground">
            A
          </div>
          <div>
            <p className="font-medium">Asher</p>
            <p className="text-sm text-muted-foreground">Founder &amp; sole caretaker</p>
          </div>
        </div>
        <p className="mt-6 leading-7 text-muted-foreground">
          I built aesthet0write because every writing app I opened wanted me to organize before I
          could write. This one asks for nothing: a red line, a white page, and whatever you have to
          say.
        </p>
        <p className="mt-4 leading-7 text-muted-foreground">
          It stays small on purpose. If a feature would put something between you and the first
          sentence, it doesn't ship.
        </p>
      </article>
    </main>
  );
}
