import { $ } from "./vendors";

$(".carousel").slick({
    infinite: false,
    slidesToShow: 1,
    arrows: true,
    prevArrow: `
    <button class="carousel__btn carousel__btn--left" type="button">
        <img src="assets/img/icons/left-arrow.png" alt="left" title="left"/>
    </button>
    `,
    nextArrow: `
    <button class="carousel__btn carousel__btn--right" type="button">
        <img src="assets/img/icons/right-arrow.png" alt="right" title="right"/>
    </button>
    `,
})