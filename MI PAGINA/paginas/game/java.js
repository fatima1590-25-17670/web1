let jugadorActual = 'X';
let tablero = Array(9).fill('');
let juegoActivo = true;

const celdasHTML = [];

const board = document.getElementById('board');
const mensaje = document.getElementById('mensaje');

function crearTablero() {
  tablero = Array(9).fill('');
  board.innerHTML = '';
  celdasHTML.length = 0;
  juegoActivo = true;
  mensaje.textContent = '';

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', manejarClick);
    board.appendChild(cell);
    celdasHTML.push(cell);
  }
}

function manejarClick(e) {
  const index = e.target.dataset.index;

  if (!juegoActivo || tablero[index]) return;

  tablero[index] = jugadorActual;
  celdasHTML[index].textContent = jugadorActual;

  if (verificarGanador()) {
    mensaje.textContent = '¡has ganado!';
    juegoActivo = false;
  } else if (tablero.every(c => c)) {
    mensaje.textContent = "¡Empate!";
    juegoActivo = false;
  } else {
    jugadorActual = jugadorActual === 'X' ? 'O' : 'X';
  }
}

function verificarGanador() {
  const combinaciones = [
    [0,1,2], [3,4,5], [6,7,8], // filas
    [0,3,6], [1,4,7], [2,5,8], // columnas
    [0,4,8], [2,4,6]           // diagonales
  ];

  return combinaciones.some(comb => {
    const [a, b, c] = comb;
    return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
  });
}

function reiniciarJuego() {
  jugadorActual = 'X';
  crearTablero();
}

crearTablero();