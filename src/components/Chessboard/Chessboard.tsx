import React, { useRef, useState } from "react";
import "./Chessboard.css";
import Tile from "../Tile/Tile";
import Referee from "../../Referee/Referee";
import {
  X_AXIS,
  Y_AXIS,
  BOARD_SIZE,
  Piece,
  PieceType,
  ColorType,
  initialBoardSet,
  Position,
  isSamePos
} from "../../Constants";

export default function Chessboard() {
  //CONSTANT DECLARATION
  const [isPieceGrapped, setPieceGrapped] = useState<HTMLElement | null>(null);
  //const [pieceTile, setPieceTile] = useState<HTMLElement | null>(null);
  const [grappedPosition, setGrappedPosition] = useState<Position>({
    x: -1,
    y: -1
  });
  const [pieces, setPieces] = useState<Piece[]>(initialBoardSet);
  const chessboardChecker = useRef<HTMLDivElement>(null);
  const referee = new Referee();
  let [playerTurn, setPlayerTurn] = useState<ColorType>(ColorType.WHITE);
  // ON MOUSE DOWN
  function grapPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const tileElement = element.parentElement;
    if (e.button === 0) {
      const chessboard = chessboardChecker.current;
      if (element.classList.contains("chess-piece") && chessboard) {
        const grapPosX = Math.floor(
          (e.clientX - chessboard.offsetLeft) / BOARD_SIZE
        );
        const grapPosY = Math.abs(
          Math.ceil((e.clientY - chessboard.offsetTop - 800) / BOARD_SIZE)
        );
        setGrappedPosition({
          x: grapPosX,
          y: grapPosY
        });

        const x = e.clientX - BOARD_SIZE / 2;
        const y = e.clientY - BOARD_SIZE / 2;

        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        if (tileElement) {
          tileElement.style.background = "green";
        }
        setPieceGrapped(element);
      }
    }
  }

  // ON MOUSE DRAG
  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardChecker.current;
    if (isPieceGrapped && chessboard) {
      const minX = chessboard.offsetLeft - 10;
      const minY = chessboard.offsetTop;

      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 90;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 90;

      const x = e.clientX - 50;
      const y = e.clientY - 50;

      // LIMITS IN THE CHESSBOARD
      isPieceGrapped.style.position = "absolute";
      if (x < minX) {
        isPieceGrapped.style.left = `${minX}px`;
      } else if (x > maxX) {
        isPieceGrapped.style.left = `${maxX}px`;
      } else {
        isPieceGrapped.style.left = `${x}px`;
      }

      if (y < minY) {
        isPieceGrapped.style.top = `${minY}px`;
      } else if (y > maxY) {
        isPieceGrapped.style.top = `${maxY}px`;
      } else {
        isPieceGrapped.style.top = `${y}px`;
      }
    }
  }

  // MOUSE UP
  function letPieceGo(e: React.MouseEvent) {
    const chessboard = chessboardChecker.current;

    if (isPieceGrapped && chessboard) {
      const x = Math.floor((e.clientX - chessboard.offsetLeft) / BOARD_SIZE);
      const y = Math.abs(
        Math.ceil((e.clientY - chessboard.offsetTop - 800) / BOARD_SIZE)
      );
      const currentPiece = pieces.find((p) =>
        isSamePos(p.position, grappedPosition)
      );

      if (currentPiece) {
        const validMove = referee.isMoveValid(
          { x, y },
          grappedPosition,
          currentPiece.p_type,
          currentPiece.color,
          pieces,
          playerTurn
        );
        if (playerTurn === ColorType.WHITE && validMove) {
          setPlayerTurn(ColorType.BLACK);
        } else if (playerTurn === ColorType.BLACK && validMove) {
          setPlayerTurn(ColorType.WHITE);
        }
        const isEnPassentAvailable = referee.isEnPassentAvailable(
          grappedPosition,
          { x, y },
          pieces,
          currentPiece.p_type,
          currentPiece.color
        );

        const pawnColorOpp = currentPiece.color === ColorType.BLACK ? -1 : 1;

        if (isEnPassentAvailable) {
          const updatedPieces = pieces.reduce((result, piece) => {
            if (isSamePos(piece.position, grappedPosition)) {
              piece.enPassentable = false;
              piece.position.x = x;
              piece.position.y = y;
              result.push(piece);
            } else if (!isSamePos(piece.position, { x, y: y - pawnColorOpp })) {
              if (piece.p_type === PieceType.PAWN) {
                piece.enPassentable = false;
              }
              result.push(piece);
            }
            return result;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else if (validMove) {
          // REMOVES TAKEN PIECE AND UPDATE PIECES
          const updatedPieces = pieces.reduce((result, piece) => {
            if (isSamePos(piece.position, grappedPosition)) {
              piece.enPassentable =
                Math.abs(grappedPosition.y - y) === 2 &&
                piece.p_type === PieceType.PAWN;

              piece.position.x = x;
              piece.position.y = y;
              result.push(piece);
            } else if (!isSamePos(piece.position, { x, y })) {
              if (piece.p_type === PieceType.PAWN) {
                piece.enPassentable = false;
              }
              result.push(piece);
            }
            return result;
          }, [] as Piece[]);

          setPieces(updatedPieces);
        } else {
          // PIECE RESET
          isPieceGrapped.style.position = "relative";
          isPieceGrapped.style.removeProperty("top");
          isPieceGrapped.style.removeProperty("left");
        }
      }
      setPieceGrapped(null);
    }
  }

  let board = [];

  for (let j = Y_AXIS.length - 1; j >= 0; j--) {
    for (let i = 0; i < X_AXIS.length; i++) {
      const piece = pieces.find((p) => isSamePos(p.position, { x: i, y: j }));
      let image = piece ? piece.image : undefined;
      board.push(
        <Tile
          key={`${j},${i}`}
          image={image}
          i={i}
          j={j}
          x_axis={X_AXIS}
          y_axis={Y_AXIS}
        />
      );
    }
  }
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onMouseDown={(e) => grapPiece(e)}
      onMouseUp={(e) => letPieceGo(e)}
      id="chessboard"
      ref={chessboardChecker}
    >
      {board}
    </div>
  );
}
