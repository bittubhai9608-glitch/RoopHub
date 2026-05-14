from pathlib import Path
import re
path = Path('NeuroSergelLandingPage.html')
text = path.read_text(encoding='utf-8')
new_css = '''<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
}
html {
    scroll-behavior: smooth;
}
body {
    min-height: 100vh;
    background: linear-gradient(180deg, #eef6ff 0%, #f8fafc 55%, #ffffff 100%);
    color: #1f2937;
    line-height: 1.6;
}
img {
    max-width: 100%;
    display: block;
}
a {
    color: inherit;
    text-decoration: none;
}
button {
    font: inherit;
}
header {
    position: relative;
    text-align: center;
    padding: 52px 20px 42px;
    color: #f8fafc;
    background: radial-gradient(circle at top left, rgba(56,189,248,0.18), transparent 28%),
                linear-gradient(180deg, #0f172a 0%, #152b4f 100%);
    overflow: hidden;
}
header::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top right, rgba(59,130,246,0.15), transparent 25%),
                radial-gradient(circle at 80% 90%, rgba(99,102,241,0.12), transparent 20%);
    pointer-events: none;
}
.header-auth-btn {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 1;
    background: #ffffff;
    color: #0f172a;
    border: 1px solid rgba(255,255,255,0.32);
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 700;
    box-shadow: 0 18px 40px rgba(15,23,42,0.12);
    transition: transform 0.3s ease, background 0.3s ease;
}
.header-auth-btn:hover {
    transform: translateY(-2px);
    background: #f8fafc;
}
.hero-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(8px);
    padding: 8px 18px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 18px;
    border: 1px solid rgba(255,255,255,0.22);
    color: #f8fafc;
}
header h1 {
    font-size: clamp(2.8rem, 6vw, 4.4rem);
    font-weight: 800;
    margin-bottom: 16px;
    letter-spacing: -0.05em;
    line-height: 1.02;
    background: linear-gradient(180deg, #ffffff, #cbd5e1);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
}
header p.sub-headline {
    max-width: 760px;
    margin: 0 auto 28px;
    color: rgba(248,248,248,0.9);
    font-size: 1.1rem;
}
.cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 34px;
    color: #ffffff;
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-radius: 999px;
    font-weight: 800;
    font-size: 15px;
    text-transform: uppercase;
    box-shadow: 0 20px 55px rgba(59,130,246,0.24);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 28px 60px rgba(59,130,246,0.32);
}
.trust-bar {
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
}
.rating-text {
    font-size: 15px;
    font-weight: 700;
    color: #e2e8f0;
}
.trusted-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(59,130,246,0.14);
    color: #bfdbfe;
    padding: 8px 16px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
}
.timer {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 22px auto 16px;
    max-width: 720px;
    padding: 12px 18px;
    background: #ffffff;
    border: 1px solid #dbeafe;
    border-radius: 999px;
    color: #0f172a;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.6px;
    box-shadow: 0 10px 30px rgba(15,23,42,0.08);
}
#countdown {
    background: #1d4ed8;
    color: #ffffff;
    padding: 4px 10px;
    border-radius: 999px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
}
.live {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 32px;
    padding: 10px 18px;
    background: #eff6ff;
    color: #1d4ed8;
    border: 1px solid #bfdbfe;
    border-radius: 999px;
    font-weight: 700;
    font-size: 13px;
    box-shadow: 0 12px 24px rgba(59,130,246,0.08);
}
.container {
    max-width: 1180px;
    margin: 0 auto;
    padding: 20px;
    width: 100%;
}
.slider {
    position: relative;
    background: rgba(255,255,255,0.95);
    padding: 24px;
    border-radius: 28px;
    box-shadow: 0 35px 90px rgba(15,23,42,0.12);
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 340px;
}
.slider::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 10% 20%, rgba(59,130,246,0.08), transparent 24%),
                radial-gradient(circle at 90% 20%, rgba(34,197,94,0.08), transparent 18%);
    pointer-events: none;
}
.slider img {
    width: auto;
    max-width: 100%;
    max-height: 320px;
    border-radius: 22px;
    position: relative;
    z-index: 1;
}
.prev,
.next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(15,23,42,0.18);
    color: #ffffff;
    border: none;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    z-index: 2;
    transition: background 0.3s ease;
}
.prev:hover,
.next:hover {
    background: rgba(15,23,42,0.3);
}
.prev { left: 18px; }
.next { right: 18px; }
.box {
    background: #ffffff;
    padding: 26px;
    margin: 30px auto;
    border-radius: 24px;
    box-shadow: 0 24px 60px rgba(15,23,42,0.08);
}
.specs,
.description,
.faq-section,
.buy-section,
.buy-section-sm,
.review-box {
    background: #ffffff;
    border-radius: 20px;
    box-shadow: 0 18px 44px rgba(15,23,42,0.06);
}
.specs {
    padding: 30px;
    margin: 30px auto;
    border: 1px solid #e2e8f0;
}
.specs h2 {
    font-size: 20px;
    color: #0f172a;
    margin-bottom: 22px;
    border-left: 5px solid #3b82f6;
    padding-left: 16px;
}
.specs-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
}
.specs-table tr {
    transition: all 0.2s ease;
}
.specs-table tr:nth-child(even) { background-color: #f8fafc; }
.specs-table tr:hover { background-color: #eef2ff; }
.specs-table td {
    padding: 14px 16px;
    color: #334155;
    vertical-align: top;
    font-size: 14px;
    border-bottom: 1px solid #e2e8f0;
}
.spec-label {
    font-weight: 700;
    color: #1e293b;
    width: 36%;
}
.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    background: #000000;
    border-radius: 20px;
    box-shadow: 0 24px 60px rgba(15,23,42,0.1);
}
.video-wrapper iframe,
.video-placeholder {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 20px;
}
.video-placeholder {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.video-placeholder:hover {
    opacity: 0.9;
}
.video-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
}
.play-button {
    position: absolute;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: rgba(59,130,246,0.88);
    color: #ffffff;
    font-size: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: transform 0.3s ease;
}
.video-placeholder:hover .play-button {
    transform: scale(1.05);
}
.video-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-top: 18px;
    flex-wrap: wrap;
}
.video-controls .cta-btn {
    flex: 1;
    min-width: 160px;
    max-width: 240px;
    background: #1d4ed8;
    font-size: 14px;
}
.video-controls .cta-btn:last-child {
    background: #475569;
}
.description {
    padding: 28px;
    margin: 25px auto;
    border: 1px solid #e2e8f0;
}
.description h2 {
    font-size: 20px;
    color: #0f172a;
    margin-bottom: 20px;
    border-left: 5px solid #10b981;
    padding-left: 14px;
}
.benefit-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 14px;
}
.benefit-card {
    background: #f8fafc;
    padding: 18px 20px;
    border-radius: 16px;
    border: 1px solid #dbeafe;
    color: #0f172a;
    font-size: 15px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.benefit-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 38px rgba(15,23,42,0.08);
    border-color: #bfdbfe;
}
.badges {
    overflow: hidden;
    padding: 14px 0;
    white-space: nowrap;
    margin: 30px 0;
    background: transparent;
}
.badge-track {
    display: flex;
    width: max-content;
    gap: 10px;
    animation: scrollBadges 24s linear infinite;
}
.badge-item {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    padding: 10px 16px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    color: #334155;
    box-shadow: 0 10px 22px rgba(15,23,42,0.05);
    white-space: nowrap;
}
.buy-section {
    text-align: center;
    padding: 22px 18px;
    margin: 24px auto 36px;
    border: 1px solid #d1d5db;
    width: min(100%, 640px);
}
.buy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 16px 28px;
    background: linear-gradient(135deg, #10b981 0%, #047857 100%);
    color: #ffffff;
    border-radius: 999px;
    border: none;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.5px;
    box-shadow: 0 20px 45px rgba(16,185,129,0.2);
    transition: transform 0.3s ease, background 0.3s ease;
}
.buy-btn:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #0f766e 0%, #0f5850 100%);
}
.buy-section-sm {
    text-align: center;
    padding: 16px 18px;
    margin: 20px auto;
    border: 1px solid #dbeafe;
    max-width: 360px;
}
.buy-btn-sm {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 22px;
    background: linear-gradient(135deg, #10b981 0%, #047857 100%);
    color: #ffffff;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 700;
}
@keyframes heartBeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.05); }
    28% { transform: scale(1); }
    42% { transform: scale(1.05); }
    70% { transform: scale(1); }
}
.buy-btn, .buy-btn-sm {
    animation: heartBeat 2.5s ease-in-out infinite;
}
.footer {
    background: #0f172a;
    color: #cbd5e1;
    text-align: center;
    padding: 28px 16px;
    margin-top: 30px;
}
.social-icons {
    display: flex;
    justify-content: center;
    gap: 18px;
    flex-wrap: wrap;
    margin-bottom: 22px;
}
.social-link {
    color: #93c5fd;
    font-size: 22px;
    transition: transform 0.25s ease, color 0.25s ease;
}
.social-link:hover {
    color: #ffffff;
    transform: translateY(-3px);
}
.bottom-menu {
    display: flex;
    justify-content: center;
    gap: 14px;
    flex-wrap: wrap;
    margin-bottom: 22px;
}
.bottom-menu button {
    background: none;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    transition: color 0.3s ease;
}
.bottom-menu button:hover {
    color: #ffffff;
    text-decoration: underline;
}
.footer p {
    font-size: 12px;
    color: #94a3b8;
    max-width: 780px;
    margin: 0 auto;
}
.review-stats {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 25px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e2e8f0;
}
.big-rating {
    font-size: 54px;
    font-weight: 800;
    color: #0f172a;
}
.rating-bars {
    flex: 1;
}
.bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    margin-bottom: 8px;
}
.bar-bg {
    flex: 1;
    height: 10px;
    background: #e2e8f0;
    border-radius: 999px;
    overflow: hidden;
}
.bar-fill {
    height: 100%;
    background: #f59e0b;
    border-radius: 999px;
    transition: width 1s ease-in-out;
}
.review-card {
    background: #f8fafc;
    border-radius: 20px;
    padding: 22px;
    margin-bottom: 16px;
    border: 1px solid #e2e8f0;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
}
.review-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(15,23,42,0.12);
}
.card-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 14px;
}
.user-avatar {
    width: 44px;
    height: 44px;
    background: #e0efff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #2563eb;
}
.verified-badge {
    color: #0f766e;
    font-size: 12px;
    font-weight: 700;
}
.review-text {
    font-size: 15px;
    line-height: 1.75;
    color: #334155;
}
.faq-section {
    padding: 30px 24px;
    margin: 26px auto;
    border: 1px solid #e2e8f0;
}
.faq-section h2 {
    font-size: 26px;
}
.faq-item {
    margin-bottom: 12px;
    border-radius: 16px;
    overflow: hidden;
}
.faq-question {
    padding: 18px 20px;
}
.faq-answer {
    background: #eef2ff;
    color: #1e3a8a;
}
.faq-answer p {
    padding: 18px 20px;
}
.comparison-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
    margin-top: 30px;
}
.comp-card {
    padding: 28px 24px;
}
.comp-card h3 {
    margin-bottom: 18px;
}
.comp-card li {
    background: #f8fafc;
    padding: 12px 14px;
    border-radius: 14px;
    transition: background 0.2s ease, transform 0.2s ease;
}
.comp-card li:hover {
    background-color: #eff6ff;
}
.disclaimer-box {
    padding: 0 10px;
}
.modal {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.72);
    z-index: 9999;
    display: none;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.modal.active {
    display: flex;
}
.modal-content {
    position: relative;
    width: 100%;
    max-width: 720px;
    background: #ffffff;
    border-radius: 28px;
    padding: 32px;
    box-shadow: 0 40px 110px rgba(15,23,42,0.18);
}
.auth-modal-content {
    max-width: 520px;
}
.close {
    position: absolute;
    right: 18px;
    top: 18px;
    width: 40px;
    height: 40px;
    background: rgba(15,23,42,0.08);
    color: #0f172a;
    border-radius: 50%;
    border: none;
    font-size: 22px;
    display: grid;
    place-items: center;
    cursor: pointer;
}
.auth-tabs {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-bottom: 24px;
}
.auth-tabs h3 {
    padding: 14px 16px;
    text-align: center;
    border-radius: 999px;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    color: #475569;
    cursor: pointer;
}
.auth-tabs h3.active-tab {
    background: #2563eb;
    color: #ffffff;
    border-color: #2563eb;
}
.auth-form {
    display: grid;
    gap: 16px;
}
.input-group label {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #334155;
}
.input-group input,
.input-group select,
.input-group textarea {
    width: 100%;
    padding: 14px 16px;
    border-radius: 16px;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    color: #0f172a;
}
.input-group input:focus,
.input-group select:focus,
.input-group textarea:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 4px rgba(37,99,235,0.12);
}
.auth-btn {
    padding: 14px 18px;
    border-radius: 16px;
    border: none;
    background: #2563eb;
    color: #ffffff;
    font-weight: 700;
}
.social-login-divider {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #64748b;
    font-size: 13px;
}
.social-login-divider::before,
.social-login-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e2e8f0;
}
.social-btn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    border-radius: 16px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    color: #0f172a;
}
.google-btn {
    background: #ffffff;
}
.facebook-btn {
    background: #1877f2;
    color: #ffffff;
    border-color: #1877f2;
}
.social-btn img {
    width: 18px;
    height: 18px;
}
@media (max-width: 900px) {
    header {
        padding: 42px 18px 34px;
    }
    header h1 {
        font-size: 3rem;
    }
    .comparison-grid {
        grid-template-columns: 1fr;
    }
    .container {
        padding: 18px 16px;
    }
    .slider {
        min-height: 260px;
        padding: 18px;
    }
    .review-stats {
        flex-direction: column;
        align-items: stretch;
        text-align: center;
    }
    .rating-bars {
        width: 100%;
    }
    .video-controls {
        flex-direction: column;
    }
    .buy-btn,
    .buy-btn-sm {
        width: 100%;
    }
}
@media (max-width: 640px) {
    .header-auth-btn {
        right: 14px;
        top: 14px;
        padding: 10px 14px;
    }
    .hero-badge {
        font-size: 10px;
        padding: 6px 14px;
    }
    .cta-btn {
        width: 100%;
        padding: 16px 22px;
    }
    .trust-bar {
        gap: 10px;
    }
    .timer,
    .live {
        font-size: 12px;
        padding: 10px 14px;
    }
    .slider img {
        max-height: 260px;
    }
    .faq-question,
    .faq-answer p,
    .benefit-card,
    .comp-card,
    .specs,
    .description,
    .buy-section,
    .box {
        padding-left: 18px;
        padding-right: 18px;
    }
    .bottom-menu {
        gap: 10px;
    }
    .bottom-menu button {
        font-size: 12px;
    }
}
</style>'''
new_text = re.sub(r'<style>.*?</style>', new_css, text, count=1, flags=re.S)
path.write_text(new_text, encoding='utf-8')
''