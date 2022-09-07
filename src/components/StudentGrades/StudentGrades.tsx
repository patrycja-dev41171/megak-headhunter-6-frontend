import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import {Typography} from '@mui/material';

import './StudentGrades.css';

interface GradesValuesProps {
    courseCompletion: number;
    courseEngagement: number;
    projectDegree: number;
    teamProjectDegree: number;
}

export const StudentGrades = (props: GradesValuesProps) => {
    const labels: { [index: string]: string } = {
        0: '0',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
    };

    return (
        <Box
            className="student-grades"
            sx={{
                fontSize: '14px',
                fontFamily: 'Catamaran, sans-serif',
            }}>
            <div className="student-grades__item">
                <Typography
                    style={{fontSize: '14px', fontFamily: 'Catamaran, sans-serif', color: '#CFCFCF'}}
                    component="legend"
                    className="student-grades__typography">
                    Ocena przejścia kursu
                </Typography>
                <div className="student-grades__rating">
                    {props.courseCompletion !== null && (
                        <Box sx={{mr: 2, color: '#9E9E9E', fontSize: '18px'}}>
                            <span style={{color: '#F7F7F7'}}>{labels[props.courseCompletion]}</span>
                            /5
                        </Box>
                    )}
                    <Rating
                        name="overall-evaluation"
                        value={props.courseCompletion}
                        readOnly
                        emptyIcon={
                            <StarIcon
                                style={{color: '#4D4D4D'}}
                                fontSize="inherit"
                            />
                        }
                        icon={
                            <StarIcon
                                style={{color: '#E02735'}}
                                fontSize="inherit"
                            />
                        }
                    />
                </div>
            </div>

            <div className="student-grades__item">
                <Typography
                    style={{fontSize: '14px', fontFamily: 'Catamaran, sans-serif'}}
                    component="legend"
                    className="student-grades__typography">
                    Ocena aktywności i zaangażowania na kursie
                </Typography>
                <div className="student-grades__rating">
                    {props.courseEngagement !== null && (
                        <Box sx={{mr: 2, color: '#9E9E9E', fontSize: '18px'}}>
                            <span style={{color: '#F7F7F7'}}>{labels[props.courseEngagement]}</span>
                            /5
                        </Box>
                    )}

                    <Rating
                        name="engagement-evaluation"
                        value={props.courseEngagement}
                        readOnly
                        emptyIcon={
                            <StarIcon
                                style={{color: '#4D4D4D'}}
                                fontSize="inherit"
                            />
                        }
                        icon={
                            <StarIcon
                                style={{color: '#E02735'}}
                                fontSize="inherit"
                            />
                        }
                    />
                </div>
            </div>

            <div className="student-grades__item">
                <Typography
                    style={{fontSize: '14px', fontFamily: 'Catamaran, sans-serif'}}
                    component="legend"
                    className="student-grades__typography">
                    Ocena kodu w projekcie własnym
                </Typography>
                <div className="student-grades__rating">
                    {props.projectDegree !== null && (
                        <Box sx={{mr: 2, color: '#9E9E9E', fontSize: '18px'}}>
                            <span style={{color: '#F7F7F7'}}>{labels[props.projectDegree]}</span>
                            /5
                        </Box>
                    )}
                    <Rating
                        name="code-evaluation"
                        value={props.projectDegree}
                        readOnly
                        emptyIcon={
                            <StarIcon
                                style={{color: '#4D4D4D'}}
                                fontSize="inherit"
                            />
                        }
                        icon={
                            <StarIcon
                                style={{color: '#E02735'}}
                                fontSize="inherit"
                            />
                        }
                    />
                </div>
            </div>

            <div className="student-grades__item">
                <Typography
                    style={{fontSize: '14px', fontFamily: 'Catamaran, sans-serif'}}
                    component="legend"
                    className="student-grades__typography">
                    Ocena pracy w zespole w Scrum
                </Typography>
                <div className="student-grades__rating">
                    {props.teamProjectDegree !== null && (
                        <Box sx={{mr: 2, color: '#9E9E9E', fontSize: '18px'}}>
                            <span style={{color: '#F7F7F7'}}>{labels[props.teamProjectDegree]}</span>
                            /5
                        </Box>
                    )}
                    <Rating
                        name="team-work-evaluation"
                        value={props.teamProjectDegree}
                        readOnly
                        emptyIcon={
                            <StarIcon
                                style={{color: '#4D4D4D'}}
                                fontSize="inherit"
                            />
                        }
                        icon={
                            <StarIcon
                                style={{color: '#E02735'}}
                                fontSize="inherit"
                            />
                        }
                    />
                </div>
            </div>
        </Box>
    );
};
