import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { FilterButton } from '../../common/FilterButton/FilterButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { MainStyledTextField } from '../StyledComponents/MainStyledTextField';
import InputAdornment from '@mui/material/InputAdornment';
import './SearchByFilterForHRHome.css';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleDialog from '@mui/material/Dialog';
import { HrFilterStudentsForm } from '../HrFilterStudentsForm/HrFilterStudentsForm';
import { useDispatch } from 'react-redux';
import { filteredSelectedUsers, filteredUsers } from '../../redux-toolkit/features/user/user-slice';

export const SearchByFilterForHRHome = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const url = window.location.href;
    if (url === 'http://localhost:3000/hr/selected-students') {
      dispatch(filteredSelectedUsers(inputValue));
    }
    dispatch(filteredUsers(inputValue));
  }, [inputValue]);

  return (
    <div className="hr_line__searchByFilterBox">
      {/*input search*/}
      <MainStyledTextField
        value={inputValue}
        onChange={e => setInputValue(e.target.value.toLowerCase())}
        variant="filled"
        inputProps={{
          maxLength: '25',
        }}
        sx={{
          width: '350px',
          '& .MuiInputBase-input': {
            backgroundColor: '#1E1E1F',
            padding: '8px 0',
          },
        }}
        InputProps={{
          style: { backgroundColor: '#1E1E1F' },
          startAdornment: (
            <InputAdornment
              position="start"
              sx={{
                paddingBottom: '12px',
                '.MuiTypography-root': {
                  color: '#7E7E7E',
                },
              }}>
              <SearchIcon
                sx={{
                  color: '#666666',
                  height: '20px',
                }}
              />
              <span className="hr_line_searchText">Szukaj</span>
            </InputAdornment>
          ),
        }}
      />
      <FilterButton onClick={handleClickOpen}>
        <FilterAltIcon
          sx={{
            color: '#4D4D4D',
            height: '15px',
          }}
        />
        Filtrowanie
      </FilterButton>
      <SimpleDialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title">
        <HrFilterStudentsForm handleClose={handleClose} />
      </SimpleDialog>
    </div>
  );
};
