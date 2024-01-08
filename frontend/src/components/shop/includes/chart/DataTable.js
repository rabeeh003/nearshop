import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TablePagination,
} from '@mui/material';
import axios from 'axios';

function Row(props) {
    const { row, ind } = props;
    const [open, setOpen] = React.useState(false);
    const [disc, setDisc] = React.useState(0)
    const [tot, setTot] = React.useState(0)

    let totalAmount = 0

    const calculateUnitPrice = (price, count, countType) => {
        totalAmount = totalAmount + parseInt(price);
        if (countType !== 'g') {
            return (price / count).toFixed(2); // Calculate total price when not 'gram'
        } else {
            let one = price / count; // Calculate price per gram
            return (one * 1000).toFixed(2); // Return price per gram
        }
    };

    useEffect(()=>{
        setTot(totalAmount)
        setDisc(tot - parseInt(row.total))
    })

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {ind + 1}
                </TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                <TableCell align="right">{disc}</TableCell>
                <TableCell align="right">{tot}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Products
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="right">Price ($)</TableCell>
                                        <TableCell align="right">Count</TableCell>
                                        <TableCell align="right">Total ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.products && row.products.length > 0 ? (
                                        row.products.map((prod, ind) => (
                                            <TableRow key={prod.id}>
                                                <TableCell component="th" scope="row">
                                                    {ind + 1}
                                                </TableCell>
                                                <TableCell>{prod.pro.gpro.product_name}</TableCell>
                                                <TableCell align="right">
                                                    {calculateUnitPrice(prod.product_price, prod.product_count, prod.count_type)}
                                                </TableCell>
                                                <TableCell align="right">{`${prod.product_count} ${prod.count_type}`}</TableCell>
                                                <TableCell align="right">
                                                    {prod.product_price}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>No products available</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {
    const [orderList, setOrderList] = useState([]);
    // const [allProducts, setAllProducts] = useState([]);

    // get shopId
    const [shopId, setShopId] = useState();

    useEffect(() => {
        const fetchShopId = () => {
            const adminKeyString = localStorage.getItem('adminKey')
            if (adminKeyString) {
                const adminKey = JSON.parse(adminKeyString);
                setShopId(adminKey.id)
                console.log(adminKey.id);
            } else {
                console.log('adminKey not found in localStorage');
            }
        }
        fetchShopId()
    })

    //  Data featching
    useEffect(() => {
        if (orderList !== null)
            fetchData(shopId)
    }, [shopId])
    async function fetchData(shopId) {
        try {
            console.log("------------- start fetching ----------------");
            // Fetch all products
            const allProductsResponse = await axios.get(`http://127.0.0.1:8000/api/s/getproductbyshop/?shop=${shopId}`)

            const allProducts = allProductsResponse.data;
            console.log("All products", allProductsResponse.data);
            // Filter products by order
            const fetchOrderProducts = (order) => allProducts.filter(product => product.order === order.id);

            // Fetch orders
            const ordersResponse = await axios.get('http://127.0.0.1:8000/api/s/orders/');
            const filteredOrders = ordersResponse.data.filter(order => order.shop === shopId);
            console.log("Filtered orders", filteredOrders);

            // Prepare order list with empty products array
            const updatedOrderList = filteredOrders.map(order => ({
                // id: order.id,
                name: order.name,
                total: order.total_price,
                type: order.status,
                date: order.updated_date,
                products: [] // Initialize with an empty array for products
            }));

            // Fetch and assign products to each order
            const productPromises = filteredOrders.map(order => fetchOrderProducts(order));
            const productsArray = await Promise.all(productPromises);

            // Assign products to respective orders
            productsArray.forEach((products, index) => {
                updatedOrderList[index].products = products;
            });

            setOrderList(updatedOrderList);
            console.log(updatedOrderList);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    // paginationn 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const indexOfLastRow = (page + 1) * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const displayedRows = orderList.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>No   </TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayedRows.map((order, index) => (
                        <Row key={order.id} row={order} ind={index} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[3, 5, 10]} // Define your rows per page options
                component="div"
                count={orderList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}