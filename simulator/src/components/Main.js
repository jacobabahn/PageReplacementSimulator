import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles"
import AddIcon from '@material-ui/icons/Add'
import { Input, TableCell, Table, TableRow, TableHead, Card, Button, Menu, MenuItem, InputLabel } from '@material-ui/core'

import Calculations from './Calculations'

let cache = []
let hits = []
let lru = []
let rowCount = 0
let numHits = 0
let capMiss = 0
let compMiss = 0
// let maxCacheLen = 5
let cacheLen = 0
let policy = 'FIFO'

const Main = () => {
    const [pages, setPages] = useState([])
    
    const [anchorEl, setAnchorEl] = useState(null)
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
            borderRadius: "100px",
        },
        cellText: {
            color: "#D3D3D3",
            fontSize: "1.2em",
            borderBottom: "solid #282828 1px"
        },
        thead: {
            color: "#D3D3D3",
            fontSize: "1.4em",
            borderBottom: "Solid #282828 2px"
        },
        input: {
            margin: "30px 5px 30px 30px",
            color: 'white'
        },
        btn: {
            color: "#D3D3D3",
            marginLeft: "30px",
            marginRight: "20px",
            border: "solid #202020 1px"
        },
        btnItem: {
            color: "#D3D3D3",
            backgroundColor: "#282828"
        },
        card: {
            width: "60vw",
            backgroundColor: "#202020",
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

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
    };

    const updatePolicy = (pol) => {
        policy = pol
        setAnchorEl(null)
    }

    const updateMaxCacheSize = (event) => {
        setInputCacheSize(event)
        // maxCacheLen = inputCacheSize
    }

    const updateRows = () => {
        if (!Number.isInteger(Number(inputPage)) || !Number.isInteger(Number(inputCacheSize))) {
            return
        }

        // console.log(Number.isInteger(Number(inputPage)))
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
                hits.push('Hit')
                numHits++
                temp = prevVal
                let lastCache = cache[cache.length - 1]

                if (policy === 'LRU' && rowCount > 1) {
                    let copy = lastCache.slice()
                    
                    for (let i = 0; i < lastCache.length; i++) {
                        if (lastCache[i] === (newVal + ', ') || lastCache[i] === newVal) {
                            copy[copy.length - 1] = copy[copy.length - 1] + ', '
                            copy.splice(i, 1)
                            copy.push(newVal)
                            cache.push(copy)
                            rowCount++
                            setPages([
                                ...pages,
                                { value: inputPage }
                            ])
                            return
                        }
                    }
                }
                rowCount++
                cache.push(prevVal)
                setPages([
                    ...pages,
                    { value: inputPage }
                ])
                return
            }

            // FIFO cache replacement when the cache is full
            if (cache[cache.length -  1].length >= inputCacheSize && policy === 'FIFO') {
                hits.push("Capacity Miss")
                temp = prevVal.concat([newVal])
                temp[temp.length - 2] = temp[temp.length - 2] + ', '
                temp.shift()
                cache.push(temp)
                capMiss++
            }
            // LIFO cache replacement when the cache is full
            else if (cache[cache.length - 1].length >= inputCacheSize && policy === 'LIFO') {
                hits.push("Capacity Miss")
                let copy = prevVal.slice()
                copy.shift()
                temp = [newVal + ', '].concat(copy)
                cache.push(temp)
                capMiss++
            }
            // LRU cache replacement when the cache is full
            else if (cache[cache.length - 1].length >= inputCacheSize && policy === 'LRU') {
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

    const classes = useStyles()

    return(
        <div className={classes.text}>
            <div>
                {/* <Input className={classes.input} value={inputPolicy} onChange={(event) => setInputPolicy(event.target.value)} placeholder="Policy" label="Policy" />
                <AddIcon className={classes.plusBtn} onClick={() => updatePolicy()}/> */}
                <Button className={classes.btn}aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {policy}
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem className={classes.btnInput} onClick={() => updatePolicy('FIFO')}>FIFO</MenuItem>
                    <MenuItem className={classes.btnInput} onClick={() => updatePolicy('LIFO')}>LIFO</MenuItem>
                    <MenuItem className={classes.btnInput} onClick={() => updatePolicy('LRU')}>LRU</MenuItem>
                </Menu>

                <Input className={classes.input} value={inputCacheSize} onChange={(event) => updateMaxCacheSize(event.target.value)} placeholder="Max Cache Size" label="MaxCache" />
                {/* <input value={inputPage} onChange={(event) => setInputPage(event.target.value)} label="Page" /> */}
                {/* <AddIcon className={classes.plusBtn} onClick={() => updateMaxCacheSize()}/> */}

                <Input className={classes.input} value={inputPage} onChange={(event) => setInputPage(event.target.value)} onKeyDown={(event) => event.key === 'Enter' ? updateRows() : console.log('Not Enter')} placeholder="Page Number" label="Page" />
                <AddIcon className={classes.plusBtn} onClick={() => updateRows()}/>

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