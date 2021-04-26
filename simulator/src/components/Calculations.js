import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Card, CardContent } from '@material-ui/core'

const Calculations = (props) => {

    const useStyles = makeStyles({
       container: {
           color: "#D3D3D3",
        //    borderStyle: "solid",
           width: "25vw",
           align: "right",
           display: "flex",
           float: "right",
           backgroundColor: "#202020",
           marginRight: "40px"
       }
    })

    const classes = useStyles()

    return (
        <Card className={classes.container}>
            <CardContent>
                <h2>Calculations</h2>
                <h3>Hit Percentage = {Math.round((props.hits / (props.total - 1)) * 100)}%</h3>
                <h3>Capacity Miss Percentage = {Math.round((props.capMiss / (props.total - 1)) * 100)}%</h3>
                <h3>Compulsory Miss Percentage = {Math.round((props.compMiss / (props.total - 1)) * 100)}%</h3>
                <h3>Total Miss Percentage = {Math.round((props.compMiss + props.capMiss - props.hits) / (props.total - 1) * 100)}%</h3>
                {/* <h5>{props.calculations.hits}</h5>
                <h5>{props.calculations.capMiss}</h5>
                <h5>{props.calculations.compMiss}</h5> */}
            </CardContent>
        </Card>
    )
}

export default Calculations