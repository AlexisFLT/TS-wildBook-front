import avatar from "../../assets/avatar.png";
import { BsTrash3Fill } from "react-icons/bs";
import PropTypes from "prop-types";
import axios from "axios";
import Skill, { ISkillProps } from "../Skills/Skill";
import styles from "./wilderCard.module.css";

export type Refresh = () => void;

export interface IWilderProps {
  id: number,
  name: string,
  city: string,
  skills: ISkillProps[],
};

function WilderCard({ id, name, city, skills }: IWilderProps) {

  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5000/api/wilder/${id}`)
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.app} key={id}>
      <button
        type="button"
        onClick={() => handleDelete(id)}
        className={styles.trash}
      >
        <BsTrash3Fill />
      </button>
      <img className={styles.avatarImg} src={avatar} alt="avatar" />
      <section className={styles.about}>
        <h3 className={styles.h3}>
          {name}
          <span className={styles.city}> {city}</span>
        </h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
          massa, varius a, semper congue, euismod non, mi.
        </p>
      </section>
      <section className={styles.skillsList}>
        <h4>Wild Skills</h4>
        <ul className={styles.skills}>
            {skills.map((skill) => (
              <button type="button" className={styles.button}>
                <Skill key={skill.title} title={skill.title} votes={skill.votes} />
              </button>
            ))}
        </ul>
      </section>
    </div>
  );
}

WilderCard.propTypes = {
  key: PropTypes.number,
  id: PropTypes.number,
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WilderCard;
