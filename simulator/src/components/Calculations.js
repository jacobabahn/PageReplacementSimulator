import React from 'react'
import { makeStyles } from "@material-ui/core/styles"

const Calculations = (props) => {

    const useStyles = makeStyles({
        container: {
            position: 'absolute',
            right: '30vw',
            height: '75%',
        }
    })

    const classes = useStyles()

    return (
        <div className={classes.container}>
            <h2>Calculations</h2>
            <h3>Hit Percentage = {(props.hits / props.total) * 100}%</h3>
            <h3>Capcaity Miss Percentage = {(props.capMiss / props.total) * 100}%</h3>
            <h3>Compulsory Miss Percentage = {(props.compMiss / props.total) * 100}%</h3>
            <h3>Total Miss Percentage = {(props.total - props.hits) / props.total * 100}%</h3>
            {/* <h5>{props.calculations.hits}</h5>
            <h5>{props.calculations.capMiss}</h5>
            <h5>{props.calculations.compMiss}</h5> */}
        </div>
    )
}

export default Calculations