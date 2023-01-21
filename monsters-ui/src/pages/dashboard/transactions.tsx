import {Transaction} from "../../models/transaction";
import {List, ListItem} from "@mui/material";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import React from "react";

const TransactionsSection = ({transactions}: { transactions: Transaction[] }) => {
    return (
        <Box>
            <List>
                {transactions.map(t => (
                    <ListItem>
                        <Card sx={{display: 'flex', flexDirection: 'row', width: '100%'}}>
                            <CardContent sx={{flex: 1}}>
                                <Typography>{t.created_at.toString()}</Typography>
                            </CardContent>
                            <CardContent sx={{flex: 1}}>
                                <Typography>{t.status}</Typography>
                            </CardContent>
                            <CardContent sx={{flex: 1}}>
                                <Typography>${t.credits}</Typography>
                            </CardContent>
                            <CardContent sx={{flex: 1}}>
                                <Typography>Egg level ${t.egg_level}</Typography>
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </Box>
    )
}


export default TransactionsSection