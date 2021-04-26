import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from '@material-ui/icons/Add'
import { Input, TableCell, Table, TableRow, TableHead, Card, CardContent } from '@material-ui/core'

import Calculations from './Calculations'

let cache = []
let hits = []
let lru = []
let rowCount = 0
let numHits = 0
let capMiss = 0
let compMiss = 0
let maxCacheLen = 5
let cacheLen = 0
let policy = 'FIFO'

const Main = () => {
    const [pages, setPages] = useState([])

    const [inputPolicy, setInputPolicy] = useState()
    const [inputPage, setInputPage] = useState()
    const [inputCacheSize, setInputCacheSize] = useState()

    const useStyles = makeStyles({
        table: {
            width: "60vw",
            // borderStyle: "solid",
            display: "flex",
            float: "left",
            marginLeft: "30px",
        },
        text: {
            color: "#D3D3D3",
            fontSize: "1.2em",
        },
        thead: {
            color: "#D3D3D3",
            fontSize: "1.4em",
        },
        input: {
            margin: "30px",
            color: 'white'
        },
        card: {
            width: "60vw",
            backgroundColor: "#202020"
        }
    })

    const updatePolicy = () => {
        policy = inputPolicy
    }

    const updateMaxCacheSize = () => {
        maxCacheLen = inputCacheSize
    }

    const updateRows = () => {

        let newVal = inputPage
        let prevVal = cache[cache.length - 1]
        let temp = []
        
        
        if (rowCount < 1) {
            // newVal = inputPage
            temp = cache.concat([newVal])
            cache.push(temp)
            hits.push('Compulsory Miss')
            lru.push(newVal)
            compMiss++
            rowCount++
        }
        
        else {
            if (prevVal.includes(newVal) || prevVal.includes(newVal + ', ')) {
                setPages([
                    ...pages,
                    { value: inputPage }
                ])
                cache.push(prevVal)
                hits.push('Hit')
                numHits++
                temp = prevVal

                if (policy === 'LRU') {
                    for (let i = 0; i < lru.length; i++) {
                        if (lru[i] === newVal) {
                            lru.splice(i, 1)
                            lru.splice(0, newVal)
                        }
                    }
                }
                rowCount++
                return
            }

            if (cacheLen >= maxCacheLen && policy === 'FIFO') {
                // newVal = inputPage
                hits.push("Capacity Miss")
                temp = prevVal.concat([newVal])
                temp[temp.length - 2] = temp[temp.length - 2] + ', '
                temp.shift()
                cache.push(temp)
                capMiss++
            }
            else if (cache.length >= maxCacheLen && policy === 'LIFO') {
                // newVal = inputPage
                hits.push("Capacity Miss")
                let copy = prevVal.slice()
                copy.pop()
                temp = copy.concat([newVal])
                // temp[temp.length - 2] = temp[temp.length - 2] + ', '
                cache.push(temp)
                capMiss++
            }
            else if (cache.length >= maxCacheLen && policy === 'LRU') {
                hits.push("Capacity Miss")
                capMiss++
                let lastVal = lru[lru.length - 1]

                let index1 = prevVal.indexOf(lastVal + ', ')
                let index2 = prevVal.indexOf(lastVal)

                let copy = prevVal.slice()
                if (index1 != -1) {
                    newVal = newVal + ', '
                    copy[index1] = newVal
                }
                if (index2 != -1) {
                    if (prevVal[index2].includes(', ')) {
                        copy[index2] = newVal + ', '
                    }
                    else {
                        copy[index2] = newVal
                    }
                }


                lru.pop()
                lru.unshift(newVal)
                cache.push(copy)

            }
            else {
                hits.push("Compulsory Miss")
                lru.unshift(newVal)
                compMiss++
                // newVal = newVal + ', '
                temp = prevVal.concat([newVal])
                temp[temp.length - 2] = temp[temp.length - 2] + ', '
                cache.push(temp)
            }
        }

        cacheLen++
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

            <Input className={classes.input} value={inputPage} onChange={(event) => setInputPage(event.target.value)} placeholder="Page Number" label="Page" />
            <AddIcon onClick={() => updateRows()}/>

            <Input className={classes.input} value={inputCacheSize} onChange={(event) => setInputCacheSize(event.target.value)} placeholder="Max Cache Size" label="MaxCache" />
            {/* <input value={inputPage} onChange={(event) => setInputPage(event.target.value)} label="Page" /> */}
            <AddIcon onClick={() => updateMaxCacheSize()}/>
        
            <Table className={classes.table}>
            <Card className={classes.card}>
                <TableHead className={classes.thead}>
                    <TableRow>
                        <TableCell width="50%" className={classes.thead} align="left">P#</TableCell>
                        <TableCell width="50%" className={classes.thead} align="left">Hit/Miss</TableCell>
                        <TableCell width="50%" className={classes.thead} align="left">Cache</TableCell>
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
            </Card>
            </Table>
        
            <Calculations hits={numHits} capMiss={capMiss} compMiss={compMiss} total={rowCount} />
        </div>
    )
}

export default Main