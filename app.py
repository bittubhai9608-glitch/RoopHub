import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials

app = Flask(__name__)
CORS(app)

# --- 1. GOOGLE SHEETS CONNECTION SETUP ---
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Render se Secret JSON data uthana bina file ke
json_info = os.environ.get('GOOGLE_JSON_DATA')

try:
    if json_info:
        # Jab code Render par chalega
        info = json.loads(json_info)
        creds = ServiceAccountCredentials.from_json_keyfile_dict(info, scope)
    else:
        # Jab aap apne computer par test karenge
        creds = ServiceAccountCredentials.from_json_keyfile_name('roophub-sheets-d85da3c35139.json', scope)
    
    client = gspread.authorize(creds)
    # Pakka karein ki aapki sheet ka naam "RoopHub Leads" hai
    sheet = client.open("RoopHub Leads").sheet1 
    print("✅ Google Sheets Connection Successful!")
except Exception as e:
    print(f"❌ Connection Error: {e}")

# --- 2. AAPKA PRODUCT DATABASE (Safe & Unchanged) ---
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

# --- 3. AAPKE SMART FUNCTIONS (No Changes) ---
def find_product(user_msg):
    user_msg = user_msg.lower()
    for key in products:
        if key in user_msg: return products[key]
        words = user_msg.split()
        for w in words:
            if w in key: return products[key]
    return None

def ai_reply(message, lang):
    msg = message.lower()
    product = find_product(msg)
    if product:
        return f"{product['name']}\n\n{product['desc']}\n\nBenefits:\n- {product['benefit']}\n\nUse:\n- {product['use']}\n\nResult:\n- {product['result']}\n\nYe product kaafi log use kar rahe hain aur positive response mil raha hai.\nAap 'Check Offer' button se iska detail dekh sakte ho."

    if lang == "hi":
        if "hello" in msg: return "Namaste 🙏 aapka swagat hai!"
        elif "problem" in msg: return "Koi baat nahi 👍 apni problem batayein."
        # ... (baaki hi logic same rahega)
        else: return "Main aapki help ke liye hoon 😊"
    else:
        if "hello" in msg: return "Hello 👋 welcome!"
        # ... (baaki en logic same rahega)
        else: return "I am here to help you 😊"

# --- 4. UPDATED ROUTES ---
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "online",
        "message": "RoopHub Backend is running successfully!",
        "endpoint": "/chat"
    })

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    if not data or "message" not in data:
        return jsonify({"reply": "Invalid request"}), 400
    
    user_msg = data.get("message", "")
    
    # User ka message Google Sheet mein save karna
    try:
        sheet.append_row([user_msg]) 
    except:
        pass

    reply = ai_reply(user_msg, data.get("lang", "en"))
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)