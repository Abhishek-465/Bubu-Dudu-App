import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
let images=["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzrzcJbnPTj2Vt1QBJA8aGskFn-dFEzcFKkBh0wJE&s","https://yt3.googleusercontent.com/AHOOH_DO8a-ZLJ9K9lsKyKpCx6ZGfYGy9u-gR7K_932BfXaNkzwfnvqhkNecgAkjoQtA9q6UHg=s900-c-k-c0x00ffffff-no-rj","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqh4c842m_yMF_c-iOjG6ywkVnwvUzggX9WdZYHnQFQ&s","https://stickerly.pstatic.net/sticker_pack/oRq6tHwZV7ReN9JGtKEJiw/MN2OTS/4/1698817a-d4df-4373-af97-8614a4fe34d1.png","https://e1.pxfuel.com/desktop-wallpaper/28/537/desktop-wallpaper-panda-bear-bubu-dudu-bubu-dudu.jpg","https://ih1.redbubble.net/image.3108740532.6534/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg"]
const appSettings={
    databaseURL:"https://add-to-cart-71787-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app=initializeApp(appSettings) 
const database=getDatabase(app)
const shoppinglistDB=ref(database,"shoppingList")



const imageEl=document.getElementById("image")
const inputEl=document.getElementById("input-field")
const addEl=document.getElementById("add-button")
const shoppingEl=document.getElementById("shopping-list")

let n=Math.floor(Math.random()*6)
imageEl.innerHTML=`<img src=${images[n]}>`

addEl.addEventListener("click",function(){
    let inputValue=inputEl.value
    
    push(shoppinglistDB,inputValue)
    
    clearinputfield()
})
function clearShoppingListEl(){
    shoppingEl.innerHTML=""
}

onValue(shoppinglistDB,function(snapshot){
    
    if(snapshot.exists())
    {
    let itemsArray=Object.entries(snapshot.val())
    clearShoppingListEl()

    for(let i=0;i<itemsArray.length;i++){
        let currentItem=itemsArray[i]
        appenditem(currentItem)

    }
}
else{
    shoppingEl.innerHTML="No items yet..."
}})



function clearinputfield(){
    inputEl.value=""

}
function appenditem(currentItem){

    let itemId=currentItem[0]
    let itemvalue=currentItem[1]
    let newEl=document.createElement("li")
    newEl.textContent=itemvalue
    shoppingEl.append(newEl)
    newEl.addEventListener("dblclick",function(){
        let exactlocation=ref(database,`shoppingList/${itemId}`)
        remove(exactlocation)
    })

}