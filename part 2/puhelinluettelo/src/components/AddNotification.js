import React from 'react'

const AddNotification = ( {goodMessage, notification }) => {
    if(goodMessage){
        const textStyle = {
            marginLeft: "25%",
            marginRight: "25%",
            border: "solid",
            color:  "#228B22"
        }
    if (notification) {
            return <p style = {textStyle}>{notification}</p>
        }
            else {
                return null
            }
    }

    else {
        const textStyle = {
                marginLeft: "25%",
                marginRight: "25%",
                border: "solid",
                color:  "red"
            }
        if (notification) {
                return <p style = {textStyle}>{notification}</p>
            }
                else {
                    return null
                }
        }


    
}

export default AddNotification