import React from 'react';
import styles from './CreateRequest.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default (props) => {

    const router = useRouter()


    return(
        <div className={`container ${styles.container}`}>
            <div className="alert alert-success md-3">
                <p><strong>Create a new request</strong></p>
                <button type="button" onClick={() => router.push(`${props.address}/Request/new`)} className="btn btn-light ">Create</button>                        
            </div>
        </div>
    );
};
