import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../theme";
import HomeIcon from '@mui/icons-material/Home';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2} sx={{color: '#1c0c03'}}>
      {/* SEARCH BAR */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton>
          <HomeIcon onClick={handleClick} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
