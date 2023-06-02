import { useEffect, useState } from "react";
import axios from "axios";
import WilderCard from "../WilderCard/wilderCard";
import { IWilderFromAPI, IWilderProps } from "../../interface/interface";
import AddWilder from "../AddWilder/addWilder";
import styles from "./wildersBlock.module.css";
import AddGrade from "../AddGrade/AddGrade";
  

const formatWildersFromApi = (wilders: IWilderFromAPI[]): IWilderProps[] =>
wilders.map((wilder) => {
  return {
    id: wilder.id,
    name: wilder.name,
    grades: wilder.grades,
    city: wilder.city,
    skills: wilder.grades.map((grade) => {
      return { id:grade.skill.id, votes: grade.grade, title: grade.skill.name };
    }),
    
  };
});

function Wilders() {
      const [wilders, setWilders] = useState<IWilderProps[]>([]);
      const [lastUpdate, setLastUpdate] = useState(new Date().getTime());
      
    useEffect(() => {
      const fetchWilders = async () => {
        const response = await axios.get<IWilderFromAPI[]>(
          "http://localhost:5000/api/wilder"
        );
        const wildersFromApi = response.data;
        setWilders(formatWildersFromApi(wildersFromApi));
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
                        id={wilder.id}         
                        name={wilder.name}
                        city={wilder.city}
                        skills={wilder.skills}
                     />
                ))}
            </section>
        </div>
    )
}

export default Wilders;
