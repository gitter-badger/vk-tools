
$(function(){
 $('#search').on('keyup', function(e){
   if(e.keyCode === 13) {
     var parameters = { search: $(this).val() };
       $.get( '/searching',parameters, function(data) {
       $('#results').html('<strong>Номер поста:</strong>'+data.items[0].id.toString() + '<p>' +'<strong>id владельца:</strong>'+data.items[0].owner_id.toString() + '<p>' + '<strong>Дата:</strong>'+data.items[0].date.toString());
     });
    };
 });
});

/*
$(function(){
 $('#search2ch').on('keyup', function(e){
   if(e.keyCode === 13) {
     var parameters = { search: $(this).val() };
       $.get( '/search2ch',parameters, function(data) {
       $('#results2ch').html('<pre>'+data+'</pre>');
     });
    };
 });
});
*/
