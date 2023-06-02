import axios from "axios";
import { useEffect, useState } from "react";
import { IWilderProps, ISkillProps } from "../../interface/interface";
import styles from "./addGrade.module.css";


const AddGrade = ({ setLastUpdate }: { setLastUpdate: React.Dispatch<React.SetStateAction<number>>; }) => {
  const [wilderId, setWilderId] = useState("");
  const [skillId, setSkillId] = useState("");
  const [skills, setSkills] = useState<ISkillProps[]>([]);
  const [grade, setGrade] = useState("");
  const [wilders, setWilders] = useState<IWilderProps[]>([]);
  
  useEffect(() => {
    const fetchWilders = async () => {
      const result = await axios.get<IWilderProps[]>(
        "http://localhost:5000/api/wilder"
      );
      setWilders(result.data);
    };
    fetchWilders();
  }, []);

  const getSkills = async () => {
    const skills = await axios.get("http://localhost:5000/api/skill");
    setSkills(skills.data)
};

useEffect(() => {
  getSkills();
}, []);

  return (
    <form 
      onSubmit={(e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/grade", {
          wilderId: wilderId,
          skillId: skillId,
          grade: grade,
        });
        setLastUpdate(new Date().getTime())
      }}
    >
      <h1 className={styles.title}>Add a skill and a grade</h1>
      <section className={styles.form}>
        <section className={styles.inputBlock}>
          <label className={styles.label}>Choose a wilder: </label>
          <select
            onChange={(e) => {
              setWilderId(e.target.value);
            }}
            name="wilders"
            id="wilderselect"
          >
            <option value="">--Please choose an option--</option>
            {wilders.map((wilder) => (
              <option key={wilder.id} value={wilder.id}>
                {wilder.name}
              </option>
            ))}
          </select>
        </section>
        <br></br>
        <section className={styles.inputBlock}>
          <label className={styles.label}>Choose a Skill to add: </label>
          <select onChange={(e) => {
              setSkillId(e.target.value);
            }} 
          >
              <option value="">--Please choose an option--</option>
                {skills.map((skill) => {
                  console.log(skills);
                  
                  return <option value={skill.title} key={skill.id}>{skill.title}</option>
                })}
          </select> 
        </section> 
        <br></br>
        <section className={styles.inputBlock}>
          <label className={styles.label}>Grade: </label>
          <select onChange={(e) => {
            setGrade(e.target.value);
          }}>
              <option value="">--Please choose an option--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
          </select>
        </section>
        <br></br>
        <button>Submit</button>
      </section>
    </form>
  );
};

export default AddGrade;