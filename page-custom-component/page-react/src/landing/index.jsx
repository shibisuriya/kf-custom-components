import { kf } from './../sdk/index.js'
import kflogo from './../assets/kf.logo.png'

import styles from './styles.module.css'
import { useEffect, useState } from 'react'

const handleClick = () => {
    kf.client.showInfo(`Hi ${kf.user.Name}!`)
}

export function DefaultLandingComponent() {
    const [paramaters,setParameters] = useState("")
    useEffect(
    () => { kf.context.watchParams(function (data) {
		console.log("watch params data", data);
		setParameters(JSON.stringify(data));
	}, []);}
    )
    return (
        <div className={styles.landingHero}>
            <div className={styles.mainDiv}>
                <h1>Welcome, {kf.user.Name}</h1>
                <div>
                    <p className={styles.sampletext}>
                        This is a sample custom component pre-loaded with the
                        Kissflow SDK. <br></br>Edit <code>App.jsx</code> to make
                        changes.
                    </p>
                    <p className={styles.sampletext}>
                        Click{' '}
                        <a
                            href="https://kissflow.github.io/lcnc-sdk-js/"
                            target="_blank"
                        >
                            here
                        </a>{' '}
                        to read the SDK documentation.{' '}
                    </p>
                </div>
                <button onClick={handleClick}>Click me</button>
                <div>{paramaters}
                </div>
                <img src={kflogo} width={'120px'} className={styles.logo}></img>
            </div>
        </div>
    )
}
