import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Modal.module.css'

export const Modal = (props) => {
    return (
        <>
            <Backdrop className={classes.Modal} show={props.show} clicked={props.modalClosed}></Backdrop>
            <div className={classes.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateX(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}>
                {props.children}
            </div>
        </>
    )
}
export default Modal;

