const menu__bar = document.querySelector(".menu__bar"),
      menu__main = document.querySelector(".menu__main"),
      menu__close = document.querySelector(".menu__close"),
      menu__element = document.querySelectorAll(".menu__element"),
      add_cart = document.querySelectorAll(".add_cart")

menu__bar.addEventListener("click", ToggleFunction)

function ToggleFunction(){
    menu__main.classList.toggle("bar__active");
}

menu__close.addEventListener("click", ToggleFunction)

menu__element.forEach(element => {
    element.addEventListener("click", ToggleFunction)
})

window.addEventListener("resize",function(){
    if(this.window.innerWidth <= 630){
        add_cart.forEach(item => {
            item.innerHTML = 'Add <i class="fa-solid fa-cart-shopping add_cart_icon"></i>';
        })
    }
})

if(this.window.innerWidth <= 630){
    add_cart.forEach(item => {
        item.innerHTML = 'Add <i class="fa-solid fa-cart-shopping add_cart_icon"></i>';
    })
}