export interface KnowledgeBase {
  id: string
  name: string
  description: string
}

export interface KnowledgeFile {
  id: string
  name: string
  description: string
  connectedAgents: string[]
  knowledgeBaseId: string
  fileType: "pdf" | "csv" | "ppt"
}

export interface Agent {
  id: string
  name: string
  type: string
}

export const fileTypes = [
  { value: "pdf", label: "PDF Document" },
  { value: "csv", label: "CSV Spreadsheet" },
  { value: "ppt", label: "PowerPoint Presentation" }
] as const

export const agents: Agent[] = [
  {
    id: "agent-1",
    name: "Customer Support Bot",
    type: "customer-support"
  },
  {
    id: "agent-2",
    name: "Sales Assistant",
    type: "sales"
  },
  {
    id: "agent-3",
    name: "Technical Support Bot",
    type: "technical-support"
  }
]

export const knowledgeBases: KnowledgeBase[] = [
  {
    id: "kb-1",
    name: "Customer Documentation",
    description: "Complete documentation about product features, FAQs, and troubleshooting guides"
  },
  {
    id: "kb-2",
    name: "Sample Documents",
    description: "Templates and example documents for various use cases"
  },
  {
    id: "kb-3",
    name: "Response Templates",
    description: "Pre-written responses for common scenarios and situations"
  }
]

const knowledgeFiles: KnowledgeFile[] = [
  {
    id: "1",
    name: "Product Features Overview",
    description: "Comprehensive guide to all product features and capabilities",
    connectedAgents: ["Customer Support Bot", "Sales Assistant"],
    knowledgeBaseId: "kb-1",
    fileType: "pdf"
  },
  {
    id: "2",
    name: "Troubleshooting Guide",
    description: "Step-by-step solutions for common technical issues",
    connectedAgents: ["Technical Support Bot"],
    knowledgeBaseId: "kb-1",
    fileType: "pdf"
  },
  {
    id: "3",
    name: "Pricing Information",
    description: "Current pricing plans and package details",
    connectedAgents: ["Sales Assistant"],
    knowledgeBaseId: "kb-1",
    fileType: "csv"
  },
  {
    id: "4",
    name: "Email Templates",
    description: "Standard response templates for customer inquiries",
    connectedAgents: ["Customer Support Bot"],
    knowledgeBaseId: "kb-3",
    fileType: "ppt"
  }
]

export function getKnowledgeBaseFiles(knowledgeBaseId: string): KnowledgeFile[] {
  return knowledgeFiles.filter(file => file.knowledgeBaseId === knowledgeBaseId)
}

export function getAvailableAgents(currentAgents: string[]): Agent[] {
  return agents.filter(agent => !currentAgents.includes(agent.name))
}