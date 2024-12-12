import avatar10 from "@/assets/images/avatar/10.jpg";
import avatar11 from "@/assets/images/avatar/11.jpg";
import avatar12 from "@/assets/images/avatar/12.jpg";
import React from "react";
import Slider from "react-slick";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAlumniByCollege } from "@/api/users";

function HallOfFame() {
  const [hallOfFameData, setHallOfFameData] = React.useState([]);

  React.useEffect(() => {
    const fetchAlumniData = async () => {
      const res = await getAlumniByCollege();
      if (res) {
        const formattedData = res
          ?.filter((alumni) => alumni.name && alumni.avatar)
          .map((alumni) => ({
            name: alumni.name,
            description: alumni.specialization,
            image: alumni.avatar,
            graduation_year: alumni.graduation_year,
          }));

        setHallOfFameData(formattedData);
        console.log(formattedData);
      }
    };
    fetchAlumniData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "80%", margin: "2rem auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#3f51b5" }}>
        Hall of Fame
      </Typography>
      <Slider {...settings}>
        {hallOfFameData.map((player, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={player.image}
              alt={player.name}
              sx={{
                objectFit: "cover",
              }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", marginTop: "1rem" }}>
                {player.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ color: "#757575", marginTop: "0.5rem" }}>
                Graduation Year: {player.graduation_year}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.5rem", color: "#424242" }}>
                {player.description || "Specialization not provided."}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Box>
  );
}

export default HallOfFame;
