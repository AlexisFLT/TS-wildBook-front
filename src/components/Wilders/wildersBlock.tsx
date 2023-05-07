import { useEffect, useState } from "react";
import axios from "axios";
import WilderCard , { IWilderProps } from "../WilderCard/wilderCard";
import AddWilder from "../AddWilder/addWilder";
import styles from "./wildersBlock.module.css";
import AddGrade from "../AddGrade/AddGrade";

interface ISkillFromAPI {
    id: number;
    name: string;
  }
  
  interface IGradeFromAPI {
    grade: number;
    skill: ISkillFromAPI;
  }
  
  interface IWilderFromAPI {
    name: string;
    city: string;
    id: number;
    grades: IGradeFromAPI[];
  }

  const formatWildersFromApi = (wilders: IWilderFromAPI[]): IWilderProps[] =>
  wilders.map((wilder) => {
    return {
      id: wilder.id,
      name: wilder.name,
      city: wilder.city,
      skills: wilder.grades.map((grade) => {
        return { votes: grade.grade, title: grade.skill.name };
      }),
    };
  });
  
  function Wilders() {
      const [wilders, setWilders] = useState<IWilderProps[]>([]);
      const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
      
    useEffect(() => {
      const fetchWilders = async () => {
        const wilderFromApi = await axios.get<IWilderFromAPI[]>(
          "http://localhost:5000/api/wilder"
        );
        console.log(wilderFromApi);
        setWilders(formatWildersFromApi(wilderFromApi.data));
      };
      fetchWilders();
    }, [lastUpdate]);

    return(
        <div className={styles.app}>
            <section className={styles.addRemove} >
              <AddWilder setLastUpdate={setLastUpdate}/>
              <AddGrade setLastUpdate={setLastUpdate} />
            </section>
            <h2 className={styles.h2}>Wilders</h2>
            <section className={styles.cardsBlock}>
                {wilders.map((wilder) => (
                    <WilderCard
                        key={wilder.id}
                        name={wilder.name}
                        city={wilder.city}
                        skills={wilder.skills}   
                        id={wilder.id}      
                    />
                ))}
            </section>
        </div>
    )
}

export default Wilders;
