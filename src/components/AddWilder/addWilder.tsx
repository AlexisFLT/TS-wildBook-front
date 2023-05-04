import axios from "axios";
import PropTypes from "prop-types";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import styles from "./addWilder.module.css";

interface Refresh {
  refresh: () => void;
}

const AddWilder = ({ refresh }: Refresh)  => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/wilder", { name, city })
      .then(() => {
        setName("");
        setCity("");
        refresh();
      });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formIcon}>
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
    </form>
  );
};

AddWilder.propTypes = {
  refresh: PropTypes.func.isRequired,
};

export default AddWilder;
