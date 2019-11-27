class MoveService {
  static countFigures(board) {
    let w = 0;
    let b = 0;
    board.forEach(y => {
      y.forEach(x => {
        if (x.side === "w") {
          w++;
        } else if (x.side === "b") {
          b++;
        }
      });
    });
    return { w, b };
  }
  static checkIfNewQueens(board, side) {
    let change = false;
    board[side === "w" ? 0 : 7].forEach(e => {
      if (e.side === side && !e.queen) {
        e.queen = true;
        change = true;
      }
    });
    return change ? board : change;
  }
  static checkCorectness({ x, y }) {
    return x > -1 && x < 8 && y > -1 && y < 8 && { x, y };
  }
  static findNearFields({ x, y }) {
    const checkCorectness = this.checkCorectness;
    if (x !== null && y !== null) {
      const upLeft = [
        { x: x - 1, y: y - 1 },
        { x: x - 2, y: y - 2 }
      ];
      const upRight = [
        { x: x + 1, y: y - 1 },
        { x: x + 2, y: y - 2 }
      ];
      const downLeft = [
        { x: x - 1, y: y + 1 },
        { x: x - 2, y: y + 2 }
      ];
      const downRight = [
        { x: x + 1, y: y + 1 },
        { x: x + 2, y: y + 2 }
      ];
      return {
        upLeft: upLeft.map(e => checkCorectness(e)),
        upRight: upRight.map(e => checkCorectness(e)),
        downLeft: downLeft.map(e => checkCorectness(e)),
        downRight: downRight.map(e => checkCorectness(e))
      };
    }
  }
  static beatings({ x, y }, board, enemySide, hidden) {
    let availableMoves = [];
    let details = {
      upLeft: false,
      upRight: false,
      downLeft: false,
      downRight: false
    };
    const nearFields = this.findNearFields({ x, y });
    let { upLeft, upRight, downLeft, downRight } = nearFields;
    try {
      if (
        board[downLeft[0].y][downLeft[0].x].side === enemySide &&
        !board[downLeft[1].y][downLeft[1].x]
      ) {
        downLeft[1].beat = true;
        details.downLeft = downLeft[1];
        availableMoves.push(downLeft[1]);
      }
    } catch {} //bicie lewy dół
    try {
      if (
        board[downRight[0].y][downRight[0].x].side === enemySide &&
        !board[downRight[1].y][downRight[1].x]
      ) {
        downRight[1].beat = true;
        details.downRight = downRight[1];
        availableMoves.push(downRight[1]);
      }
    } catch {} //bicie prawy dół
    try {
      if (
        board[upLeft[0].y][upLeft[0].x].side === enemySide &&
        !board[upLeft[1].y][upLeft[1].x]
      ) {
        upLeft[1].beat = true;
        details.upLeft = upLeft[1];
        availableMoves.push(upLeft[1]);
      }
    } catch {} //bicie lewa góra
    try {
      if (
        board[upRight[0].y][upRight[0].x].side === enemySide &&
        !board[upRight[1].y][upRight[1].x]
      ) {
        upRight[1].beat = true;
        details.upRight = upRight[1];
        availableMoves.push(upRight[1]);
      }
    } catch {} //bicie prawa góra
    if (hidden) {
      return details;
    } else {
      return availableMoves;
    }
  }
  static checkQueenMoves({ x, y }, side, board, wallPlace) {
    let availableMoves = [];
    let xCoord = x;
    let yCoord = y;
    const enemySide = side === "w" ? "b" : "w";
    const findMoves = (vectorX, vectorY) => {
      let beating = false;
      let lineBeating = false;
      let moves = [];
      let line = [];
      while (xCoord > -1 && xCoord < 8 && yCoord > -1 && yCoord < 8) {
        try {
          if (xCoord !== x && yCoord !== y) {
            line.push({ x: xCoord, y: yCoord });
            if (!board[yCoord][xCoord]) {
              availableMoves.push({ x: xCoord, y: yCoord });
              if (beating) {
                lineBeating = true;
              }
              if (lineBeating) {
                moves.push({ x: xCoord, y: yCoord });
              }
              beating = false;
            } else if (board[yCoord][xCoord].side === side) {
              break;
            } else if (board[yCoord][xCoord].side === enemySide) {
              if (beating) {
                break;
              } else {
                beating = true;
              }
            }
          }
        } catch {
          break;
        }
        xCoord = xCoord + vectorX;
        yCoord = yCoord + vectorY;
      }
      xCoord = x;
      yCoord = y;
      if (wallPlace) {
        line.forEach(e => {
          if (e.x === wallPlace.x && e.y === wallPlace.y) {
            lineBeating = false;
          }
        });
      }
      return lineBeating && moves;
    };
    const beatingMoves = [
      findMoves(-1, -1),
      findMoves(-1, 1),
      findMoves(1, -1),
      findMoves(1, 1)
    ]
      .filter(e => e)
      .flat();
    if (wallPlace) {
      return beatingMoves;
    } else {
      return availableMoves;
    }
  }
  static checkAvailableMoves({ x, y }, side, board) {
    const nearFields = this.findNearFields({ x, y });
    let availableMoves = [];
    try {
      const { upLeft, upRight, downLeft, downRight } = nearFields;
      if (side === "b") {
        try {
          if (!board[downLeft[0].y][downLeft[0].x]) {
            availableMoves.push(downLeft[0]);
          }
        } catch {} //ruch lewy dół
        try {
          if (!board[downRight[0].y][downRight[0].x]) {
            availableMoves.push(downRight[0]);
          }
        } catch {} //ruch prawy dół
        let blackBeatings = this.beatings({ x, y }, board, "w");
        availableMoves = availableMoves.concat(blackBeatings);
      } else if (side === "w") {
        try {
          if (!board[upLeft[0].y][upLeft[0].x]) {
            availableMoves.push(upLeft[0]);
          }
        } catch {}
        try {
          if (!board[upRight[0].y][upRight[0].x]) {
            availableMoves.push(upRight[0]);
          }
        } catch {}
        const whiteBeatings = this.beatings({ x, y }, board, "b");
        availableMoves = availableMoves.concat(whiteBeatings);
      }
    } catch {}
    return availableMoves;
  }
  static isAnyMovesAvailable(board, side) {
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        if (
          board[y][x].side === side &&
          ((board[y][x].queen &&
            this.checkQueenMoves({ x, y }, side, board).length > 0) ||
            (!board[y][x].queen &&
              this.checkAvailableMoves({ x, y }, side, board).length > 0))
        ) {
          return true;
        }
      }
    }
    return false;
  }
  static makeMove(previousPosition, nextPosition, side, chessboard, queen) {
    let board = [...chessboard];
    const path = this.checkPath(previousPosition, nextPosition);
    if (path.length) {
      path.forEach(e => (board[e.y][e.x] = 0));
    }
    board[previousPosition.y][previousPosition.x] = 0;
    board[nextPosition.y][nextPosition.x] = {
      side,
      queen
    };
    return board;
  }
  static checkPath(previousPosition, nextPosition) {
    let path = [];
    //zwraca tablicę współrzędnych drogi pionka po wykonaniu ruchu
    //(za wyjątkiem pozycji startowej i końcowej)
    //cel: sprawdzenie, czy na wyznaczonej trasie znajdują się pionki przeciwnika i zbicie ich
    const xPositive = nextPosition.x - previousPosition.x > 0 && true;
    const yPositive = nextPosition.y - previousPosition.y > 0 && true;
    if (xPositive) {
      for (let i = previousPosition.x + 1; i < nextPosition.x; i++) {
        path.push({ x: i, y: null });
      }
    } else {
      for (let i = previousPosition.x - 1; i > nextPosition.x; i--) {
        path.push({ x: i, y: null });
      }
    }
    if (yPositive) {
      let position = 0;
      for (let i = previousPosition.y + 1; i < nextPosition.y; i++) {
        path[position].y = i;
        position++;
      }
    } else {
      let position = 0;
      for (let i = previousPosition.y - 1; i > nextPosition.y; i--) {
        path[position].y = i;
        position++;
      }
    }
    return path;
  }
}

export default MoveService;
