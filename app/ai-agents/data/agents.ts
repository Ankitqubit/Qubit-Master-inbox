export type AgentType = 
  | "customer-support" 
  | "sales" 
  | "technical-support" 
  | "content-writer"
  | "data-analyst"

export type Agent = {
  id: string
  type: AgentType
  name: string
  description: string
  status: "active" | "inactive"
  createdAt: string
  knowledgeBase: string
}

export const agents: Agent[] = [
  {
    id: "1",
    type: "customer-support",
    name: "Customer Support Agent",
    description: "Handles customer inquiries and support tickets",
    status: "active",
    createdAt: "2024-03-20",
    knowledgeBase: "Support Documentation"
  },
  {
    id: "2",
    type: "sales",
    name: "Sales Assistant",
    description: "Assists with product recommendations and sales",
    status: "inactive",
    createdAt: "2024-03-19",
    knowledgeBase: "Product Catalog"
  },
  {
    id: "3",
    type: "technical-support",
    name: "Technical Support Bot",
    description: "Provides technical troubleshooting assistance",
    status: "active",
    createdAt: "2024-03-18",
    knowledgeBase: "Technical Guides"
  },
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