import React from "react"
import styles from './Header.module.css'
export default function Header() {
    return (
        <div>
            <h1 className={styles.Header} >
                <a className={styles.aref} >Virtual Lollipop</a>
            </h1>
        </div>
    )
}