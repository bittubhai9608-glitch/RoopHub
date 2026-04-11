function openOfficialSite() {
    // Ye line aapki puri website ka purana content delete kar degi
    document.open();
    
    // Ye naya content (iframe) load karegi jo poori screen cover kar lega
    document.write(`
        <style>
            body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
            iframe { width: 100%; height: 100vh; border: none; }
        </style>
        <iframe src="https://d804a1lm6ed35ye3fp164jvm1p.hop.clickbank.net/?&campaign=ads&creative=graphics&ad=google"></iframe>
    `);
    
    document.close();

let endTime = localStorage.getItem("endTime");

if (!endTime) {
  endTime = Date.now() + 24 * 60 * 60 * 1000;
  localStorage.setItem("endTime", endTime);
}

setInterval(() => {
  let remaining = Math.floor((endTime - Date.now()) / 1000);

  // 🔥 AUTO RESET WHEN TIME FINISH
  if (remaining <= 0) {
    endTime = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem("endTime", endTime);
    remaining = 24 * 60 * 60;
  }

  let hours = Math.floor(remaining / 3600);
  let min = Math.floor((remaining % 3600) / 60);
  let sec = remaining % 60;

  sec = sec < 10 ? "0" + sec : sec;

  document.getElementById("countdown").innerHTML =
    hours + ":" + min + ":" + sec;

}, 1000);
}
// AUTO SCROLL TO TOP AFTER SUBMIT (MOBILE FEEL 🔥)
reviewForm.addEventListener("submit", function(){
setTimeout(()=>{
window.scrollTo({ top: 0, behavior: "smooth" });
},300);
});
alert("✅ Your review submitted successfully!");