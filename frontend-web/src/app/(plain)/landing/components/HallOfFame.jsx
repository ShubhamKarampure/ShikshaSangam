import avatar10 from '@/assets/images/avatar/10.jpg';
import avatar11 from '@/assets/images/avatar/11.jpg';
import avatar12 from '@/assets/images/avatar/12.jpg';
import React from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function HallOfFame() {
  const hallOfFameData = [
    { name: "Player 1", image: avatar10, description: "Top Scorer" },
    { name: "Player 2", image: avatar11, description: "MVP" },
    { name: "Player 3", image: avatar12, description: "Best Defender" },
  ];

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
    <Box sx={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Hall of Fame
      </Typography>
      <Slider {...settings}>
        {hallOfFameData.map((player, index) => (
          <Box key={index} sx={{ p: 2 }}>
            <img
              src={player.image}
              alt={player.name}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
            <Typography variant="h5" mt={2}>
              {player.name}
            </Typography>
            <Typography variant="body1">{player.description}</Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}

export default HallOfFame;
