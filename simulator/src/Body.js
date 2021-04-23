import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Paper, Typography } from '@material-ui/core'

import Main from './components/Main'


const Body = () => {
    const useStyles = makeStyles({
        body: {
            height: "100%"
        },
        card: {
            backgroundColor: "#303030",
            margin: "25px",
            height: "85vh"
        },
        text: {
            font: "40px",
        }
    })

    const classes = useStyles()

    return(
        <div className={classes.body}>
            <Paper className={classes.card}>
                <Main />
            </Paper>
        </div>
    )
}

export default Body