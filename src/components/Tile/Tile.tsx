import "./Tile.css";

interface Properties {
  image?: string;
  i: number;
  j: number;
  x_axis: Array<string>;
  y_axis: Array<string>;
}

export default function Tile({ i, j, image, x_axis, y_axis }: Properties) {
  const number = i + j + 2;
  let coordX = "";
  let coordY = "";

  if (i === 0) {
    coordY = y_axis[j];
  }
  if (j === 0) {
    coordX = x_axis[i];
  }
  if (number % 2 === 0) {
    return (
      <div className="tile black-tile">
        {image && (
          <div
            className="tile chess-piece"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
        {coordX && <div className="coords-black-tile-x">{coordX}</div>}
        {coordY && <div className="coords-black-tile-y">{coordY}</div>}
      </div>
    );
  } else {
    return (
      <div className="tile white-tile">
        {image && (
          <div
            className="tile chess-piece"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        )}
        {coordX && <div className="coords-white-tile-x">{coordX}</div>}
        {coordY && <div className="coords-white-tile-y">{coordY}</div>}
      </div>
    );
  }
}
