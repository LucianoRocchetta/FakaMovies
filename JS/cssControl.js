
$(window).resize(function(){
    if($(window).width() < 800){
        $('#fakaSearch').removeClass('justify-content-end');
        $('#fakaSearch').addClass('justify-content-center');
    }else{
        $('#fakaSearch').removeClass('justify-content-center');
        $('#fakaSearch').addClass('justify-content-end');
    }
})