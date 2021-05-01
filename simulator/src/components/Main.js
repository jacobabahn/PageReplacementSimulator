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
            borderRadius: "100px"
        },
        cellText: {
            color: "#D3D3D3",
            fontSize: "1.2em",
            borderBottom: "0px"
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
        },
        plusBtn: {
            color: "D3D3D3",
            transition: ".2s",
            "&:hover": {
                color: "#3f51b5",
                cursor: "pointer",
                transform: "scale(1.5)"
            },
        cellCard: {
            backgroundColor: "#303030"
        } 
        },
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
        }
        
        else {
            if (prevVal.includes(newVal) || prevVal.includes(newVal + ', ')) {
                setPages([
                    ...pages,
                    { value: inputPage }
                ])
                hits.push('Hit')
                numHits++
                temp = prevVal
                let lastCache = cache[cache.length - 1]

                if (policy === 'LRU') {
                    let copy = lastCache.slice()
                    
                    for (let i = 0; i < lastCache.length; i++) {
                        if (lastCache[i] === (newVal + ', ') || lastCache[i] === newVal) {
                            copy[copy.length - 1] = copy[copy.length - 1] + ', '
                            copy.splice(i, 1)
                            copy.push(newVal)
                            cache.push([copy])
                            rowCount++
                            return
                        }
                    }
                }
                rowCount++
                cache.push(prevVal)
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
                copy.shift()
                temp = [newVal + ', '].concat(copy)
                // temp[temp.length - 2] = temp[temp.length - 2] + ', '
                cache.push(temp)
                capMiss++
            }
            else if (cache.length >= maxCacheLen && policy === 'LRU') {
                hits.push("Capacity Miss")
                capMiss++

                temp = prevVal.concat([newVal])
                temp.shift()
                temp[temp.length - 2] = temp[temp.length - 2] + ', '

                lru.pop()
                lru.unshift(newVal)
                cache.push(temp)

            }
            else {
                hits.push("Compulsory Miss")
                lru.unshift(newVal)
                compMiss++
                if (policy === 'LIFO') {
                    ye()
                    temp = [newVal + ', '].concat(prevVal)
                    cache.push(temp)
                } else {
                    temp = prevVal.concat([newVal])
                    temp[temp.length - 2] = temp[temp.length - 2] + ', '
                    cache.push(temp)
                }
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
            <div>
                <Input className={classes.input} value={inputPolicy} onChange={(event) => setInputPolicy(event.target.value)} placeholder="Policy" label="Policy" />
                <AddIcon className={classes.plusBtn} onClick={() => updatePolicy()}/>

                <Input className={classes.input} value={inputPage} onChange={(event) => setInputPage(event.target.value)} placeholder="Page Number" label="Page" />
                <AddIcon className={classes.plusBtn} onClick={() => updateRows()}/>

                <Input className={classes.input} value={inputCacheSize} onChange={(event) => setInputCacheSize(event.target.value)} placeholder="Max Cache Size" label="MaxCache" />
                {/* <input value={inputPage} onChange={(event) => setInputPage(event.target.value)} label="Page" /> */}
                <AddIcon className={classes.plusBtn} onClick={() => updateMaxCacheSize()}/>
            </div>
        
            <Table className={classes.table}>
            <Card className={classes.card}>
                <TableHead className={classes.thead}>
                    <TableRow classname="epicFont">
                        <TableCell width="50%" className={classes.thead} align="left">P#</TableCell>
                        <TableCell width="50%" className={classes.thead} align="left">Hit/Miss</TableCell>
                        <TableCell width="50%" className={classes.thead} align="left">Cache</TableCell>
                    </TableRow>
                </TableHead>

                {pages.map((page, index)=> 
                    <TableRow classname="epicFont">
                        <TableCell className={classes.cellText} align="left">{page.value}</TableCell>
                        <TableCell className={classes.cellText} align="left">{hits[index]}</TableCell>
                        <TableCell className={classes.cellText} align="left">{cache[index]}
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