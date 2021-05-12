//Loading effect
setTimeout(() => {
    $(".loading-icon").hide();
    $(".loading-container").css("height",0);

    $("#htmlTag").css("height","unset !important");

    $("#ipt-navbar").show();
    $("#ipt-footer").show();
    
    $(".content-container").show();
    $(".content-container").css("animation","fadeIn 2s");
},1500);
