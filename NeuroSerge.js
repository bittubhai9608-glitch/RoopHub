/* =========================
   🔥 OPEN OFFICIAL SITE
========================= */
function openOfficialSite() {
    window.location.href = "https://8c8140sq3ljwet6b-82d35bxa0.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google";
}

/* =========================
   🔥 REAL REVIEWS (SAFE STORAGE)
========================= */
let realReviews = JSON.parse(localStorage.getItem("realReviews")) || [];

/* =========================
   🔥 SEE MORE CONTROL
========================= */
let visibleCount = 5;

/* =========================
   🔥 REVIEW FUNCTIONS
========================= */
function displayReviews(){
    let list = document.getElementById("reviewList");
    let btn = document.getElementById("seeMoreBtn");

    if(!list) return;

    list.innerHTML = "";

    let allReviews = [...fakeReviews, ...realReviews];

    allReviews.slice(0, visibleCount).forEach(r=>{
        list.innerHTML += `
        <div class="review-item">
            <strong>${r.name}</strong> (${r.email}) - ${"⭐".repeat(r.rating)}<br>
            ${r.comment}
        </div>`;
    });

    if(btn){
        btn.style.display = allReviews.length > visibleCount ? "block" : "none";
    }
}

function toggleReviews(){
    let list = document.getElementById("reviewList");

    if(list.style.display==="none" || list.style.display===""){
        displayReviews();
        list.style.display="block";
    }else{
        list.style.display="none";
    }
}

function toggleForm(){
    let form=document.getElementById("reviewForm");
    form.style.display = (form.style.display==="none"||form.style.display==="")?"block":"none";
}

// This is the function that needs to send data to the Flask backend
function submitForm(){

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    if(name.length<2 || comment.length<5){
        alert("Proper review likho");
        return;
    }

    // Dynamically get the product name from the H1 tag
    const productNameElement = document.querySelector('h1[data-i18n="neuro_title"]');
    const productName = productNameElement ? productNameElement.innerText.trim() : "Neuro Serge"; // Default if not found

    const payload = {
        name: name,
        email: email,
        rating: rating,
        comment: comment,
        product: productName // Include product name
    };

    const submitBtn = document.querySelector('#reviewForm .submit-btn');
    const originalBtnText = submitBtn.innerText;
    submitBtn.disabled = true;
    submitBtn.innerText = "Saving to Database...";

    fetch("https://roophub.onrender.com/submit-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(result => {
        if(result.status === "success") {
            alert("✅ Review submitted successfully and saved to Database!");
            // Update local reviews and display
            const newReview={name,email,rating,comment}; // Keep local storage for immediate display
            realReviews.unshift(newReview);
            localStorage.setItem("realReviews",JSON.stringify(realReviews));
            displayReviews();
            document.getElementById("reviewList").style.display="block";
            document.getElementById("reviewForm").reset();
            document.getElementById("reviewForm").style.display="none"; // Hide form after submission
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            alert("❌ Error: " + (result.message || "Failed to save review"));
        }
    })
    .catch(err => {
        console.error("Submission error:", err);
        alert("❌ Server connection failed. Data not stored.");
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
    });
}

/* =========================
   🔥 REAL REVIEWS (SAFE STORAGE) - This part is already handled by the fetch above, but keeping local storage for immediate display.
========================= */
let realReviews = JSON.parse(localStorage.getItem("realReviews")) || [];

/* =========================
   🔥 SEE MORE CONTROL
========================= */
let visibleCount = 5;

/* =========================
   🔥 REVIEW FUNCTIONS
========================= */
function displayReviews(){
    let list = document.getElementById("reviewList");
    let btn = document.getElementById("seeMoreBtn");

    if(!list) return;

    list.innerHTML = "";

    let allReviews = [...fakeReviews, ...realReviews];

    allReviews.slice(0, visibleCount).forEach(r=>{
        list.innerHTML += `
        <div class="review-item">
            <strong>${r.name}</strong> (${r.email}) - ${"⭐".repeat(r.rating)}<br>
            ${r.comment}
        </div>`;
    });

    if(btn){
        btn.style.display = allReviews.length > visibleCount ? "block" : "none";
    }
}

function toggleReviews(){
    let list = document.getElementById("reviewList");

    if(list.style.display==="none" || list.style.display===""){
        displayReviews();
        list.style.display="block";
    }else{
        list.style.display="none";
    }
}

function toggleForm(){
    let form=document.getElementById("reviewForm");
    form.style.display = (form.style.display==="none"||form.style.display==="")?"block":"none";
}

function submitForm_old(){ // Renamed to avoid conflict, the new one above is active

    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let rating=document.getElementById("rating").value;
    let comment=document.getElementById("comment").value;

    if(name.length<2 || comment.length<5){
        alert("Proper review likho");
        return;
    }

    let newReview={name,email,rating,comment};

    // 🔥 USER REVIEW TOP PAR
    realReviews.unshift(newReview);

    localStorage.setItem("realReviews",JSON.stringify(realReviews));

    displayReviews();
    document.getElementById("reviewList").style.display="block";

    document.getElementById("reviewForm").reset(); // Reset form after submission

    // 📱 MOBILE UX IMPROVEMENT
    window.scrollTo({ top: 0, behavior: "smooth" });

    alert("Review successfully!"); // Alert user
}

// LOAD MORE
function loadMoreReviews(){
    visibleCount += 5;
    displayReviews();
}


/* =========================
   📱 PAGE LOAD (FAST + MOBILE)
========================= */
window.addEventListener("load", function(){

/* ---------- IMAGE PRELOAD (MOBILE FAST) ---------- */
let images=[
    "images/neuroserge1.jpeg",
    "images/neuroserge2.jpeg",
    "images/neuroserge3.jpeg",
    "images/neuroserge4.jpeg"
];

images.forEach(src=>{
    let img=new Image();
    img.src=src;
});

/* ---------- SLIDER ---------- */
let index=0;
let img=document.getElementById("sliderImage");

function showImage(i){
    if(!img) return;

    img.style.opacity=0;

    setTimeout(()=>{
        img.src=images[i];
        img.style.opacity=1;
    },250); // faster for mobile
}

function nextImage(){
    index=(index+1)%images.length;
    showImage(index);
}

function prevImage(){
    index=(index-1+images.length)%images.length;
    showImage(index);
}
// GLOBAL ACCESS
window.nextImage = nextImage;
window.prevImage = prevImage;

// 📱 smoother auto slider
setInterval(nextImage,2500);


/* ---------- COUNTDOWN (24HR FIXED) ---------- */
let endTime = localStorage.getItem("endTime");

if (!endTime || isNaN(endTime)) {
  endTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("endTime", endTime);
}

setInterval(() => {

  let remaining = Math.floor((endTime - Date.now()) / 1000);

  if (remaining <= 0) {
    endTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("endTime", endTime);
    remaining = 24 * 60 * 60;
  }

  let hours = Math.floor(remaining / 3600);
  let min = Math.floor((remaining % 3600) / 60);
  let sec = remaining % 60;

  document.getElementById("countdown").innerHTML =
    hours + ":" + min + ":" + (sec<10?"0"+sec:sec);

},1000);


/* ---------- TOUCH SUPPORT (MOBILE SWIPE) ---------- */
let startX = 0;

if(img){
img.addEventListener("touchstart", e=>{
    startX = e.touches[0].clientX;
});

img.addEventListener("touchend", e=>{
    let endX = e.changedTouches[0].clientX;

    if(startX - endX > 50){
        nextImage(); // swipe left
    } else if(endX - startX > 50){
        prevImage(); // swipe right
    }
});
}
});
