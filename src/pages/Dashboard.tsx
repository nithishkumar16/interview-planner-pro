import { useState } from "react"
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
  Star
} from "lucide-react"
import { useNavigate } from "react-router-dom"

// Mock data for interview emails
const mockInterviewEmails = [
  {
    id: 1,
    company: "TechCorp Inc.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=64&h=64&fit=crop&crop=faces",
    subject: "Final Round Interview - Senior Frontend Developer",
    recruiter: "Sarah Johnson",
    date: "2024-07-28",
    time: "2:00 PM",
    status: "upcoming",
    hasInsights: true,
    type: "Final Round"
  },
  {
    id: 2,
    company: "StartupXYZ",
    logo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=64&h=64&fit=crop&crop=faces",
    subject: "Technical Interview - Full Stack Developer",
    recruiter: "Mike Chen",
    date: "2024-07-30",
    time: "10:30 AM",
    status: "upcoming",
    hasInsights: false,
    type: "Technical"
  },
  {
    id: 3,
    company: "Enterprise Solutions",
    logo: "https://images.unsplash.com/photo-1560472355-536de3962603?w=64&h=64&fit=crop&crop=faces",
    subject: "HR Screening - React Developer Position",
    recruiter: "Jessica Williams",
    date: "2024-07-26",
    time: "3:30 PM",
    status: "completed",
    hasInsights: true,
    type: "HR Screening"
  }
]

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const navigate = useNavigate()

  const filteredEmails = mockInterviewEmails.filter(email => {
    const matchesSearch = email.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === "all" || email.status === selectedFilter
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-primary/10 text-primary"
      case "completed": return "bg-success/10 text-success"
      default: return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Final Round": return "bg-warning/10 text-warning border-warning/20"
      case "Technical": return "bg-primary/10 text-primary border-primary/20"
      case "HR Screening": return "bg-success/10 text-success border-success/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Track your interviews and preparation progress</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
              {filteredEmails.filter(e => e.status === "upcoming").length} Upcoming
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {mockInterviewEmails.filter(e => e.status === "upcoming").length}
                  </p>
                  <p className="text-sm text-muted-foreground">Upcoming Interviews</p>
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
                  <p className="text-2xl font-bold text-foreground">
                    {mockInterviewEmails.filter(e => e.hasInsights).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Companies Researched</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-warning/10 p-3 rounded-lg">
                  <Star className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">92%</p>
                  <p className="text-sm text-muted-foreground">Preparation Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search interviews by company or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {["all", "upcoming", "completed"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                <Filter className="h-4 w-4 mr-1" />
                {filter}
              </Button>
            ))}
          </div>
        </div>

        {/* Interview Cards */}
        <div className="grid gap-4">
          {filteredEmails.map((email) => (
            <Card key={email.id} className="hover:shadow-elegant transition-all duration-300 border-border/50">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden">
                        <img 
                          src={email.logo} 
                          alt={email.company}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {email.hasInsights && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background">
                          <BookOpen className="h-2 w-2 text-white mx-auto mt-0.5" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground truncate">{email.subject}</h3>
                          <p className="text-sm text-muted-foreground">{email.company}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <Badge className={getTypeColor(email.type)}>
                            {email.type}
                          </Badge>
                          <Badge className={getStatusColor(email.status)}>
                            {email.status}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{email.recruiter}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{email.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{email.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => navigate(`/email/${email.id}`)}>
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => navigate(`/insights?company=${encodeURIComponent(email.company)}`)}
                        >
                          <BookOpen className="h-4 w-4 mr-1" />
                          Prepare Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredEmails.length === 0 && (
            <Card className="border-dashed border-2 border-border/50">
              <CardContent className="p-12 text-center">
                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No interviews found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? "Try adjusting your search terms" : "Your interview emails will appear here once detected"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard