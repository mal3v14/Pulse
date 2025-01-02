$(document).ready(function () {
    $('.carousel__inner').slick({
        speed: 1200,
        variableWidth: true,
        // с фейдом пропадают все слайды, кроме 1
        // fade: true,
        // cssEase: 'linear'
        prevArrow: '<button type="button" class="slick-prev"> <img src="../icons/left.svg"> </button>',
        nextArrow: '<button type="button" class="slick-next"> <img src="../icons/right.svg"> </button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]

    });
});
