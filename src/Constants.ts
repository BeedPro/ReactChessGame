export const X_AXIS = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const Y_AXIS = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const BOARD_SIZE = 100;

export function isSamePos(first_piece: Position, second_piece: Position) {
  return first_piece.x === second_piece.x && first_piece.y === second_piece.y;
}

export interface Position {
  x: number;
  y: number;
}

export enum ColorType {
  BLACK,
  WHITE
}

export enum PieceType {
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING
}

export interface Piece {
  image: string;
  position: Position;
  p_type: PieceType;
  color: ColorType;
  enPassentable?: boolean;
}

export const initialBoardSet: Piece[] = [
  {
    image: "assets/images/black_r.png",
    position: { x: 0, y: 7 },
    p_type: 3,
    color: 0
  },
  {
    image: "assets/images/black_r.png",
    position: { x: 7, y: 7 },
    p_type: 3,
    color: 0
  },
  {
    image: "assets/images/black_n.png",
    position: { x: 1, y: 7 },
    p_type: 2,
    color: 0
  },
  {
    image: "assets/images/black_n.png",
    position: { x: 6, y: 7 },
    p_type: 2,
    color: 0
  },
  {
    image: "assets/images/black_b.png",
    position: { x: 2, y: 7 },
    p_type: 1,
    color: 0
  },
  {
    image: "assets/images/black_b.png",
    position: { x: 5, y: 7 },
    p_type: 1,
    color: 0
  },
  {
    image: "assets/images/black_q.png",
    position: { x: 3, y: 7 },
    p_type: 4,
    color: 0
  },
  {
    image: "assets/images/black_k.png",
    position: { x: 4, y: 7 },
    p_type: 5,
    color: 0
  },
  {
    image: "assets/images/white_r.png",
    position: { x: 0, y: 0 },
    p_type: 3,
    color: 1
  },
  {
    image: "assets/images/white_r.png",
    position: { x: 7, y: 0 },
    p_type: 3,
    color: 1
  },
  {
    image: "assets/images/white_n.png",
    position: { x: 1, y: 0 },
    p_type: 2,
    color: 1
  },
  {
    image: "assets/images/white_n.png",
    position: { x: 6, y: 0 },
    p_type: 2,
    color: 1
  },
  {
    image: "assets/images/white_b.png",
    position: { x: 2, y: 0 },
    p_type: 1,
    color: 1
  },
  {
    image: "assets/images/white_b.png",
    position: { x: 5, y: 0 },
    p_type: 1,
    color: 1
  },
  {
    image: "assets/images/white_q.png",
    position: { x: 3, y: 0 },
    p_type: 4,
    color: 1
  },
  {
    image: "assets/images/white_k.png",
    position: { x: 4, y: 0 },
    p_type: 5,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 0, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 0, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 1, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 1, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 2, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 2, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 3, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 3, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 4, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 4, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 5, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 5, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 6, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 6, y: 1 },
    p_type: 0,
    color: 1
  },
  {
    image: "assets/images/black_p.png",
    position: { x: 7, y: 6 },
    p_type: 0,
    color: 0
  },
  {
    image: "assets/images/white_p.png",
    position: { x: 7, y: 1 },
    p_type: 0,
    color: 1
  }
];
