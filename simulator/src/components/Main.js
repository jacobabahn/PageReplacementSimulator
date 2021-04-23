import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from '@material-ui/icons/Add'
import { Input, TableCell, Table, TableRow, TableHead } from '@material-ui/core'

import Calculations from './Calculations'

let cache = []
let hits = []
let rowCount = 0
let numHits = 0
let capMiss = 0
let compMiss = 0
let maxCacheLen = 5
let policy = 'FIFO'

const Main = () => {
    const [pages, setPages] = useState([])

    const [inputPolicy, setInputPolicy] = useState()
    const [inputPage, setInputPage] = useState()
    const [inputCacheSize, setInputCacheSize] = useState()

    const useStyles = makeStyles({
        table: {
            width: "50vw",
            marginLeft: "30px",
        },
        text: {
            color: "D3D3D3",
            fontSize: "1.2em",
        },
        thead: {
            color: "#D3D3D3",
            fontSize: "1.5em",
        },
        input: {
            margin: "30px",
            color: '#D3D3D3'
        }
    })

    const updatePolicy = () => {
        policy = inputPolicy
    }

    const updateMaxCacheSize = () => {
        maxCacheLen = inputCacheSize
    }

    const updateRows = () => {

        let newVal = inputPage + ', '
        let prevVal = cache[cache.length - 1]
        let temp = []
        
        
        if (rowCount < 1) {
            temp = cache.concat([newVal])
            cache.push(temp)
            hits.push('Compulsory Miss')
            compMiss++
        }
        
        else {
            if (prevVal.includes(newVal)) {
                setPages([
                    ...pages,
                    { value: inputPage }
                ])
                cache.push(prevVal)
                hits.push('Hit')
                numHits++
                temp = prevVal
                console.log(temp)
                rowCount++
                return
            }

            if (cache.length >= maxCacheLen && policy === 'FIFO') {
                hits.push("Capacity Miss")
                temp = prevVal.concat([newVal])
                temp.shift()
                cache.push(temp)
                capMiss++
            }
            else if (cache.length >= maxCacheLen && policy === 'LIFO') {
                hits.push("Capacity Miss")
                let copy = prevVal.slice()
                copy.pop()
                temp = copy.concat([newVal])
                cache.push(temp)
                capMiss++
            }
            else {
                hits.push("Compulsory Miss")
                compMiss++
                temp = prevVal.concat([newVal])
                cache.push(temp)
            }
        }

        rowCount++
            
        setPages([
            ...pages,
            { value: inputPage }
        ])
        
    }

    const ye = () => {
        alert("I have been clicked!")
    }

    const classes = useStyles()

    return(
        <div className={classes.text}>
            <Input className={classes.input} value={inputPolicy} onChange={(event) => setInputPolicy(event.target.value)} placeholder="Policy" label="Policy" />
            <AddIcon onClick={() => updatePolicy()}/>

            <Input className={classes.input} value={inputPage} onChange={(event) => setInputPage(event.target.value)} placeholder="PAS" label="Page" />
            <AddIcon onClick={() => updateRows()}/>

            <Input className={classes.input} value={inputCacheSize} onChange={(event) => setInputCacheSize(event.target.value)} placeholder="Max Cache Size" label="MaxCache" />
            {/* <input value={inputPage} onChange={(event) => setInputPage(event.target.value)} label="Page" /> */}
            <AddIcon onClick={() => updateMaxCacheSize()}/>

            <Table className={classes.table}>
                <TableHead className={classes.thead}>
                    <TableRow>
                        <TableCell className={classes.thead} align="left">PAS</TableCell>
                        <TableCell className={classes.thead} align="left">Hit/Miss</TableCell>
                        <TableCell className={classes.thead} align="left">Cache</TableCell>
                    </TableRow>
                </TableHead>

                {pages.map((page, index)=> 
                    <TableRow>
                        <TableCell className={classes.text} align="left">{page.value}</TableCell>
                        <TableCell className={classes.text} align="left">{hits[index]}</TableCell>
                        <TableCell className={classes.text} align="left">{cache[index]}
                        </TableCell>
                    </TableRow>
                )}
            </Table>
            
            <Calculations hits={numHits} capMiss={capMiss} compMiss={compMiss} total={rowCount} />
        </div>
    )
}

export default Main