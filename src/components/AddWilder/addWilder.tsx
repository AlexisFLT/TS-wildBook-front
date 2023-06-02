import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from "./addWilder.module.css";
import { useEffect, useState } from "react";



const AddWilder = ({ setLastUpdate }: { setLastUpdate: React.Dispatch<React.SetStateAction<number>>; })  => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [skills, setSkills] = useState<IFormSkill[]>([]);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await axios
      .post("http://localhost:5000/api/wilder", { name: name, city: city });
      setLastUpdate(new Date().getTime());
      .post("http://localhost:5000/api/grade", {
          name: data.name,
          city: data.city,
          grades: {
              wilderId: data.id,
              skillId: data.grades.skill.id,
              skill: data.grades.skill.name,
              grade: data.grades.grade
          }
      })     
      .then(() => {
        console.log(data);
        refresh();
        reset();
      });
  };

  const getSkills = async () => {
    const skills = await axios.get("http://localhost:5000/api/skill");
    setSkills(skills.data)
    console.log(skills);
};

useEffect(() => {
  getSkills();
}, []);

  return (
    <form onSubmit={handleSubmit}>
      <h1  className={styles.title}>Create a Wilder</h1>
      <section  className={styles.formIcon}>
        <section className={styles.form}>
          <section className={styles.inputBlock}>
            <label className={styles.labelName}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </section>
          <br />
          <section className={styles.inputBlock}>
            <label className={styles.labelCity}>City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </section>
        </section>
        <button type="submit" className={styles.addIcon}>
          <AiOutlineUserAdd />
        </button>
      </section>
    </form>
  );
};

export default AddWilder;
