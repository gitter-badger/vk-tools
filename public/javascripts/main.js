
$(function(){
 $('#submvk').on("click", function(e){
     var parameters = { search: $("#searchvk").val() };
       $.get('/searchingvk', parameters, function(data) {
       $('#resultsvk').html('<strong>Номер поста:</strong>'+data.items[0].id.toString() + '<p>' +'<strong>id владельца:</strong>'+data.items[0].owner_id.toString() + '<p>' + '<strong>Дата:</strong>'+data.items[0].date.toString());
     });
 });
});


$(function(){
 $('#subm2ch').on('keyup', function(e){
     var parameters = { search: $("#search2ch").val() };
       $.get( '/search2ch',parameters, function(data) {
       $('#results2ch').html('<pre>'+data+'</pre>');
 });
});
*/
