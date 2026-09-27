    let billNumber = 1001;
    document.getElementById("billNumber").innerText = billNumber;

    let today = new Date();
    document.getElementById("billDate").innerText =
        today.toLocaleDateString("en-IN");  

    function addProduct() {
    let customerName = document.getElementById("customerName").value;
    document.getElementById("displayCustomer").innerText = customerName;
    if (customerName === ""){
        alert("Please enter customer name.");
        return;
    }

    let productName = document.getElementById("productName").value;
    let quantity = Number(document.getElementById("quantity").value);
    let price = Number(document.getElementById("price").value);

    if (productName === "" || quantity <= 0 || price <= 0) {
        alert("Please enter valid product details.");
        return;
    }

    let total = quantity * price;

    let billBody = document.getElementById("billBody");
    let row = billBody.insertRow();

    row.insertCell(0).innerText = productName;
    row.insertCell(1).innerText = quantity;
    row.insertCell(2).innerText = "₹" + price;
    row.insertCell(3).innerText = "₹" + total;

    let removeCell = row.insertCell(4);

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";

    removeButton.onclick = function () {
        row.remove();
        updateGrandTotal();
    };

    removeCell.appendChild(removeButton);

    updateGrandTotal();
    
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}

function updateGrandTotal() {
    let rows = document.querySelectorAll("#billBody tr");
    let subtotal = 0;

    rows.forEach(function (row) {
        let amount = row.cells[3].innerText.replace("₹", "");
        subtotal += Number(amount);
    });

    let discount = Number(document.getElementById("discount").value) || 0;
    let gst = Number(document.getElementById("gst").value) || 0;

    let discountAmount = subtotal * discount / 100;
    let afterDiscount = subtotal - discountAmount;

    let gstAmount = afterDiscount * gst / 100;
    let grandTotal = afterDiscount + gstAmount;

    document.getElementById("getAmount").innerText = gstAmount.toFixed(2);
    document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);
}

function clearBill() {
    billNumber++;
    document.getElementById("billNumber").innerText = billNumber;
    document.getElementById("customerName").value = "";
    document.getElementById("displayCustomer").innerText = "";
    document.getElementById("discount").value = "";
    document.getElementById("productName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("gst").value = "";
    document.getElementById("getAmount").innerText = "0";

    document.getElementById("billBody").innerHTML = "";
    document.getElementById("grandTotal").innerText = "0";
    document.getElementById("gstTotal").innerText = "0";

    billNumber++;
    document.getElementById("billNumber").innerText = billNumber;
}

