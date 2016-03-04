$(document).ready(function(){
    var id = $("#header").html();
    var html = $("article").html();
    //分页CSS
    $('#top').before("<style>#page_navigation{text-align:center;}#page_navigation a{padding:3px;border:1px solid gray;margin:2px;color:black;text-decoration:none}</style>");
    //弹出框CSS
    $('#top').before("<style>.frame{position: absolute;height: 158px;width: 291px;background-color: #dcdcdc;border:1px solid #000;}.up{border-bottom:1px solid #000;height: 50%;}.right{cursor:pointer}</style>");
    $('#top').before(id);
    $('#top').before("<input type='hidden' id='current_page'/><input type='hidden' id='show_per_page'/>");
    $('#top').before(html);
    $('#top').before("<div id='page_navigation'></div><br>");
    $('#top').before('<div class="frame" style="display:none"><div class="up"><div class="left" style="padding-top:30px;font-size:20px;"></div><div class="right" style="float:right">喇叭<div class="mp3"></div></div></div><div class="down"></div></div>');
    $(".content__main-column").css({"max-width": "58.75rem"});
    $("#top").remove();
    $(".content__secondary-column").remove();
    $(".content__meta-container").remove();
    $("aside").remove();
    $(".content__labels").remove();
    $(".submeta").remove();
    $("#dfp-ad--inline1").remove();
    $("#dfp-ad--inline2").remove();
    $(".ad-slot__label").remove();
    $("iframe").remove();
    //添加分页
    $(document).ready(function(){
        if(screen.width>800){
            var show_per_page = 5; 
        }else{
            var show_per_page = 3;
        }
        var number_of_items = $('.content__article-body').children().size();
        var number_of_pages = Math.ceil(number_of_items/show_per_page);
        $('#current_page').val(0);
        $('#show_per_page').val(show_per_page);
        var navigation_html = '<a class="previous_link" href="javascript:previous();">上一页</a>';
        var current_link = 0;
        while(number_of_pages > current_link){
            navigation_html += '<a class="page_link" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
            current_link++;
        }
        navigation_html += '<a class="next_link" href="javascript:next();">下一页</a>';
        $('#page_navigation').html(navigation_html);
        $('#page_navigation .page_link:first').addClass('active_page');
        $('.content__article-body').children().css('display', 'none');
        $('.content__article-body').children().slice(0, show_per_page).css('display', 'block');  
    });
    function previous(){
        new_page = parseInt($('#current_page').val()) - 1;
        if($('.active_page').prev('.page_link').length==true){
            go_to_page(new_page);
        }
    }
    function next(){
        new_page = parseInt($('#current_page').val()) + 1;
        if($('.active_page').next('.page_link').length==true){
            go_to_page(new_page);
        }
    }
    function go_to_page(page_num){
        var show_per_page = parseInt($('#show_per_page').val());
        start_from = page_num * show_per_page;
        end_on = start_from + show_per_page;
        $('.content__article-body').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
        $('#current_page').val(page_num);
    }
    $(".previous_link").click(function(){
        new_page = parseInt($('#current_page').val()) - 1;
        if($('.active_page').prev('.page_link').length==true){
            go_to_page(new_page);
        }
    });
    $(".next_link").click(function(){
        new_page = parseInt($('#current_page').val()) + 1;
        if($('.active_page').next('.page_link').length==true){
            go_to_page(new_page);
        }
    });
    $(".page_link").click(function(){
        var show_per_page = parseInt($('#show_per_page').val());
        var page_num = $(this).text() - 1;
        start_from = page_num * show_per_page;
        end_on = start_from + show_per_page;
        $('.content__article-body').children().css('display', 'none').slice(start_from, end_on).css('display', 'block');
        $('.page_link[longdesc=' + page_num +']').addClass('active_page').siblings('.active_page').removeClass('active_page');
        $('#current_page').val(page_num);
    });
    //光标选取获得单词
    var funcGetSelectText = function(){
        var txt = '';
        if(document.selection){
            txt = document.selection.createRange().text;//ie
        }else{
            txt = document.getSelection();
        }
            return txt.toString();
    }
    var container = container || document;
    container.onmouseup = function(ev){
        var txt = funcGetSelectText();
        var mousePos = mouseCoords(ev); 
        $(".frame").mouseleave(function(){
            $(".mp3").html('<a></a>');
        });
        if(txt){
            $.ajax(  
                {  
                    data:{
                        keyfrom:"asdasdsa",
                        key:"806358770",
                        type:"data",
                        doctype:"json",
                        callback:"show",
                        version:"1.1",
                        q:txt
                    },
                    type:'get',  
                    url : 'http://fanyi.youdao.com/openapi.do',  
                    success  : function(data) {
                        console.log(JSON.parse(data).basic.explains);
                        var a = JSON.parse(data).basic.explains;
                        var b = a + "";
                        $(".frame").css({"top":mousePos.y-158,"left":mousePos.x,"display":"block"});
                        $(".right").click(function(){
                            $(".mp3").html('<audio autoplay="autoplay"><source src="http://media.shanbay.com/audio/us/' + txt +  '.mp3" type="audio/mpeg"></audio>');
                        })
                        $(".down").text(b);
                        $(".left").text(txt);
                    },  
                    error : function() {  
                        console.log("wrong");  
                    }  
                }  
            ); 
        }else{
            $(".frame").click(function(){
                $(".frame").css({"display":"block"});
            })
            $(".frame").css({"display":"none"});
        }
    }
    function mouseCoords(ev) 
    { 
        if(ev.pageX || ev.pageY){ 
            return {x:ev.pageX, y:ev.pageY}; 
        } 
        return{ 
            x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
            y:ev.clientY + document.body.scrollTop - document.body.clientTop 
        }; 
    } 
});