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
  ArrowLeft
} from "lucide-react"

// Mock company data
const mockCompanyData = {
  "TechCorp Inc.": {
    name: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=128&h=128&fit=crop&crop=faces",
    website: "https://techcorp.com",
    industry: "Technology",
    size: "1000-5000 employees",
    location: "San Francisco, CA",
    founded: "2015",
    description: "TechCorp is a leading technology company focused on developing innovative software solutions for enterprise clients. Known for their cutting-edge products and strong engineering culture.",
    techStack: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes"],
    values: ["Innovation", "Collaboration", "Excellence", "Customer Focus"],
    interviewProcess: [
      "HR Screening (30 min)",
      "Technical Phone Screen (45 min)",
      "On-site Technical (2 hours)",
      "System Design (1 hour)",
      "Cultural Fit (30 min)"
    ],
    questions: {
      technical: [
        {
          category: "JavaScript",
          question: "Explain the difference between let, const, and var in JavaScript",
          difficulty: "Medium",
          topics: ["Variables", "Scope"]
        },
        {
          category: "React",
          question: "How do you optimize React component re-renders?",
          difficulty: "Hard",
          topics: ["Performance", "Hooks"]
        },
        {
          category: "System Design",
          question: "Design a URL shortening service like bit.ly",
          difficulty: "Hard",
          topics: ["Scalability", "Databases"]
        }
      ],
      behavioral: [
        {
          question: "Tell me about a time you had to work with a difficult team member",
          category: "Teamwork",
          tips: "Focus on resolution and learning outcomes"
        },
        {
          question: "Describe a challenging project you led and how you handled obstacles",
          category: "Leadership",
          tips: "Highlight problem-solving and communication skills"
        }
      ]
    },
    glassdoorRating: 4.2,
    salary: "$120k - $180k",
    benefits: ["Health Insurance", "Stock Options", "Flexible PTO", "Remote Work"]
  }
}

const CompanyInsights = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const companyName = searchParams.get("company") || "TechCorp Inc."
  const [preparationProgress, setPreparationProgress] = useState(65)
  
  const companyData = mockCompanyData[companyName as keyof typeof mockCompanyData] || mockCompanyData["TechCorp Inc."]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success/10 text-success border-success/20"
      case "Medium": return "bg-warning/10 text-warning border-warning/20"
      case "Hard": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

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
              <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden shadow-lg">
                <img 
                  src={companyData.logo} 
                  alt={companyData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">{companyData.name}</h1>
                    <p className="text-muted-foreground mb-4">{companyData.description}</p>
                  </div>
                  <Button variant="outline" asChild>
                    <a href={companyData.website} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-1" />
                      Visit Website
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{companyData.industry}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{companyData.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">{companyData.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-foreground">Founded {companyData.founded}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preparation Progress */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Preparation Progress
                </CardTitle>
                <CardDescription>Track your interview readiness</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{preparationProgress}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={preparationProgress} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Company research completed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span>5/8 technical questions reviewed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-warning" />
                <span>Practice interview pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {companyData.techStack.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-primary/5">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Company Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {companyData.values.map((value) => (
                      <div key={value} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Compensation & Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Salary Range</h4>
                      <p className="text-lg font-semibold text-primary">{companyData.salary}</p>
                      <p className="text-sm text-muted-foreground">Glassdoor Rating: ⭐ {companyData.glassdoorRating}/5</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Benefits</h4>
                      <div className="space-y-1">
                        {companyData.benefits.map((benefit) => (
                          <div key={benefit} className="flex items-center gap-2">
                            <CheckCircle className="h-3 w-3 text-success" />
                            <span className="text-sm text-foreground">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="questions" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical Questions</CardTitle>
                  <CardDescription>Common technical interview questions for this company</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyData.questions.technical.map((q, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-primary/5">
                          {q.category}
                        </Badge>
                        <Badge className={getDifficultyColor(q.difficulty)}>
                          {q.difficulty}
                        </Badge>
                      </div>
                      <p className="font-medium text-foreground">{q.question}</p>
                      <div className="flex flex-wrap gap-1">
                        {q.topics.map((topic) => (
                          <Badge key={topic} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Behavioral Questions</CardTitle>
                  <CardDescription>Prepare for cultural fit and behavioral interviews</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {companyData.questions.behavioral.map((q, index) => (
                    <div key={index} className="p-4 border border-border/50 rounded-lg space-y-2">
                      <Badge variant="outline" className="bg-accent/50">
                        {q.category}
                      </Badge>
                      <p className="font-medium text-foreground">{q.question}</p>
                      <p className="text-sm text-muted-foreground italic">💡 {q.tips}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="process" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Interview Process</CardTitle>
                <CardDescription>Typical interview stages at {companyData.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {companyData.interviewProcess.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{stage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Study Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Company Glassdoor Reviews
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      LeetCode Company Tag
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Company Engineering Blog
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Practice Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="h-4 w-4 mr-2" />
                    Mock Interview Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Code className="h-4 w-4 mr-2" />
                    Coding Challenge Practice
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    System Design Practice
                  </Button>
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