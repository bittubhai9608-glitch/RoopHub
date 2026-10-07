// ======================================
// MITTI KA DIYA - WHATSAPP ORDER SYSTEM
// ======================================


// PRODUCT PRICE
const productPrice = 4; // ₹4 per piece


// YOUR WHATSAPP NUMBER
// 91 = India country code
const whatsappNumber = "918271734883";


// ======================================
// PRODUCT IMAGE LIVE URL
// ======================================
//
// IMPORTANT:
// Yahan product image ka PUBLIC/LIVE URL
// dalna hai.
//
// Example:
// https://roophub.in/images/diya.jpg
//
// Sirf "diya.jpg" WhatsApp message mein
// clickable image link nahi banega.
//

const productImageURL =
    "https://yourwebsite.com/images/diya.jpg";


// ======================================
// FORM
// ======================================

const orderForm =
    document.getElementById("orderForm");


// ======================================
// QUANTITY & TOTAL
// ======================================

const quantityInput =
    document.getElementById("quantity");

const totalAmount =
    document.getElementById("totalAmount");


// Total amount update function
function updateTotal() {

    let quantity =
        parseInt(quantityInput.value) || 30;


    // Minimum quantity 30
    if (quantity < 30) {
        quantity = 30;
    }


    const total =
        quantity * productPrice;


    totalAmount.textContent = total;
}


// Quantity change par total update
quantityInput.addEventListener(
    "input",
    updateTotal
);


// Page load par total
updateTotal();


// ======================================
// FORM SUBMIT
// ======================================

orderForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ==================================
        // CUSTOMER DATA
        // ==================================

        const name =
            document
            .getElementById("name")
            .value
            .trim();


        const mobile =
            document
            .getElementById("mobile")
            .value
            .trim();


        const quantity =
            parseInt(
                document
                .getElementById("quantity")
                .value
            );


        const address =
            document
            .getElementById("address")
            .value
            .trim();


        const pincode =
            document
            .getElementById("pincode")
            .value
            .trim();


        // ==================================
        // QUANTITY VALIDATION
        // ==================================

        if (quantity < 30) {

            alert(
                "Minimum order 30 pieces hai."
            );

            quantityInput.focus();

            return;
        }


        // ==================================
        // MOBILE VALIDATION
        // ==================================

        if (!/^[0-9]{10}$/.test(mobile)) {

            alert(
                "Please valid 10 digit mobile number enter karein."
            );

            document
                .getElementById("mobile")
                .focus();

            return;
        }


        // ==================================
        // PINCODE VALIDATION
        // ==================================

        if (!/^[0-9]{6}$/.test(pincode)) {

            alert(
                "Please valid 6 digit pincode enter karein."
            );

            document
                .getElementById("pincode")
                .focus();

            return;
        }


        // ==================================
        // TOTAL AMOUNT
        // ==================================

        const totalAmountValue =
            quantity * productPrice;


        // ==================================
        // WHATSAPP MESSAGE
        // ==================================

        const message =

`🛍️ NEW ORDER

🪔 Product: Mitti Ka Diya

🖼️ Product Image:
${productImageURL}

💰 Price: ₹${productPrice} / piece

📦 Quantity:
${quantity} pieces

💵 Total Amount:
₹${totalAmountValue}


👤 CUSTOMER DETAILS

Name:
${name}

Mobile:
${mobile}


📍 DELIVERY ADDRESS

${address}

Pincode:
${pincode}


💳 Payment:
Cash on Delivery`;



        // ==================================
        // WHATSAPP URL
        // ==================================

        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(message);


        // ==================================
        // OPEN WHATSAPP
        // ==================================

        window.open(
            whatsappURL,
            "_blank"
        );

    }
);