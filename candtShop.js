async function addItem(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById('price').value;
    let quantity = document.getElementById('quantity').value;

    let productDetail = {
        name: name,
        description: description,
        price: price,
        quantity: quantity
    }

    try {
        await axios.post("http://localhost:3000/submit", productDetail)
        getDetail();
    } catch (error) {
        console.error(error);
    }

}

async function updateFromServer(uniqId, number) {
    try {
        await axios.get(`http://localhost:3000/${number}/${uniqId}`).then(quantity => {
            console.log(quantity);
            if (quantity === 0) {
                window.alert("Item No Longer Available");
            }
        });
        getDetail();
    } catch (error) {
        console.error(error);
    }


}

async function getDetail() {
    try {
        const res = await axios.get("http://localhost:3000/");

        var listItem = document.getElementById("item-list");
        listItem.innerHTML = ""; // Clear the current list

        for (let i = 0; i < res.data.length; i++) {
            const itemDetail = res.data[i];
            uniqId = res.data[i]["id"];

            let li = document.createElement("li");
            li.className = "list-item";

            let productInfo = document.createElement("div");
            productInfo.className = "product-info";

            let productName = document.createElement("div");
            productName.className = "product-name";
            productName.textContent = itemDetail.name;
            productName.style.fontWeight = "bold";
            productName.style.fontSize = "23px";

            let productDescription = document.createElement("div");
            productDescription.className = "product-description";
            productDescription.textContent = itemDetail.description;

            let productPrice = document.createElement("div");
            productPrice.className = "product-price";
            productPrice.textContent = "Price: " + itemDetail.price;

            let productQuantity = document.createElement("div");
            productQuantity.className = "product-quantity";
            productQuantity.textContent = "Quantity: " + itemDetail.quantity;

            productInfo.appendChild(productName);
            productInfo.appendChild(productDescription);
            productInfo.appendChild(productPrice);
            productInfo.appendChild(productQuantity);

            let buttonContainer = document.createElement("div");
            buttonContainer.className = "button-container";

            let buyOnebtn = document.createElement("button");
            buyOnebtn.className = "buy-btn";
            buyOnebtn.appendChild(document.createTextNode("Buy One"));
            let one = 1;

            let buyTwobtn = document.createElement("button");
            buyTwobtn.className = "buy-btn";
            buyTwobtn.appendChild(document.createTextNode("Buy Two"));
            let two = 2;

            let buyThreebtn = document.createElement("button");
            buyThreebtn.className = "buy-btn";
            buyThreebtn.appendChild(document.createTextNode("Buy Three"));
            let three = 3;

            function buyList(uniqId, quantity, count) {
                return (event) => {
                    event.preventDefault();
                    if (quantity === 0) {
                        window.alert("Item No longer Available");
                    } else {
                        updateFromServer(uniqId, count);
                    }
                };
            }

            buyOnebtn.onclick = buyList(uniqId, itemDetail.quantity, one);
            buyTwobtn.onclick = buyList(uniqId, itemDetail.quantity, two);
            buyThreebtn.onclick = buyList(uniqId, itemDetail.quantity, three);

            buttonContainer.appendChild(buyOnebtn);
            buttonContainer.appendChild(buyTwobtn);
            buttonContainer.appendChild(buyThreebtn);

            li.appendChild(productInfo);
            li.appendChild(buttonContainer);
            listItem.appendChild(li);

            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById("price").value = "";
            document.getElementById("quantity").value = "";
        }
    } catch (error) {
        console.error(error);
    }
}
window.addEventListener("DOMContentLoaded", getDetail);

