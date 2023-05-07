import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useState } from "react";
import styles from "./addWilder.module.css";


const AddWilder = ({ setLastUpdate }: { setLastUpdate: React.Dispatch<React.SetStateAction<number>>; })  => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/api/wilder", { name: name, city: city });
      setLastUpdate(new Date().getTime());
  };

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
