import React from "react";
import { View, Dimensions, BackHandler } from "react-native";
import Chessboard from "./components/Chessboard/Chessboard";
import MoveService from "../../services/MoveService";
import PlayerPanel from "./components/PlayerPanel/PlayerPanel";
import VictoryPanel from "./components/VictoryPanel/VictoryPanel";
import board from "./components/start_board/board";

class Game extends React.Component {
  constructor(props) {
    super();
    this.state = props.resume ? props.resume : {
      board: board(),
      selectedFigure: { x: null, y: null },
      moves: [],
      turn: "w",
      queen: false,
      selectable: true
    };
    this.size = Dimensions.get("window");
  }
  changeTurn = () => {
    return this.state.turn === "w" ? "b" : "w";
  };
  updateQueens = () => {
    let newQueens = MoveService.checkIfNewQueens(
      this.state.board,
      this.changeTurn()
    );
    if (newQueens) {
      this.setState({ board: newQueens });
    }
  };
  handleFigureSelect = (x, y) => {
    this.setState({
      selectedFigure: { x, y },
      moves: (() => {
        try {
          return this.state.board[y][x].queen
            ? MoveService.checkQueenMoves(
                { x, y },
                this.state.turn,
                this.state.board
              )
            : MoveService.checkAvailableMoves(
                { x, y },
                this.state.turn,
                this.state.board
              );
        } catch {
          return [];
        }
      })(),
      queen: (() => {
        try {
          return this.state.board[y][x].queen;
        } catch {
          return false;
        }
      })()
    });
  };
  handleOnRegularMove = (x, y) => {
    let currentMove = {};
    for (let i = 0; i < this.state.moves.length; i++) {
      if (this.state.moves[i].x === x) {
        if (this.state.moves[i].y === y) {
          currentMove = this.state.moves[i];
        }
      }
    }
    const beatings = MoveService.beatings(
      { x, y },
      this.state.board,
      this.changeTurn()
    );
    if (currentMove.beat && beatings.length) {
      //jeśli BICIE FIGURY
      this.setState({
        board: MoveService.makeMove(
          this.state.selectedFigure,
          { x, y },
          this.state.turn,
          this.state.board,
          this.state.queen
        ),
        selectedFigure: { x, y },
        moves: beatings,
        selectable: false
      });
    } else {
      //jeśli NORMALNY RUCH
      this.setState(
        {
          board: MoveService.makeMove(
            this.state.selectedFigure,
            { x, y },
            this.state.turn,
            this.state.board,
            this.state.queen
          ),
          selectedFigure: { x: null, y: null },
          moves: [],
          turn: this.changeTurn(),
          selectable: true
        },
        this.updateQueens
      );
    }
  };
  handleOnQueenMove = (x, y) => {
    const prevCount = MoveService.countFigures(this.state.board)[
      this.changeTurn()
    ];
    const nextCount = MoveService.countFigures(
      MoveService.makeMove(
        this.state.selectedFigure,
        { x, y },
        this.state.turn,
        this.state.board,
        this.state.queen
      )
    )[this.changeTurn()];
    const isBeating = nextCount < prevCount;
    if (isBeating) {
      this.setState(
        {
          board: MoveService.makeMove(
            this.state.selectedFigure,
            { x, y },
            this.state.turn,
            this.state.board,
            this.state.queen
          ),
          selectedFigure: { x, y },
          moves: MoveService.checkQueenMoves(
            { x, y },
            this.state.turn,
            this.state.board,
            this.state.selectedFigure
          ),
          selectable: false
        },
        () => !this.state.moves.length && this.handleOnFinishMove()
      );
    } else {
      this.setState({
        board: this.state.board,
        selectedFigure: { x: null, y: null },
        moves: [],
        turn: this.changeTurn(),
        selectable: true
      });
    }
  };
  handleOnMove = (x, y) => {
    if (this.state.queen) {
      this.handleOnQueenMove(x, y);
    } else {
      this.handleOnRegularMove(x, y);
    }
  };
  handleOnFinishMove = () => {
    this.setState(
      {
        selectable: true,
        turn: this.changeTurn(),
        moves: [],
        selectedFigure: { x: null, y: null },
        queen: false
      },
      this.updateQueens
    );
  };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      this.props.handler("menu");
      return true;
    });
  }
  componentWillUnmount() {
    this.props.pauseHandler(this.state)
    this.backHandler.remove();
  }
  render() {
    const gameStatus = MoveService.countFigures(this.state.board);
    const moveAvailable = MoveService.isAnyMovesAvailable(
      this.state.board,
      this.state.turn
    );
    if (!gameStatus.w || !gameStatus.b || !moveAvailable) {
      const winner = (() => {
        if (!gameStatus.b) {
          return "White";
        } else if (!gameStatus.w) {
          return "Black";
        } else if (!moveAvailable) {
          switch (this.state.turn) {
            case "w":
              return "Black";
            case "b":
              return "White";
            default:
              break;
          }
        }
      })();
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <VictoryPanel
            winner={winner}
            playerColor={"b"}
            handler={this.props.handler}
          />
          <Chessboard
            boardSize={this.size.width - 20}
            board={this.state.board}
            selectedFigure={this.state.selectedFigure}
            onSelect={this.handleFigureSelect}
            turn={this.state.turn}
            moves={this.state.moves}
            onMove={this.handleOnMove}
            selectable={this.state.selectable}
          />
          <VictoryPanel
            winner={winner}
            playerColor={"w"}
            handler={this.props.handler}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <PlayerPanel
            width={this.size.width - 20}
            height={150}
            figureAmount={MoveService.countFigures(this.state.board)}
            playerColor="b"
            turn={this.state.turn}
            selectable={this.state.selectable}
            handler={this.handleOnFinishMove}
          />
          <Chessboard
            boardSize={this.size.width - 20}
            board={this.state.board}
            selectedFigure={this.state.selectedFigure}
            onSelect={this.handleFigureSelect}
            turn={this.state.turn}
            moves={this.state.moves}
            onMove={this.handleOnMove}
            selectable={this.state.selectable}
          />
          <PlayerPanel
            width={this.size.width - 20}
            height={150}
            figureAmount={MoveService.countFigures(this.state.board)}
            playerColor="w"
            turn={this.state.turn}
            selectable={this.state.selectable}
            handler={this.handleOnFinishMove}
          />
        </View>
      );
    }
  }
}

export default Game;
