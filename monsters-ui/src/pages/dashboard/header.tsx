import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {MonetizationOn} from "@mui/icons-material";
import Box from "@mui/material/Box";
import {sign} from "crypto";


interface HeaderProps {
    sections: ReadonlyArray<{
        title: string;
    }>;
    title: string;
    credits: number;
    handleSection: (section: number) => any,
    signout: () => void
}

export default function Header({sections, title, credits, handleSection, signout}: HeaderProps) {
    return (
        <React.Fragment>
            <Toolbar sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Box sx={{display: 'flex', gap: '5px'}}>
                    <MonetizationOn fontSize="large"/>
                    <Typography
                        component="span"
                        color="inherit"
                        align="center"
                        fontSize="1.7rem"
                    >
                        {credits}
                    </Typography>
                </Box>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    fontSize={32}
                    sx={{flex: 1}}
                >
                    {title}
                </Typography>
                <Button variant="outlined" size="small" onClick={signout}>
                    Sign out
                </Button>
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{justifyContent: 'space-between', overflowX: 'auto'}}
            >
                {sections.map((section, i) => (
                    <Link
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        fontSize={20}
                        sx={{p: 1, flexShrink: 0, cursor: 'pointer'}}
                        onClick={() => handleSection(i)}
                    >
                        {section.title}
                    </Link>
                ))}
            </Toolbar>
        </React.Fragment>
    );
}