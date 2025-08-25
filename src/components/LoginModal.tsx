import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserData {
  name: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  preference: string;
  diseases: string[];
}

const diseases = [
  "Diabetes", "Hypertension", "Heart Disease", "Obesity", "Anemia", "Thyroid Disorders",
  "High Cholesterol", "Kidney Disease", "Liver Disease", "Arthritis", "Osteoporosis",
  "Cancer", "Celiac Disease", "Crohn's Disease", "IBS", "PCOS", "Depression", "Anxiety",
  "Eating Disorders", "Food Allergies", "Lactose Intolerance", "Gluten Sensitivity",
  "Acid Reflux", "Gastritis", "Ulcerative Colitis", "Fatty Liver", "Gallstones",
  "Migraine", "Insomnia", "Chronic Fatigue", "Fibromyalgia", "Asthma", "COPD",
  "Sleep Apnea", "Metabolic Syndrome", "Insulin Resistance", "Prediabetes",
  "Autoimmune Diseases", "Multiple Sclerosis", "Lupus", "Rheumatoid Arthritis",
  "Psoriasis", "Eczema", "Acne", "Hair Loss", "Nail Problems", "Skin Conditions",
  "Eye Problems", "Hearing Loss", "Dental Issues", "Gum Disease", "Bad Breath",
  "Constipation", "Diarrhea", "Bloating", "Gas", "Nausea", "Vomiting",
  "Heartburn", "Hiccups", "Burping", "Stomach Pain", "Back Pain", "Neck Pain",
  "Headaches", "Muscle Pain", "Joint Pain", "Bone Pain", "Nerve Pain",
  "Circulation Problems", "Varicose Veins", "Blood Clots", "Aneurysm",
  "Stroke", "Heart Attack", "Arrhythmia", "Palpitations", "Chest Pain",
  "Shortness of Breath", "Cough", "Sore Throat", "Runny Nose", "Sinus Problems"
];

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [userData, setUserData] = useState<UserData>({
    name: "", age: "", gender: "", weight: "", height: "", preference: "", diseases: []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [bmiResult, setBmiResult] = useState<any>(null);
  const { toast } = useToast();

  const filteredDiseases = diseases.filter(disease =>
    disease.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateBMI = (weight: number, height: number) => {
    const heightInM = height / 100;
    const bmi = weight / (heightInM * heightInM);
    let category = "";
    
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";

    return { bmi: bmi.toFixed(1), category };
  };

  const getQuickRecipe = (dishName: string) => {
    const recipes: { [key: string]: string } = {
      "Oatmeal with fruits": "Cook 1/2 cup oats with 1 cup milk. Top with sliced bananas, berries, and a drizzle of honey. Add chopped nuts for extra nutrition.",
      "Greek yogurt with nuts": "Mix 1 cup Greek yogurt with 1 tbsp honey. Top with mixed nuts (almonds, walnuts), seeds, and fresh berries.",
      "Whole grain toast with avocado": "Toast 2 slices whole grain bread. Mash 1 avocado with lime juice, salt, pepper. Spread on toast, add tomato slices.",
      "Scrambled eggs with vegetables": "Beat 2-3 eggs, cook in pan with diced bell peppers, onions, spinach. Season with herbs and serve with whole grain toast.",
      "Quinoa salad with vegetables": "Cook 1 cup quinoa. Mix with diced cucumber, tomatoes, bell peppers, red onion. Dress with lemon juice and olive oil.",
      "Lentil soup with bread": "Simmer 1 cup lentils with diced vegetables, vegetable broth, and spices until tender. Serve with whole grain bread.",
      "Grilled chicken salad": "Grill seasoned chicken breast. Serve over mixed greens with cherry tomatoes, cucumber, and light vinaigrette dressing.",
      "Fish with steamed vegetables": "Season fish fillet, bake at 400°F for 15 mins. Steam broccoli, carrots, and green beans. Serve with lemon.",
      "Vegetable curry with brown rice": "Sauté onions, add curry spices, coconut milk, mixed vegetables. Simmer until tender. Serve over cooked brown rice.",
      "Baked salmon with sweet potato": "Season salmon, bake with cubed sweet potatoes at 425°F for 20 mins. Add roasted vegetables on the side.",
      "Mixed nuts": "Portion 1/4 cup mixed almonds, walnuts, cashews. Lightly roasted for better flavor and crunch.",
      "Fresh fruits": "Choose seasonal fruits like apples, berries, oranges. Wash and cut into bite-sized pieces for easy snacking.",
      "Vegetable sticks with hummus": "Cut carrots, celery, bell peppers into sticks. Serve with 2-3 tbsp homemade or store-bought hummus."
    };
    
    return recipes[dishName] || "Cook with fresh ingredients, minimal processing, and balanced nutrition. Focus on whole foods and proper portions.";
  };

  const getDietRecommendations = (bmi: number, category: string, preference: string, diseases: string[]) => {
    const recommendations = {
      breakfast: preference === "veg" ? 
        ["Oatmeal with fruits", "Greek yogurt with nuts", "Whole grain toast with avocado"] :
        ["Scrambled eggs with vegetables", "Greek yogurt with berries", "Whole grain cereal with milk"],
      lunch: preference === "veg" ? 
        ["Quinoa salad with vegetables", "Lentil soup with bread", "Vegetable stir-fry with tofu"] :
        ["Grilled chicken salad", "Fish with steamed vegetables", "Lean beef with brown rice"],
      dinner: preference === "veg" ? 
        ["Vegetable curry with brown rice", "Bean soup with salad", "Grilled vegetables with quinoa"] :
        ["Baked salmon with sweet potato", "Chicken breast with vegetables", "Turkey meatballs with pasta"],
      snacks: preference === "veg" ? 
        ["Mixed nuts", "Fresh fruits", "Vegetable sticks with hummus"] :
        ["Greek yogurt", "Boiled eggs", "Protein smoothie"]
    };

    return recommendations;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Save user data to localStorage
    const userProfile = {
      ...userData,
      joinDate: new Date().toISOString(),
      bmi: calculateBMI(parseFloat(userData.weight), parseFloat(userData.height)).bmi
    };
    localStorage.setItem('nutrifydUser', JSON.stringify(userProfile));
    
    // Show loading message
    toast({
      title: "Form submitted",
      description: "Now please wait...",
      duration: 7000,
    });

    // Simulate processing time
    setTimeout(() => {
      const weight = parseFloat(userData.weight);
      const height = parseFloat(userData.height);
      const bmiData = calculateBMI(weight, height);
      const dietPlan = getDietRecommendations(parseFloat(bmiData.bmi), bmiData.category, userData.preference, userData.diseases);
      
      setBmiResult({ ...bmiData, dietPlan });
      setShowResults(true);
      setIsSubmitting(false);
    }, 7000);
  };

  const toggleDisease = (disease: string) => {
    setUserData(prev => ({
      ...prev,
      diseases: prev.diseases.includes(disease) 
        ? prev.diseases.filter(d => d !== disease)
        : [...prev.diseases, disease]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold">Join Nutrifyd</DialogTitle>
        </DialogHeader>
        
        {!showResults ? (
          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name"
                  value={userData.name}
                  onChange={(e) => setUserData(prev => ({...prev, name: e.target.value}))}
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age"
                  type="number"
                  value={userData.age}
                  onChange={(e) => setUserData(prev => ({...prev, age: e.target.value}))}
                  placeholder="Enter your age"
                />
              </div>
            </div>

            <div>
              <Label>Gender</Label>
              <RadioGroup 
                value={userData.gender} 
                onValueChange={(value) => setUserData(prev => ({...prev, gender: value}))}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input 
                  id="weight"
                  type="number"
                  value={userData.weight}
                  onChange={(e) => setUserData(prev => ({...prev, weight: e.target.value}))}
                  placeholder="Enter weight in kg"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input 
                  id="height"
                  type="number"
                  value={userData.height}
                  onChange={(e) => setUserData(prev => ({...prev, height: e.target.value}))}
                  placeholder="Enter height in cm"
                />
              </div>
            </div>

            <div>
              <Label>Dietary Preference</Label>
              <Select value={userData.preference} onValueChange={(value) => setUserData(prev => ({...prev, preference: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Any Diseases?</Label>
              <Input 
                placeholder="Search diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mt-2"
              />
              <div className="max-h-48 overflow-y-auto border rounded-lg mt-2 p-2">
                {filteredDiseases.map((disease) => (
                  <div key={disease} className="flex items-center space-x-2 p-1">
                    <input 
                      type="checkbox"
                      checked={userData.diseases.includes(disease)}
                      onChange={() => toggleDisease(disease)}
                      className="rounded"
                    />
                    <Label className="text-sm">{disease}</Label>
                  </div>
                ))}
              </div>
              {userData.diseases.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {userData.diseases.join(", ")}
                </p>
              )}
            </div>

            {isSubmitting ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="loading-spinner"></div>
                <p className="text-primary">Processing your information...</p>
              </div>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-glow"
                disabled={!userData.name || !userData.age || !userData.weight || !userData.height}
              >
                Submit
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6 p-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-primary mb-4">Your Health Analysis</h3>
              <div className="bg-card p-6 rounded-lg shadow-lg">
                <p className="text-lg"><strong>BMI:</strong> {bmiResult.bmi}</p>
                <p className="text-lg"><strong>Category:</strong> {bmiResult.category}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-primary">Recommended Diet Plan with Recipes</h4>
              
              {Object.entries(bmiResult.dietPlan).map(([meal, items]: [string, any]) => (
                <div key={meal} className="bg-card p-4 rounded-lg">
                  <h5 className="font-semibold capitalize mb-3 text-lg">{meal}</h5>
                  <div className="space-y-4">
                    {items.map((item: string, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h6 className="font-medium">{item}</h6>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(item + ' recipe')}`)}
                            className="text-xs"
                          >
                            Video Recipe
                          </Button>
                        </div>
                        <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                          <p className="font-medium mb-2">Quick Recipe:</p>
                          {getQuickRecipe(item)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => {
                setShowResults(false);
                onClose();
              }}
              className="w-full bg-primary hover:bg-primary-glow"
            >
              Get Started with Nutrifyd
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};