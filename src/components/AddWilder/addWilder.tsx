import axios from "axios";
import PropTypes from "prop-types";
import { AiOutlineUserAdd } from "react-icons/ai";
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from "./addWilder.module.css";
import { useEffect, useState } from "react";

interface Refresh {
  refresh: () => void;
}

interface IFormInput {
  id: number,
  name: string;
  city: string,
  grades: IFormSkillGrade,
}

interface IFormSkillGrade{
  id: number,
  wilderId: number,
  skillId: number,
  grade: number,
  skill: IFormSkill,
}

interface IFormSkill{
  id: number,
  name: string,
}


const AddWilder = ({ refresh }: Refresh)  => {

  const [skills, setSkills] = useState<IFormSkill[]>([]);

  const { register, handleSubmit, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await axios
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formIcon}>
      <section className={styles.form}>
        <section className={styles.inputBlock}>
          <label className={styles.labelName}>Name</label>
          <input
            type="text"
            {...register("name")}
          />
        </section>
        <br />
        <section className={styles.inputBlock}>
          <label className={styles.labelCity}>City</label>
          <input
            type="text"
            {...register("city")}
          />
        </section>
      </section>
      <section className={styles.form}>
        <section className={styles.inputBlock}>
          <label className={styles.labelName}>Skill Selection</label>
          <select {...register("grades.skill.name")} >
          <option>- - -</option>
            {skills.map((skill)=> {
              return <option key={skill.id} value={skill.name}>{skill.name}</option>
            })}
          </select>  
        </section>
        <br />
        <section className={styles.inputBlock}>
          <label className={styles.labelCity}>Grade</label>
          <input
            type="text"
            {...register("grades.grade")}
          />
        </section>
      </section>
      <button type="submit" className={styles.addIcon}>
        <AiOutlineUserAdd />
      </button>
    </form>
  );
};

AddWilder.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export default AddWilder;
