import { useEffect, useState } from "react";
import WilderCard , { IWilderProps } from "../WilderCard/wilderCard";
import styles from "./wildersBlock.module.css";
import axios from "axios";
import AddWilder from "../AddWilder/addWilder";


function Wilders() {
    const [wilders, setWilders] = useState<IWilderProps[]>([]);
    
    const fetchData = async () => {
        const wilders = await axios.get("http://localhost:5000/api/wilder");
        setWilders(wilders.data)
        console.log(wilders);
    };

    useEffect(() => {
        fetchData();
    }, []);
    return(
        <div className={styles.app}>
            <section className={styles.addRemove} >
                <AddWilder refresh={fetchData} />
            </section>
            <h2 className={styles.h2}>Wilders</h2>
            <section className={styles.cardsBlock}>
                {wilders.map((wilder) => (
                    <WilderCard
                        key={wilder.id}
                        id={wilder.id}         
                        name={wilder.name}
                        city={wilder.city}
                        grades={wilder.grades}   
                        refresh={fetchData} 
                    />
                ))}
            </section>
        </div>
    )
}

export default Wilders;
