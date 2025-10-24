document.addEventListener('DOMContentLoaded', () => {

    // --- Page Selectors ---
    const loginPage = document.getElementById('login-page');
    const mainMenu = document.getElementById('main-menu');
    const gameContainer = document.getElementById('game-container');
    const rulesModal = document.getElementById('rules-modal');
    const winnerModal = document.getElementById('winner-modal');
    const player2NameModal = document.getElementById('player2-name-modal'); // New
    const promotionModal = document.getElementById('promotion-modal'); // New

    // --- Button Selectors ---
    const btnLogin = document.getElementById('btn-login');
    const inputPlayerName = document.getElementById('input-player-name');
    const btnPvp = document.getElementById('btn-pvp');
    const btnAi = document.getElementById('btn-ai');
    const btnRules = document.getElementById('btn-rules');
    const btnCloseRules = document.getElementById('btn-close-rules');
    const btnBackMenu = document.getElementById('btn-back-menu');
    const btnNewGame = document.getElementById('btn-new-game');
    const btnUndo = document.getElementById('btn-undo');
    const btnCloseWinner = document.getElementById('btn-close-winner');
    const btnConfirmPlayer2 = document.getElementById('btn-confirm-player2'); // New
    const btnCancelPlayer2 = document.getElementById('btn-cancel-player2'); // New
    const promotionButtons = document.querySelectorAll('.promotion-button'); // New

    // --- Input Selectors ---
    const inputPlayer2Name = document.getElementById('input-player2-name'); // New

    // --- Game UI Selectors ---
    const boardElement = document.getElementById('chess-board');
    const statusElement = document.getElementById('game-status');
    const playerProfileIcon = document.getElementById('player-profile-icon');
    const opponentProfileIcon = document.getElementById('opponent-profile-icon');
    const playerNameEl = document.getElementById('player-name');
    const opponentNameEl = document.getElementById('opponent-name');
    const playerTimerEl = document.getElementById('player-timer');
    const opponentTimerEl = document.getElementById('opponent-timer');
    const winnerMessageEl = document.getElementById('winner-message');
    const menuTitleEl = document.getElementById('menu-title');

    // --- SVG Graphics ---
    const profileIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>`;
    const pieceSVGs = { /* SVG data unchanged */ 
        'wP': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><circle cx="22.5" cy="30" r="6"/><circle cx="22.5" cy="18" r="4"/></g></svg>`,
        'wR': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V12H14v21zM14 9h3v3h-3V9zM21 9h3v3h-3V9zM28 9h3v3h-3V9z"/></g></svg>`,
        'wN': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17v-3H14v3zM14 30c0-6 4-10 4-10l-2-8h13l-2 8c0 0 4 4 4 10H14z"/></g></svg>`,
        'wB': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM16 33h13L22.5 9 16 33z"/><path d="M26 18l-7-7"/></g></svg>`,
        'wQ': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V18H14v15zM11 15l4-8 4 8h-8zM22.5 15l4-8 4 8h-8zM34 15l-4-8-4 8h8z"/></g></svg>`,
        'wK': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#FFF" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V18H14v15zM14 18l-2-2h21l-2 2H14zM20 16v-4h5v4h-5zM22.5 12V7"/></g></svg>`,
        'bP': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><circle cx="22.5" cy="30" r="6"/><circle cx="22.5" cy="18" r="4"/></g></svg>`,
        'bR': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V12H14v21zM14 9h3v3h-3V9zM21 9h3v3h-3V9zM28 9h3v3h-3V9z"/></g></svg>`,
        'bN': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17v-3H14v3zM14 30c0-6 4-10 4-10l-2-8h13l-2 8c0 0 4 4 4 10H14z"/></g></svg>`,
        'bB': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM16 33h13L22.5 9 16 33z"/><path d="M26 18l-7-7"/></g></svg>`,
        'bQ': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V18H14v15zM11 15l4-8 4 8h-8zM22.5 15l4-8 4 8h-8zM34 15l-4-8-4 8h8z"/></g></svg>`,
        'bK': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 45 45"><g fill="#333" stroke="#000" stroke-width="1.5" stroke-linejoin="round"><path d="M12 36h21v-3H12v3zM14 33h17V18H14v15zM14 18l-2-2h21l-2 2H14zM20 16v-4h5v4h-5zM22.5 12V7"/></g></svg>`
    };

    // --- Game State Variables ---
    let board = [];
    let currentPlayer = 'w';
    let selectedPiece = null;
    let gameOver = false;
    let kingPositions = { w: [7, 4], b: [0, 4] };
    let castlingRights = { wK: true, wQ: true, bK: true, bQ: true };
    let enPassantTarget = null;
    let gameMode = 'pvp';
    let playerName = "Player";
    let opponentName = "Opponent";
    let moveHistory = []; // For Undo
    let playerTime = 600; // 10 minutes in seconds
    let opponentTime = 600;
    let timerInterval = null;
    let promotionResolve = null; // New: For handling promotion choice

    // --- Page Navigation Logic ---
    function showPage(pageId) {
        // Hide all modals and pages first
        [loginPage, mainMenu, gameContainer, rulesModal, winnerModal, player2NameModal, promotionModal].forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(pageId).classList.remove('hidden');
    }

    btnLogin.addEventListener('click', () => {
        playerName = inputPlayerName.value.trim() || "Player";
        playerNameEl.textContent = playerName;
        menuTitleEl.textContent = `Welcome, ${playerName}!`;
        showPage('main-menu');
    });

    // UPDATED: Show custom modal instead of prompt
    btnPvp.addEventListener('click', () => {
        gameMode = 'pvp';
        inputPlayer2Name.value = "Opponent"; // Default value
        showPage('player2-name-modal');
    });
    
    // NEW: Handle Player 2 Name submission
    btnConfirmPlayer2.addEventListener('click', () => {
        opponentName = inputPlayer2Name.value.trim() || "Opponent";
        opponentNameEl.textContent = opponentName;
        player2NameModal.classList.add('hidden'); // Hide this modal
        startGame();
    });

    // NEW: Handle Player 2 Name cancellation
    btnCancelPlayer2.addEventListener('click', () => {
        player2NameModal.classList.add('hidden');
        showPage('main-menu'); // Go back to main menu
    });

    btnAi.addEventListener('click', () => {
        gameMode = 'ai';
        opponentName = "Computer AI";
        opponentNameEl.textContent = opponentName;
        startGame();
    });

    btnBackMenu.addEventListener('click', () => {
        clearInterval(timerInterval); 
        showPage('main-menu');
    });
    
    btnNewGame.addEventListener('click', () => {
        startGame(); 
    });

    btnUndo.addEventListener('click', undoMove);

    btnRules.addEventListener('click', () => rulesModal.classList.remove('hidden'));
    btnCloseRules.addEventListener('click', () => rulesModal.classList.add('hidden'));
    
    btnCloseWinner.addEventListener('click', () => {
        winnerModal.classList.add('hidden');
        startGame(); 
    });

    // NEW: Handle Promotion Choice
    promotionButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (promotionResolve) {
                promotionResolve(button.dataset.piece); // Pass the chosen piece (Q, R, B, N)
                promotionModal.classList.add('hidden');
                promotionResolve = null; // Reset resolver
            }
        });
    });


    function startGame() {
        showPage('game-container');
        initializeBoard();
    }

    // --- Core Game Functions ---
    // initializeBoard, renderBoard, event handlers, timer functions...
    // (Most are unchanged, only promotePawn is significantly different)

    function initializeBoard() {
        board = [
            ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
            ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.'],
            ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
            ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
        ];
        currentPlayer = 'w';
        selectedPiece = null;
        gameOver = false;
        kingPositions = { w: [7, 4], b: [0, 4] };
        castlingRights = { wK: true, wQ: true, bK: true, bQ: true };
        enPassantTarget = null;
        moveHistory = []; 
        statusElement.textContent = "White's Turn";
        boardElement.style.pointerEvents = 'auto';
        
        playerProfileIcon.innerHTML = profileIconSVG;
        opponentProfileIcon.innerHTML = profileIconSVG;
        
        clearInterval(timerInterval);
        playerTime = 600;
        opponentTime = 600;
        playerTimerEl.textContent = formatTime(playerTime);
        opponentTimerEl.textContent = formatTime(opponentTime);
        playerTimerEl.classList.remove('low-time');
        opponentTimerEl.classList.remove('low-time');
        timerInterval = setInterval(updateTimer, 1000);
        
        renderBoard();
        saveState(); 
    }

    function renderBoard() {
        boardElement.innerHTML = '';
        let legalMovesForSelected = [];
        if (selectedPiece) {
            legalMovesForSelected = generateLegalMovesForPiece(selectedPiece.row, selectedPiece.col);
        }
        const isCurrentKingInCheck = isKingInCheck(currentPlayer);

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const square = document.createElement('div');
                square.classList.add('square');
                const isLight = (r + c) % 2 === 0;
                square.classList.add(isLight ? 'light' : 'dark');
                square.dataset.row = r;
                square.dataset.col = c;
                const piece = board[r][c];

                if (piece !== '.') {
                    square.innerHTML = pieceSVGs[piece];
                    const svg = square.querySelector('svg');
                    if (svg) {
                        svg.setAttribute('draggable', 'true');
                        svg.addEventListener('dragstart', onDragStart);
                        svg.addEventListener('dragend', onDragEnd);
                    }
                }

                square.addEventListener('dragover', onDragOver);
                square.addEventListener('drop', onDrop);
                square.addEventListener('click', onSquareClick);
                
                if (selectedPiece && selectedPiece.row === r && selectedPiece.col === c) {
                    square.classList.add('selected');
                }
                const move = legalMovesForSelected.find(m => m.toRow === r && m.toCol === c);
                if (move) {
                    square.classList.add(board[r][c] !== '.' ? 'possible-capture' : 'possible-move');
                }
                if (piece[1] === 'K' && piece[0] === currentPlayer && isCurrentKingInCheck) {
                    square.classList.add('in-check');
                }
                boardElement.appendChild(square);
            }
        }
    }

    // --- Event Handlers (Click & Drag) --- (Unchanged from correct version)
    function onSquareClick(event) {
        if (gameOver) return;
        if (gameMode === 'ai' && currentPlayer === 'b') return; 
        const square = event.currentTarget; 
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        const piece = board[row][col];
        if (selectedPiece) {
            const legalMoves = generateLegalMovesForPiece(selectedPiece.row, selectedPiece.col);
            const move = legalMoves.find(m => m.toRow === row && m.toCol === col);
            if (move) { makeMove(move); switchPlayer(); } 
            else {
                selectedPiece = null;
                if (piece !== '.' && piece[0] === currentPlayer) { selectedPiece = { row, col, piece }; }
            }
        } else if (piece !== '.' && piece[0] === currentPlayer) { selectedPiece = { row, col, piece }; }
        renderBoard();
    }
    function onDragStart(event) {
        if (gameOver) return;
        if (gameMode === 'ai' && currentPlayer === 'b') { event.preventDefault(); return; }
        event.stopPropagation();
        const square = event.target.closest('.square');
        const row = parseInt(square.dataset.row); const col = parseInt(square.dataset.col); const piece = board[row][col];
        if (piece === '.' || piece[0] !== currentPlayer) { event.preventDefault(); return; }
        selectedPiece = { row, col, piece }; 
        event.dataTransfer.effectAllowed = 'move'; event.dataTransfer.setData('text/plain', '');
        renderBoard(); 
        setTimeout(() => event.target.classList.add('dragging'), 0);
    }
    function onDragEnd(event) { event.target.classList.remove('dragging'); selectedPiece = null; renderBoard(); }
    function onDragOver(event) { event.preventDefault(); event.dataTransfer.dropEffect = 'move'; }
    function onDrop(event) {
        event.preventDefault(); event.stopPropagation();
        if (!selectedPiece) return;
        const square = event.currentTarget;
        const toRow = parseInt(square.dataset.row); const toCol = parseInt(square.dataset.col);
        const legalMoves = generateLegalMovesForPiece(selectedPiece.row, selectedPiece.col);
        const move = legalMoves.find(m => m.toRow === toRow && m.toCol === toCol);
        if (move) { makeMove(move); switchPlayer(); }
    }
    
    // --- Timer Functions --- (Unchanged from correct version)
    function formatTime(totalSeconds) { const minutes = Math.floor(totalSeconds / 60); const seconds = totalSeconds % 60; return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; }
    function updateTimer() {
        if (gameOver) { clearInterval(timerInterval); return; }
        if (currentPlayer === 'w') {
            playerTime--; playerTimerEl.textContent = formatTime(playerTime);
            if (playerTime <= 30) playerTimerEl.classList.add('low-time');
            if (playerTime <= 0) endGame('Black', 'on time');
        } else {
            opponentTime--; opponentTimerEl.textContent = formatTime(opponentTime);
            if (opponentTime <= 30) opponentTimerEl.classList.add('low-time');
            if (opponentTime <= 0) endGame('White', 'on time');
        }
    }

    // --- Core Game Logic ---
    async function makeMove(move) { // Now async to handle promotion
        saveState(); 
        
        const { fromRow, fromCol, toRow, toCol, piece, special } = move;
        board[toRow][toCol] = piece;
        board[fromRow][fromCol] = '.';
        let oldEnPassantTarget = enPassantTarget;
        enPassantTarget = null; 

        if (special === 'pawn-twostep') { enPassantTarget = [ (fromRow + toRow) / 2, fromCol ]; } 
        else if (special === 'en-passant') { board[oldEnPassantTarget[0]][oldEnPassantTarget[1]] = '.'; } 
        else if (special === 'castling-k') { board[fromRow][5] = board[fromRow][7]; board[fromRow][7] = '.'; } 
        else if (special === 'castling-q') { board[fromRow][3] = board[fromRow][0]; board[fromRow][0] = '.'; }
        if (piece[1] === 'K') { kingPositions[piece[0]] = [toRow, toCol]; }

        if (piece === 'wK') { castlingRights.wK = false; castlingRights.wQ = false; }
        else if (piece === 'bK') { castlingRights.bK = false; castlingRights.bQ = false; }
        else if (fromRow === 7 && fromCol === 0) castlingRights.wQ = false;
        else if (fromRow === 7 && fromCol === 7) castlingRights.wK = false;
        else if (fromRow === 0 && fromCol === 0) castlingRights.bQ = false;
        else if (fromRow === 0 && fromCol === 7) castlingRights.bK = false;
        
        // --- UPDATED Promotion Handling ---
        if ((piece === 'wP' && toRow === 0) || (piece === 'bP' && toRow === 7)) {
            renderBoard(); // Render pawn on final rank first
            const chosenPiece = await promotePawn(toRow, toCol, piece[0]); // Wait for choice
            board[toRow][toCol] = piece[0] + chosenPiece; // Update board with chosen piece
        }
        selectedPiece = null;
        renderBoard(); // Render the final board state *after* potential promotion
    }

    function switchPlayer() { /* Unchanged */ 
        currentPlayer = (currentPlayer === 'w') ? 'b' : 'w';
        statusElement.textContent = `${currentPlayer === 'w' ? "White's" : "Black's"} Turn`;
        const allLegalMoves = generateAllLegalMoves(currentPlayer);
        if (allLegalMoves.length === 0) {
            if (isKingInCheck(currentPlayer)) { endGame(currentPlayer === 'w' ? 'Black' : 'White', 'by Checkmate'); } 
            else { endGame('Draw', 'by Stalemate'); }
            return;
        }
        if (!gameOver && currentPlayer === 'b' && gameMode === 'ai') {
            boardElement.style.pointerEvents = 'none'; setTimeout(makeAiMove, 500); // Slightly faster AI
        } else { boardElement.style.pointerEvents = 'auto'; }
    }

    function endGame(winner, reason) { /* Unchanged */ 
        gameOver = true; clearInterval(timerInterval); boardElement.style.pointerEvents = 'none';
        if (winner === 'Draw') { winnerMessageEl.textContent = "It's a Draw!"; } 
        else { let winnerName = (winner === 'White') ? playerName : opponentName; winnerMessageEl.textContent = `${winnerName} Wins!`; }
        statusElement.textContent = `${winner} wins ${reason}!`;
        setTimeout(() => winnerModal.classList.remove('hidden'), 500); 
    }

    function makeAiMove() { /* Unchanged */ 
        if (gameOver) return; const allMoves = generateAllLegalMoves('b');
        if (allMoves.length === 0) return;
        const randomMove = allMoves[Math.floor(Math.random() * allMoves.length)];
        makeMove(randomMove); 
        // No need to render here, makeMove handles final render
        // No need to call switchPlayer here, it's called after makeMove finishes
    }

    // --- UPDATED: Uses Custom Modal for Promotion ---
    function promotePawn(row, col, color) {
        return new Promise((resolve) => {
            if (gameMode === 'ai' && color === 'b') {
                resolve('Q'); // AI always promotes to Queen
            } else {
                promotionModal.classList.remove('hidden');
                promotionResolve = resolve; // Store the resolve function
                // The actual choice happens in the promotion button event listener
            }
        });
    }
    
    // --- Undo & State Management --- (Unchanged from correct version)
    function saveState() {
        const state = { board: board.map(row => [...row]), currentPlayer, kingPositions: { ...kingPositions }, castlingRights: { ...castlingRights }, enPassantTarget, playerTime, opponentTime };
        moveHistory.push(state);
    }
    function undoMove() {
        if (gameOver) return;
        let movesToUndo = 1;
        if (gameMode === 'ai' && currentPlayer === 'w' && moveHistory.length > 1) { movesToUndo = 2; }
        if (moveHistory.length <= movesToUndo) return;
        for (let i = 0; i < movesToUndo; i++) { moveHistory.pop(); }
        const lastState = moveHistory[moveHistory.length - 1];
        board = lastState.board.map(row => [...row]); currentPlayer = lastState.currentPlayer; kingPositions = { ...lastState.kingPositions }; castlingRights = { ...lastState.castlingRights }; enPassantTarget = lastState.enPassantTarget; playerTime = lastState.playerTime; opponentTime = lastState.opponentTime;
        statusElement.textContent = `${currentPlayer === 'w' ? "White's" : "Black's"} Turn`; playerTimerEl.textContent = formatTime(playerTime); opponentTimerEl.textContent = formatTime(opponentTime); boardElement.style.pointerEvents = 'auto';
        renderBoard();
    }

    // --- Move Generation & Validation --- (Unchanged from correct version)
    function generateAllLegalMoves(playerColor) { let allMoves = []; for (let r = 0; r < 8; r++) { for (let c = 0; c < 8; c++) { const piece = board[r][c]; if (piece !== '.' && piece[0] === playerColor) { allMoves.push(...generateLegalMovesForPiece(r, c)); } } } return allMoves; }
    function generateLegalMovesForPiece(row, col) { const piece = board[row][col]; const pseudoLegalMoves = getPseudoLegalMoves(row, col, piece); const legalMoves = []; for (const move of pseudoLegalMoves) { const capturedPiece = board[move.toRow][move.toCol]; const oldKingPos = { ...kingPositions }; const oldCastling = { ...castlingRights }; board[move.toRow][move.toCol] = piece; board[move.fromRow][move.fromCol] = '.'; if (piece[1] === 'K') kingPositions[piece[0]] = [move.toRow, move.toCol]; if (!isKingInCheck(piece[0])) { legalMoves.push(move); } board[move.fromRow][move.fromCol] = piece; board[move.toRow][move.toCol] = capturedPiece; kingPositions = oldKingPos; castlingRights = oldCastling; } return legalMoves; }
    function getPseudoLegalMoves(row, col, piece) { const moves = []; const color = piece[0]; const pieceType = piece[1]; const addMove = (toRow, toCol, special = null) => { if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return; const target = board[toRow][toCol]; if (target === '.' || target[0] !== color) { moves.push({ fromRow: row, fromCol: col, toRow, toCol, piece, special }); } }; const addSlideMoves = (directions) => { for (const [dr, dc] of directions) { for (let i = 1; i < 8; i++) { const toRow = row + i * dr, toCol = col + i * dc; if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) break; const target = board[toRow][toCol]; if (target === '.') { moves.push({ fromRow: row, fromCol: col, toRow, toCol, piece }); } else if (target[0] !== color) { moves.push({ fromRow: row, fromCol: col, toRow, toCol, piece }); break; } else break; } } }; switch (pieceType) { case 'P': const dir = (color === 'w') ? -1 : 1; const startRow = (color === 'w') ? 6 : 1; if (board[row + dir] && board[row + dir][col] === '.') { addMove(row + dir, col); if (row === startRow && board[row + 2 * dir][col] === '.') { addMove(row + 2 * dir, col, 'pawn-twostep'); } } for (const dc of [-1, 1]) { const toRow = row + dir, toCol = col + dc; if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) continue; const target = board[toRow][toCol]; if (target !== '.' && target[0] !== color) addMove(toRow, toCol); if (enPassantTarget && toRow === enPassantTarget[0] && toCol === enPassantTarget[1]) { addMove(toRow, toCol, 'en-passant'); } } break; case 'N': const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]; knightMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc)); break; case 'B': addSlideMoves([[-1,-1],[-1,1],[1,-1],[1,1]]); break; case 'R': addSlideMoves([[-1,0],[1,0],[0,-1],[0,1]]); break; case 'Q': addSlideMoves([[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]]); break; case 'K': const kingMoves = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]; kingMoves.forEach(([dr, dc]) => addMove(row + dr, col + dc)); const oppColor = (color === 'w') ? 'b' : 'w'; if (!isSquareAttacked(row, col, oppColor)) { if (castlingRights[color+'K'] && board[row][col+1]==='.' && board[row][col+2]==='.') { if (!isSquareAttacked(row, col + 1, oppColor) && !isSquareAttacked(row, col + 2, oppColor)) { addMove(row, col + 2, 'castling-k'); } } if (castlingRights[color+'Q'] && board[row][col-1]==='.' && board[row][col-2]==='.' && board[row][col-3]==='.') { if (!isSquareAttacked(row, col - 1, oppColor) && !isSquareAttacked(row, col - 2, oppColor)) { addMove(row, col - 2, 'castling-q'); } } } break; } return moves; }
    function isKingInCheck(kingColor) { const [kingRow, kingCol] = kingPositions[kingColor]; const attackerColor = (kingColor === 'w') ? 'b' : 'w'; return isSquareAttacked(kingRow, kingCol, attackerColor); }
    function isSquareAttacked(row, col, attackerColor) { const pawnDir = (attackerColor === 'w') ? 1 : -1; for (const dc of [-1, 1]) { const r = row + pawnDir, c = col + dc; if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === attackerColor + 'P') return true; } const knightMoves = [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]; for (const [dr, dc] of knightMoves) { const r = row + dr, c = col + dc; if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === attackerColor + 'N') return true; } const slideDirs = { 'R': [[-1,0],[1,0],[0,-1],[0,1]], 'B': [[-1,-1],[-1,1],[1,-1],[1,1]], 'Q': [[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[-1,1],[1,-1],[1,1]] }; for (const pieceType of ['R','B','Q']) { for (const [dr, dc] of slideDirs[pieceType]) { for (let i = 1; i < 8; i++) { const r = row + i * dr, c = col + i * dc; if (r < 0 || r > 7 || c < 0 || c > 7) break; const piece = board[r][c]; if (piece !== '.') { if (piece === attackerColor + pieceType || piece === attackerColor + 'Q') return true; break; } } } } const kingMoves = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]; for (const [dr, dc] of kingMoves) { const r = row + dr, c = col + dc; if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c] === attackerColor + 'K') return true; } return false; }
    
    // --- Start the App ---
    showPage('login-page');
});