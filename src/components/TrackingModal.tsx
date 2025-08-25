import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Activity, Calendar, TrendingUp, Award } from "lucide-react";

interface TrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const weightData = [
  { date: '2024-01-01', weight: 78 },
  { date: '2024-01-08', weight: 77.5 },
  { date: '2024-01-15', weight: 76.8 },
  { date: '2024-01-22', weight: 76.2 },
  { date: '2024-01-29', weight: 75.5 },
  { date: '2024-02-05', weight: 75.0 },
];

const calorieData = [
  { day: 'Mon', calories: 2100 },
  { day: 'Tue', calories: 1950 },
  { day: 'Wed', calories: 2200 },
  { day: 'Thu', calories: 2000 },
  { day: 'Fri', calories: 2150 },
  { day: 'Sat', calories: 2300 },
  { day: 'Sun', calories: 1800 },
];

const macroData = [
  { name: 'Carbs', value: 45, color: '#10b981' },
  { name: 'Protein', value: 30, color: '#3b82f6' },
  { name: 'Fat', value: 25, color: '#f59e0b' },
];

export const TrackingModal = ({ isOpen, onClose }: TrackingModalProps) => {
  // Get user data from localStorage
  const getStoredUserData = () => {
    const stored = localStorage.getItem('nutrifydUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      const joinDate = new Date(parsed.joinDate);
      const daysSinceJoin = Math.floor((Date.now() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
      
      return {
        name: parsed.name,
        isLoggedIn: true,
        weight: parseInt(parsed.weight) || 70,
        bmi: parseFloat(parsed.bmi) || 24.2,
        daysSinceJoin,
        currentStreak: Math.min(daysSinceJoin, 30),
        weightLost: Math.random() * 5,
        avgCalories: 2000 + Math.floor(Math.random() * 400)
      };
    }
    return {
      name: "Guest",
      isLoggedIn: false,
      weight: 0,
      bmi: 0,
      daysSinceJoin: 0,
      currentStreak: 0,
      weightLost: 0,
      avgCalories: 0
    };
  };

  const userData = getStoredUserData();
  
  const handleLogout = () => {
    localStorage.removeItem('nutrifydUser');
    onClose();
    // You could also add a toast notification here
  };

  if (!userData.isLoggedIn) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md glass-effect">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary font-bold text-center">
              Please Login First
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 text-center">
            <p className="text-muted-foreground mb-6">
              You need to login to view your tracking data and progress.
            </p>
            <Button onClick={onClose} className="w-full bg-primary hover:bg-primary-glow">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold flex items-center gap-2">
            <Activity className="w-6 h-6" />
            Your Progress Tracking
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* User Info & Logout */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">Welcome back, {userData.name}!</h2>
              <p className="text-sm text-muted-foreground">Tracking for {userData.daysSinceJoin} days</p>
            </div>
            <Button variant="outline" onClick={handleLogout} size="sm">
              Logout
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">-{userData.weightLost.toFixed(1)}</div>
              <p className="text-sm text-muted-foreground">kg lost</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-secondary">{userData.currentStreak}</div>
              <p className="text-sm text-muted-foreground">days streak</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{Math.floor(Math.random() * 20 + 80)}%</div>
              <p className="text-sm text-muted-foreground">goal progress</p>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-success">{userData.avgCalories}</div>
              <p className="text-sm text-muted-foreground">avg calories</p>
            </Card>
          </div>

          {/* Weight Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Weight Progress
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value: any) => [`${value} kg`, 'Weight']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Daily Calories */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Calories
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={calorieData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`${value} cal`, 'Calories']} />
                    <Bar dataKey="calories" fill="hsl(var(--secondary))" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Macro Distribution */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Macro Distribution
              </h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {macroData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Goals Progress */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Monthly Goals</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Weight Loss Target</span>
                  <span className="text-sm text-muted-foreground">3.0/4.0 kg</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Daily Calorie Goal</span>
                  <span className="text-sm text-muted-foreground">6/7 days</span>
                </div>
                <Progress value={86} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Water Intake</span>
                  <span className="text-sm text-muted-foreground">2.1/2.5 L avg</span>
                </div>
                <Progress value={84} className="h-2" />
              </div>
            </div>
          </Card>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary-glow">
            Close Tracking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};