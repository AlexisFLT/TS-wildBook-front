import { ISkillProps } from "../../interface/interface";
import styles from "./skill.module.css"

  
  const Skill = ({ title, votes }: ISkillProps) => {
    return (
      <li className={styles.skillGrade}>
        <h5 className={styles.gradeTitle}>{title}</h5>
        <span className={styles.grades}>{votes}</span>
      </li>
    );
  };
  
  export default Skill;