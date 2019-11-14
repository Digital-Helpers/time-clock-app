import React, {useEffect} from 'react'
import axios from 'axios';

export default function Dashboard() {
    const [userData, setUserData] = React.useState("")
    useEffect(()=>{
        //grab user info from state and send request to server to determine which user dashboard to display
        axios.get('/')
        .then(user => {
            setUserData(user)
        })
        .catch(err=> console.log(err))
    })
    return (
        <div>
            <h1>Dashboard</h1>            
        </div>
    )
}
