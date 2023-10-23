import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function LocationsCard(props) {
  const navigate = useNavigate();
  const { uid, name, imgUrl } = props;

  const handleClick = () => {
    navigate(uid);
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
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
