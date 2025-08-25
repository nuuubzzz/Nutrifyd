import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, Target, TrendingUp } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  // Get user data from localStorage or use default
  const getStoredUserData = () => {
    const stored = localStorage.getItem('nutrifydUser');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        name: parsed.name || "Guest User",
        age: parseInt(parsed.age) || 25,
        gender: parsed.gender || "Not specified",
        weight: parseInt(parsed.weight) || 70,
        height: parseInt(parsed.height) || 170,
        bmi: parseFloat(parsed.bmi) || 24.2,
        preference: parsed.preference || "Not specified",
        joinDate: parsed.joinDate || new Date().toISOString(),
        diseases: parsed.diseases?.length ? parsed.diseases : ["None"],
        goals: ["Weight Management", "Healthy Living"],
        currentStreak: Math.floor(Math.random() * 30) + 1,
        totalSessions: Math.floor(Math.random() * 50) + 10
      };
    }
    return {
      name: "Please login first",
      age: 0,
      gender: "Not logged in",
      weight: 0,
      height: 0,
      bmi: 0,
      preference: "Not specified",
      joinDate: new Date().toISOString(),
      diseases: ["None"],
      goals: ["Please login to set goals"],
      currentStreak: 0,
      totalSessions: 0
    };
  };

  const userData = getStoredUserData();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold flex items-center gap-2">
            <User className="w-6 h-6" />
            Your Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 p-6">
          {/* Basic Info */}
          <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-xl font-semibold">Personal Information</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl">👤</div>
              <Button variant="outline" onClick={() => {
                localStorage.removeItem('nutrifydUser');
                onClose();
              }} size="sm">
                Logout
              </Button>
            </div>
          </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{userData.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{userData.age} years</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{userData.height} cm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{userData.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BMI</p>
                <p className="font-medium text-primary">{userData.bmi}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Diet Preference</p>
                <p className="font-medium">{userData.preference}</p>
              </div>
            </div>
          </Card>

          {/* Health Stats */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Health Statistics
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{userData.currentStreak}</div>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{userData.totalSessions}</div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
              </div>
            </div>
          </Card>

          {/* Goals */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Health Goals
            </h3>
            <div className="flex flex-wrap gap-2">
              {userData.goals.map((goal, index) => (
                <Badge key={index} variant="secondary">{goal}</Badge>
              ))}
            </div>
          </Card>

          {/* Member Since */}
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Member since</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(userData.joinDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </Card>

          <Button onClick={onClose} className="w-full bg-primary hover:bg-primary-glow">
            Close Profile
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};