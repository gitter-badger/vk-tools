$(function(){
 $('#submvk').on("click", function(e){
     var parameters = { search: $("#searchvk").val() };
       $.get('/searchingvk', parameters, function(data) {
       var displayvk = _.each(data.items,function(items) {$("#resultsvk").append('<div id="boxvk">'+' ID:'+items.id+'<br>DATE:'+moment.unix(items.date).format("dddd, MMMM Do YYYY, h:mm:ss a"));});
     });
 });
});

/*
$(function onload(){
    $.get('/getusrpass', function(data) {
       $('#infovk').html(data);
 });
 });


$(function(){
 $('#subm2ch').on('keyup', function(e){
     var parameters = { search: $("#search2ch").val() };
       $.get( '/search2ch',parameters, function(data) {
       $('#results2ch').html('<pre>'+data+'</pre>');
 });
});
});
*/
