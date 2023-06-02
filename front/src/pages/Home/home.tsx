import Header from "../../components/Header/header";
import Wilders from "../../components/Wilders/wildersBlock";
import styles from "./home.module.css";

function Home() {

    return(
        <div className={styles.app}>
            <header>
                <Header/>
            </header>
            <section>
                <Wilders/>
            </section>
        </div>
    )
}

export default Home;