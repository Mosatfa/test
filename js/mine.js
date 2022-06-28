//nav barside
$(".btnOpen").click(function(){

    if($(".sidenav").width() == "250" )
    {
        $(".sidenav").animate({width : "0px"} , 700)
        $(".contact").animate({ marginLeft: "0px"} , 800)
        $(".btnOpen").animate({ marginLeft: "0px"} , 700)

    }
    else
    {
        $(".sidenav").animate({width : "250px"} , 700)
        $(".contact").animate({ marginLeft: "250px"} , 800)
        $(".btnOpen").animate({ marginLeft: "250px"} , 700)

    }
})
// btn close nav
$(".btn-close").click(function(){
    
    $(".sidenav").animate({width : "0px"} , 700)
    $(".contact").animate({ marginLeft: "0px"} , 800)
    $(".btnOpen").animate({ marginLeft: "0px"} , 800)
})
//section 2 
$("h3").click(function(){
    $(this).next().slideToggle(500)
    $(".accord p").not($(this).next()).slideUp(500)
})
// count Down Date
let countDownDate = new Date("Dec.17,.2022.23:59:59").getTime()
let counter = setInterval(function(){

    let dateNom = new Date().getTime()

    let dateDiff = countDownDate - dateNom;

    let days = Math.floor( dateDiff/ (1000 * 60 * 60 * 24) )
    let hours = Math.floor((dateDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
    let minutes = Math.floor((dateDiff % (1000 * 60 * 60) / (1000 * 60)))
    let second = Math.floor((dateDiff % (1000 * 60) / (1000)))


    // console.log(dateDiff/1000 / 60 / 60 /24)

    document.querySelector(".days").innerHTML = "-" + days + " D"
    document.querySelector(".hours").innerHTML = hours + " h"
    document.querySelector(".minutes").innerHTML = minutes + " m"
    document.querySelector(".seconds").innerHTML = second + " s"

    if(dateDiff = 0)
    {
        clearInterval(counter)
    }
},0)

// count textarea
let chart =100
function countDownChar(word)
{
    let lenght = word.value.length

    document.querySelector(".num").innerHTML = chart - lenght
    
    
    if(lenght >= 100  )
    {
        document.querySelector(".num").innerHTML = "your available character finished"
    }
}
