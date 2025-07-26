// API service for fetching interview research data

export interface InterviewInfo {
  company_name: string
  role: string
  type: string
  interview_date: string
  skills: string[]
}

export interface CompanySummary {
  overview: string
  industry: string
  size: string
  culture: string
  recent_news: string
}

export interface InterviewPreparation {
  company_specific_questions: string[]
  role_specific_insights: string
  interview_tips: string
  research_sources: string
}

export interface CompetitiveAnalysis {
  competitors: string
  market_position: string
  growth_trends: string
}

export interface ResearchData {
  company_summary: CompanySummary
  interview_preparation: InterviewPreparation
  competitive_analysis: CompetitiveAnalysis
}

export interface InterviewResearchData {
  interview_info: InterviewInfo
  research_data: ResearchData
}

const API_BASE_URL = 'https://interview-organizer-agent.vercel.app'

export class InterviewAPI {
  private static async makeRequest<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  static async getInterviewResearch(): Promise<InterviewResearchData> {
    return this.makeRequest<InterviewResearchData>('/interview-research')
  }

  static async getInterviewResearchByCompany(companyName: string): Promise<InterviewResearchData> {
    return this.makeRequest<InterviewResearchData>(`/interview-research/company/${encodeURIComponent(companyName)}`)
  }

  static async getHealth(): Promise<{ status: string }> {
    return this.makeRequest<{ status: string }>('/health')
  }
} 