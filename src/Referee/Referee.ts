import { PieceType, ColorType, Piece, Position } from "../Constants";
// assuming WHITE is our pieces
export default class Referee {
  isPieceInTile(x: number, y: number, stateOfBoard: Piece[]): boolean {
    const piece = stateOfBoard.find(
      (p) => p.position.x === x && p.position.y === y
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isCheck(
    to_position: Position,
    from_position: Position,
    king_Postion: Position
  ): boolean {
    return false;
  }

  isRookBlocked(
    to_x: number,
    to_y: number,
    from_x: number,
    from_y: number,
    stateOfBoard: Piece[]
  ): boolean {
    const rookDirectionX = to_x > from_x ? 1 : -1;
    let firstXblock = -1;
    for (let i = 1; i < 8; i++) {
      if (
        this.isPieceInTile(from_x + i * rookDirectionX, from_x, stateOfBoard)
      ) {
        firstXblock = from_x + i * rookDirectionX;
        break;
      }
    }
    if (firstXblock !== -1) {
      if (firstXblock < to_x && rookDirectionX === 1) {
        return false;
      }

      if (firstXblock > to_x && rookDirectionX === -1) {
        return false;
      }
    }
    return false;
  }

  isPieceInTileOpposition(
    x: number,
    y: number,
    stateOfBoard: Piece[],
    color: ColorType
  ): boolean {
    const piece = stateOfBoard.find(
      (p) => p.position.x === x && p.position.y === y && p.color !== color
    );
    if (piece) {
      return true;
    } else {
      return false;
    }
  }

  isEnPassentAvailable(
    from_position: Position,
    to_position: Position,
    stateOfBoard: Piece[],
    p_type: PieceType,
    color: ColorType
  ) {
    const pawnColorOpp = color === ColorType.BLACK ? -1 : 1;
    if (p_type === PieceType.PAWN) {
      if (
        (to_position.x - from_position.x === -1 ||
          to_position.x - from_position.x === 1) &&
        to_position.y - from_position.y === pawnColorOpp
      ) {
        const piece = stateOfBoard.find(
          (p) =>
            p.position.x === to_position.x &&
            p.position.y === to_position.y - pawnColorOpp &&
            p.enPassentable
        );
        if (piece) {
          return true;
        }
      }
      return false;
    }
  }

  whatPieceInTile(
    x: number,
    y: number,
    stateOfBoard: Piece[],
    color: ColorType
  ) {
    const piece = stateOfBoard.find(
      (p) => p.position.x === x && p.position.y === y && p.color !== color
    );
    if (piece) {
      return piece.p_type;
    }
  }

  isMoveValid(
    to_position: Position,
    from_position: Position,
    type: PieceType,
    color: ColorType,
    stateOfBoard: Piece[],
    currentTurn: ColorType
  ) {
    const kingPiece = stateOfBoard.find(
      (p) => p.p_type === PieceType.KING && p.color === currentTurn
    );
    let check = false;
    // ROOK CHECK
    if (kingPiece) {
      const kingPosX = kingPiece.position.x;
      const kingPosY = kingPiece.position.y;
      // Knight Check [BADLY DONE]
      if (
        this.isPieceInTileOpposition(
          kingPosX + 1,
          kingPosY + 2,
          stateOfBoard,
          kingPiece.color
        )
      ) {
        if (
          this.whatPieceInTile(
            kingPosX + 1,
            kingPosY + 2,
            stateOfBoard,
            kingPiece.color
          ) === 2
        ) {
          check = true;
        }
      }
    }

    if (currentTurn !== color) {
      return false;
    } else if (type === PieceType.PAWN) {
      // RULES FOR PAWN
      const homeRow = color === ColorType.BLACK ? 6 : 1;
      const pawnColorOpp = color === ColorType.BLACK ? -1 : 1;

      // MOVEMENT OF PAWN
      if (
        from_position.x === to_position.x &&
        from_position.y === homeRow &&
        to_position.y - from_position.y === 2 * pawnColorOpp
      ) {
        if (
          !this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) &&
          !this.isPieceInTile(
            to_position.x,
            to_position.y - pawnColorOpp,
            stateOfBoard
          )
        ) {
          return true;
        }
      } else if (
        from_position.x === to_position.x &&
        to_position.y - from_position.y === pawnColorOpp
      ) {
        if (!this.isPieceInTile(to_position.x, to_position.y, stateOfBoard)) {
          return true;
        }
        // TAKING PIECES AS PAWN
        // DIAG LEFT
      } else if (
        to_position.x - from_position.x === -1 &&
        to_position.y - from_position.y === pawnColorOpp
      ) {
        if (
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          )
        ) {
          return true;
        }
        // DIAG RIGHT
      } else if (
        to_position.x - from_position.x === 1 &&
        to_position.y - from_position.y === pawnColorOpp
      ) {
        if (
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          )
        ) {
          return true;
        }
      }
      // MOVEMENT OF KNIGHT
    } else if (type === PieceType.KNIGHT) {
      if (
        (Math.abs(to_position.y - from_position.y) === 2 &&
          Math.abs(to_position.x - from_position.x) === 1) ||
        (Math.abs(to_position.x - from_position.x) === 2 &&
          Math.abs(to_position.y - from_position.y) === 1)
      ) {
        if (
          !this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) ||
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          )
        ) {
          return true;
        }
      }
      //ROOK MOVEMENT
    } else if (type === PieceType.ROOK) {
      const rookDirectionX = to_position.x > from_position.x ? 1 : -1;
      let firstXblock = -1;
      for (let i = 1; i < 8; i++) {
        if (
          this.isPieceInTile(
            from_position.x + i * rookDirectionX,
            from_position.y,
            stateOfBoard
          )
        ) {
          firstXblock = from_position.x + i * rookDirectionX;
          break;
        }
      }
      if (firstXblock !== -1) {
        if (firstXblock < to_position.x && rookDirectionX === 1) {
          return false;
        }

        if (firstXblock > to_position.x && rookDirectionX === -1) {
          return false;
        }
      }

      const rookDirectionY = to_position.y > from_position.y ? 1 : -1;
      let firstYblock = -1;
      for (let i = 1; i < 8; i++) {
        if (
          this.isPieceInTile(
            to_position.x,
            from_position.y + i * rookDirectionY,
            stateOfBoard
          )
        ) {
          firstYblock = from_position.y + i * rookDirectionY;
          break;
        }
      }
      if (firstYblock !== -1) {
        if (firstYblock < to_position.y && rookDirectionY === 1) {
          return false;
        }
        if (firstYblock > to_position.y && rookDirectionY === -1) {
          return false;
        }
      }

      if (
        (to_position.x === from_position.x ||
          to_position.y === from_position.y) &&
        (!this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) ||
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          ))
      ) {
        return true;
      }
      // BISHOP MOVEMENT
    } else if (type === PieceType.BISHOP) {
      if (
        to_position.x === from_position.x ||
        to_position.y === from_position.y
      ) {
        return false;
      }
      const bishopXDirection = to_position.x > from_position.x ? 1 : -1;
      const bishopYDirection = to_position.y > from_position.y ? 1 : -1;
      let firstXBlock = -1;
      let firstYBlock = -1;
      for (let i = 1; i < 8; i++) {
        if (
          this.isPieceInTile(
            from_position.x + i * bishopXDirection,
            from_position.y + i * bishopYDirection,
            stateOfBoard
          )
        ) {
          firstXBlock = from_position.x + i * bishopXDirection;
          firstYBlock = from_position.y + i * bishopYDirection;
          break;
        }
      }
      if (firstXBlock !== -1) {
        if (firstXBlock < to_position.x && bishopXDirection === 1) {
          return false;
        }
        if (firstXBlock > to_position.x && bishopXDirection === -1) {
          return false;
        }
      }

      if (firstYBlock !== -1) {
        if (firstYBlock < to_position.y && bishopYDirection === 1) {
          return false;
        }
        if (firstYBlock > to_position.y && bishopYDirection === -1) {
          return false;
        }
      }
      if (
        Math.abs(to_position.x - from_position.x) ===
          Math.abs(from_position.y - to_position.y) &&
        (!this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) ||
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          ))
      ) {
        return true;
      }
      //QUEEN MOVEMENT
    } else if (type === PieceType.QUEEN) {
      //Check block rookStyle
      if (
        to_position.x === from_position.x ||
        to_position.y === from_position.y
      ) {
        const rookDirectionX = to_position.x > from_position.x ? 1 : -1;
        let firstXblock = -1;
        for (let i = 1; i < 8; i++) {
          if (
            this.isPieceInTile(
              from_position.x + i * rookDirectionX,
              from_position.y,
              stateOfBoard
            )
          ) {
            firstXblock = from_position.x + i * rookDirectionX;
            break;
          }
        }
        if (firstXblock !== -1) {
          if (firstXblock < to_position.x && rookDirectionX === 1) {
            return false;
          }

          if (firstXblock > to_position.x && rookDirectionX === -1) {
            return false;
          }
        }

        const rookDirectionY = to_position.y > from_position.y ? 1 : -1;
        let firstYblock = -1;
        for (let i = 1; i < 8; i++) {
          if (
            this.isPieceInTile(
              to_position.x,
              from_position.y + i * rookDirectionY,
              stateOfBoard
            )
          ) {
            firstYblock = from_position.y + i * rookDirectionY;
            break;
          }
        }
        if (firstYblock !== -1) {
          if (firstYblock < to_position.y && rookDirectionY === 1) {
            return false;
          }
          if (firstYblock > to_position.y && rookDirectionY === -1) {
            return false;
          }
        }
      }
      //Block Bishop
      if (
        !(
          to_position.x === from_position.x || to_position.y === from_position.y
        )
      ) {
        const bishopXDirection = to_position.x > from_position.x ? 1 : -1;
        const bishopYDirection = to_position.y > from_position.y ? 1 : -1;
        let firstXBlock = -1;
        let firstYBlock = -1;
        for (let i = 1; i < 8; i++) {
          if (
            this.isPieceInTile(
              from_position.x + i * bishopXDirection,
              from_position.y + i * bishopYDirection,
              stateOfBoard
            )
          ) {
            firstXBlock = from_position.x + i * bishopXDirection;
            firstYBlock = from_position.y + i * bishopYDirection;
            break;
          }
        }
        if (firstXBlock !== -1) {
          if (firstXBlock < to_position.x && bishopXDirection === 1) {
            return false;
          }
          if (firstXBlock > to_position.x && bishopXDirection === -1) {
            return false;
          }
        }

        if (firstYBlock !== -1) {
          if (firstYBlock < to_position.y && bishopYDirection === 1) {
            return false;
          }
          if (firstYBlock > to_position.y && bishopYDirection === -1) {
            return false;
          }
        }
      }
      if (
        (Math.abs(to_position.x - from_position.x) ===
          Math.abs(from_position.y - to_position.y) ||
          to_position.x === from_position.x ||
          to_position.y === from_position.y) &&
        (!this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) ||
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          ))
      ) {
        return true;
      }
      // KING MOVEMENT
    } else if (type === PieceType.KING) {
      if (
        Math.abs(to_position.x - from_position.x) <= 1 &&
        Math.abs(to_position.y - from_position.y) <= 1 &&
        (!this.isPieceInTile(to_position.x, to_position.y, stateOfBoard) ||
          this.isPieceInTileOpposition(
            to_position.x,
            to_position.y,
            stateOfBoard,
            color
          ))
      ) {
        return true;
      }
    }
    return false;
  }
}
