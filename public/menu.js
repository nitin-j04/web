



function getItem(){
    let item = document.getElementById('add_item').value;
    console.log(`${item}`);
}

$(document).ready(function(){
    $("button").click(function(){
         let item = document.getElementById('add_item').value;
        
                var  itemName = item;
                var itemFound = false;

                $('#menu_items li').each( function () {

                    if ( $(this).text() === itemName )
                    {
                        itemFound = true;
                    }

                });

                if ( itemFound == true )
                {
                    alert( 'item already present' );
                }
                else if(item!="")
                {
                   // add item here
                    $("#menu_items").append(`<li><a href="" ><i class="far fa-times-circle"></i></a><a href="#">${item}</i></a><a href="" ><i class="fad fa-star"></i></a></li>`);
                    alert( `item ${item} added successfully!` );
                  
                }

                $('#add_item').val("");
        
    });


});