import {styled} from "@mui/material/styles";
import {ToggleButton} from "@mui/material";
import {ButtonProps} from "@mui/material/Button";

export const FilterStudentsToggleBtn = styled(ToggleButton)<ButtonProps>(() => ({
    textTransform: 'none',
    color: "#f7f7f7",
    backgroundColor: '#292A2B',
    opacity: 0.8,
    borderRadius: '2px',
    padding: '5px 10px',
    marginRight: '5px',
    '&:hover': {
        backgroundColor: '#292A2B',
        opacity: 1
    },
}));
