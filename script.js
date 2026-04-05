// Left div dynamic data loading for catagory
function removeActive()
{
    const removeActive=document.querySelectorAll(".rmvActive");
    console.log(removeActive);
    removeActive.forEach(remove=>remove.classList.remove("active"));
}
function activeList(id) 
{
    const url=`https://openapi.programming-hero.com/api/category/${id}`; //plants by catagory;
    fetch(url).then(res=>res.json()).then(data=>{
        //console.log(data);
        const addActive=document.getElementById(`category-${id}`);
        //console.log(addActive);
        removeActive();
        addActive.classList.add("active");
        displayActiveList(data.plants)
    });
}
function loadModal(id)
{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`;
    fetch(url).then(res=>res.json()).then(data=>{
        //console.log(data.plants);
        displayModal(data.plants);
    });
}
function displayModal(details)
{   
    //console.log(typeof(details));
    //console.log(details);
   const modal= document.getElementById("my_modal_2");
   //console.log(modal);
   modal.showModal(); //this is the build in functionality in daisy ui this is mendatory
    //modal.showModal();
   document.getElementById("modalDiv").innerHTML=`<div class=" bg-white p-5 space-y-3">
                                    <img src="${details.image}" alt="#" class="rounded-md">
                                    <h6 class="font-bold text-xl btn bg-transparent border-none">${details.name}</h6>
                                    <p class="text-sm">${details.description}</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-green-800 bg-green-200 px-3 rounded-full">${details.category}</span>
                                        <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign font-extralight"></i>${details.price}</p>
                                    </div>
                                   
                                </div>`
}
function loadCart(id) 
{
    const url=`https://openapi.programming-hero.com/api/plant/${id}`; //plants by id;
    fetch(url).then(res=>res.json()).then(data=>{
        //console.log(data.plants);
        //console.log(typeof(data.plants));
       displayCart(data.plants); //data is an object here;
    });
}
function displayCart(cart)
{   
    console.log(cart);
    const containerCart=document.getElementById("yourCart");
    //console.log(containerCart);
    //containerCart.innerHTML=;
    const Cart=document.createElement("div");
    Cart.innerHTML=`<div class="bg-[#F0FDF4] p-2 flex items-center justify-between my-1">
                                <div>
                                    <h6 class="font-bold">${cart.name}</h6>
                                    <p class="font-extralight"><i class="fa-solid fa-bangladeshi-taka-sign font-extralight"></i> ${cart.price}</p>
                                </div>
                                <span class="btn btn-xs btn-ghost"><i class="fa-solid fa-xmark"></i></span>
                     </div>`;
    containerCart.appendChild(Cart);
    
}
function displayActiveList(plants)
{ //console.log(plants);
    const displayCard=document.getElementById("cardContent");
    displayCard.innerHTML="";
    plants.forEach(plant=>{
         const createCard=document.createElement("div");
         createCard.innerHTML=`<div class=" bg-white p-5 space-y-3 md:w-60">
                                    <img src="${plant.image}" alt="#" class="rounded-md">
                                    <h6 onclick="loadModal(${plant.id})" class="font-bold text-xl btn bg-transparent border-none">${plant.name}</h6>
                                    <p class="text-sm">${plant.description}</p>
                                    <div class="flex items-center justify-between">
                                        <span class="text-green-800 bg-green-200 px-3 rounded-full">${plant.category}</span>
                                        <p class="font-bold"><i class="fa-solid fa-bangladeshi-taka-sign font-extralight"></i>${plant.price}</p>
                                    </div>
                                    <button onclick="loadCart(${plant.id})" class="btn bg-green-600 text-white w-full rounded-full font-semibold">Add to Cart</button>
                                </div>`;
         displayCard.appendChild(createCard);
    })
}
function displayCategory(names)  //Displaying the category list here
{
    const categoryList=document.getElementById("catagory-list");
    //console.log(categoryList);
    categoryList.innerHTML="";
    names.forEach(name=>{
        const listName=document.createElement("div");
        listName.innerHTML=`<p id="category-${name.id}" onclick="activeList(${name.id})" class="categoryName m-1 font-medium text-base p-1 rounded-md cursor-pointer hover:shadow-lg hover:bg-[#F0FDF460] rmvActive">${name.category_name}</p>`;
        categoryList.appendChild(listName);
    })
}

function loadCategory() //categories are loading from api
{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=>res.json())
    .then(data=>displayCategory(data.categories));
}

// mid div dynamic data loading functionality


function loadMidDiv()
{
    fetch("https://openapi.programming-hero.com/api/plants").then(res=>res.json()).then(data=>displayActiveList(data.plants));
}



// calling all functions here
loadCategory(); //1;
loadMidDiv(); //2;