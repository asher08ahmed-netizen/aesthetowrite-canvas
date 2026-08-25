export type Doc = {
  id: string;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
};

const KEY = "aesthet0write.docs";

export function loadDocs(): Doc[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Doc[];
    return Array.isArray(parsed) ? parsed.sort((a, b) => b.updatedAt - a.updatedAt) : [];
  } catch {
    return [];
  }
}

export function saveDocs(docs: Doc[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(docs));
}

export function newId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
