$(document).ready(function(){
    var id = $("#header").html();
    var html = $("article").html();
    $('#top').before("<style>#page_navigation a{padding:3px;border:1px solid gray;margin:2px;color:black;text-decoration:none}</style>");
    $('#top').before(id);
    $('#top').before("<input type='hidden' id='current_page'/><input type='hidden' id='show_per_page'/>");
    $('#top').before(html);
    $('#top').before("<div id='page_navigation'></div><br>");
    $(".content__main-column").css({"max-width": "58.75rem"});
    $("#top").remove();
    $(".content__secondary-column").remove();
    $(".content__meta-container").remove();
    $("aside").remove();
    $(".content__labels").remove();
    $(".submeta").remove();
    $("#dfp-ad--inline1").remove();
    $("#dfp-ad--inline2").remove();
    $("iframe").remove();
    $(document).ready(function(){
        var show_per_page = 5; 
        var number_of_items = $('.content__article-body').children().size();
        var number_of_pages = Math.ceil(number_of_items/show_per_page);
        $('#current_page').val(0);
        $('#show_per_page').val(show_per_page);
        var navigation_html = '<a class="previous_link" href="javascript:previous();">Prev</a>';
        var current_link = 0;
        while(number_of_pages > current_link){
            navigation_html += '<a class="page_link" longdesc="' + current_link +'">'+ (current_link + 1) +'</a>';
            current_link++;
        }
        navigation_html += '<a class="next_link" href="javascript:next();">Next</a>';
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
    container.onmouseup = function(){
        var txt = funcGetSelectText();
        if(txt)
        {
            alert(txt);
        }
    }
});