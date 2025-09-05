import { loadCultureFiles } from '../common/culture-loader';
/**
 * Interactive Image Puzzle
 */

import { Diagram, NodeModel, Node, NodeConstraints, SnapConstraints, HtmlModel, SelectorConstraints } from '@syncfusion/ej2-diagrams';


(window as any).default = (): void => {
loadCultureFiles();

let diagram: Diagram;
let gameBoard: number[] = new Array(16);
let emptyIndex: number = 0;
let moveCount: number = 0;
let gameTimer: any = null;
let elapsedSeconds: number = 0;
let timeDisplay: string = "00:00";
let isPaused: boolean = false;
let gameStarted: boolean = false;
let showWinDialog: boolean = false;
let showClue: boolean = false;
let isPuzzleSolved: boolean = false;
let diagramCreated: boolean = false;
let nodes: NodeModel[] = [];

// Image collections
let imageCollections: ImageTheme[] = [];
let currentImageMap: ImageTheme;
let currentThemeIndex: number = 0;
let imageRandom = Math.random;

// Constants
const tileWidth = 130;
const tileHeight = 130;
const gridSize = 4;

initializeImageCollections();
initializeGame();
setupTimer();
createDiagram();
setupEventListeners();

function initializeImageCollections(): void {
    // bridge theme
    const bridgeTheme: ImageTheme = {};
    // Nature theme
    const natureTheme: ImageTheme = {};
    // Man theme
    const manTheme: ImageTheme = {};

    for (let i = 1; i <= 16; i++) {
        const row = Math.ceil(i / 4);
        const col = ((i - 1) % 4) + 1;
        bridgeTheme[i] = `./src/diagram/Images/puzzle/bridge${col}x${row}.png`;
        natureTheme[i] = `./src/diagram/Images/puzzle/image${col}x${row}.png`;
        manTheme[i] = `./src/diagram/Images/puzzle/man${col}x${row}.png`;
    }

    imageCollections = [bridgeTheme, natureTheme, manTheme];
    currentImageMap = imageCollections[0];
    currentThemeIndex = 0;
}

function createDiagram(): void {
    diagram = new Diagram({
        width: '100%',
        height: "750px",
        nodes: nodes,
        snapSettings: {
            constraints: SnapConstraints.None
        },
        selectedItems: {
            constraints: SelectorConstraints.None
        },
        click: click,
        created: onCreated,
        load: onLoad,
    });

    diagram.appendTo('#diagram');
}

function onCreated(): void {
    diagramCreated = true;
    diagram.fitToPage();
}
function onLoad(): void {
    if (diagramCreated) {
        setTimeout(() => diagram.fitToPage(), 10);
    }
}

function createNodes(): void {
    nodes = [];
    // Background Node
    const backgroundNode: NodeModel = {
        id: "backgroundNode",
        offsetX: 788,
        offsetY: 392,
        height: 755,
        width: 639,
        style: {
            fill: "#B0C4DE",
            opacity: 0.5
        },
        constraints: NodeConstraints.None,
        shape: {
            type: 'Basic',
            shape: 'Rectangle',
            cornerRadius: 5
        }
    };
    nodes.push(backgroundNode);

    // Moves counter node
    const moveNode: NodeModel = {
        id: "moves",
        offsetX: 615,
        offsetY: 80,
        width: 160, height: 100,
        constraints: NodeConstraints.None,
        shape: {
            type: 'HTML',
            content: getMovesTemplate()
        }
    };
    nodes.push(moveNode);

    // Time node
    const timeNode: NodeModel = {
        id: "time",
        offsetX: 976,
        offsetY: 80,
        width: 160, height: 100,
        constraints: NodeConstraints.None,
        shape: {
            type: 'HTML',
            content: getTimeTemplate()
        }
    };
    nodes.push(timeNode);

    // New game button
    const newGameNode: NodeModel = {
        id: "newgame",
        offsetX: 610,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getNewGameTemplate()
        }
    };
    nodes.push(newGameNode);

    // Pause button
    const pauseNode: NodeModel = {
        id: "pause",
        offsetX: 980,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getPauseTemplate()
        }
    };
    nodes.push(pauseNode);

    // Clue button
    const clueNode: NodeModel = {
        id: "clue",
        offsetX: 795,
        offsetY: 725,
        width: 150, height: 50,
        constraints: NodeConstraints.PointerEvents,
        shape: {
            type: 'HTML',
            content: getClueTemplate()
        }
    };
    nodes.push(clueNode);

    // Create puzzle tiles
    for (let i = 0; i < gameBoard.length; i++) {
        if (gameBoard[i] !== 0) {
            const pieceNumber = gameBoard[i];
            const isInCorrectPosition = (i + 1) === pieceNumber;

            const node: NodeModel = {
                id: `tile${pieceNumber}`,
                width: tileWidth,
                height: tileHeight,
                offsetX: getTileX(i),
                offsetY: getTileY(i),
                annotations: [{
                    id: `annotation${pieceNumber}`,
                    width: 25,
                    height: 25,
                    template: getAnnotationTemplate(pieceNumber),
                    visibility: false,
                    offset: { x: 0.7, y: 0.1 },
                    horizontalAlignment: 'Center',
                    verticalAlignment: 'Center'
                }],
                style: {
                    strokeColor: "white"
                },
                shape: {
                    type: 'Image',
                    source: getImageSourceForTile(pieceNumber)
                }
            };

            if (canMoveTile(i)) {
                node.constraints = NodeConstraints.PointerEvents;
            } else {
                node.constraints = NodeConstraints.None;
            }

            nodes.push(node);
        }
    }
}

function getMovesTemplate(): string {
    return `<div class="moves-counter">
                    <span class="label">MOVES :</span>
                    <span class="count">${moveCount}</span>
                </div>`;
}

function getTimeTemplate(): string {
    return `<div class="timer">
                    <span class="label">TIME :</span>
                    <span class="time-display">${timeDisplay}</span>
                </div>`;
}

function getNewGameTemplate(): string {
    return `<button class="new-game-btn" id="newGameBtn">
                    <span class="icon">🎮</span>
                    NEW GAME
                </button>`;
}

function getClueTemplate(): string {
    return `<button class="clue-btn" id="clueBtn">
                    <span class="icon">💡</span>
                    <span class="text">${showClue ? "HIDE CLUE" : "SHOW CLUE"}</span>
                </button>`;
}

function getPauseTemplate(): string {
    return `<button class="pause-btn" id="pauseBtn">
                    <span class="icon">${isPaused ? "▶️" : "⏸️"}</span>
                    <span class="text">${isPaused ? "RESUME" : "PAUSE"}</span>
                </button>`;
}

function getAnnotationTemplate(pieceNumber: number): string {
    return `<div class="number-badge">${pieceNumber}</div>`;
}

function initializeGame(): void {
    // Initialize solved state
    gameBoard[0] = 1; gameBoard[1] = 2; gameBoard[2] = 3; gameBoard[3] = 4;
    gameBoard[4] = 5; gameBoard[5] = 6; gameBoard[6] = 7; gameBoard[7] = 8;
    gameBoard[8] = 9; gameBoard[9] = 10; gameBoard[10] = 11; gameBoard[11] = 12;
    gameBoard[12] = 13; gameBoard[13] = 14; gameBoard[14] = 15; gameBoard[15] = 0;

    emptyIndex = 15;
    shuffleBoard();
    moveCount = 0;
    isPuzzleSolved = false;
    elapsedSeconds = 0;
    updateTimeDisplay();
    gameStarted = false;
    createNodes();
}

function setupTimer(): void {
    gameTimer = setInterval(() => {
        onTimerElapsed();
    }, 1000);
}

function onTimerElapsed(): void {
    if (!isPaused && gameStarted && !isPuzzleSolved) {
        elapsedSeconds++;
        updateTimeDisplay();
        updateUI();
    }
}

function updateTimeDisplay(): void {
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    timeDisplay = padZero(minutes) + ':' + padZero(seconds);
}
function padZero(num: number) {
  return (num < 10 ? '0' : '') + num;
}

function getTileX(index: number): number {
    const col = index % gridSize;
    const startX = 600;
    return startX + (col * tileWidth);
}

function getTileY(index: number): number {
    const row = Math.floor(index / gridSize);
    const startY = 200;
    return startY + (row * tileHeight);
}

function canMoveTile(tileIndex: number): boolean {
    const tileRow = Math.floor(tileIndex / 4);
    const tileCol = tileIndex % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    const isVerticallyAdjacent = (Math.abs(tileRow - emptyRow) === 1 && tileCol === emptyCol);
    const isHorizontallyAdjacent = (Math.abs(tileCol - emptyCol) === 1 && tileRow === emptyRow);

    return isVerticallyAdjacent || isHorizontallyAdjacent;
}

function addFinalPiece(): void {
    const finalPiece: NodeModel = {
        id: "tile16final",
        width: 130,
        height: 130,
        offsetX: getTileX(15),
        offsetY: getTileY(15),
        style: {
            fill: "transparent",
            strokeColor: "#FFD700",
            strokeWidth: 4
        },
        shape: {
            type: 'Image',
            source: getImageSourceForTile(16)
        },
        annotations: [{
            id: "annotation16",
            width: 25,
            height: 25,
            template: getAnnotationTemplate(16),
            offset: { x: 0.9, y: 0.1 },
            horizontalAlignment: 'Center',
            verticalAlignment: 'Center'
        }],
        constraints: NodeConstraints.None
    };

    diagram.add(finalPiece);
}

function checkPuzzleSolved(): void {
    let solved = true;
    for (let i = 0; i < 15; i++) {
        if (gameBoard[i] !== i + 1) {
            solved = false;
            break;
        }
    }
    if (solved && gameBoard[15] !== 0) {
        solved = false;
    }
    if (solved && emptyIndex === 15) {
        isPuzzleSolved = true;
        if (gameTimer) {
            clearInterval(gameTimer);
        }

        addFinalPiece();
        showCompletionMessage();
    }
}

function moveTileToEmptySpace(tileNumber: number): void {
    const tileIndex = gameBoard.indexOf(tileNumber);
    if (!canMoveTile(tileIndex)) return;

    if (!gameStarted) {
        gameStarted = true;
        elapsedSeconds = 0;
        updateTimeDisplay();
    }

    const oldEmptyIndex = emptyIndex;
    gameBoard[emptyIndex] = tileNumber;
    gameBoard[tileIndex] = 0;
    emptyIndex = tileIndex;
    moveCount++;

    const node = diagram.getObject(`tile${tileNumber}`) as NodeModel;
    if (node) {
        node.offsetX = getTileX(oldEmptyIndex);
        node.offsetY = getTileY(oldEmptyIndex);
        diagram.dataBind();
    }

    enableAdjacentNodes();
    checkPuzzleSolved();
    updateUI();
}

function newGame(): void {
    if (gameTimer) {
        clearInterval(gameTimer);
    }
    selectRandomImageCollection();
    moveCount = 0;
    elapsedSeconds = 0;
    gameStarted = false;
    isPaused = false;
    isPuzzleSolved = false;
    showWinDialog = false;
    showClue = false;

    // Reset board
    gameBoard[0] = 1; gameBoard[1] = 2; gameBoard[2] = 3; gameBoard[3] = 4;
    gameBoard[4] = 5; gameBoard[5] = 6; gameBoard[6] = 7; gameBoard[7] = 8;
    gameBoard[8] = 9; gameBoard[9] = 10; gameBoard[10] = 11; gameBoard[11] = 12;
    gameBoard[12] = 13; gameBoard[13] = 14; gameBoard[14] = 15; gameBoard[15] = 0;
    emptyIndex = 15;

    updateTimeDisplay();
    shuffleBoard();
    clearDiagramNodes();
    createNodes();
    diagram.nodes = nodes;
    enableAdjacentNodes();
    setupTimer();
    updateUI();
}

function shuffleBoard(): void {
    for (let i = 0; i < 1000; i++) {
        const validMoves = getValidMoves();
        if (validMoves.length > 0) {
            const randomMove = validMoves[Math.floor(imageRandom() * validMoves.length)];
            gameBoard[emptyIndex] = gameBoard[randomMove];
            gameBoard[randomMove] = 0;
            emptyIndex = randomMove;
        }
    }
}

function getValidMoves(): number[] {
    const validMoves: number[] = [];
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;
    const directions = [-4, 4, -1, 1];

    for (const dir of directions) {
        const newIndex = emptyIndex + dir;
        if (newIndex >= 0 && newIndex < 16) {
            const newRow = Math.floor(newIndex / 4);
            const newCol = newIndex % 4;
            if ((dir === -1 || dir === 1) && Math.abs(newRow - emptyRow) === 0 && Math.abs(newCol - emptyCol) === 1) {
                validMoves.push(newIndex);
            } else if ((dir === -4 || dir === 4) && Math.abs(newRow - emptyRow) === 1 && Math.abs(newCol - emptyCol) === 0) {
                validMoves.push(newIndex);
            }
        }
    }

    return validMoves;
}

function togglePause(): void {
    isPaused = !isPaused;

    if (isPaused) {
        if (gameTimer) {
            clearInterval(gameTimer);
        }
        disableAllNodes();
    } else {
        setupTimer();
        enableAdjacentNodes();
    }

    updateUI();
}

function disableAllNodes(): void {
    for (const node of diagram.nodes) {
        if (node.id?.startsWith("tile")) {
            node.constraints = NodeConstraints.None;
        }
    }
    diagram.dataBind();
}

function clearDiagramNodes(): void {
    if (diagram) {
        const existingNodes = [...diagram.nodes];
        for (const node of existingNodes) {
            diagram.remove(node);
        }
    }
    nodes = [];
}

function enableAdjacentNodes(): void {
    for (const node of diagram.nodes) {
        if (node.id?.startsWith("tile")) {
            const tileNumber = parseInt(node.id.substring(4));
            const tileIndex = gameBoard.indexOf(tileNumber);

            if (canMoveTile(tileIndex)) {
                node.constraints = NodeConstraints.PointerEvents;
            } else {
                node.constraints = NodeConstraints.None;
            }
        }
    }
    diagram.dataBind();
}

function toggleClue(): void {
    showClue = !showClue;
    for (const node of diagram.nodes) {
        if (node.annotations && node.annotations.length > 0) {
            node.annotations[0].visibility = showClue;
        }
    }
    diagram.dataBind();
    updateUI();
}

function selectRandomImageCollection(): void {
    if (imageCollections.length > 1) {
        let newIndex: number;
        do {
            newIndex = Math.floor(imageRandom() * imageCollections.length);
        } while (newIndex === currentThemeIndex);

        currentThemeIndex = newIndex;
        currentImageMap = imageCollections[currentThemeIndex];
    }
}

function getImageSourceForTile(tileNumber: number): string {
    return currentImageMap && currentImageMap[tileNumber]
        ? currentImageMap[tileNumber]
        : "";
}

function showCompletionMessage(): void {
    showWinDialog = true;
    const winDialog = document.getElementById('winDialog');
    const finalMoves = document.getElementById('finalMoves');
    if (winDialog) {
        winDialog.style.display = 'flex';
    }
    if (finalMoves) {
        finalMoves.textContent = moveCount.toString() + " steps in " + timeDisplay;;
    }
}

function closeWinDialog(): void {
    showWinDialog = false;
    const winDialog = document.getElementById('winDialog');
    if (winDialog) {
        winDialog.style.display = 'none';
    }
    newGame();
}

function updateUI(): void {
    // Update moves counter
    const moveNode = diagram.getObject('moves') as NodeModel;
    if (moveNode && moveNode.shape && (moveNode.shape as HtmlModel).content) {
        (moveNode.shape as HtmlModel).content = getMovesTemplate();
    }

    // Update timer
    const timeNode = diagram.getObject('time') as NodeModel;
    if (timeNode && timeNode.shape && (timeNode.shape as HtmlModel).content) {
        (timeNode.shape as HtmlModel).content = getTimeTemplate();
    }

    // Update pause button
    const pauseNode = diagram.getObject('pause') as NodeModel;
    if (pauseNode && pauseNode.shape && (pauseNode.shape as HtmlModel).content) {
        (pauseNode.shape as HtmlModel).content = getPauseTemplate();
    }

    // Update clue button
    const clueNode = diagram.getObject('clue') as NodeModel;
    if (clueNode && clueNode.shape && (clueNode.shape as HtmlModel).content) {
        (clueNode.shape as HtmlModel).content = getClueTemplate();
    }

    diagram.dataBind();
}

function setupEventListeners(): void {
    document.getElementById('winClose').addEventListener('click', () => closeWinDialog());
}

function click(args: any) {
    if (args.actualObject instanceof Node) {
        const node: NodeModel = args.actualObject;
        if (node.id === 'newgame') {
            newGame();
        }
        else if (node.id === 'pause') {
            togglePause();
        }
        else if (node.id === 'clue') {
            toggleClue();
        }
        else if (node.id?.startsWith("tile")) {
            if (isPaused || isPuzzleSolved) return;

            if (!gameStarted) {
                gameStarted = true;
                elapsedSeconds = 0;
                updateTimeDisplay();
            }

            const nodeId = node.id;
            if (nodeId?.startsWith("tile")) {
                const tileNumber = parseInt(nodeId.substring(4));
                moveTileToEmptySpace(tileNumber);
            }
        }
    }
}
};
interface ImageTheme {
    [key: number]: string;
}

