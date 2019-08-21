const getData = () => {
    fetch('http://localhost:5588/getAll')
        .then(res => res.json())
        .then((data) => {
            let output = `<h2>Customers list</h2> `;
            output += `<table class="headTable">
                <tr class="grid-container-f">
                    <th class="grid-item-f">Details</th>
                    <th class="grid-item-f">Orders</th>
                    <th class="grid-item-f">ID & Name</th>
                </tr>
                </table>
                <br>`
            output += data.result.map(user => `<table>
                <tr id="${user.mylist}" class="grid-container-f">
                <td>
                    <div class="item grid-item-f">
                        <a class="btn-3d green" onmousedown="getSpesificData()"></a>
                    </div>
                </td>
                <td>
                    <div class="item grid-item-f">
                    <a class="btn-3d green" onmousedown="getOrders()" ></a>
                    </div>
                </td>
                    <td class="grid-item-f customId">"${user.mylist}"</td>
                </tr>
            </table>`)
            document.querySelector(".Panel").innerHTML = output.replace(/,/g, '');
        }).catch((err) => { console.log(err) })
}

const getSpesificData = () => {
    if (event.button === 0) {
        id = event.target.closest('tr').id.slice(0, 5)
        fetch(`http://localhost:5588/getspecific/${id}`)
            .then(res => res.json())
            .then((data) => {
                let output = `<h2>${data.result[0].CompanyName} details</h2>`
                if (data.result.length === 0) {
                    alert("User not found !")
                } else {
                    output += data.result.map(user =>
                        `<div class="sort">
           <h3>Customer ID<br> <span class="inline"> ${user.CustomerID} </span></h3>
           <h3>Company Name<br> <span class="inline"> ${user.CompanyName} </span></h3>
           <h3>Contact Name<br> <span class="inline"> ${user.ContactName} </span></h3>
           <h3>Contact Title<br> <span class="inline"> ${user.ContactTitle} </span></h3>
           <h3>Address<br> <span class="inline"> ${user.Address} </span></h3>
           <h3>City<br> <span class="inline"> ${user.City} </span></h3>
           </div>
            `)
                    document.querySelector(".lowerPanel").innerHTML = output
                }
            })
            .catch((err) => { console.log(err) })
    }
}

const getOrders = () => {
    if (event.button === 0) {
        id = event.target.closest('tr').id.slice(0, 5)
        fetch(`http://localhost:5588/customerOrders/${id}`)
            .then(res => res.json())
            .then((data) => {
                if (data.result.length === 0) {
                    alert("There isn't orders for this customer!")
                } else {
                    let output = `<h2>${data.result[0].ShipName} orders</h2>`
                    output += `<table class="headTable">
                <tr class="grid-container">
                    <th class="grid-item">Details</th>
                    <th class="grid-item">Order ID</th>
                    <th class="grid-item">Order Date</th>
                    <th class="grid-item">Shipped Date</th>
                </tr>
                </table>
                <br>`
                    output += data.result.map(user =>
                        `
                    <table>
                <tr class="grid-container">
                <td>
                    <div class="item grid-item">
                        <input class="conic" id="${user.OrderID}" type="checkbox" onclick="getDetails()"/>
                    </div>
                </td>
                    <td class="grid-item">${user.OrderID}</td>
                    <td class="grid-item">${user.OrderDate.slice(0, 10)}</td>
                    <td class="grid-item">${user.ShippedDate ? user.ShippedDate.slice(0, 10) : ""}</td>
                </tr>
            </table>   
            <div id="OD${user.OrderID}"></div>
        `
                    );
                    document.querySelector(".lowerPanel").innerHTML = output.replace(/,/g, `<hr>`)
                }
            })
            .catch((err) => { console.log('wow', err) })
    }
}

const getDetails = () => {
    id = event.target.id;
    checked = event.target.checked;
    if (checked) {
        fetch(`http://localhost:5588/getDetails/${id}`)
            .then(res => res.json())
            .then((data) => {
                if (data.result.length === 0) {
                    alert("There isn't orders for this customer!");
                    checked = false;
                } else {
                    let output = `<table>
                <tr class="grid-container">
                    <th class="grid-item">Product name</th>
                    <th class="grid-item">Unit price</th>
                    <th class="grid-item">Quntity</th>
                    <th class="grid-item">Sum</th>
                </tr>
                </table>
                <br>`
                    output += data.result.map(user =>
                        `
                    <table>
                <tr class="grid-container">
                    <td class="grid-item">${user.ProductName}</td>
                    <td class="grid-item">${user.UnitPrice}</td>
                    <td class="grid-item">${user.Quantity}</td>
                    <td class="grid-item">${user.Sum}</td>
                </tr>
            </table>   
        `
                    );
                    document.getElementById(`OD${id}`).innerHTML = output.replace(/,/g, `<hr>`)
                }
            })
            .catch((err) => { console.log('oof', err) })
    } else {
        document.getElementById(`OD${id}`).innerHTML = '';
        // setTimeout(()=> {document.getElementById(`OD${id}`).removeAttribute("class");
        // document.getElementById(`OD${id}`).innerHTML = ''},1200)
    }
}