import styles from '../../styles/loading.module.css'

const index = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.head}>Please Wait...</h1>
        <p className={styles.p}>We are preparing ingredients</p>
    </div>
  )
}

export default index