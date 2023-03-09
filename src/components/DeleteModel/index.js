import React from 'react'

const DeleteModel = () => {
  return (
    <div className={styles.modal}>
            <div className={styles.innerModal}>
                <h1>Log Out</h1>
                <p>You will be returned to the login <br />Screen.</p>
                <div className={styles.or}>
                    <div></div>
                </div>
                <div className={styles.buttonContainer}>
                    <div  className={styles.cancel}>
                        <span>Cancel</span>
                    </div>
                    <div className={styles.logout}>
                        <span>Log out</span>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default DeleteModel
