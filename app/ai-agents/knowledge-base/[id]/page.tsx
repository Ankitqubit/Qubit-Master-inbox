import { KnowledgeBaseContent } from "../components/knowledge-base-content"
import { knowledgeBases } from "../data"

export function generateStaticParams() {
  return knowledgeBases.map((kb) => ({
    id: kb.id,
  }))
}

export default function KnowledgeBaseListingPage({
  params
}: {
  params: { id: string }
}) {
  const currentKB = knowledgeBases.find(kb => kb.id === params.id)

  if (!currentKB) {
    return (
      <div className="h-full p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Knowledge Base not found</h1>
      </div>
    )
  }

  return <KnowledgeBaseContent knowledgeBase={currentKB} />
}