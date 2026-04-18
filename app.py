from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. 🔥 HOMEPAGE ROUTE (Iski wajah se 'Not Found' aa raha tha)
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "RoopHub Backend is running successfully!",
        "endpoint": "/chat"
    })

# 🔥 PRODUCT DATABASE (Aapka saara data safe hai)
products = {
    "neuro serge": {
        "name": "Neuro Serge",
        "desc": "Ye brain booster supplement hai jo memory aur focus improve karta hai.",
        "benefit": "Focus, concentration aur mental clarity better karta hai.",
        "use": "Students aur working professionals ke liye useful hai.",
        "result": "2-4 weeks me improvement feel ho sakta hai."
    },
    "prostavive": {
        "name": "ProstaVive Vitality",
        "desc": "Ye men health supplement hai jo energy aur prostate support karta hai.",
        "benefit": "Stamina aur overall wellness improve karta hai.",
        "use": "40+ men ke liye useful hai.",
        "result": "Regular use se gradual improvement milta hai."
    }
}

# 🔥 SMART MATCH FUNCTION
def find_product(user_msg):
    user_msg = user_msg.lower()
    for key in products:
        if key in user_msg:
            return products[key]
        words = user_msg.split()
        for w in words:
            if w in key:
                return products[key]
    return None

def ai_reply(message, lang):
    msg = message.lower()
    product = find_product(msg)
    if product:
        return f"{product['name']}\n\n{product['desc']}\n\nBenefits:\n- {product['benefit']}\n\nUse:\n- {product['use']}\n\nResult:\n- {product['result']}\n\nYe product kaafi log use kar rahe hain aur positive response mil raha hai.\nAap 'Check Offer' button se iska detail dekh sakte ho."

    if lang == "hi":
        if "hello" in msg: return "Namaste 🙏 aapka swagat hai! Aap kis problem ya product ke bare me jana chahte ho?"
        elif "problem" in msg: return "Koi baat nahi 👍 aap apni problem detail me bataye, main best solution suggest karunga."
        elif "weight" in msg: return "Agar aap weight loss chahte ho to aapko ek proper routine follow karna hoga. Main aapko best product bhi suggest kar sakta hoon jo fat burn me help kare."
        elif "brain" in msg or "memory" in msg: return "Agar aap memory aur focus improve karna chahte ho to brain support products kaafi useful hote hain. Main aapko best option bata sakta hoon."
        elif "men" in msg or "health" in msg: return "Men health ke liye energy aur stamina improve karna important hota hai. Main aapko trusted solution suggest kar sakta hoon."
        else: return "Main aapki help ke liye hoon 😊 aap apni need bataye jaise weight loss, memory, ya men health."
    else:
        if "hello" in msg: return "Hello 👋 welcome! What kind of help or product are you looking for?"
        elif "problem" in msg: return "No worries 👍 tell me your problem in detail, I will guide you with the best solution."
        elif "weight" in msg: return "If you want weight loss, you need a proper routine. I can also suggest a good product that helps in fat burning."
        elif "brain" in msg or "memory" in msg: return "If you want to improve memory and focus, brain support products can help. I can suggest a good option."
        elif "men" in msg or "health" in msg: return "For men's health, improving energy and stamina is important. I can suggest a trusted solution."
        else: return "I am here to help you 😊 tell me your goal like weight loss, memory, or men's health."

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Invalid request"}), 400
    
    reply = ai_reply(data.get("message",""), data.get("lang","en"))
    return jsonify({"reply": reply})

if __name__ == "__main__":
    # Render ke liye host '0.0.0.0' hona zaroori hai
    app.run(host="0.0.0.0", port=10000)