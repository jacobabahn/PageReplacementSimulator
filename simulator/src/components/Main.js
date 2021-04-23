import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from '@material-ui/icons/Add'
import { Input, TableCell, Table, TableRow, TableHead } from '@material-ui/core'


let cache = []
let hits = []
let rowCount = 0
let numHits = 0
let capMiss = 0
let compMiss = 0
let maxCacheLen = 5

const Main = () => {
    const [pages, setPages] = useState([])
    // const [cache, setCache] = useState([0])

    const [inputPage, setInputPage] = useState()
    const [inputCacheSize, setInputCacheSize] = useState()

    const useStyles = makeStyles({
        table: {
            width: "50vw"
        },
        text: {
            color: "#D3D3D3"
        },
        input: {
            margin: "10px",
            color: '#D3D3D3'
        }
    })

    const updateMaxCacheSize = () => {
        maxCacheLen = inputCacheSize
    }

    const updateRows = () => {

        let newVal = inputPage + ', '
        let prevVal = cache[cache.length - 1]
        let temp = []
        

        if (rowCount > 0) {
            let len = cache[cache.length - 1]
            if (prevVal.includes(newVal)) {
                setPages([
                    ...pages,
                    { value: inputPage }
                ])
                cache.push(len)
                hits.push('Hit')
                numHits++
                temp = prevVal
                console.log(temp)
                return
            }
            temp = prevVal.concat([newVal])
        }
        else{
            temp = cache.concat([newVal])
        }

        cache.push(temp)
        if (cache.length <= maxCacheLen) {
            hits.push("Compulsory Miss")
            compMiss++
        }
        else {
            hits.push("Capacity Miss")
            capMiss++
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
            <Input className={classes.input} value={inputPage} onChange={(event) => setInputPage(event.target.value)} placeholder="PAS" label="Page" className/>
            <AddIcon onClick={() => updateRows()}/>

            <Input className={classes.input} value={inputCacheSize} onChange={(event) => setInputCacheSize(event.target.value)} placeholder="Max Cache Size" label="MaxCache" />
            {/* <input value={inputPage} onChange={(event) => setInputPage(event.target.value)} label="Page" /> */}
            <AddIcon onClick={() => updateMaxCacheSize()}/>

            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.text} align="left">PAS</TableCell>
                        <TableCell className={classes.text} align="left">Hit/Miss</TableCell>
                        <TableCell className={classes.text} align="left">Cache</TableCell>
                    </TableRow>
                </TableHead>

                <div>
                    {pages.map((page, index)=> 
                        <TableRow>
                            <TableCell>{page.value}</TableCell>
                            <TableCell>{hits[index]}</TableCell>
                            <TableCell>{cache[index]}
                            </TableCell>
                        </TableRow>
                    )}
                </div>
            </Table>

        </div>
    )
}

export default Main