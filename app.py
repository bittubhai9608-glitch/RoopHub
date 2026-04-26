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
        "desc": "Ye brain booster supplement hai jo memory aur focus improve karta hai.",
        "benefit": "Focus, concentration aur mental clarity better karta hai.",
        "result": "2-4 weeks me improvement feel ho sakta hai."
    },
    "prostavive": {
        "desc": "Ye men health supplement hai jo energy aur prostate support karta hai.",
        "benefit": "Stamina aur overall wellness improve karta hai.",
        "result": "Regular use se gradual improvement milta hai."
    },
    "citrusburn": {
        "desc": "Ye natural fat burner hai jo metabolism boost karta hai.",
        "benefit": "Rapid weight loss aur daily energy.",
        "result": "30 days me changes dikh sakte hain."
    },
    "keyslim": {
        "desc": "Ye liquid weight loss drops hain jo appetite control karte hain.",
        "benefit": "Craving control aur fast metabolism.",
        "result": "Consistent use se best results milte hain."
    },
    "visiflora": {
        "desc": "Ye eye health supplement hai jo vision support karta hai.",
        "benefit": "Sharper vision aur eye strain se relief.",
        "result": "Monthly use me difference feel hoga."
    },
    "purisaki": {
        "desc": "Ye patches skin aur blood sugar support ke liye hain.",
        "benefit": "Natural healing aur better skin texture.",
        "result": "Regular use se benefit milta hai."
    },
    "igenics": {
        "desc": "Ye premium vision support formula hai.",
        "benefit": "Eye health aur clear vision maintenance.",
        "result": "Supports long term eye wellness."
    }
}

category_triggers = {
    "weight": "Weight loss ke liye hamare paas 'CitrusBurn' aur 'KeySlim Drops' hain.",
    "skin": "Skin care ke liye 'Purisaki Patches' ek badhiya option hai.",
    "eye": "Vision support ke liye 'Visiflora' ya 'iGenics' ka use kar sakte hain.",
    "brain": "Memory aur focus ke liye 'Neuro Serge' sabse popular hai.",
    "men": "Men vitality ke liye 'ProstaVive Vitality' design kiya gaya hai."
}

def find_product(user_msg):
    user_msg = user_msg.lower()
    for key in products:
        if key in user_msg: return products[key]
    return None

def ai_reply(message, lang):
    msg = message.lower()
    product = find_product(msg)
    
    # User happiness focus: Agree, Smile, Laughing suggestions
    happy_suggestions = ["I Agree! 🤝", "Nice! 😊", "Haha! 😂", "Tell me more! ✨"]

    if product:
        reply = f"{product['desc']} Iske mukhya fayde {product['benefit']} hain. Iska result {product['result']} me dikhta hai."
        return reply, happy_suggestions

    # Detect category from keywords
    for key, text in category_triggers.items():
        if key in msg:
            return text, happy_suggestions

    if lang == "hi":
        if any(x in msg for x in ["hello", "hi", "namaste", "hey"]): 
            return "Namaste 🙏 RoopHub AI me aapka swagat hai! Main aapki kaise madad kar sakta hoon?", happy_suggestions
        return "Main aapki behtar madad kar sakta hoon agar aap product ka naam likhein.", happy_suggestions
    else:
        if "hello" in msg: 
            return "Hello 👋 Welcome! Which product are you interested in today?", happy_suggestions
        return "I'm here to assist you with health supplements and wellness info.", happy_suggestions

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