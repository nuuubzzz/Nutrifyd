import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, Video } from "lucide-react";

interface Expert {
  id: number;
  name: string;
  expertise: string;
  experience: number;
  image: string;
  fee: number;
  rating: number;
}

interface ExpertConsultationProps {
  isOpen: boolean;
  onClose: () => void;
}

const experts: Expert[] = [
  { id: 1, name: "Dr. Sarah Johnson", expertise: "Weight Management", experience: 8, image: "👩‍⚕️", fee: 25, rating: 4.9 },
  { id: 2, name: "Dr. Michael Chen", expertise: "Sports Nutrition", experience: 12, image: "👨‍⚕️", fee: 30, rating: 4.8 },
  { id: 3, name: "Dr. Emily Davis", expertise: "Diabetes Care", experience: 10, image: "👩‍⚕️", fee: 28, rating: 4.9 },
  { id: 4, name: "Dr. James Wilson", expertise: "Heart Health", experience: 15, image: "👨‍⚕️", fee: 35, rating: 4.7 },
  { id: 5, name: "Dr. Lisa Rodriguez", expertise: "Pediatric Nutrition", experience: 9, image: "👩‍⚕️", fee: 32, rating: 4.8 },
  { id: 6, name: "Dr. David Kumar", expertise: "Digestive Health", experience: 11, image: "👨‍⚕️", fee: 29, rating: 4.6 },
  { id: 7, name: "Dr. Anna Thompson", expertise: "Eating Disorders", experience: 13, image: "👩‍⚕️", fee: 40, rating: 4.9 },
  { id: 8, name: "Dr. Robert Lee", expertise: "Geriatric Nutrition", experience: 16, image: "👨‍⚕️", fee: 38, rating: 4.7 },
  { id: 9, name: "Dr. Maria Garcia", expertise: "Pregnancy Nutrition", experience: 7, image: "👩‍⚕️", fee: 33, rating: 4.8 },
  { id: 10, name: "Dr. Kevin Park", expertise: "Muscle Building", experience: 6, image: "👨‍⚕️", fee: 27, rating: 4.5 },
  { id: 11, name: "Dr. Rachel Green", expertise: "Vegan Nutrition", experience: 8, image: "👩‍⚕️", fee: 26, rating: 4.7 },
  { id: 12, name: "Dr. Mark Brown", expertise: "Clinical Nutrition", experience: 14, image: "👨‍⚕️", fee: 36, rating: 4.8 },
  { id: 13, name: "Dr. Jennifer White", expertise: "Food Allergies", experience: 9, image: "👩‍⚕️", fee: 31, rating: 4.6 },
  { id: 14, name: "Dr. Anthony Jones", expertise: "Metabolic Health", experience: 12, image: "👨‍⚕️", fee: 34, rating: 4.9 },
  { id: 15, name: "Dr. Samantha Miller", expertise: "Women's Health", experience: 10, image: "👩‍⚕️", fee: 30, rating: 4.8 },
  { id: 16, name: "Dr. Christopher Taylor", expertise: "Men's Health", experience: 11, image: "👨‍⚕️", fee: 32, rating: 4.7 },
  { id: 17, name: "Dr. Amanda Clark", expertise: "Anti-Aging", experience: 13, image: "👩‍⚕️", fee: 39, rating: 4.9 },
  { id: 18, name: "Dr. Steven Adams", expertise: "Performance Nutrition", experience: 8, image: "👨‍⚕️", fee: 28, rating: 4.6 },
  { id: 19, name: "Dr. Nicole Baker", expertise: "Thyroid Health", experience: 9, image: "👩‍⚕️", fee: 29, rating: 4.8 },
  { id: 20, name: "Dr. Daniel Wright", expertise: "Kidney Health", experience: 14, image: "👨‍⚕️", fee: 37, rating: 4.7 },
  { id: 21, name: "Dr. Jessica Hill", expertise: "Liver Health", experience: 10, image: "👩‍⚕️", fee: 33, rating: 4.8 },
  { id: 22, name: "Dr. Ryan Scott", expertise: "Brain Health", experience: 12, image: "👨‍⚕️", fee: 35, rating: 4.9 },
  { id: 23, name: "Dr. Michelle Lewis", expertise: "Bone Health", experience: 11, image: "👩‍⚕️", fee: 31, rating: 4.6 },
  { id: 24, name: "Dr. Brandon Hall", expertise: "Immune System", experience: 9, image: "👨‍⚕️", fee: 30, rating: 4.7 },
  { id: 25, name: "Dr. Stephanie Young", expertise: "Skin Health", experience: 8, image: "👩‍⚕️", fee: 27, rating: 4.8 },
  { id: 26, name: "Dr. Jonathan King", expertise: "Eye Health", experience: 13, image: "👨‍⚕️", fee: 34, rating: 4.9 },
  { id: 27, name: "Dr. Melissa Turner", expertise: "Mental Health Nutrition", experience: 10, image: "👩‍⚕️", fee: 32, rating: 4.7 },
  { id: 28, name: "Dr. Gregory Moore", expertise: "Cancer Nutrition", experience: 15, image: "👨‍⚕️", fee: 42, rating: 4.9 },
  { id: 29, name: "Dr. Kimberly Harris", expertise: "Autoimmune Nutrition", experience: 11, image: "👩‍⚕️", fee: 36, rating: 4.8 },
  { id: 30, name: "Dr. Timothy Collins", expertise: "Addiction Recovery", experience: 12, image: "👨‍⚕️", fee: 38, rating: 4.6 },
  { id: 31, name: "Dr. Angela Martinez", expertise: "Hormonal Balance", experience: 9, image: "👩‍⚕️", fee: 33, rating: 4.8 },
  { id: 32, name: "Dr. Carl Robinson", expertise: "Gut Microbiome", experience: 8, image: "👨‍⚕️", fee: 29, rating: 4.7 },
  { id: 33, name: "Dr. Heather Cooper", expertise: "Supplement Consulting", experience: 7, image: "👩‍⚕️", fee: 25, rating: 4.5 },
  { id: 34, name: "Dr. Frank Reed", expertise: "Meal Planning", experience: 10, image: "👨‍⚕️", fee: 26, rating: 4.6 },
  { id: 35, name: "Dr. Victoria Bell", expertise: "Functional Medicine", experience: 13, image: "👩‍⚕️", fee: 41, rating: 4.9 },
  { id: 36, name: "Dr. Albert Murphy", expertise: "Integrative Nutrition", experience: 14, image: "👨‍⚕️", fee: 39, rating: 4.8 },
  { id: 37, name: "Dr. Catherine Ward", expertise: "Holistic Health", experience: 11, image: "👩‍⚕️", fee: 35, rating: 4.7 },
  { id: 38, name: "Dr. William Foster", expertise: "Chronic Disease", experience: 16, image: "👨‍⚕️", fee: 43, rating: 4.9 },
  { id: 39, name: "Dr. Patricia Brooks", expertise: "Preventive Care", experience: 12, image: "👩‍⚕️", fee: 34, rating: 4.8 },
  { id: 40, name: "Dr. Joseph Sanders", expertise: "Longevity Nutrition", experience: 15, image: "👨‍⚕️", fee: 40, rating: 4.9 }
];

export const ExpertConsultation = ({ isOpen, onClose }: ExpertConsultationProps) => {
  const [connectingExpert, setConnectingExpert] = useState<Expert | null>(null);
  const [connectionType, setConnectionType] = useState<string>("");

  const handleConnect = (expert: Expert, type: string) => {
    setConnectingExpert(expert);
    setConnectionType(type);
    
    // Show connecting dialog for 3 seconds
    setTimeout(() => {
      setConnectingExpert(null);
      setConnectionType("");
    }, 3000);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto glass-effect">
          <DialogHeader>
            <DialogTitle className="text-3xl text-primary font-bold">Expert Nutritionists</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {experts.map((expert) => (
              <Card key={expert.id} className="p-4 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-2">{expert.image}</div>
                  <h3 className="font-semibold text-lg">{expert.name}</h3>
                  <Badge variant="secondary" className="mb-2">{expert.expertise}</Badge>
                  <p className="text-sm text-muted-foreground">{expert.experience} years experience</p>
                  <p className="text-lg font-bold text-primary">${expert.fee}/session</p>
                  <p className="text-sm">⭐ {expert.rating}/5.0</p>
                </div>
                
                <div className="flex justify-between gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConnect(expert, "call")}
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConnect(expert, "message")}
                    className="flex-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleConnect(expert, "video")}
                    className="flex-1"
                  >
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Connection Dialog */}
      <Dialog open={!!connectingExpert} onOpenChange={() => setConnectingExpert(null)}>
        <DialogContent className="glass-effect">
          <div className="text-center p-6">
            <div className="loading-spinner mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-primary mb-2">
              Connecting to {connectingExpert?.name}
            </h3>
            <p className="text-muted-foreground">
              {connectionType === "call" && "Initiating phone call..."}
              {connectionType === "message" && "Opening chat window..."}
              {connectionType === "video" && "Starting video consultation..."}
            </p>
            <p className="text-sm text-primary mt-2">Please wait...</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};