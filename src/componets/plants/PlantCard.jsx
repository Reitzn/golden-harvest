import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PlantCard(props) {
  const navigate = useNavigate();
  const { uid, plantNumber, name, scientificName, imgUrl } = props;

  const handleClick = () => {
    console.log("Clicked on plant card");
    navigate("../plants/" + uid);
  };
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea onClick={() => handleClick()}>
        <CardMedia
          component="img"
          height="140"
          image={imgUrl}
          alt="placeholder image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {plantNumber} {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Scientific Name: {scientificName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
