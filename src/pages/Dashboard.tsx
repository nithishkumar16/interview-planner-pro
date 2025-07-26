import { useState, useEffect } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Calendar, 
  Clock, 
  Building2, 
  Mail, 
  Filter,
  Eye,
  BookOpen,
  Star,
  Users,
  TrendingUp,
  Target,
  Lightbulb,
  Globe,
  Loader2,
  AlertCircle,
  Info
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { InterviewAPI, InterviewResearchData } from "@/services/api"

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [apiData, setApiData] = useState<InterviewResearchData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const data = await InterviewAPI.getInterviewResearch()
        setApiData(data)
      } catch (err) {
        console.error('Failed to fetch interview data:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch interview data')
      } finally {
        setLoading(false)
      }
    }

    fetchInterviewData()
  }, [])

  const filteredData = apiData && (
    apiData.interview_info.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    apiData.interview_info.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getTypeColor = (type: string) => {
    switch (type) {
      case "TECH": return "bg-primary/10 text-primary border-primary/20"
      case "HR": return "bg-success/10 text-success border-success/20"
      case "FINAL": return "bg-warning/10 text-warning border-warning/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    })
  }

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading interview data...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Failed to load interview data</h3>
              <p className="text-muted-foreground mb-4">
                {error.includes('Failed to fetch') 
                  ? 'Unable to connect to the interview research API. Please check your internet connection and try again.'
                  : error
                }
              </p>
              <div className="flex gap-2">
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
                <Button variant="outline" onClick={() => navigate('/')}>
                  Go Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (!apiData) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No interview data available</h3>
              <p className="text-muted-foreground">No interview emails found or research data is not available.</p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Interview Dashboard</h1>
            <p className="text-muted-foreground">Your upcoming interview details and preparation insights</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              Upcoming Interview
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Upcoming Interview</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-success/10 p-3 rounded-lg">
                  <Building2 className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Company Researched</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-warning/10 p-3 rounded-lg">
                  <Target className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {apiData.research_data.interview_preparation.company_specific_questions.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Prep Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/5 to-info/10 border-info/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-info/10 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-info" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Leader</p>
                  <p className="text-sm text-muted-foreground">Market Position</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by company or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Main Interview Card */}
        <Card className="hover:shadow-elegant transition-all duration-300 border-border/50">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-foreground">
                  {apiData.interview_info.company_name} - {apiData.interview_info.role}
                </CardTitle>
                <CardDescription className="text-lg text-muted-foreground mt-2">
                  {apiData.research_data.company_summary.overview}
                </CardDescription>
              </div>
              <div className="flex gap-2 shrink-0">
                <Badge className={getTypeColor(apiData.interview_info.type)}>
                  {apiData.interview_info.type}
                </Badge>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Upcoming
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Interview Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Interview Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Date:</span>
                    <span>{formatDate(apiData.interview_info.interview_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Time:</span>
                    <span>{formatTime(apiData.interview_info.interview_date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Target className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Skills:</span>
                    <div className="flex gap-1">
                      {apiData.interview_info.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Overview
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="font-medium">Industry:</span>
                    <span className="ml-2">{apiData.research_data.company_summary.industry}</span>
                  </div>
                  <div>
                    <span className="font-medium">Size:</span>
                    <span className="ml-2">{apiData.research_data.company_summary.size}</span>
                  </div>
                  <div>
                    <span className="font-medium">Market Position:</span>
                    <span className="ml-2">{apiData.research_data.competitive_analysis.market_position}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preparation Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Company-Specific Questions
              </h3>
              <div className="grid gap-3">
                {apiData.research_data.interview_preparation.company_specific_questions.map((question, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
                    <p className="text-sm font-medium text-foreground">{question}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Interview Tips */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Interview Tips
              </h3>
              <div className="p-4 bg-warning/5 rounded-lg border border-warning/20">
                <p className="text-sm text-foreground">{apiData.research_data.interview_preparation.interview_tips}</p>
              </div>
            </div>

            {/* Role Insights */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Target className="h-5 w-5" />
                Role-Specific Insights
              </h3>
              <div className="p-4 bg-success/5 rounded-lg border border-success/20">
                <p className="text-sm text-foreground">{apiData.research_data.interview_preparation.role_specific_insights}</p>
              </div>
            </div>

            {/* Competitive Analysis */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Competitive Analysis
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                  <h4 className="font-medium text-foreground mb-2">Competitors</h4>
                  <p className="text-sm text-foreground">{apiData.research_data.competitive_analysis.competitors}</p>
                </div>
                <div className="p-4 bg-info/5 rounded-lg border border-info/20">
                  <h4 className="font-medium text-foreground mb-2">Growth Trends</h4>
                  <p className="text-sm text-foreground">{apiData.research_data.competitive_analysis.growth_trends}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" size="lg" onClick={() => navigate(`/interview/${apiData.interview_info.company_name}`)}>
                <Eye className="h-4 w-4 mr-2" />
                View Full Details
              </Button>
              <Button variant="default" size="lg" onClick={() => navigate(`/prepare/${apiData.interview_info.company_name}`)}>
                <BookOpen className="h-4 w-4 mr-2" />
                Start Preparation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Dashboard