"use client"

import { create } from 'zustand'

export type Agent = {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  type: "categorizer" | "sequencer"
  basePrompt?: string
  knowledgeBase?: string
}

// Pre-defined templates for different agent types
export const agentTemplates = {
  categorizer: {
    templates: [
      {
        name: "Customer Support Ticket Categorizer",
        description: "Automatically categorizes customer support tickets based on their content and priority",
        basePrompt: `You are a Customer Support Ticket Categorizer agent. Your role is to:
1. Analyze incoming support tickets
2. Categorize them into: Technical Issues, Billing Questions, Product Inquiries, or Feature Requests
3. Assign priority levels: High, Medium, or Low
4. Extract key information like customer ID, product name, and issue summary
5. Tag tickets with relevant labels for efficient routing

When analyzing a ticket, consider:
- Urgency of the issue
- Impact on customer's business
- Technical complexity
- Customer tier/status

Provide your categorization in a structured format with justification for the assigned category and priority.`
      },
      {
        name: "Content Classification Agent",
        description: "Analyzes and categorizes content based on topic, sentiment, and target audience",
        basePrompt: `You are a Content Classification agent responsible for analyzing and categorizing various types of content. Your tasks include:
1. Identify the main topic and subtopics
2. Analyze sentiment (positive, negative, neutral)
3. Determine content type (article, blog, news, tutorial, etc.)
4. Identify target audience and expertise level
5. Extract key themes and keywords
6. Classify content category (Technology, Business, Entertainment, etc.)

For each piece of content, provide:
- Primary and secondary categories
- Key themes and topics
- Target audience characteristics
- Content complexity level
- Recommended tags for indexing`
      }
    ]
  },
  sequencer: {
    templates: [
      {
        name: "Customer Onboarding Agent",
        description: "Manages the step-by-step customer onboarding process and documentation",
        basePrompt: `You are a Customer Onboarding Sequence agent. Your role is to guide new customers through the onboarding process by:
1. Welcome the customer and collect initial requirements
2. Guide through account setup and configuration
3. Assist with initial product setup
4. Provide relevant documentation and resources
5. Schedule necessary training sessions
6. Follow up on completion of each step
7. Collect feedback and address concerns

For each step:
- Provide clear instructions
- Verify completion before proceeding
- Offer help resources
- Document progress and blockers
- Escalate issues when necessary

Maintain a friendly, helpful tone while ensuring all necessary steps are completed in sequence.`
      },
      {
        name: "Data Processing Pipeline Agent",
        description: "Executes and monitors sequential data processing tasks with validation",
        basePrompt: `You are a Data Processing Pipeline agent responsible for managing sequential data processing tasks. Your responsibilities include:
1. Validate input data format and quality
2. Execute data cleaning and normalization steps
3. Perform data transformations
4. Apply business rules and validations
5. Generate processing reports
6. Handle errors and exceptions
7. Maintain data processing logs

For each processing step:
- Verify input requirements
- Apply specified transformations
- Validate output quality
- Log processing metrics
- Handle and report errors
- Ensure data consistency

Follow strict data handling protocols and maintain detailed processing logs.`
      }
    ]
  }
}

type AgentsStore = {
  agents: Agent[]
  currentPage: number
  itemsPerPage: number
  addAgent: (agent: Omit<Agent, 'id'>) => void
  updateAgent: (id: string, agent: Partial<Agent>) => void
  deleteAgent: (id: string) => void
  setCurrentPage: (page: number) => void
  setItemsPerPage: (items: number) => void
}

export const useAgentsStore = create<AgentsStore>()((set) => ({
  agents: [
    {
      id: "1",
      name: "Customer Support Agent",
      description: "Handles customer inquiries and support tickets",
      status: "active",
      type: "categorizer"
    },
    {
      id: "2",
      name: "Sales Assistant",
      description: "Assists with sales queries and lead qualification",
      status: "inactive",
      type: "sequencer"
    },
    {
      id: "3",
      name: "Data Analysis Agent",
      description: "Analyzes and categorizes data patterns",
      status: "active",
      type: "categorizer"
    },
    {
      id: "4",
      name: "Onboarding Specialist",
      description: "Manages new user onboarding sequences",
      status: "active",
      type: "sequencer"
    },
    {
      id: "5",
      name: "Content Moderator",
      description: "Reviews and categorizes user-generated content",
      status: "active",
      type: "categorizer"
    },
    {
      id: "6",
      name: "Email Campaign Manager",
      description: "Handles email sequence automation",
      status: "inactive",
      type: "sequencer"
    },
    {
      id: "7",
      name: "Document Classifier",
      description: "Categorizes and organizes documents",
      status: "active",
      type: "categorizer"
    },
    {
      id: "8",
      name: "Task Workflow Agent",
      description: "Manages complex task workflows",
      status: "active",
      type: "sequencer"
    }
  ],
  currentPage: 1,
  itemsPerPage: 5,
  addAgent: (agent) => 
    set((state) => ({
      agents: [...state.agents, { ...agent, id: Math.random().toString(36).slice(2) }]
    })),
  updateAgent: (id, updatedAgent) =>
    set((state) => ({
      agents: state.agents.map((agent) => 
        agent.id === id ? { ...agent, ...updatedAgent } : agent
      )
    })),
  deleteAgent: (id) =>
    set((state) => ({
      agents: state.agents.filter((agent) => agent.id !== id)
    })),
  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (items) => set({ itemsPerPage: items })
}))
