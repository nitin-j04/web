// const  json  = require("express");


const removeCategory =async(elem) => {
  
  const name = {name : `${elem.parentNode.textContent}`};
  const result = await elem.parentNode.remove();
  alert(`Are you sure to remove ${name.name}`);
  const rest=await fetch(`/deletemenu/${name.name}`, {method: 'DELETE' ,body : JSON.stringify(name) , headers: { 'Content-Type': 'application/json' }});
  console.log(rest);
}

const removeFav =async(elem) => {
  
  const name = {name : `${elem.parentNode.textContent}`};
  const result = await elem.parentNode.remove();
  alert(`Are you sure to remove ${name.name}`);
  // const rest=await fetch(`/deletemenu/${name.name}`, {method: 'DELETE' ,body : JSON.stringify(name) , headers: { 'Content-Type': 'application/json' }});
  // console.log(rest);
}

const addFav = async(elem) => {

  const name = {name : `${elem.parentNode.textContent}` };
  var ul = document.getElementById("fav-items");
  var li = document.createElement("li");
  li.innerHTML=`<a href="#" onclick="removeFav(this)" ><i class="far fa-times-circle"></i></a><a href="#">${name.name}</i></a>`;
  var f=0;
  var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++){
     // console.log(items[i].textContent);
        if(items[i].textContent.toLowerCase() == name.name.toLowerCase()) {
          f=1;
          break;
        }
    }
  if(f==0)
  ul.appendChild(li);



}


const button = document.getElementById('myButton');
if(button)
{


button.addEventListener('click',async function() {
  console.log('button was clicked');


  let item = document.getElementById('add_item').value;
  let result = {
    name : `${item}`
  };

  var ul = document.getElementById("menu_items");
  var li = document.createElement("li");
  li.innerHTML=`<a href="#" onclick="removeCategory(this)" ><i class="far fa-times-circle"></i></a><a href="#">${item}</i></a><a href="#" onclick="addFav(this)" ><i class="fad fa-star"></i></a>`;

  var f=0;
  var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; i++){
     // console.log(items[i].textContent);
        if(items[i].textContent.toLowerCase() == item.toLowerCase()) {
          f=1;
          break;
        }
    }
  if(f==0)
  ul.appendChild(li);
  document.getElementById('add_item').value="";

  const rest=await fetch('/clicked', {method: 'POST' ,body : JSON.stringify(result) , headers: { 'Content-Type': 'application/json' }});

});
setInterval(async ( ) =>{


  const result = await fetch('/record',{method : 'GET', headers: { 'Content-Type': 'application/json' }});
  

  if (result.ok) {
    const jsonData = await result.json();
    console.log(jsonData);

    var ul = document.getElementById("menu_items");
    
  
    var items = ul.getElementsByTagName("li");
      
       // console.log(items[i].textContent);

       for(var j=0;j<jsonData.length;j++)
       {
        var f=0;
        var li = document.createElement("li");
        li.innerHTML=`<a href="#" onclick="removeCategory(this)"><i class="far fa-times-circle"></i></a><a href="#">${jsonData[j].name}</i></a><a href="#" onclick="addFav(this)" ><i class="fad fa-star"></i></a>`;
  
        for (var i = 0; i < items.length; i++){

            if(items[i].textContent.toLowerCase() == jsonData[j].name.toLowerCase()) {
              f=1;
              break;
            }

        }
       
            if(f==0)
            {
              ul.appendChild(li);
            }
            
          
      }
    



  } else {
    throw Error(result.statusText);
  }
 
 },10000);

}


const placeOrder = ()=>{
  alert('Your Order is Placed');
}



