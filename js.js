document.addEventListener("DOMContentLoaded",function(params) {
    const addBasket=document.querySelectorAll(".add")
    addBasket.forEach((button)=>{
        button.addEventListener("click",(e)=>{
            const card=button.parentElement
            
            const product={
                id:card.dataset.id,
                image:card.querySelector("img").src,
                name:card.querySelector("p").innerText,
                price:card.querySelector("h1").innerText.replace("$",""),
                quantity:1
            }
            addToBasket(product)
        })
    })
    function  addToBasket(addproduct){
        let cart=JSON.parse(localStorage.getItem("basket")) || []
        const existingProduct=cart.findIndex((product)=>product.id===addproduct.id)
        if (existingProduct>-1) {
            cart[existingProduct].quantity+=1
        }
        else{
            cart.push(addproduct)
        }
        localStorage.setItem("basket",JSON.stringify(cart))
        basketadding()
        updateCount()
    }
    function basketadding() {
        const cart=JSON.parse(localStorage.getItem("basket")) || []
        const elements=document.querySelector(".elements")
        elements.innerHTML=``
        cart.forEach((product)=>{
            const elementsdiv=document.createElement("div")
            elementsdiv.innerHTML=`<img class="cartImage" src=${product.image} alt="">${product.name}-1 eded ${product.price}-${product.quantity} eded -qiymet:${(product.quantity*product.price).toFixed(2)}`
            elements.appendChild(elementsdiv)
        })
        const totalPrice=cart.reduce((toplam,item)=>toplam+item.price*item.quantity,0)
        document.getElementById("total1").textContent=totalPrice.toFixed(2)
        document.getElementById("total").textContent=totalPrice.toFixed(2)
    }
    function updateCount() {
        const cart=JSON.parse(localStorage.getItem("basket")) || []
        const say=cart.reduce((toplam,item)=>toplam+=item.quantity,0)
        document.getElementById("say").innerText=say
        const uniqueItems = new Set(cart.map(product => product.id));
        document.getElementById("different").innerText=uniqueItems.size
    }
})