function goBack() {
    window.history.back();
}
$(document).ready(function () {
    $("select").material_select();
});
$(document).ready(function () {
    $('.carousel').carousel();
    autoplay();
    function autoplay() {
        $('.carousel').carousel('next');
        setTimeout(autoplay, 4000);
    };
});