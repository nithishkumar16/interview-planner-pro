import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  Building2, 
  Users, 
  Globe, 
  MapPin, 
  Calendar,
  Code,
  BookOpen,
  ExternalLink,
  CheckCircle,
  Clock,
  Target,
  ArrowLeft,
  TrendingUp,
  Shield
} from "lucide-react"

// Interview research data interface
interface InterviewResearchData {
  interview_info: {
    company_name: string
    role: string
    type: string
    interview_date: string
    skills: string[]
  }
  research_data: {
    company_summary: {
      overview: string
      industry: string
      size: string
      culture: string
      recent_news: string
    }
    interview_preparation: {
      company_specific_questions: string[]
      role_specific_insights: string
      interview_tips: string
      research_sources: string
    }
    competitive_analysis: {
      competitors: string
      market_position: string
      growth_trends: string
    }
  }
}

const CompanyInsights = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [preparationProgress, setPreparationProgress] = useState(65)
  const [researchData, setResearchData] = useState<InterviewResearchData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInterviewResearch = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://interview-organizer-agent.vercel.app/interview-research', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: InterviewResearchData = await response.json()
        setResearchData(data)
      } catch (error) {
        console.error('Failed to fetch interview research:', error)
        // For now, let's use fallback data
        setResearchData({
          interview_info: {
            company_name: "Stripe",
            role: "Backend Software Engineer", 
            type: "TECH",
            interview_date: "2025-08-02T10:00:00",
            skills: ["Backend Development"]
          },
          research_data: {
            company_summary: {
              overview: "Stripe is a technology company that builds economic infrastructure for the internet. Businesses of every size use the company's software to accept payments and manage their businesses online.",
              industry: "Financial Technology & Services",
              size: "Stripe has over 3,000 employees and generates revenue of approximately $7.4 billion as of 2021.",
              culture: "Stripe values rigorous thinking, clear communication, and a bias towards action. They encourage employees to think like owners and make decisions that prioritize long-term value.",
              recent_news: "In March 2021, Stripe raised $600 million in a funding round that valued the company at $95 billion, making it the most valuable private company in Silicon Valley."
            },
            interview_preparation: {
              company_specific_questions: [
                "How would you improve Stripe's API?",
                "How would you handle a situation where a large number of payments are being processed simultaneously?",
                "Stripe is a global company. How would you ensure our systems can handle different currencies and exchange rates?"
              ],
              role_specific_insights: "Stripe values engineers who can handle the complexity of their distributed systems. They look for individuals who can work on scalable systems and are comfortable with high levels of abstraction.",
              interview_tips: "Stripe values clear communication, so be sure to articulate your thought process during the interview. They also appreciate when candidates have done their homework on the company and can speak to Stripe's products and mission.",
              research_sources: "Key areas to research about Stripe include their API documentation, their various products like Stripe Atlas and Stripe Sigma, and their engineering blog."
            },
            competitive_analysis: {
              competitors: "Stripe's main competitors include Square, PayPal, and Adyen.",
              market_position: "Stripe is considered a leader in the payment processing space, particularly for online and tech-forward businesses. Their $95 billion valuation as of 2021 places them at the top of the fintech industry.",
              growth_trends: "Stripe has seen significant growth in recent years, particularly as the pandemic has accelerated the shift towards online commerce. However, they also face challenges in the form of regulatory scrutiny and increasing competition."
            }
          }
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchInterviewResearch()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-r-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading company insights...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (!researchData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-muted-foreground">Failed to load company insights</p>
          </div>
        </div>
      </Layout>
    )
  }

  const { interview_info, research_data } = researchData

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Button>
        </div>

        {/* Company Overview */}
        <Card className="shadow-elegant">
          <CardContent className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden shadow-lg flex items-center justify-center">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{interview_info.company_name}</h1>
                    <p className="text-muted-foreground mb-4">{research_data.company_summary.overview}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href={`https://${interview_info.company_name.toLowerCase().replace(/\s+/g, '')}.com`} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{research_data.company_summary.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{research_data.company_summary.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{interview_info.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interview Info */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Interview Details
                </CardTitle>
                <CardDescription>Your upcoming interview information</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{interview_info.type}</div>
                <div className="text-sm text-muted-foreground">{new Date(interview_info.interview_date).toLocaleDateString()}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Role: {interview_info.role}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span>Date: {new Date(interview_info.interview_date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-primary" />
                <span>Skills: {interview_info.skills.join(", ")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="culture">Culture</TabsTrigger>
            <TabsTrigger value="competitive">Market</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Industry</h4>
                    <p className="text-sm text-muted-foreground">{research_data.company_summary.industry}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Size</h4>
                    <p className="text-sm text-muted-foreground">{research_data.company_summary.size}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Required Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {interview_info.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="bg-primary/5">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent News</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.company_summary.recent_news}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company-Specific Questions</CardTitle>
                  <CardDescription>Questions commonly asked at {interview_info.company_name}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {research_data.interview_preparation.company_specific_questions.map((question, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-primary/5">
                          Question {index + 1}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{question}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Role-Specific Insights</CardTitle>
                  <CardDescription>What they look for in {interview_info.role} candidates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.interview_preparation.role_specific_insights}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Interview Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.interview_preparation.interview_tips}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="culture" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Company Culture
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{research_data.company_summary.culture}</p>
                
                <div className="mt-6">
                  <h4 className="font-medium text-foreground mb-3">Research Sources</h4>
                  <p className="text-sm text-muted-foreground">{research_data.interview_preparation.research_sources}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="competitive" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Market Position
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.competitive_analysis.market_position}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Competitors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.competitive_analysis.competitors}</p>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Growth Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground">{research_data.competitive_analysis.growth_trends}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  )
}

export default CompanyInsights