type NoteEntry = {
  id: string;
  data: {
    title: string;
    description?: string;
    pubDate?: Date | null;
  };
};

type Props = {
  notes: NoteEntry[];
};

export function NotesSection({ notes }: Props) {
  return (
    <section className="section-panel">
      <div className="section-inner container py-24">
        <p className="eyebrow mb-3">Notas</p>
        <h2 className="section-title mb-10">Publicações recentes</h2>

        {notes.length > 0 ? (
          <ul className="list-none p-0 m-0 mb-8">
            {notes.map((note) => (
              <li key={note.id}>
                <a href={`/docs/notes/${note.id}`} className="article-item">
                  <span className="article-title">{note.data.title}</span>
                  {note.data.description && (
                    <span className="article-meta">
                      {note.data.description}
                      {note.data.pubDate && (
                        <>
                          {" "}
                          &mdash;{" "}
                          {new Date(note.data.pubDate).toLocaleDateString(
                            "pt-BR",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </>
                      )}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="article-meta mb-8">
            Nenhuma publicação disponível ainda.
          </p>
        )}

        <a
          href="/docs"
          className="btn"
          style={{ paddingLeft: 0, border: "none" }}
        >
          Ver todas as notas →
        </a>
      </div>
    </section>
  );
}
