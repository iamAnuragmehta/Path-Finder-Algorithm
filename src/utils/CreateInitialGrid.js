export function createInitialGrid(RowNum, ColNum) {
    const grid = [];
    for (let row = 0; row < RowNum; row++) {
        const currentRow = [];
        for (let col = 0; col < ColNum; col++) {
            currentRow.push({
                row,
                col,
                isStart: false,
                isEnd: false,
                isWall: false,
                isEnergy: false,
                distance: Infinity,
                isPath: false,
                isTraversed: false,
                parent: null,
            });
        }
        grid.push(currentRow);
    }
    return grid;
}