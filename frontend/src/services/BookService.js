import "../css/AdminView.css"
const url = "http://localhost:8080";

async function getBookById(id) {
    return await fetch(url+"/getBookById?id="+id, {
        method: "GET",
    })
        .then ((data) => {
            return data.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

async function getBookList(keyword) {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    return await fetch("http://localhost:8080/getBookList", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,token, keyword}),
    })
        .then ((data) => {
            return data.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

async function getValidBooks(searchType = "unfiltered", searchValue = "") {
    return await fetch(url+"/getValidBooks?type="+searchType+"&value="+searchValue, {
        method: "GET",
    })
        .then ((data) => {
            return data.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

async function updateBook(book, userid, token) {
    return await fetch("http://localhost:8080/updateBook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,token, book}),
    }).then((data) => {
        return data.json();
    });
}

async function setBookStatus(bookid, userid, token, status) {
    return await fetch("http://localhost:8080/setBookStatus", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid, token, bookid, status}),
    }).then((data) => {
        // alert(JSON.stringify(userid, token, bookid.bookid));
        return data.json();
    });
}

async function addBook(book, userid, token) {
    return await fetch("http://localhost:8080/updateBook", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,token, book}),
    }).then((data) => {
        // alert(JSON.stringify({userid,token, book}));
        return data.json();
    });
}
async function getBookSales(startDate, endDate) {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    return await fetch("http://localhost:8080/getBookSales", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,token, startDate, endDate}),
    }).then((data) => {
        // alert(JSON.stringify({userid,token, book}));
        return data.json();
    });
}
async function getBoughtBooks(startDate, endDate) {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    return await fetch("http://localhost:8080/getBoughtBooks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({userid,token, startDate, endDate}),
    }).then((data) => {
        // alert(JSON.stringify({userid,token, book}));
        return data.json();
    });
}

export {getBookById, getBookList,getValidBooks, updateBook, setBookStatus, addBook, getBookSales, getBoughtBooks};