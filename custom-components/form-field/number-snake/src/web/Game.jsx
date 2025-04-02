import React, {
    useEffect,
    forwardRef,
    useState,
    useRef,
    useImperativeHandle,
    useCallback,
} from 'react'
import Grid from './Grid.jsx'
import { Grid as GridClass } from './Grid.js'

const Game = forwardRef((props, ref) => {
    const { showCellId, gameState, updateSnakeList } = props

    const [grid, setGrid] = useState({})
    const [view, setView] = useState([])
    const [annotations, setAnnotations] = useState([])

    const [isGameOver, setIsGameOver] = useState(false)

    const onSnakeGrow = useCallback(() => {
        console.log('I have been triggered')
    }, [])

    const viewUpdater = (cells) => {
        setView(cells)
        grid.onSnakeGrow = onSnakeGrow
    }

    const annotationsUpdater = (cells) => {
        setAnnotations(cells)
    }

    useEffect(() => {
        // This callback is used to update data from the
        // the object to the ui.
        //const grid = new Grid()
        const grid = new GridClass()
        setGrid(grid)
        setView(grid.getViewData())
        setAnnotations(grid.getAnnotationData())

        grid.viewUpdater = viewUpdater
        grid.annotationsUpdater = annotationsUpdater
        grid.gameOver = () => setIsGameOver(true)

        grid.updateSnakeList = updateSnakeList
        if (gameState) {
            grid.startGame()
        }

        if (props.updateSnakeList) {
            grid.moveSnakes([]) // Doing this updates the list of snakes on the screen (checkboxes) for us to debug.
        }
    }, [])

    useImperativeHandle(ref, () => {
        return {
            nextMove: (selectedSnakes) => grid.moveSnakes(selectedSnakes),
            prevMove: () => {},
            pauseGame: () => grid.pauseGame(),
            resumeGame: () => grid.resumeGame(),
        }
    })

    return (
        <Grid
            view={view}
            annotations={annotations}
            showCellId={showCellId}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            grid={grid}
        />
    )
})

export default Game
