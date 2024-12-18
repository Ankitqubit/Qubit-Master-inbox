export type AgentType = 
  | "customer-support" 
  | "sales" 
  | "technical-support" 
  | "content-writer"
  | "data-analyst"

export type Agent = {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  lastActive?: string
  knowledgeBase?: number
  interactions?: number
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Reply Agent",
    description: "Handles all the replies with AI response",
    status: "active",
    lastActive: "2 hours ago",
    knowledgeBase: 15,
    interactions: 234
  },
  {
    id: "2",
    name: "Sequence Agent",
    description: "Handles all the replies with AI response",
    status: "active",
    lastActive: "5 mins ago",
    knowledgeBase: 8,
    interactions: 567
  },
  {
    id: "3",
    name: "Reply to foundrs Agent",
    description: "Handles all the replies with AI response",
    status: "inactive",
    lastActive: "2 days ago",
    knowledgeBase: 3,
    interactions: 89
  },
  {
    id: "4",
    name: "Sequence 2 Agent",
    description: "Handles all the replies with AI response",
    status: "active",
    lastActive: "1 hour ago",
    knowledgeBase: 12,
    interactions: 432
  },
  {
    id: "5",
    name: "Reply Agent",
    description: "Handles all the replies with AI response",
    status: "active",
    lastActive: "Just now",
    knowledgeBase: 6,
    interactions: 123
  },
  {
    id: "6",
    name: "Reply to foundrs Agent",
    description: "Handles all the replies with AI response",
    status: "inactive",
    lastActive: "1 week ago",
    knowledgeBase: 2,
    interactions: 45
  },
  {
    id: "7",
    name: "Sequence 2 Agent",
    description: "Handles all the replies with AI response",
    status: "active"
  }
]

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find(agent => agent.id === id)
}

export const getAgentTypeLabel = (type: AgentType): string => {
  const labels: Record<AgentType, string> = {
    "customer-support": "Customer Support",
    "sales": "Sales Assistant",
    "technical-support": "Technical Support",
    "content-writer": "Content Writer",
    "data-analyst": "Data Analyst"
  }
  return labels[type]
}