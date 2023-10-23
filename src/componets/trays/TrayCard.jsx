import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function BasicCard() {
  const handleClick = () => {
    console.log("click man");
  };

  const mockTrayData = {
    uid: "123645c2",
    trayName: "Tray 1",
    rows: 5,
    col: 5
  };
  const numberOfCells = mockTrayData.rows * mockTrayData.col;

  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia
          component="img"
          height="140"
          image="https://placehold.jp/200x200.png"
          alt="placeholder image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {mockTrayData.trayName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {mockTrayData.rows + "x" + mockTrayData.col}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {numberOfCells + " cells"}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
