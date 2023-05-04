import styles from "./header.module.css";

function Header() {
    return(
        <div className={styles.app}>
            <h1 className={styles.h1}>
                Wilders Book
            </h1>
        </div>
    )
}

export default Header;