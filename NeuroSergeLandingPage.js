/* =========================
   🔥 OPEN OFFICIAL SITE
========================= */
function openOfficialSite() {
    document.open();
    document.write(`
        <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            iframe { width: 100%; height: 100vh; border: none; }
        </style>
        <iframe src="https://d804a1lm6ed35ye3fp164jvm1p.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google"></iframe>
    `);
    document.close();
}



/* =========================
   🔥 FAKE REVIEWS (UNCHANGED)
========================= */
let fakeReviews = [
    {name:"Rahul", email:"rahul@gmail.com", rating:5, comment:"बहुत बढ़िया product 👍"},
    {name:"Pooja", email:"pooja@gmail.com", rating:4, comment:"Quality achhi hai 😊"},
    {name:"Amit", email:"amit@gmail.com", rating:5, comment:"Fast delivery 🚀"},
    {name:"Neha", email:"neha@gmail.com", rating:4, comment:"Value for money 💰"},
    {name:"Neha", email:"neha@gmail.com", rating:4, comment:"Value for money 💰"},
    {name:"Neha", email:"neha@gmail.com", rating:4, comment:"Value for money 💰"},
    {name:"Neha", email:"neha@gmail.com", rating:4, comment:"Value for money 💰"},
    {name:"Neha", email:"neha@gmail.com", rating:4, comment:"Value for money 💰"},
    {name:"Ravi", email:"ravi@gmail.com", rating:5, comment:"Highly recommended 🔥"}
];

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

function submitForm(){

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

    document.getElementById("reviewForm").reset();

    // 📱 MOBILE UX IMPROVEMENT
    window.scrollTo({ top: 0, behavior: "smooth" });

    alert("✅ Your review submitted successfully!");
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
"Images/Neuroserge1.jpeg",
"Images/Neuroserge2.jpeg",
"Images/Neuroserge3.jpeg",
"Images/Neuroserge4.jpeg"
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














