async function submitOrder({order}){
    return await fetch("http://localhost:8080/submitOrder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    })
        .then ((data) => {
            return data.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

async function getOrderList( isAdmin, keyword, startDate, endDate) {
    const userid = localStorage.getItem("userid");
    const token = localStorage.getItem('token');
    const url = "http://localhost:8080/getOrderList";
    return await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userid, token, isAdmin, keyword, startDate, endDate})})
            .then((data) => {
                console.log(JSON.stringify({ userid, token, isAdmin, keyword, startDate, endDate}));
                return data.json();
            })
            .catch((error) => {
                console.log(error);
            });
}


export {submitOrder, getOrderList}