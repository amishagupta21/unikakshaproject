import React from 'react'
import styles from "./index.module.css"
import { femaleIcon, maleIcon, profileEditIcon, profilePicture, trashWhite } from '../../assets/images';

const DeleteModel = (props) => {
  return (
    <div className={styles.modal}>
        <div className='delete-modal-popus'>
            <div className={styles.innerModal}>
            <a onClick={props.deleteHandler} className="close-del-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
<path d="M9.64591 8.00087L14.6626 2.99587C14.8823 2.77618 15.0057 2.47822 15.0057 2.16753C15.0057 1.85685 14.8823 1.55889 14.6626 1.3392C14.4429 1.11951 14.1449 0.996094 13.8342 0.996094C13.5236 0.996094 13.2256 1.11951 13.0059 1.3392L8.00091 6.35587L2.99591 1.3392C2.77622 1.11951 2.47826 0.996094 2.16757 0.996094C1.85689 0.996094 1.55893 1.11951 1.33924 1.3392C1.11955 1.55889 0.996132 1.85685 0.996132 2.16753C0.996132 2.47822 1.11955 2.77618 1.33924 2.99587L6.35591 8.00087L1.33924 13.0059C1.22989 13.1143 1.1431 13.2434 1.08387 13.3855C1.02464 13.5277 0.994141 13.6802 0.994141 13.8342C0.994141 13.9882 1.02464 14.1407 1.08387 14.2829C1.1431 14.425 1.22989 14.5541 1.33924 14.6625C1.4477 14.7719 1.57673 14.8587 1.7189 14.9179C1.86107 14.9771 2.01356 15.0076 2.16757 15.0076C2.32159 15.0076 2.47408 14.9771 2.61625 14.9179C2.75841 14.8587 2.88745 14.7719 2.99591 14.6625L8.00091 9.64587L13.0059 14.6625C13.1144 14.7719 13.2434 14.8587 13.3856 14.9179C13.5277 14.9771 13.6802 15.0076 13.8342 15.0076C13.9883 15.0076 14.1407 14.9771 14.2829 14.9179C14.4251 14.8587 14.5541 14.7719 14.6626 14.6625C14.7719 14.5541 14.8587 14.425 14.9179 14.2829C14.9772 14.1407 15.0077 13.9882 15.0077 13.8342C15.0077 13.6802 14.9772 13.5277 14.9179 13.3855C14.8587 13.2434 14.7719 13.1143 14.6626 13.0059L9.64591 8.00087Z" fill="black"/>
</svg></a>
                <h1>Delete Account</h1>
                
                <p className="info-content">Your account will be deleted permanently you will not be able to access the data.</p>
                <div className={styles.or}>
                    <div></div>
                </div>
                <div className={styles.buttonContainer}>
                    <div onClick={props.deleteHandler} className={styles.cancel}>
                    <img
              src={trashWhite}
              alt="TrashDelete"
              className="trash-delete"
              
            /> <span>Delete</span>
                    </div>
                    <div onClick={props.cancelHandler} className={styles.logout}>
                        <span>Cancel </span>
                    </div>
                </div>
            </div>
            </div>
        </div>
  )
}

export default DeleteModel
