import React, {useEffect, useState} from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {checkUrl} from "../../utils/checkUrl";

import './StudentInfoBoxLinks.css';

interface StudentInfoBoxLinksPortfolioProps {
    portfolioUrls: string | null;
}

export const StudentInfoBoxLinksPortfolio = (props: StudentInfoBoxLinksPortfolioProps) => {
    const [portfolioUrls, setPortfolioUrls] = useState<string[]>([]);

    useEffect(() => {
        if (props.portfolioUrls !== null) {
            const array: string[] = JSON.parse(props.portfolioUrls);
            setPortfolioUrls(array);
        }
    }, []);

    return (
        <div className="student-info-box-links__wrapper">
            {
                portfolioUrls !== [] ? (
                    portfolioUrls.map((portfolioUrl, i) => (
                        <div
                            className="student-info-box-links__item"
                            key={i}>
                            <AttachFileIcon sx={{color: '#0b8bd4', height: '30px', width: '30px'}}/>
                            <a
                                key={i}
                                href={checkUrl(portfolioUrl)}
                                target="_blank"
                                rel="noreferrer"
                                className="student-info-box-links__item-link">
                                {portfolioUrl}
                            </a>
                        </div>
                    ))
                ) : (
                    <p className="student-info-box-links__item--no-data">Brak danych</p>
                )
            }
        </div>
    );
};
