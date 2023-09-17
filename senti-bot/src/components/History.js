import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, Typography } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#3282B8',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function History() {
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        if (localStorage.getItem("storeData") != null)
            setData(JSON.parse(localStorage.getItem("storeData")));
    }, [])

    // data.map((ele,key)=>{
    //     createData(ele.postLink,ele.date,ele.totalcmnts,ele.positive,ele.negative)
    // })
    return (
        <TableContainer component={Paper}>
            <Table sx={{
                minWidth: 700, "& .MuiTableCell-Root , & .css-1kt84xw-MuiTableCell-root ,& .MuiLink-root": {
                    maxWidth: 200,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Post URL</StyledTableCell>
                        <StyledTableCell align="center">Date Created</StyledTableCell>
                        <StyledTableCell align="center">Total Comments</StyledTableCell>
                        <StyledTableCell align="center">Positive %</StyledTableCell>
                        <StyledTableCell align="center">Negative %</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length > 0 && data.map((row, key) => (
                        <StyledTableRow key={row.postLink}>
                            <StyledTableCell sx={{ cursor: "pointer" }} scope="row" component='th'>
                                <Typography component={Link} href={row.postLink} target='_blank' gutterBottom>
                                    {row.postLink}
                                </Typography>
                            </StyledTableCell>
                            <StyledTableCell align="center">{row.date}</StyledTableCell>
                            <StyledTableCell align="center">{row.totalcmnts}</StyledTableCell>
                            <StyledTableCell align="center">{row.positive}%</StyledTableCell>
                            <StyledTableCell align="center">{row.negative}%</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}