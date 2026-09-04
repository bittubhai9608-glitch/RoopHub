
    function changeImage(element) {

    document.getElementById("mainProductImage").src = element.src;

    document.querySelectorAll(".thumbnail").forEach(function(img) {
    img.classList.remove("active");
});
    element.classList.add("active");
}
