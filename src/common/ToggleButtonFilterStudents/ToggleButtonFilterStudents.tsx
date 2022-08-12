import {styled} from "@mui/material/styles";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {ButtonProps} from "@mui/material/Button";

export const ToggleButtonFilterStudents = styled(ToggleButton)<ButtonProps>(() => ({
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

export const ToggleButtonGroupFilterStudents = styled(ToggleButtonGroup)<ButtonProps>(() => ({
    '& .Mui-selected': {
        color: "#f7f7f7 !important",
        borderBottom: '2px solid #E02735',
        backgroundColor: '#292A2B !important',
    },
}));