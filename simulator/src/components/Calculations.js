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
            <CardContent className="epicFont">
                <h2>Calculations</h2>
                <h3>Hit Percentage = {props.total > 0 ? Math.round((props.hits / (props.total)) * 100) : 0}%</h3>
                <h3>Capacity Miss Percentage = {props.total > 0 ? Math.round((props.capMiss / (props.total)) * 100) : 0}%</h3>
                <h3>Compulsory Miss Percentage = {props.total > 0 ? Math.round((props.compMiss / (props.total)) * 100) : 0}%</h3>
                <h3>Total Miss Percentage = {props.total > 0 ? Math.round((props.compMiss + props.capMiss) / (props.total) * 100) : 0}%</h3>
                {/* <h5>{props.calculations.hits}</h5>
                <h5>{props.calculations.capMiss}</h5>
                <h5>{props.calculations.compMiss}</h5> */}
            </CardContent>
        </Card>
    )
}

export default Calculations