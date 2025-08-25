import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LoginModal } from "@/components/LoginModal";
import { ExpertConsultation } from "@/components/ExpertConsultation";
import { ProfileModal } from "@/components/ProfileModal";
import { TrackingModal } from "@/components/TrackingModal";
import { RecipeModal } from "@/components/RecipeModal";
import { ScrollTriggeredVideo } from "@/components/ScrollTriggeredVideo";
import { Star, Heart, Users, Award, Mail, Phone } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import healthyFood from "@/assets/healthy-food.jpg";
import nutritionConsultation from "@/assets/nutrition-consultation.jpg";

const Index = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [expertModalOpen, setExpertModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [recipeModalOpen, setRecipeModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState("");

  // Scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -10% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-fade-in');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleRecipeClick = (dishName: string) => {
    setSelectedDish(dishName);
    setRecipeModalOpen(true);
  };

  const ratings = [
    { name: "Sarah M.", rating: 5, comment: "Amazing results! Lost 15 lbs in 2 months with personalized diet plans." },
    { name: "Mike J.", rating: 5, comment: "The expert consultations are incredibly helpful. Highly recommended!" },
    { name: "Emma L.", rating: 4, comment: "Great app with detailed tracking features. Love the recipe suggestions." },
    { name: "David K.", rating: 5, comment: "Finally found a nutrition app that actually works. The BMI calculator is very accurate." },
    { name: "Lisa R.", rating: 5, comment: "The nutritionist profiles are comprehensive. Easy to find the right expert for my needs." },
    { name: "Tom W.", rating: 4, comment: "Excellent video content and meal planning. The scroll-triggered videos are engaging." }
  ];

  const recommendedDishes = [
    "Oatmeal with fruits",
    "Greek yogurt with nuts", 
    "Quinoa salad with vegetables",
    "Grilled chicken salad",
    "Vegetable curry with brown rice",
    "Baked salmon with sweet potato"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/80 to-secondary/10" />
        
        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-xl float-animation" />
          <div className="absolute top-40 right-32 w-24 h-24 bg-secondary/10 rounded-full blur-xl float-animation" style={{animationDelay: '1s'}} />
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-accent/10 rounded-full blur-xl float-animation" style={{animationDelay: '2s'}} />
        </div>

        <div className="relative z-10 text-center space-y-8 px-6">
          {/* 3D Title */}
          <h1 className="text-6xl md:text-8xl font-bold text-3d mb-8 tracking-wider">
            Nutrifyd
          </h1>
          
          {/* Navigation Buttons */}
          <div className="flex flex-wrap gap-6 justify-center">
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setProfileModalOpen(true)}
              className="text-lg px-8 py-4"
            >
              Profile
            </Button>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setLoginModalOpen(true)}
              className="text-lg px-8 py-4"
            >
              Login
            </Button>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => setTrackingModalOpen(true)}
              className="text-lg px-8 py-4"
            >
              Track
            </Button>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary scroll-fade-in">Discover Healthy Living</h2>
          <p className="text-xl text-muted-foreground mb-12 scroll-fade-in">
            Watch as we guide you through the journey of optimal nutrition
          </p>
          <div className="scroll-fade-in">
            <ScrollTriggeredVideo />
          </div>
        </div>
      </section>

      {/* Expert Consultation Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-primary scroll-fade-in">Expert Guidance</h2>
          <p className="text-xl text-muted-foreground mb-12 scroll-fade-in">
            Connect with certified nutritionists and dietitians for personalized advice
          </p>
          <Button 
            variant="glow" 
            size="lg"
            onClick={() => setExpertModalOpen(true)}
            className="text-xl px-12 py-6 scroll-fade-in"
          >
            Consult Experts
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="scroll-fade-in">
              <h2 className="text-4xl font-bold mb-6 text-primary">Personalized Nutrition Solutions</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nutrifyd revolutionizes how you approach nutrition with AI-powered meal planning, 
                comprehensive health tracking, and expert consultations. Our platform analyzes your 
                unique health profile, dietary preferences, and fitness goals to create tailored 
                nutrition plans that fit your lifestyle.
              </p>
            </div>
            <div className="scroll-fade-in">
              <img 
                src={healthyFood} 
                alt="Healthy nutrition foods" 
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 scroll-fade-in">
              <img 
                src={nutritionConsultation} 
                alt="Nutrition consultation" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2 scroll-fade-in">
              <h2 className="text-4xl font-bold mb-6 text-primary">Expert-Backed Science</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every recommendation on Nutrifyd is backed by certified nutritionists and 
                evidence-based research. Our team of experts continuously updates our database 
                with the latest nutritional science to ensure you receive the most accurate 
                and effective guidance for your health journey.
              </p>
            </div>
          </div>

          <div className="text-center scroll-fade-in">
            <h2 className="text-4xl font-bold mb-6 text-primary">Track Your Progress</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl mx-auto">
              Monitor your health journey with detailed analytics, BMI tracking, calorie counting, 
              and progress visualization. Nutrifyd provides comprehensive insights into your 
              nutritional habits, helping you make informed decisions and celebrate your 
              achievements along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Sample Dishes & Recipes */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary scroll-fade-in">
            Popular Healthy Recipes
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {recommendedDishes.map((dish, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 scroll-fade-in">
                <h3 className="text-lg font-semibold mb-4">{dish}</h3>
                <Button 
                  onClick={() => handleRecipeClick(dish)}
                  variant="outline"
                  className="w-full"
                >
                  Get Recipe
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ratings Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-primary scroll-fade-in">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ratings.map((review, index) => (
              <Card key={index} className="p-6 scroll-fade-in">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 font-semibold">{review.name}</span>
                </div>
                <p className="text-muted-foreground">{review.comment}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">Nutrifyd</h3>
              <p className="text-primary-foreground/80 mb-4">
                Your personalized nutrition companion for a healthier lifestyle.
              </p>
              <div className="flex space-x-4">
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  <Heart className="w-3 h-3 mr-1" />
                  Health First
                </Badge>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  <Users className="w-3 h-3 mr-1" />
                  Expert Backed
                </Badge>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-primary-foreground/80">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>support@nutrifyd.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  <span>Certified Platform</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
            <p>&copy; 2024 Nutrifyd. All rights reserved. | Empowering healthier lives through nutrition.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      <ExpertConsultation isOpen={expertModalOpen} onClose={() => setExpertModalOpen(false)} />
      <ProfileModal isOpen={profileModalOpen} onClose={() => setProfileModalOpen(false)} />
      <TrackingModal isOpen={trackingModalOpen} onClose={() => setTrackingModalOpen(false)} />
      <RecipeModal 
        isOpen={recipeModalOpen} 
        onClose={() => setRecipeModalOpen(false)}
        dishName={selectedDish}
      />
    </div>
  );
};

export default Index;