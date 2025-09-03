'use client'

import { useState } from 'react'
import { X, Sparkles } from 'lucide-react'

interface Recipe {
  recipe_name: string
  ingredients: string[]
  instructions: string[]
}

export default function RecipeModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const generateRecipes = async () => {
    setIsLoading(true)
    setIsOpen(true)
    
    // Simulate API call - replace with actual Gemini API integration
    setTimeout(() => {
      const mockRecipes: Recipe[] = [
        {
          recipe_name: "Sithaphal Smoothie Bowl",
          ingredients: [
            "2 ripe Sithaphal fruits",
            "1 banana",
            "1/2 cup coconut milk",
            "1 tbsp honey",
            "Granola for topping"
          ],
          instructions: [
            "Remove seeds from Sithaphal and scoop out flesh",
            "Blend Sithaphal, banana, coconut milk, and honey",
            "Pour into bowl and top with granola",
            "Serve immediately"
          ]
        },
        {
          recipe_name: "Sithaphal Ice Cream",
          ingredients: [
            "4 ripe Sithaphal fruits",
            "1 cup heavy cream",
            "1/2 cup sugar",
            "1 tsp vanilla extract"
          ],
          instructions: [
            "Extract Sithaphal pulp and remove seeds",
            "Whip cream with sugar and vanilla",
            "Fold in Sithaphal pulp",
            "Freeze for 4-6 hours, stirring every hour"
          ]
        },
        {
          recipe_name: "Sithaphal Milkshake",
          ingredients: [
            "2 Sithaphal fruits",
            "1 cup milk",
            "2 tbsp sugar",
            "Ice cubes",
            "Cardamom powder"
          ],
          instructions: [
            "Deseed Sithaphal and extract pulp",
            "Blend with milk, sugar, and ice",
            "Add cardamom powder",
            "Serve chilled with a straw"
          ]
        }
      ]
      setRecipes(mockRecipes)
      setIsLoading(false)
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 h-3/4 flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h4 className="text-2xl font-playfair text-green-800 flex items-center gap-2">
            <Sparkles className="w-6 h-6" />
            Sithaphal Recipes
          </h4>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader"></div>
            </div>
          ) : recipes.length > 0 ? (
            <div className="space-y-8">
              {recipes.map((recipe, index) => (
                <div key={index} className="mb-8">
                  <h5 className="text-2xl font-playfair text-green-700 mb-3">
                    {recipe.recipe_name}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h6 className="font-bold text-lg mb-2">Ingredients:</h6>
                      <ul className="list-disc list-inside text-gray-700">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i}>{ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-bold text-lg mb-2">Instructions:</h6>
                      <ol className="list-decimal list-inside text-gray-700 space-y-1">
                        {recipe.instructions.map((instruction, i) => (
                          <li key={i}>{instruction}</li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <button 
                onClick={generateRecipes}
                className="btn-primary px-6 py-3 rounded-lg"
              >
                Generate Recipes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
