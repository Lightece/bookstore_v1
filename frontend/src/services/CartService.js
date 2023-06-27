/*  BACKEND
CartController: used to control all changes and post info of cart
functions:
- /getCart: get the cart of a user    DONE
- /addToCart: add selected books to the cart of a user    DONE
- /deleteFromCart: delete selected books from the cart of a user    DONE
- /buy: buy selected books in the cart of a user, then delete them   DONE
 */

// TODO: adjust frontend to run properly

async function getCart(){
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    const url = "http://localhost:8080/getCart";
    console.log("getCart: " + userid + " " + token);
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid, token})
    })
        .then ((res) => {
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        });
}

async function addToCart(bookid,quantity){
    const url = "http://localhost:8080/addToCart";
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid, token, bookid, quantity})
    })
        .then ((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function buy(CartItems, receiver, phone, address ){
    const url = "http://localhost:8080/buy";
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid, token,receiver,phone, address, CartItems})
    })
        .then ((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function deleteFromCart(bookid){
    const url = "http://localhost:8080/deleteFromCart";
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid, token, bookid})
    })
        .then ((data) => {
            alert(JSON.stringify({userid, token, bookid}));
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

async function updateQuantity(bookid, quantity){
    const url = "http://localhost:8080/updateQuantity";
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({userid, token, bookid, quantity})
    })
        .then ((data) => {
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
}

export {getCart,addToCart,deleteFromCart,updateQuantity, buy};