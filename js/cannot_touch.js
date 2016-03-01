$(document).ready(function(){
    var id = $("#header").html();
    var html = $("article").html();
    $('#top').before(id);
    $('#top').before(html);
    $("#top").hide();
    $(".content__secondary-column").hide();
    $(".content__meta-container").hide();
    $("aside").hide();
    $(".content__labels").hide();
    $(".submeta").hide();
});