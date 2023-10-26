import s from "./style.module.css";
import yoga from "../../assets/images/sportIcons/yoga.png"
import biking from "../../assets/images/sportIcons/biking.png"
import gym from "../../assets/images/sportIcons/gym.png"
import swimming from "../../assets/images/sportIcons/swimming.png"


export function SportNav() {
    return (
        <>
            <div className={s.container}>
                <div className={s.icon_block}>
                    <img className={s.icon} src={yoga} alt="Icone yoga" />
                    <img className={s.icon} src={swimming} alt="Icone natation" />
                    <img className={s.icon} src={biking} alt="Icone vélo" />
                    <img className={s.icon} src={gym} alt="Icone gym" />
                </div>
                <span className={s.copyright}>Copyright, SportSee 2020</span>
            </div>
        </>
    )
}