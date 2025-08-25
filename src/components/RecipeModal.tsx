import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, ChefHat } from "lucide-react";

interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTime: string;
  servings: number;
  difficulty: string;
  youtubeUrl: string;
  nutrition: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishName: string;
}

const sampleRecipes: Record<string, Recipe> = {
  "Oatmeal with fruits": {
    name: "Healthy Fruit Oatmeal",
    ingredients: [
      "1 cup rolled oats",
      "2 cups water or milk",
      "1 banana, sliced",
      "1/2 cup mixed berries",
      "2 tbsp honey",
      "1/4 cup chopped nuts",
      "1 tsp cinnamon"
    ],
    instructions: [
      "Bring water/milk to boil in a saucepan",
      "Add oats and reduce heat to medium-low",
      "Cook for 5-7 minutes, stirring occasionally",
      "Remove from heat and let stand for 2 minutes",
      "Top with banana slices, berries, and nuts",
      "Drizzle with honey and sprinkle cinnamon",
      "Serve warm"
    ],
    cookTime: "10 mins",
    servings: 2,
    difficulty: "Easy",
    youtubeUrl: "https://www.youtube.com/watch?v=PjZ8Gl6bFHY",
    nutrition: {
      calories: 320,
      protein: "12g",
      carbs: "58g",
      fat: "8g"
    }
  },
  "Greek yogurt with nuts": {
    name: "Protein-Rich Greek Yogurt Bowl",
    ingredients: [
      "1 cup Greek yogurt",
      "1/4 cup mixed nuts",
      "2 tbsp granola",
      "1 tbsp chia seeds",
      "1/2 cup fresh berries",
      "1 tbsp honey",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Place Greek yogurt in a bowl",
      "Add vanilla extract and mix well",
      "Top with fresh berries",
      "Sprinkle nuts, granola, and chia seeds",
      "Drizzle with honey",
      "Serve immediately"
    ],
    cookTime: "5 mins",
    servings: 1,
    difficulty: "Very Easy",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    nutrition: {
      calories: 280,
      protein: "20g",
      carbs: "25g",
      fat: "12g"
    }
  },
  "Quinoa salad with vegetables": {
    name: "Mediterranean Quinoa Salad",
    ingredients: [
      "1 cup quinoa",
      "2 cups vegetable broth",
      "1 cucumber, diced",
      "2 tomatoes, chopped",
      "1/2 red onion, minced",
      "1/4 cup olive oil",
      "2 tbsp lemon juice",
      "1/4 cup fresh parsley",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Rinse quinoa under cold water",
      "Bring vegetable broth to boil",
      "Add quinoa, reduce heat, and simmer for 15 minutes",
      "Let quinoa cool completely",
      "Mix in cucumber, tomatoes, and onion",
      "Whisk olive oil, lemon juice, salt, and pepper",
      "Toss salad with dressing",
      "Garnish with fresh parsley"
    ],
    cookTime: "25 mins",
    servings: 4,
    difficulty: "Easy",
    youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
    nutrition: {
      calories: 220,
      protein: "8g",
      carbs: "35g",
      fat: "7g"
    }
  }
};

export const RecipeModal = ({ isOpen, onClose, dishName }: RecipeModalProps) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && dishName) {
      setLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        const foundRecipe = sampleRecipes[dishName] || {
          name: dishName,
          ingredients: ["Recipe ingredients will be fetched from API"],
          instructions: ["Recipe instructions will be fetched from API"],
          cookTime: "15 mins",
          servings: 2,
          difficulty: "Medium",
          youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          nutrition: {
            calories: 250,
            protein: "15g",
            carbs: "30g",
            fat: "8g"
          }
        };
        setRecipe(foundRecipe);
        setLoading(false);
      }, 2000);
    }
  }, [isOpen, dishName]);

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl text-primary font-bold">
            {recipe?.name || dishName} Recipe
          </DialogTitle>
        </DialogHeader>
        
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="loading-spinner mb-4"></div>
            <p className="text-primary">Fetching recipe from the internet...</p>
          </div>
        ) : recipe ? (
          <div className="space-y-6 p-6">
            {/* Recipe Info */}
            <div className="flex flex-wrap gap-4 items-center">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {recipe.cookTime}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                {recipe.servings} servings
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <ChefHat className="w-3 h-3" />
                {recipe.difficulty}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* YouTube Video */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Video Tutorial</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={getYouTubeEmbedUrl(recipe.youtubeUrl)}
                    title="Recipe Video"
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
                
                {/* Nutrition Info */}
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Nutrition per serving</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Calories: <span className="font-medium">{recipe.nutrition.calories}</span></div>
                    <div>Protein: <span className="font-medium">{recipe.nutrition.protein}</span></div>
                    <div>Carbs: <span className="font-medium">{recipe.nutrition.carbs}</span></div>
                    <div>Fat: <span className="font-medium">{recipe.nutrition.fat}</span></div>
                  </div>
                </Card>
              </div>

              {/* Recipe Details */}
              <div className="space-y-4">
                {/* Ingredients */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Ingredients</h3>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-sm">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {recipe.instructions.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="text-sm">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Button onClick={onClose} className="bg-primary hover:bg-primary-glow px-8">
                Close Recipe
              </Button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};