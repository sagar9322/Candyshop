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
        await axios.get(`http://localhost:3000/${number}/${uniqId}`);
        getDetail();
    } catch (error) {
        console.error(error);
    }


}

async function getDetail() {
    try {
        const res = await axios.get("http://localhost:3000/");

        var listItem = document.getElementById('item-list');
        listItem.innerHTML = ""; // Clear the current list

        for (let i = 0; i < res.data.length; i++) {
            const itemDetail = res.data[i];
            uniqId = res.data[i]['id'];

            let displayProduct = `${itemDetail.name}, ${itemDetail.description}, ${itemDetail.price}, ${itemDetail.quantity}`;

            let li = document.createElement("li");
            li.className = "list-item";
            li.appendChild(document.createTextNode(displayProduct));

            let buyOnebtn = document.createElement("button");
            buyOnebtn.className = "buy-btn";
            buyOnebtn.appendChild(document.createTextNode("Buy One"));
            let one = 1;
            let two = 2;
            let three = 3;

            function buyOneList(uniqId, one) {
                return (event) => {
                    event.preventDefault();
                    updateFromServer(uniqId, one);
                }
            }
            buyOnebtn.onclick = buyOneList(uniqId, one);

            let buyTwobtn = document.createElement("button");
            buyTwobtn.className = "buy-btn";
            buyTwobtn.appendChild(document.createTextNode("Buy Two"));

            function buyTwoList(uniqId, two) {
                return (event) => {
                    event.preventDefault();
                    updateFromServer(uniqId, two);
                }
            }
            buyTwobtn.onclick = buyTwoList(uniqId, two);


            let buyThreebtn = document.createElement("button");
            buyThreebtn.className = "buy-btn";
            buyThreebtn.appendChild(document.createTextNode("Buy Three"));

            function buyThreeList(uniqId, three) {
                return (event) => {
                    event.preventDefault();
                    updateFromServer(uniqId, three);
                }
            }
            buyThreebtn.onclick = buyThreeList(uniqId, three);


            li.appendChild(buyOnebtn);
            li.appendChild(buyTwobtn);
            li.appendChild(buyThreebtn);
            listItem.appendChild(li);

            document.getElementById("name").value = "";
            document.getElementById("description").value = "";
            document.getElementById('price').value = "";
            document.getElementById('quantity').value = "";


        }
    } catch (error) {
        console.error(error);
    }


}
window.addEventListener("DOMContentLoaded", getDetail);

