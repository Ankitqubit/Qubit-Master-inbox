import { agents, getAgentById } from "../../data/agents"
import { AgentEditor } from "../../components/agent-editor"

export function generateStaticParams() {
  return agents.map((agent) => ({
    id: agent.id,
  }))
}

export default function AgentEditPage({
  params,
}: {
  params: { id: string }
}) {
  const agent = getAgentById(params.id)

  if (!agent) {
    return (
      <div className="h-full p-8">
        <h1 className="text-2xl font-semibold tracking-tight">Agent not found</h1>
      </div>
    )
  }

  return <AgentEditor agent={agent} />
}