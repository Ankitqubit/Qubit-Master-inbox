import { agents, getAgentById } from "../data/agents"
import { AgentDetails } from "../components/agent-details"

export function generateStaticParams() {
  return agents.map((agent) => ({
    id: agent.id,
  }))
}

export default function AgentDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const agent = getAgentById(params.id)

  if (!agent) {
    return (
      <div className="flex-1 space-y-6 px-6 py-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Agent not found</h1>
          <p className="text-sm text-gray-500">The requested agent could not be found.</p>
        </div>
      </div>
    )
  }

  return <AgentDetails agent={agent} />
}