window.onload = () =>{
// Company logo
document.getElementById("imgLogo").src = "https://sun1-23.userapi.com/AMRzSyPgEmDTGxBS2NS2q3OtocpKrVCeWIBzHA/iDhbcrxZNDc.jpg?ava=1";
// Employee avatar
document.getElementById("employeeAvatar").src = "https://sun9-88.userapi.com/impf/ICTO9JIaPMmmNyo72hAggilHYNKBdCg9n8QycQ/DIp-hZqTJ3g.jpg?size=762x1080&quality=96&sign=2b1a52ee5467368febe46c9813f052ad&type=album";
// Employee firstname
document.getElementById("employeeFirstName").innerHTML = "Arteom";
// amount excluding 5%
let price = 0
// persent
let percent = 0
// full price
let fullPrice = 0
// Buttons AED
const tipsAmounts = [5, 10, 15, 20]
// Star rating
let rating = document.querySelector('.rateStart')
// array with images and text of compliments
const arrCompliments = [
    {textFirst: "Nice",
    textSecond: "atmosphere",
    imgLink: "https://e-tips.me/assets/review-options/atmosphere.svg",
    selected: false
    },
    {textFirst: "Excellent",
    textSecond: "food",
    imgLink: "https://e-tips.me/assets/review-options/food.svg",
    selected: false
    },
    {textFirst: "Perfect",
    textSecond: "service",
    imgLink: "https://e-tips.me/assets/review-options/service.svg",
    selected: false
    },
]
const tipInputOut = document.querySelector('#amountInput')
const inputNumber = document.querySelector('#firstNumber')
const AED = document.querySelector('#secondNumber')

//AED Visible
const input = () => {    
    if (tipInputOut.value){
        inputNumber.innerHTML = tipInputOut.value
        AED.classList.add('AEDvisible')
        tipInputOut.classList.remove('empty')
        price = tipInputOut.value
    }else{
        inputNumber.value = ''
        tipInputOut.classList.add('empty')
        AED.classList.remove('AEDvisible')
        price = 0 
    }
    percentСounter()
}

if (tipInputOut) {
    tipInputOut.addEventListener('input', input)
    }

const priceChance = (newPrice) => {
 price = newPrice
 tipInputOut.value = newPrice
 inputNumber.innerHTML = newPrice
 AED.classList.add('AEDvisible')
 tipInputOut.classList.remove('empty')
 percentСounter()
}

tipsAmounts.forEach((elem) => {
    const button = document.createElement("button");
    button.classList.add('AEDbutton')
    button.appendChild(document.createTextNode(`${elem} AED`));
    button.onclick = () => priceChance(elem);
    amountButtons.appendChild(button)
    
})
//rating
let ratingItem = document.querySelectorAll('.star')

rating.onclick = function(e){
    let target = e.target
    if (target.classList.contains('star')){
        removeClass(ratingItem, 'current-active')
        target.classList.add('active','current-active')
    }
}

rating.onmouseover = function(e) {
    let target = e.target
    if (target.classList.contains('star')){
        removeClass(ratingItem, 'active')
        target.classList.add('active')
        mouseOverActiveClass(ratingItem)
    }
}

rating.onmouseout = function() {
    addClass(ratingItem,'active')
    mouseOutActiveClass(ratingItem)
}

function removeClass(arr){
    for(let i =0, iLen = arr.length; i < iLen; i++) {
        for(let j = 1; j < arguments.length; j++){
            ratingItem[i].classList.remove(arguments[j])
        }
    }
}

function addClass(arr){
    for(let i =0, iLen = arr.length; i < iLen; i++) {
        for(let j = 1; j < arguments.length; j++){
            ratingItem[i].classList.add(arguments[j])
        }
    }
}

function mouseOverActiveClass(arr){
    for(let i=0, iLen = arr.length; i<iLen; i++){
        if(arr[i].classList.contains('active')){
            break
        }else{
            arr[i].classList.add('active')
        }
    }
}

function mouseOutActiveClass(arr){
    for(let i= arr.length-1; i >= 1; i--){
        if(arr[i].classList.contains('current-active')){
            break
        }else{
            arr[i].classList.remove('active')
        }
    }
}

// Service features / compliments
const renderButtons = () => {
const divFeatures = document.getElementById('divFeatures')
    //remove all existing buttons
    while(divFeatures.firstChild) {
        divFeatures.removeChild(divFeatures.firstChild)
    }
    
    //render new buttons
arrCompliments.forEach((elem) => {
    const buttonCompliments = document.createElement('button')
    const imgCompliments = document.createElement("img")
    buttonCompliments.classList.add('features')
    imgCompliments.classList.add('icon')
    imgCompliments.src = elem.imgLink
    buttonCompliments.appendChild(imgCompliments)
    const spanComplimentsFirst = document.createElement("span")
    spanComplimentsFirst.classList.add('first')
    spanComplimentsFirst.innerHTML = elem.textFirst
    buttonCompliments.appendChild(spanComplimentsFirst)
    const spanComplimentsSecond = document.createElement("span")
    spanComplimentsSecond.classList.add('second')
    spanComplimentsSecond.innerHTML = elem.textSecond
    buttonCompliments.appendChild(spanComplimentsSecond)
    if(elem.selected) {
        buttonCompliments.classList.add('featuresSelected')
    } else {
        buttonCompliments.classList.remove('featuresSelected')
    }
    buttonCompliments.onclick = () => {
        elem.selected = !elem.selected
        renderButtons()
    }
    divFeatures.appendChild(buttonCompliments)

})
}
renderButtons()

//Persent
const lablePay =  document.getElementById("lablePay")
let spanPercent = document.getElementById("percent")


function percentСounter () {
    if(+(price) === 0 || price === ""){
        lablePay.style.display = 'none'
        percent = 0
    }else{
        price = +price
        percent = (price * 0.05).toFixed(2)
        spanPercent.innerHTML = percent
        lablePay.style.display = 'block'
    }
}

// Full price
const payServis = document.getElementById('payServis')
function checkPrice () {
    if (payServis.checked){
        fullPrice = (+price) + (+percent)
    }else{
        fullPrice =  price
    }
}
}