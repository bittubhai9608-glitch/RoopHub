import os
import json
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_mail import Mail, Message
import difflib
from datetime import datetime
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# template_folder='.' set karne se Flask templates ko root directory mein dhundhne lagega
app = Flask(__name__, template_folder='.')
CORS(app)

# --- 0. EMAIL CONFIGURATION ---
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your-email@gmail.com' # अपना ईमेल यहाँ डालें
app.config['MAIL_PASSWORD'] = 'your-app-password'    # अपना Gmail App Password यहाँ डालें
mail = Mail(app)

# --- 1. GOOGLE SHEETS SETUP ---
scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]

# Initialize sheet, auth_sheet, review_sheet to None
sheet = None
review_sheet = None
contact_sheet = None # Add contact_sheet
spreadsheet = None

# Render dashboard se secret uthana
# Aapne bataya ki environment variable ka naam 'Signin/Signup' hai
json_info = os.environ.get('Signin/Signup') or os.environ.get('GOOGLE_JSON_DATA')

try:
    if json_info:
        info = json.loads(json_info)
        creds = ServiceAccountCredentials.from_json_keyfile_dict(info, scope)
    else:
        creds = ServiceAccountCredentials.from_json_keyfile_name('creds.json', scope)
    
    client = gspread.authorize(creds)
    spreadsheet = client.open_by_key("1A2XLLqTt6X_8HxZvrU_EAAgmzjz9AZz2QRSsapLoBa4")

    # 2. Review Sheet Setup
    try:
        review_sheet = spreadsheet.worksheet("Reviews")
    except gspread.exceptions.WorksheetNotFound:
        review_sheet = spreadsheet.add_worksheet(title="Reviews", rows="1000", cols="10")

    if not review_sheet.get_all_values():
        review_sheet.append_row(["Name", "Email", "Rating", "Comment", "Entry Type", "Product", "Timestamp"])

    # 3. Contact Sheet Setup
    try:
        contact_sheet = spreadsheet.worksheet("Contact_Messages")
    except gspread.exceptions.WorksheetNotFound:
        contact_sheet = spreadsheet.add_worksheet(title="Contact_Messages", rows="1000", cols="10")

    if not contact_sheet.get_all_values():
        contact_sheet.append_row(["Name", "Email", "Subject", "Message", "Timestamp"])

    sheet = spreadsheet.get_worksheet(0) # Default sheet for general logging
    print("✅ Database Linked: 'Reviews', and 'Contact_Messages' sheets are ready.")

except Exception as e:
    print(f"❌ Google Sheets Connection Error: {e}")


# --- 2. AAPKA PRODUCT DATABASE (No changes) ---
products = {
    "neuro serge": {
        "name": "Neuro Serge",
        "desc": "a premium brain booster designed to improve memory and mental focus naturally.",
        "benefits": "It helps increase concentration, sharpens mental clarity, and supports overall brain health.",
        "usage": "For best results, take it daily as directed on the label.",
        "results": "Most users notice a positive difference in focus and energy within 2 to 4 weeks."
    },
    "prostavive": {
        "name": "ProstaVive Vitality",
        "desc": "a high-performance supplement for men's health designed to optimize prostate function and natural vitality.",
        "benefits": "It supports healthy inflammatory response, improves physical stamina, and boosts daily energy using clinical-grade botanical extracts.",
        "usage": "Consistency is key; follow the recommended daily dosage.",
        "results": "Benefits are usually felt gradually over a few weeks of regular use."
    },
    "alpha tonic": {
        "name": "Alpha Tonic Elite",
        "desc": "a premium physical performance booster for men looking to improve strength and stamina.",
        "benefits": "It supports healthy circulation, increases physical energy, and helps in lean muscle development using natural minerals.",
        "usage": "Mix one scoop with water or your favorite beverage daily.",
        "results": "Most users report significant improvements in energy and strength within 3 to 5 weeks."
    },
    "citrusburn": {
        "name": "CitrusBurn",
        "desc": "a natural fat burner that uses citrus extracts to speed up your metabolism.",
        "benefits": "It supports healthy weight loss, increases energy, and helps burn calories faster.",
        "usage": "Take it consistently alongside a healthy diet for maximum impact.",
        "results": "Visible changes in energy and weight are often seen within 30 days."
    },
    "keyslim": {
        "name": "KeySlim Drops",
        "desc": "a specialized liquid formula designed to help you lose weight by controlling hunger.",
        "benefits": "It helps stop food cravings, boosts metabolism, and is very easy to use.",
        "usage": "Just take a few drops daily as per the instructions.",
        "results": "Best results are achieved with regular use over 2 to 3 months."
    },
    "visiflora": {
        "name": "Visiflora",
        "desc": "a natural eye health supplement created to support and protect your vision.",
        "benefits": "It helps provide sharper vision, reduces eye strain from screens, and supports long-term eye health.",
        "usage": "Simply take the recommended amount every day.",
        "results": "Many users report clearer vision and less eye fatigue after one month."
    },
    "purisaki": {
        "name": "Purisaki Patches",
        "desc": "natural healing patches designed to support skin health and detoxification.",
        "benefits": "They help improve skin texture, support natural body healing, and promote better wellness.",
        "usage": "Apply the patches to the skin as instructed for continuous support.",
        "results": "Users feel refreshed and notice better skin quality with consistent use."
    },
    "igenics": {
        "name": "iGenics",
        "desc": "a high-quality vision support formula made with natural antioxidants.",
        "benefits": "It protects eye cells from damage and helps maintain clear, healthy vision as you age.",
        "usage": "Take it daily to provide your eyes with essential nutrients.",
        "results": "It provides long-term support for healthy eyes and vision clarity."
    }
}

category_triggers = {
    "weight": "For effective weight loss, we recommend 'CitrusBurn' or 'KeySlim Drops'. Both are very popular and natural.",
    "skin": "For skin care and body detox, 'Purisaki Patches' are an excellent choice.",
    "eye": "To support your vision and eye health, you can use 'Visiflora' or 'iGenics' capsules.",
    "brain": "For better memory and sharper focus, 'Neuro Serge' is our most recommended product.",
    "men": "For men's health and daily vitality, we recommend 'ProstaVive Vitality' or 'Alpha Tonic Elite'. Both are highly effective for natural performance."
}

def find_product(user_msg):
    words = user_msg.lower().split()
    product_keys = list(products.keys())
    
    # 1. Direct check (Full match)
    for key in products:
        if key in user_msg.lower() or key.replace(" ", "") in user_msg.lower().replace(" ", ""): 
            return products[key]
            
    # 2. Fuzzy check (Handling typos)
    all_variations = product_keys + [k.replace(" ", "") for k in product_keys]
    for word in words:
        matches = difflib.get_close_matches(word, all_variations, n=1, cutoff=0.7)
        if matches:
            matched_val = matches[0]
            # Find the original key if a flat variation was matched
            for original_key in products:
                if original_key == matched_val or original_key.replace(" ", "") == matched_val:
                    return products[original_key]
    return None

def ai_reply(message, lang):
    msg = message.lower()
    product = find_product(msg)
    
    # User happiness focus: Agree, Smile, Laughing suggestions
    happy_suggestions = ["I Agree! 🤝", "Nice! 😊", "Haha! 😂", "Tell me more! ✨"]

    if "i agree" in msg or "🤝" in msg:
        return "Glad we are on the same page! 🤝 We always focus on quality and honesty in all our recommendations. ✨", happy_suggestions
    if "nice" in msg or "😊" in msg:
        return "Thank you! 😊 We are happy to know that you liked our service. Please let us know if you need more info! ✨", happy_suggestions
    if "haha" in msg or "😂" in msg:
        return "Haha! 😂 Keep smiling! Good health and happiness always go hand in hand! 🌟", happy_suggestions
    if "tell me more" in msg or "✨" in msg:
        return "Certainly! ✨ At RoopHub, we provide the best health supplements made from 100% natural ingredients. What else would you like to know? 🤔", happy_suggestions

    if product:
        reply = f"{product['name']} is {product['desc']} {product['benefits']} {product['usage']} {product['results']}"
        return reply, happy_suggestions

    # Detect category from keywords
    category_keys = list(category_triggers.keys())
    for key, text in category_triggers.items():
        # Direct check
        if key in msg: return text, happy_suggestions
        # Fuzzy check for category typos (e.g., 'weightt')
        if difflib.get_close_matches(msg, [key], n=1, cutoff=0.8):
            return text, happy_suggestions

    if lang == "hi": # Even if detected Hindi, we can reply in English or Mixed
        if any(x in msg for x in ["hello", "hi", "namaste", "hey"]): 
            return "Hello! 🙏 Welcome to RoopHub AI Assistant. How can I help you find the right supplement today?", happy_suggestions
        return "I can help you better if you mention a specific product or health category like 'Weight Loss' or 'Focus'.", happy_suggestions
    else:
        if "hello" in msg: 
            return "Hello 👋 Welcome! Which product are you interested in today?", happy_suggestions
        return "I am here to assist you with natural health supplements. Feel free to ask about any product or health goal!", happy_suggestions

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
    
    # Chat history logging (Safely appending)
    try: # Add a check for 'sheet' before attempting to append
        if sheet:
            sheet.append_row([user_msg, data.get("lang", "en"), datetime.now().strftime("%Y-%m-%d %H:%M:%S")]) 
    except Exception as e:
        print(f"Log Error: {e}")
        pass

    reply, suggestions = ai_reply(user_msg, data.get("lang", "en"))
    return jsonify({"reply": reply, "suggestions": suggestions})

@app.route("/submit-review", methods=["POST"])
def submit_review():
    data = request.json
    if not data:
        return jsonify({"status": "error"}), 400
    
    try:
        # Safely Appending Review: Name, Email, Rating, Comment, Type, Product, Time
        row = [
            data.get("name"), 
            data.get("email"), 
            data.get("rating"), 
            data.get("comment"), 
            "REVIEW_ENTRY", 
            data.get("product", "General"),
            datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        ]
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
        if not target: return jsonify([])
        all_data = target.get_all_values()
        if len(all_data) <= 1: return jsonify([]) # Only header exists

        reviews = []
        for r in all_data[1:]: # Skip header row to prevent errors
            if len(r) >= 5 and (r[4] == "REVIEW_ENTRY" or review_sheet):
                try:
                    reviews.append({
                        "name": r[0],
                        "rating": int(r[2]) if str(r[2]).isdigit() else 5,
                        "comment": r[3]
                    })
                except: continue
        return jsonify(reviews)
    except:
        return jsonify([])

@app.route("/send-email", methods=["POST"])
def send_email():
    try:
        # JSON के बजाय Form data का उपयोग करें क्योंकि इसमें फाइल्स होती हैं
        name = request.form.get("name")
        email = request.form.get("email")
        subject = request.form.get("subject")
        message = request.form.get("message")
        
        # फाइल प्राप्त करें
        files = request.files.getlist("attachments")

        # ईमेल तैयार करें
        msg = Message(subject=f"New Contact: {subject}",
                      sender=app.config['MAIL_USERNAME'],
                      recipients=['your-destination-email@gmail.com']) # जहाँ ईमेल प्राप्त करना है
        
        # Plain text fallback (अगर HTML लोड न हो)
        msg.body = f"New message from {name} ({email}): {message}"
        
        # HTML Template Render करें
        msg.html = render_template('contact_email.html', 
                                   name=name, 
                                   email=email, 
                                   subject=subject, 
                                   message=message)

        # अटैचमेंट जोड़ें (यदि फाइल मौजूद है)
        for file in files:
            if file.filename:
                msg.attach(
                    filename=file.filename,
                    content_type=file.content_type,
                    data=file.read()
                )

        mail.send(msg)

        # Store contact message in Google Sheet
        if contact_sheet:
            contact_sheet.append_row([name, email, subject, message, datetime.now().strftime("%Y-%m-%d %H:%M:%S")])
        else:
            print("Warning: Contact sheet not available for logging.")
        return jsonify({"status": "success"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)