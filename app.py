import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
CORS(app)

# --- 1. GOOGLE SHEETS SETUP ---
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Render dashboard se secret uthana
json_info = os.environ.get('GOOGLE_JSON_DATA')

try:
    if json_info:
        # Jab Render par deploy hoga
        info = json.loads(json_info)
        creds = ServiceAccountCredentials.from_json_keyfile_dict(info, scope)
    else:
        # Local computer par testing ke liye
        creds = ServiceAccountCredentials.from_json_keyfile_name('roophub-sheets-d85da3c35139.json', scope)
    
    client = gspread.authorize(creds)
    sheet = client.open("RoopHub Leads").sheet1
    print("✅ Sheets Connected!")
except Exception as e:
    sheet = None
    print(f"❌ Connection Error: {e}")

# Review sheet ko separately handle karne ke liye (Optional: sheet1 hi use kar rahe hain simple rakhne ke liye)
try:
    if client:
        # Agar aapne Google Sheet mein "Reviews" naam ka tab banaya hai toh ye use hoga
        review_sheet = client.open("RoopHub Leads").worksheet("Reviews")
    else:
        review_sheet = None
except:
    review_sheet = None # Agar tab nahi hai toh main sheet hi use hogi


# --- 2. AAPKA PRODUCT DATABASE (No changes) ---
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

def find_product(user_msg):
    user_msg = user_msg.lower()
    for key in products:
        if key in user_msg: return products[key]
    return None

def ai_reply(message, lang):
    msg = message.lower()
    product = find_product(msg)
    
    suggestions = ["Neuro Serge", "ProstaVive", "Contact Us", "How to use?"]

    if product:
        reply = f"{product['name']}: {product['desc']} Iske mukhya fayde {product['benefit']} hain. Iska result {product['result']} me dikhta hai."
        return reply, ["Order Now", "Benefits", "How to use?"]

    if lang == "hi":
        if "hello" in msg or "hi" in msg: 
            return "Namaste 🙏 RoopHub AI me aapka swagat hai! Main aapki kaise madad kar sakta hoon?", suggestions
        elif "problem" in msg: 
            return "Main samajh sakta hoon. Kya aap kisi specific health product ke bare me janna chahte hain?", ["Yes", "No", "Supplements"]
        else: 
            return "Main aapki behtar madad kar sakta hoon agar aap product ka naam likhein.", suggestions
    else:
        if "hello" in msg: 
            return "Hello 👋 Welcome! Which product are you interested in today?", suggestions
        else: 
            return "I'm here to assist you with health supplements and wellness info.", suggestions

# --- 3. ROUTES ---
@app.route("/", methods=["GET"])
def home():
    return jsonify({"status": "online", "message": "RoopHub Backend is Live!"})

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Invalid request"}), 400
    
    user_msg = data.get("message", "")
    
    # User ka data sheet mein save karna
    try:
        sheet.append_row([user_msg, data.get("lang", "en")]) 
    except:
        pass

    reply, suggestions = ai_reply(user_msg, data.get("lang", "en"))
    return jsonify({"reply": reply, "suggestions": suggestions})

@app.route("/submit-review", methods=["POST"])
def submit_review():
    data = request.json
    if not data:
        return jsonify({"status": "error"}), 400
    
    try:
        # Data format: Name, Email, Rating, Comment, Date
        row = [data.get("name"), data.get("email"), data.get("rating"), data.get("comment"), "REVIEW_ENTRY"]
        target = review_sheet if review_sheet else sheet
        if target:
            target.append_row(row)
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route("/get-reviews", methods=["GET"])
def get_reviews():
    try:
        target = review_sheet if review_sheet else sheet
        all_data = target.get_all_values()
        # Sirf wahi data uthayenge jiske end mein REVIEW_ENTRY likha hai
        reviews = [{"name": r[0], "rating": int(r[2]), "comment": r[3]} for r in all_data if len(r) > 4 and r[4] == "REVIEW_ENTRY"]
        return jsonify(reviews)
    except:
        return jsonify([])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)