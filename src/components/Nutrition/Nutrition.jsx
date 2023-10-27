import s from "./style.module.css";
import calories from "../../assets/images/nutritionIcons/calories-icon.png"
import carbs from "../../assets/images/nutritionIcons/carbs-icon.png"
import fat from "../../assets/images/nutritionIcons/fat-icon.png"
import protein from "../../assets/images/nutritionIcons/protein-icon.png"

export function Nutrition() {
    return (
        <div className={s.user_nutrition}>
            <div className={s.nutrition_category}>
                <img className={s.icon} src={calories} alt="icone calories" />
                <div className={s.nutrition_infos}>
                    <span className={s.unity}>number kCal</span>
                    <span className={s.macronutriment}>Calories</span>
                </div>
            </div>
            <div className={s.nutrition_category}>
                <img className={s.icon} src={protein} alt="icone proteines" />
                <div className={s.nutrition_infos}>
                    <span className={s.unity}>number g</span>
                    <span className={s.macronutriment}>Proteines</span>
                </div>
            </div>
            <div className={s.nutrition_category}>
                <img className={s.icon} src={carbs} alt="icone glucides" />
                <div className={s.nutrition_infos}>
                    <span className={s.unity}>number g</span>
                    <span className={s.macronutriment}>Glucides</span>
                </div>
            </div>
            <div className={s.nutrition_category}>
                <img className={s.icon} src={fat} alt="icone lipides" />
                <div className={s.nutrition_infos}>
                    <span className={s.unity}>number g</span>
                    <span className={s.macronutriment}>Lipides</span>
                </div>
            </div>
        </div>
    )
}