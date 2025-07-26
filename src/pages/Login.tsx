import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Shield, Zap, Target } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import interviewCopilotLogo from "@/assets/interview-copilot-logo.png"

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      // Simulate OAuth flow - In real app, this would redirect to Google OAuth
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast({
        title: "Successfully connected!",
        description: "Your Gmail account has been linked to Interview Co-Pilot.",
      })
      
      navigate("/dashboard")
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Please try again or check your internet connection.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Hero Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={interviewCopilotLogo} 
              alt="Interview Co-Pilot" 
              className="w-12 h-12"
            />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Interview Co-Pilot</h1>
              <p className="text-muted-foreground">Your AI-powered interview preparation assistant</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Auto-detect Interview Emails</h3>
                <p className="text-sm text-muted-foreground">Automatically identifies and organizes your interview invitations from Gmail</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Company Insights</h3>
                <p className="text-sm text-muted-foreground">Get comprehensive company information and culture insights</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Smart Preparation</h3>
                <p className="text-sm text-muted-foreground">Role-specific questions and interview preparation materials</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-elegant">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Get Started</CardTitle>
            <CardDescription>
              Connect your Gmail account to start preparing for interviews
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline"
              size="lg"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Sign in with Google
                </div>
              )}
            </Button>
            
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure OAuth 2.0 connection. We never store your password.</span>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login