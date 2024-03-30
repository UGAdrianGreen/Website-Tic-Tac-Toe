document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const size = 4; // 4x4 grid
    let currentPlayer = 'X';
    let cells = [];
  
    // Create the game board
    function createBoard() {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = i;
          cell.dataset.col = j;
          cell.addEventListener('click', cellClick);
          board.appendChild(cell);
          cells.push(cell);
        }
      }
    }
  
    // Handle cell click
    function cellClick() {
      if (!this.textContent) {
        this.textContent = currentPlayer;
        checkWin();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  
    // Check if there's a winner
    function checkWin() {
      // Function to check a line for a win
      function checkLine(a, b, c, d) {
        return cells[a].textContent &&
               cells[a].textContent === cells[b].textContent &&
               cells[a].textContent === cells[c].textContent &&
               cells[a].textContent === cells[d].textContent;
      }
  
      // Check rows
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 3; j++) {
          if (checkLine(i*size+j, i*size+j+1, i*size+j+2, i*size+j+3)) {
            announceWinner(cells[i*size+j].textContent);
            return;
          }
        }
      }
  
      // Check columns
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size - 3; j++) {
          if (checkLine(j*size+i, (j+1)*size+i, (j+2)*size+i, (j+3)*size+i)) {
            announceWinner(cells[j*size+i].textContent);
            return;
          }
        }
      }
  
      // Check diagonals
      for (let i = 0; i < size - 3; i++) {
        for (let j = 0; j < size - 3; j++) {
          if (checkLine(i*size+j, (i+1)*size+(j+1), (i+2)*size+(j+2), (i+3)*size+(j+3)) ||
              checkLine(i*size+(j+3), (i+1)*size+(j+2), (i+2)*size+(j+1), (i+3)*size+j)) {
            announceWinner(cells[i*size+j].textContent);
            return;
          }
        }
      }
  
      // Check for tie
      if ([...cells].every(cell => cell.textContent)) {
        announceWinner("It's a tie!");
      }
    }
  
    // Announce the winner and reset the game
    function announceWinner(winner) {
      alert(`Game Over. ${winner} wins!`);
      resetGame();
    }
  
    // Reset the game
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
    }
  
    // Initialize the game
    createBoard();
  
    // Reset button click handler
    resetButton.addEventListener('click', resetGame);
  });
  