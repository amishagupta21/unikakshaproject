import React from 'react'
import styles from "./index.module.css"

const DeleteModel = (props) => {
  return (
    <div className={styles.modal}>
            <div className={styles.innerModal}>
                <h1>Delete Account</h1>
                <p>Your account will be deleted permanently <br />you will not be able to access the data.</p>
                <div className={styles.or}>
                    <div></div>
                </div>
                <div className={styles.buttonContainer}>
                    <div onClick={props.cancelHandler} className={styles.cancel}>
                        <span>Cancel</span>
                    </div>
                    <div onClick={props.deleteHandler} className={styles.logout}>
                        <span>Delete Account </span>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DeleteModel
