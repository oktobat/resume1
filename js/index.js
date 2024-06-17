// console.log($('.section').eq(0).offset().top)
// console.log($('.section').eq(1).offset().top)
// console.log($('.section').eq(2).offset().top)
// console.log($('.section').eq(3).offset().top)

let sectArray = []
function sectDist(){
    for (let i=0; i<$('.section').length; i++) {
        sectArray[i] = $('.section').eq(i).offset().top
    }
}
sectDist()
// console.log(sectArray)

$(window).on('resize', function(){
    sectDist()
    // console.log(sectArray)
})


$(window).on('scroll', function(){
    let sct = $(this).scrollTop()
    // console.log(sct)
    if ( sct>=sectArray[0] && sct<sectArray[1] && !cflag) {
        $('#menu li').eq(0).addClass('on')
        $('#menu li').eq(0).siblings().removeClass('on')
        $('.skillContainer > div').find('.score').css({ height:'0%' })
        $('.skillContainer').removeClass('on')
    } else if ( sct>=sectArray[1] && sct<sectArray[2] && !cflag) {
        $('#menu li').eq(1).addClass('on')
        $('#menu li').eq(1).siblings().removeClass('on')
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(70, '.html', 15)
            count(60, '.css', 16)
            count(80, '.script', 17)
            count(60, '.jquery', 18)
            count(50, '.react', 19)
        }
        $('#sect3').removeClass('on')
        $('#sect3 ul li').css({ transitionDelay:'0s' })
    } else if ( sct>=sectArray[2] && sct<sectArray[3] && !cflag) {
        $('#menu li').eq(2).addClass('on')
        $('#menu li').eq(2).siblings().removeClass('on')
        $('#sect4').removeClass('on')
        $('#sect3').addClass('on')
        for (let i=0; i<8; i++) {
            $('#sect3 ul li').eq(i).css({ transitionDelay:'0.'+i+'s' })    
        }
        $('#sect4 .formbox').css({
            transitionDelay:'0s'
        })
    } else if ( sct>=sectArray[3] && !cflag) {
        $('#menu li').eq(3).addClass('on')
        $('#menu li').eq(3).siblings().removeClass('on')
        $('#sect4').addClass('on')
    } 
})    

$('.section').on('wheel DOMMouseScroll', function(e){
    let delta = e.originalEvent.wheelDelta
    // delta>0 이면 마우스휠을 위로 굴린 것이고,
    // delta<0 이면 마우스휠을 아래로 굴린 것임
    console.log(delta)
    if (delta>0) {
        $('html, body').stop().animate({
            scrollTop: $(this).prev().offset().top
        }, 500)
    } else {
        $('html, body').stop().animate({
            scrollTop: $(this).next().offset().top
        }, 500)
    }
})

let cflag = false;
$('#menu li a').on('click focus', function(e){
   e.preventDefault()
   cflag = true;
   let num = $(this).parent().index()
   // console.log(num)
   $(this).parent().addClass('on').siblings().removeClass('on')

   if (num<1) {
    $('.skillContainer > div').find('.score').css({ height:'0%' })
    $('.skillContainer').removeClass('on')
    } else {
        if ( !$('.skillContainer').hasClass('on') ) {
            $('.skillContainer').addClass('on')
            count(70, '.html', 15)
            count(60, '.css', 16)
            count(80, '.script', 17)
            count(60, '.jquery', 18)
            count(50, '.react', 19)
        }
    }

if (num<2) {
    $('#sect3').removeClass('on')
    $('#sect3 ul li').css({
        transitionDelay:'0s'
    })
} else {
    for (let i=0; i<8; i++) {
        $('#sect3 ul li').eq(i).css({ transitionDelay:'1.'+i+'s' })    
    }
    $('#sect3').addClass('on')
}

if (num<3) {
    $('#sect4').removeClass('on')
    $('#sect4 .formbox').css({
        transitionDelay:'0s'
    })
} else {
    $('#sect4 .formbox').css({
        transitionDelay:'1s'
    })
    $('#sect4').addClass('on')
}


   $('html, body').animate({
      scrollTop: sectArray[num]
   }, 500, function(){ cflag = false })
})


function count(jumsu, cname, time) {
    let num = 0; 
    var stop = setInterval(function(){
        num++;
        if (num<=jumsu) {
            $(cname).find('.score').css({ height:num+'%', transition:'all 0s' })
            $(cname).find('.myscore').text(num+'%')
        } else {
            clearInterval(stop)
            $(cname).find('.score').css({ transition:'all 1s' })
        }
    }, time)
}

// 첫번째 섹션의 슬릭슬라이더
$('.slideInner').slick({
    autoplay:true,
    arrows:false,
    pauseOnHover:false,
    autoplaySpeed:3000,
    dots:true
})

$('.slideOuter .plpa').on('click', function(){
    if ( $(this).find('i').hasClass('fa-pause') ) {
        $('.slideInner').slick('slickPause')
        $(this).find('i').removeClass('fa-pause').addClass('fa-play')
    } else {
        $('.slideInner').slick('slickPlay')
        $(this).find('i').removeClass('fa-play').addClass('fa-pause')
    }
})


