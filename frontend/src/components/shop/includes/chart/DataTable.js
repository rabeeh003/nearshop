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
import dateFormat from "dateformat";
import moment from 'moment';
import { CSVLink } from "react-csv";
const ExcelJS = require("exceljs");

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
            return (one * 100).toFixed(2); // Return price per gram
        }
    };

    useEffect(() => {
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
                <TableCell align="right">{dateFormat(row.date)}</TableCell>
                <TableCell align="right">{row.type}</TableCell>
                {/* <TableCell align="right">{disc}</TableCell> */}
                <TableCell align="right">{row.total}</TableCell>
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
const toDataURL = (url) => {
    const promise = new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.readAsDataURL(xhr.response);
        reader.onloadend = function () {
          resolve({ base64Url: reader.result });
        };
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  
    return promise;
  };
export default function CollapsibleTable() {
    const [orderList, setOrderList] = useState([]);

    // exsporint code
    const exportExcelFile = () => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("My Sheet");
        sheet.properties.defaultRowHeight = 80;

        sheet.getRow(1).border = {
            top: { style: "thick", color: { argb: "FFFF0000" } },
            left: { style: "thick", color: { argb: "000000FF" } },
            bottom: { style: "thick", color: { argb: "F08080" } },
            right: { style: "thick", color: { argb: "FF00FF00" } },
        };

        sheet.getRow(1).fill = {
            type: "pattern",
            pattern: "darkVertical",
            fgColor: { argb: "FFFF00" },
        };

        sheet.getRow(1).font = {
            name: "Comic Sans MS",
            family: 4,
            size: 16,
            bold: true,
        };

        sheet.columns = [
            {
                header: "Id",
                key: "id",
                width: 10,
            },
            { header: "Title", key: "title", width: 32 },
            {
                header: "Brand",
                key: "brand",
                width: 20,
            },
            {
                header: "Price",
                key: "price",
                width: 15,
            }
        ];

        const promise = Promise.all(
            orderList?.map(async (order, index) => {
                const rowNumber = index + 1;
                sheet.addRow({
                    id: order?.date,
                    title: order?.name,
                    brand: order?.type,
                    price: order?.total,
                });

            })
        );

        promise.then(() => {
            const priceCol = sheet.getColumn(5);

            // iterate over all current cells in this column
            priceCol.eachCell((cell) => {
                const cellValue = sheet.getCell(cell?.address).value;
                // add a condition to set styling
                if (cellValue > 50 && cellValue < 1000) {
                    sheet.getCell(cell?.address).fill = {
                        type: "pattern",
                        pattern: "solid",
                        fgColor: { argb: "FF0000" },
                    };
                }
            });

            workbook.xlsx.writeBuffer().then(function (data) {
                const blob = new Blob([data], {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                });
                const url = window.URL.createObjectURL(blob);
                const anchor = document.createElement("a");
                anchor.href = url;
                anchor.download = "sales_report.xlsx";
                anchor.click();
                window.URL.revokeObjectURL(url);
            });
        });
    };



    // year
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const startYear = 2023;
    const currentYear = new Date().getFullYear();
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
    }

    const handleYearChange = (event) => {
        setSelectedYear(parseInt(event.target.value));
    };

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
    }, [shopId, selectedYear])
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
            const filteredOrders = ordersResponse.data.filter(order => {
                // Use moment.js to extract year
                const year = moment(order.updated_date).year();
                return order.shop === shopId &&
                    (order.status === 'Delivered' || order.status === 'Billed') &&
                    year === selectedYear;
            });
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
        <>
            <div className='d-flex flex-column justify-content-center align-items-center pb-3'>
                <label htmlFor="year">Select a Year:</label>
                <select className='px-3 py-1 text-center' id="year" onChange={handleYearChange} value={selectedYear}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <CSVLink data={orderList}>Download</CSVLink>
                <button
                    className="btn btn-primary float-end mt-2 mb-2"
                    onClick={exportExcelFile}
                >
                    Export
                </button>
            </div>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>No   </TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Type</TableCell>
                            {/* <TableCell align="right">Discount</TableCell> */}
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
        </>
    );
}