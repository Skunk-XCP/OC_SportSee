import s from "./style.module.css";
import calories from "../../assets/images/nutritionIcons/calories-icon.png"
import carbs from "../../assets/images/nutritionIcons/carbs-icon.png"
import fat from "../../assets/images/nutritionIcons/fat-icon.png"
import protein from "../../assets/images/nutritionIcons/protein-icon.png"
import { DataAPI } from "../../api/APIService";
import { useEffect, useState } from "react";

export function Nutrition({ user }) {
    // On initialise le state userNutrition avec un tableau vide
    const [userNutrition, setUserNutrition] = useState([]);

    useEffect(() => {
        async function getNutrition() {
            try {
                const nutritionData = await DataAPI.getUsers(user)

                // On met à jour le state avec les données clés de nutrition obtenues
                setUserNutrition(nutritionData.data.keyData);
            } catch (error) {
                console.error(error);
            }
        }

        getNutrition();
    }, [user]);

    // Création d'un tableau d'objets pour cartographier les infos nutritionnelles avec des icônes
    const nutritionStats = [
        { id: 'calories', icon: calories, amount: userNutrition.calorieCount, unit: 'kCal', name: 'Calories' },
        { id: 'proteins', icon: protein, amount: userNutrition.proteinCount, unit: 'g', name: 'Protéines' },
        { id: 'carbs', icon: carbs, amount: userNutrition.carbohydrateCount, unit: 'g', name: 'Glucides' },
        { id: 'fat', icon: fat, amount: userNutrition.lipidCount, unit: 'g', name: 'Lipides' }
    ];

    // mappe sur le tableau nutritionStats pour créer le rendu
    return (
        <div className={s.user_nutrition}>
            {nutritionStats.map((item) => (
                <div key={item.id} className={s.nutrition_category}>
                    <img className={s.icon} src={item.icon} alt={`icon ${item.name.toLowerCase()}`} />
                    <div className={s.nutrition_infos}>
                        <span className={s.unit}>{`${item.amount} ${item.unit}`}</span>
                        <span className={s.macronutriment}>{item.name}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}