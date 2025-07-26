import { useState } from "react"
import { Layout } from "@/components/layout/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Mail, 
  Bell, 
  Shield, 
  Trash2, 
  LogOut,
  Settings as SettingsIcon,
  Calendar,
  Globe
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    upcomingOnly: false,
    autoSync: true,
    weeklyDigest: true
  })
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john@example.com",
    timezone: "America/New_York"
  })
  const { toast } = useToast()

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    })
  }

  const handleDisconnectGmail = () => {
    toast({
      title: "Gmail disconnected",
      description: "Your Gmail account has been disconnected from Interview Co-Pilot.",
      variant: "destructive"
    })
  }

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "We'll send you a confirmation email to proceed with account deletion.",
      variant: "destructive"
    })
  }

  return (
    <Layout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>

        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {userInfo.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={userInfo.timezone}
                onChange={(e) => setUserInfo(prev => ({ ...prev, timezone: e.target.value }))}
                placeholder="e.g., America/New_York"
              />
            </div>
            
            <Button variant="default">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Connected Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Connected Accounts
            </CardTitle>
            <CardDescription>Manage your connected email accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border border-border/50 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Gmail</p>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                </div>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Connected
                </Badge>
              </div>
              <Button variant="outline" onClick={handleDisconnectGmail}>
                Disconnect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose what notifications you'd like to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications about new interview emails
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Upcoming Only</Label>
                <p className="text-sm text-muted-foreground">
                  Hide completed interviews from the dashboard
                </p>
              </div>
              <Switch
                checked={settings.upcomingOnly}
                onCheckedChange={(checked) => handleSettingChange('upcomingOnly', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto Sync</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically sync with Gmail every hour
                </p>
              </div>
              <Switch
                checked={settings.autoSync}
                onCheckedChange={(checked) => handleSettingChange('autoSync', checked)}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Weekly Digest</Label>
                <p className="text-sm text-muted-foreground">
                  Receive a weekly summary of your interview preparation
                </p>
              </div>
              <Switch
                checked={settings.weeklyDigest}
                onCheckedChange={(checked) => handleSettingChange('weeklyDigest', checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>Help us improve Interview Co-Pilot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Your feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Tell us what you think about the app, suggest new features, or report any issues..."
                rows={4}
              />
            </div>
            <Button variant="default">
              Send Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Shield className="h-5 w-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <div>
                <p className="font-medium text-foreground">Disconnect Gmail Account</p>
                <p className="text-sm text-muted-foreground">
                  This will stop syncing interview emails from your Gmail
                </p>
              </div>
              <Button variant="outline" onClick={handleDisconnectGmail}>
                <LogOut className="h-4 w-4 mr-1" />
                Disconnect
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <div>
                <p className="font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all associated data
                </p>
              </div>
              <Button variant="destructive" onClick={handleDeleteAccount}>
                <Trash2 className="h-4 w-4 mr-1" />
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

export default Settings