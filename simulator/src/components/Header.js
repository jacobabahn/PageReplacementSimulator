import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const Header = theme => {
    const useStyles = makeStyles({
        nav: {
            backgroundColor: "#202020",
            marginBottom: "10px"
        },
        text: {
            margin: '0 auto',
            color: '#D3D3D3',
            fontFamily: "Volkorn",
            fontSize: "2em",
            fontWeight: "100"
        }
    })

    const classes = useStyles()

    return(
        <div>
            <AppBar className={classes.nav}>
                <Toolbar>
                    <Typography className={classes.text}>
                        Page Replacement Simulator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </div>
    )
}

export default Header