import { useState } from "react";

// ─── Inline Styles & Theme ────────────────────────────────────────────────────
const theme = {
  navy: "#0F2C59",
  blue: "#1A56A0",
  accent: "#F59E0B",
  teal: "#0D9488",
  coral: "#EF4444",
  green: "#10B981",
  purple: "#8B5CF6",
  pink: "#EC4899",
  white: "#FFFFFF",
  offWhite: "#F8FAFF",
  light: "#E8F0FE",
  dark: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
};

const globalStyle = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Segoe UI', system-ui, sans-serif; background: ${theme.offWhite}; color: ${theme.dark}; }
  button { cursor: pointer; font-family: inherit; }
  input, textarea, select { font-family: inherit; }

  .app-container { display: flex; min-height: 100vh; }

  /* Sidebar */
  .sidebar {
    width: 240px; min-height: 100vh; background: ${theme.navy};
    display: flex; flex-direction: column; position: fixed; left: 0; top: 0; z-index: 100;
  }
  .sidebar-logo {
    padding: 24px 20px 16px; border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .sidebar-logo h1 { font-size: 16px; color: ${theme.accent}; font-weight: 700; line-height: 1.3; }
  .sidebar-logo p { font-size: 11px; color: rgba(255,255,255,0.45); margin-top: 2px; }
  .sidebar-nav { flex: 1; padding: 12px 0; overflow-y: auto; }
  .nav-item {
    display: flex; align-items: center; gap: 12px; padding: 11px 20px;
    cursor: pointer; color: rgba(255,255,255,0.65); font-size: 14px; font-weight: 500;
    transition: all 0.15s; border: none; background: none; width: 100%; text-align: left;
  }
  .nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
  .nav-item.active { background: ${theme.blue}; color: #fff; }
  .nav-item .nav-icon { font-size: 17px; width: 20px; text-align: center; }
  .sidebar-footer {
    padding: 16px 20px; border-top: 1px solid rgba(255,255,255,0.1);
    font-size: 11px; color: rgba(255,255,255,0.3);
  }

  /* Main content */
  .main { margin-left: 240px; flex: 1; }
  .topbar {
    background: ${theme.white}; border-bottom: 1px solid ${theme.border};
    padding: 16px 32px; display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 50;
  }
  .topbar-title { font-size: 20px; font-weight: 700; color: ${theme.navy}; }
  .topbar-sub { font-size: 13px; color: ${theme.muted}; margin-top: 1px; }
  .topbar-actions { display: flex; gap: 10px; align-items: center; }
  .page-content { padding: 28px 32px; }

  /* Cards */
  .card {
    background: ${theme.white}; border-radius: 12px;
    border: 1px solid ${theme.border}; padding: 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.06);
  }
  .card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
  .card-title { font-size: 16px; font-weight: 700; color: ${theme.navy}; }
  .card-sub { font-size: 13px; color: ${theme.muted}; margin-top: 2px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
  .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 9px 18px; border-radius: 8px; font-size: 14px; font-weight: 600;
    border: none; transition: all 0.15s;
  }
  .btn-primary { background: ${theme.navy}; color: #fff; }
  .btn-primary:hover { background: ${theme.blue}; }
  .btn-accent { background: ${theme.accent}; color: ${theme.navy}; }
  .btn-accent:hover { background: #D97706; }
  .btn-outline { background: transparent; color: ${theme.navy}; border: 1.5px solid ${theme.border}; }
  .btn-outline:hover { border-color: ${theme.navy}; background: ${theme.light}; }
  .btn-danger { background: ${theme.coral}; color: #fff; }
  .btn-danger:hover { background: #DC2626; }
  .btn-success { background: ${theme.green}; color: #fff; }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-xs { padding: 4px 9px; font-size: 11px; border-radius: 6px; }

  /* Form elements */
  .form-group { margin-bottom: 16px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: ${theme.dark}; margin-bottom: 6px; }
  .form-input {
    width: 100%; padding: 10px 14px; border-radius: 8px;
    border: 1.5px solid ${theme.border}; font-size: 14px; color: ${theme.dark};
    background: ${theme.white}; outline: none; transition: border-color 0.15s;
  }
  .form-input:focus { border-color: ${theme.blue}; }
  .form-textarea { resize: vertical; min-height: 100px; }
  .form-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; padding-right: 36px; }
  .form-hint { font-size: 12px; color: ${theme.muted}; margin-top: 4px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  /* Star Rating */
  .star-row { display: flex; gap: 4px; }
  .star-btn { background: none; border: none; font-size: 28px; cursor: pointer; transition: transform 0.1s; }
  .star-btn:hover { transform: scale(1.2); }
  .star-display { display: flex; gap: 2px; }
  .star-sm { font-size: 14px; }
  .star-md { font-size: 18px; }

  /* Reviews */
  .review-card {
    background: ${theme.white}; border: 1px solid ${theme.border}; border-radius: 12px;
    padding: 20px; margin-bottom: 14px; transition: box-shadow 0.15s;
  }
  .review-card:hover { box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
  .review-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 10px; }
  .reviewer-info { display: flex; align-items: center; gap: 12px; }
  .avatar {
    width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-weight: 700; font-size: 15px; color: #fff; flex-shrink: 0;
  }
  .reviewer-name { font-weight: 700; font-size: 14px; color: ${theme.dark}; }
  .reviewer-meta { font-size: 12px; color: ${theme.muted}; margin-top: 2px; }
  .review-body { font-size: 14px; color: ${theme.dark}; line-height: 1.6; margin: 10px 0; }
  .review-photos { display: flex; gap: 8px; flex-wrap: wrap; margin: 10px 0; }
  .review-photo {
    width: 70px; height: 70px; border-radius: 8px; object-fit: cover;
    border: 2px solid ${theme.border}; cursor: pointer;
  }
  .review-photo-placeholder {
    width: 70px; height: 70px; border-radius: 8px; background: ${theme.light};
    display: flex; align-items: center; justify-content: center; font-size: 22px; border: 2px solid ${theme.border};
  }
  .review-footer { display: flex; align-items: center; gap: 14px; padding-top: 10px; border-top: 1px solid ${theme.border}; }
  .helpful-btn {
    background: none; border: 1.5px solid ${theme.border}; border-radius: 6px;
    padding: 4px 12px; font-size: 12px; color: ${theme.muted}; cursor: pointer;
    display: flex; align-items: center; gap: 5px; transition: all 0.15s;
  }
  .helpful-btn:hover, .helpful-btn.active { border-color: ${theme.blue}; color: ${theme.blue}; background: ${theme.light}; }
  .verified-badge {
    display: inline-flex; align-items: center; gap: 4px; font-size: 11px;
    color: ${theme.green}; font-weight: 600;
  }

  /* Seller response */
  .seller-response {
    background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px;
    padding: 14px; margin-top: 12px;
  }
  .seller-response-header { font-size: 12px; font-weight: 700; color: ${theme.green}; margin-bottom: 6px; }
  .seller-response-body { font-size: 13px; color: ${theme.dark}; line-height: 1.5; }

  /* Q&A */
  .qa-item {
    background: ${theme.white}; border: 1px solid ${theme.border}; border-radius: 10px;
    padding: 16px; margin-bottom: 12px;
  }
  .qa-question { display: flex; gap: 10px; margin-bottom: 10px; }
  .qa-q-label {
    background: ${theme.navy}; color: #fff; font-size: 11px; font-weight: 700;
    padding: 3px 8px; border-radius: 4px; height: fit-content; flex-shrink: 0;
  }
  .qa-a-label {
    background: ${theme.accent}; color: ${theme.navy}; font-size: 11px; font-weight: 700;
    padding: 3px 8px; border-radius: 4px; height: fit-content; flex-shrink: 0;
  }
  .qa-text { font-size: 14px; color: ${theme.dark}; line-height: 1.5; }
  .qa-meta { font-size: 12px; color: ${theme.muted}; margin-top: 4px; }
  .qa-answer { display: flex; gap: 10px; padding-top: 10px; border-top: 1px dashed ${theme.border}; }

  /* Badges & Tags */
  .badge {
    display: inline-flex; align-items: center; gap: 4px; padding: 3px 10px;
    border-radius: 20px; font-size: 12px; font-weight: 600;
  }
  .badge-blue { background: ${theme.light}; color: ${theme.blue}; }
  .badge-green { background: #D1FAE5; color: #065F46; }
  .badge-red { background: #FEE2E2; color: #991B1B; }
  .badge-amber { background: #FEF3C7; color: #92400E; }
  .badge-purple { background: #EDE9FE; color: #5B21B6; }
  .badge-gray { background: ${theme.border}; color: ${theme.muted}; }

  /* Stats row */
  .stat-card {
    background: ${theme.white}; border: 1px solid ${theme.border}; border-radius: 12px;
    padding: 20px; text-align: center;
  }
  .stat-number { font-size: 32px; font-weight: 800; color: ${theme.navy}; }
  .stat-label { font-size: 13px; color: ${theme.muted}; margin-top: 4px; }
  .stat-icon { font-size: 26px; margin-bottom: 8px; }

  /* Rating Distribution */
  .rating-dist-row { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
  .rating-dist-label { font-size: 13px; color: ${theme.dark}; width: 40px; text-align: right; }
  .rating-dist-bar-bg { flex: 1; height: 8px; background: ${theme.border}; border-radius: 4px; overflow: hidden; }
  .rating-dist-bar { height: 100%; border-radius: 4px; background: ${theme.accent}; transition: width 0.4s; }
  .rating-dist-count { font-size: 12px; color: ${theme.muted}; width: 24px; }

  /* Upload zone */
  .upload-zone {
    border: 2px dashed ${theme.border}; border-radius: 10px;
    padding: 32px; text-align: center; cursor: pointer; transition: all 0.15s;
    background: ${theme.offWhite};
  }
  .upload-zone:hover { border-color: ${theme.blue}; background: ${theme.light}; }
  .upload-zone-icon { font-size: 36px; margin-bottom: 10px; }
  .upload-zone-text { font-size: 14px; color: ${theme.muted}; }
  .upload-zone-text strong { color: ${theme.blue}; }
  .uploaded-files { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 14px; }
  .uploaded-file-preview {
    position: relative; width: 80px; height: 80px; border-radius: 8px;
    border: 2px solid ${theme.border}; overflow: hidden; background: ${theme.light};
    display: flex; align-items: center; justify-content: center; font-size: 28px;
  }
  .remove-file-btn {
    position: absolute; top: 2px; right: 2px; background: ${theme.coral};
    color: #fff; border: none; border-radius: 50%; width: 18px; height: 18px;
    font-size: 11px; display: flex; align-items: center; justify-content: center; cursor: pointer;
  }

  /* Admin table */
  .table-wrap { overflow-x: auto; border-radius: 10px; border: 1px solid ${theme.border}; }
  .data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .data-table th {
    background: ${theme.offWhite}; padding: 11px 14px; text-align: left;
    font-weight: 700; color: ${theme.muted}; border-bottom: 1px solid ${theme.border};
    white-space: nowrap;
  }
  .data-table td { padding: 12px 14px; border-bottom: 1px solid ${theme.border}; color: ${theme.dark}; }
  .data-table tr:last-child td { border-bottom: none; }
  .data-table tr:hover td { background: ${theme.offWhite}; }

  /* Filters */
  .filter-bar { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; margin-bottom: 20px; }
  .filter-chip {
    padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
    border: 1.5px solid ${theme.border}; background: ${theme.white}; color: ${theme.muted};
    cursor: pointer; transition: all 0.15s;
  }
  .filter-chip:hover { border-color: ${theme.navy}; color: ${theme.navy}; }
  .filter-chip.active { background: ${theme.navy}; color: #fff; border-color: ${theme.navy}; }
  .search-input-wrap { position: relative; flex: 1; max-width: 320px; }
  .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: ${theme.muted}; font-size: 15px; }
  .search-input { padding-left: 36px !important; }

  /* Toast */
  .toast {
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${theme.dark}; color: #fff; padding: 12px 20px; border-radius: 10px;
    font-size: 14px; display: flex; align-items: center; gap: 10px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2); animation: slideIn 0.25s ease;
  }
  .toast.success { border-left: 4px solid ${theme.green}; }
  .toast.error { border-left: 4px solid ${theme.coral}; }
  @keyframes slideIn { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  /* Modal */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 1000;
    display: flex; align-items: center; justify-content: center; padding: 20px;
  }
  .modal {
    background: ${theme.white}; border-radius: 16px; width: 100%; max-width: 560px;
    max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.25);
  }
  .modal-header {
    padding: 22px 24px 16px; border-bottom: 1px solid ${theme.border};
    display: flex; align-items: center; justify-content: space-between;
  }
  .modal-title { font-size: 18px; font-weight: 700; color: ${theme.navy}; }
  .modal-body { padding: 22px 24px; }
  .modal-footer { padding: 16px 24px; border-top: 1px solid ${theme.border}; display: flex; gap: 10px; justify-content: flex-end; }
  .modal-close { background: none; border: none; font-size: 20px; color: ${theme.muted}; cursor: pointer; }

  /* Divider */
  .divider { height: 1px; background: ${theme.border}; margin: 20px 0; }
  .section-label { font-size: 11px; font-weight: 700; color: ${theme.muted}; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 14px; }

  /* Rating Summary */
  .rating-summary-big { text-align: center; }
  .rating-big-num { font-size: 56px; font-weight: 800; color: ${theme.navy}; line-height: 1; }
  .rating-big-stars { font-size: 22px; margin: 6px 0; }
  .rating-big-count { font-size: 13px; color: ${theme.muted}; }

  /* Sort select inline */
  .sort-select {
    padding: 7px 32px 7px 12px; border-radius: 8px; border: 1.5px solid ${theme.border};
    font-size: 13px; font-weight: 600; color: ${theme.dark}; background: ${theme.white};
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%236B7280' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 10px center; cursor: pointer;
  }
  .progress-bar-wrap { background: ${theme.border}; border-radius: 4px; height: 6px; overflow: hidden; }
  .progress-bar { height: 100%; border-radius: 4px; }

  /* Tabs */
  .tabs { display: flex; gap: 2px; border-bottom: 2px solid ${theme.border}; margin-bottom: 24px; }
  .tab-btn {
    padding: 10px 20px; font-size: 14px; font-weight: 600; color: ${theme.muted};
    border: none; background: none; cursor: pointer; border-bottom: 2px solid transparent;
    margin-bottom: -2px; transition: all 0.15s;
  }
  .tab-btn.active { color: ${theme.navy}; border-bottom-color: ${theme.navy}; }
  .tab-btn:hover:not(.active) { color: ${theme.dark}; }

  /* Empty state */
  .empty-state { text-align: center; padding: 48px 20px; color: ${theme.muted}; }
  .empty-state-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.4; }
  .empty-state-text { font-size: 15px; font-weight: 600; color: ${theme.dark}; }
  .empty-state-sub { font-size: 13px; margin-top: 6px; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: ${theme.border}; border-radius: 10px; }
`;

// ─── Data ────────────────────────────────────────────────────────────────────
const AVATAR_COLORS = [theme.blue, theme.teal, theme.purple, theme.coral, theme.green, theme.pink];

const INITIAL_REVIEWS = [
  {
    id: 1, user: "Priya Sharma", initials: "PS", avatarColor: AVATAR_COLORS[0],
    rating: 5, date: "2025-06-10", verified: true,
    title: "Absolutely love this product!",
    body: "The build quality is exceptional. I've been using it daily for two months and it still looks brand new. Packaging was perfect and delivery was fast.",
    photos: ["📦", "✨"],
    helpful: 24, unhelpful: 1, userVote: null,
    sellerResponse: "Thank you so much, Priya! We're thrilled you're loving the product. We stand behind every item we ship. 🙌",
    sellerResponseDate: "2025-06-11",
    status: "approved",
  },
  {
    id: 2, user: "Arjun Mehta", initials: "AM", avatarColor: AVATAR_COLORS[1],
    rating: 4, date: "2025-06-08", verified: true,
    title: "Great value, minor cosmetic issue",
    body: "Overall really satisfied. The functionality is exactly as described. There was a tiny scratch on the bottom that I only noticed on close inspection — not a dealbreaker at all.",
    photos: ["🔍"],
    helpful: 11, unhelpful: 2, userVote: null,
    sellerResponse: null,
    status: "approved",
  },
  {
    id: 3, user: "Sana Qureshi", initials: "SQ", avatarColor: AVATAR_COLORS[2],
    rating: 3, date: "2025-06-05", verified: false,
    title: "Decent but expected more",
    body: "The product works fine for basic use. However, for the price point, I was expecting better finishing. The instructions manual could also be more detailed.",
    photos: [],
    helpful: 5, unhelpful: 3, userVote: null,
    sellerResponse: null,
    status: "approved",
  },
  {
    id: 4, user: "Ravi Kumar", initials: "RK", avatarColor: AVATAR_COLORS[3],
    rating: 1, date: "2025-06-01", verified: true,
    title: "Stopped working after one week",
    body: "Very disappointed. The product stopped functioning after just 7 days. Customer service hasn't responded to my complaint yet. Would not recommend.",
    photos: ["😤"],
    helpful: 38, unhelpful: 0, userVote: null,
    sellerResponse: "Hi Ravi, we sincerely apologize for this experience. Our support team will reach out within 24 hours with a full replacement or refund.",
    sellerResponseDate: "2025-06-02",
    status: "approved",
  },
  {
    id: 5, user: "Neha Patel", initials: "NP", avatarColor: AVATAR_COLORS[4],
    rating: 5, date: "2025-05-28", verified: true,
    title: "Best purchase this year!",
    body: "I've tried 3 similar products before and this one beats them all. Premium materials, great aesthetics, and it actually does what it promises. Already recommended to my sister.",
    photos: ["🏆", "💯", "🎉"],
    helpful: 19, unhelpful: 0, userVote: null,
    sellerResponse: null,
    status: "approved",
  },
  {
    id: 6, user: "Spam Account", initials: "XX", avatarColor: AVATAR_COLORS[5],
    rating: 5, date: "2025-06-12", verified: false,
    title: "BUY NOW AMAZING DEAL!!!",
    body: "Click the link in my bio for exclusive offers!! This is the best product EVER (not affiliated at all lol).",
    photos: [],
    helpful: 0, unhelpful: 12, userVote: null,
    sellerResponse: null,
    status: "pending",
  },
];

const INITIAL_QA = [
  {
    id: 1, question: "Is this product compatible with both Android and iOS?",
    askedBy: "Vikram Singh", askedDate: "2025-06-09",
    answer: "Yes! It works seamlessly with Android 8.0+ and iOS 13+. We've tested across all major devices.",
    answeredBy: "Store Team", answeredDate: "2025-06-09", likes: 15,
  },
  {
    id: 2, question: "What is the warranty period for this item?",
    askedBy: "Divya Rao", askedDate: "2025-06-07",
    answer: "The product comes with a 12-month manufacturer warranty. Extended 2-year coverage is available at checkout.",
    answeredBy: "Store Team", answeredDate: "2025-06-08", likes: 8,
  },
  {
    id: 3, question: "Can I return it if the colour looks different than photos?",
    askedBy: "Mohit Jain", askedDate: "2025-06-04",
    answer: null, answeredBy: null, answeredDate: null, likes: 3,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StarDisplay({ rating, size = "sm" }) {
  return (
    <span className={`star-display star-${size}`}>
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} style={{ color: s <= rating ? theme.accent : theme.border }}>{s <= rating ? "★" : "☆"}</span>
      ))}
    </span>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="star-row">
      {[1, 2, 3, 4, 5].map(s => (
        <button key={s} className="star-btn" type="button"
          style={{ color: s <= (hover || value) ? theme.accent : theme.border }}
          onMouseEnter={() => setHover(s)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(s)}>★</button>
      ))}
      {value > 0 && (
        <span style={{ fontSize: 14, color: theme.muted, alignSelf: "center", marginLeft: 6 }}>
          {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][value]}
        </span>
      )}
    </div>
  );
}

function Avatar({ initials, color, size = 40 }) {
  return (
    <div className="avatar" style={{ background: color, width: size, height: size, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useState(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); });
  return (
    <div className={`toast ${type}`}>
      <span>{type === "success" ? "✅" : "❌"}</span>
      {message}
    </div>
  );
}

function RatingDist({ reviews }) {
  const counts = [5, 4, 3, 2, 1].map(r => ({ r, count: reviews.filter(v => v.rating === r && v.status === "approved").length }));
  const total = reviews.filter(v => v.status === "approved").length;
  const avg = total ? (reviews.filter(v => v.status === "approved").reduce((a, v) => a + v.rating, 0) / total).toFixed(1) : 0;
  return (
    <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
      <div className="rating-summary-big">
        <div className="rating-big-num">{avg}</div>
        <div className="rating-big-stars"><StarDisplay rating={Math.round(avg)} size="md" /></div>
        <div className="rating-big-count">{total} reviews</div>
      </div>
      <div style={{ flex: 1 }}>
        {counts.map(({ r, count }) => (
          <div className="rating-dist-row" key={r}>
            <span className="rating-dist-label">{r}★</span>
            <div className="rating-dist-bar-bg">
              <div className="rating-dist-bar" style={{ width: total ? `${(count / total) * 100}%` : "0%" }} />
            </div>
            <span className="rating-dist-count">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MODULE 1: Review Form ────────────────────────────────────────────────────
function ReviewForm({ onSubmit, onClose }) {
  const [form, setForm] = useState({ title: "", body: "", rating: 0, name: "", email: "", files: [] });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.rating) e.rating = "Please select a rating";
    if (!form.title.trim()) e.title = "Review title is required";
    if (form.body.trim().length < 20) e.body = "Review must be at least 20 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSubmit({ ...form, rating: form.rating });
  };

  const addFile = () => {
    const emojis = ["📱", "💻", "🎁", "📦", "🔧", "✨", "🏷️"];
    if (form.files.length < 5)
      setForm(f => ({ ...f, files: [...f.files, emojis[Math.floor(Math.random() * emojis.length)]] }));
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div>
            <div className="modal-title">✍️ Write a Review</div>
            <div style={{ fontSize: 12, color: theme.muted, marginTop: 3 }}>Share your honest experience with other buyers</div>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input className="form-input" placeholder="Priya Sharma"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              {errors.name && <div style={{ fontSize: 12, color: theme.coral, marginTop: 4 }}>{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input className="form-input" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              {errors.email && <div style={{ fontSize: 12, color: theme.coral, marginTop: 4 }}>{errors.email}</div>}
            </div>
          </div>

          {/* MODULE 2: Star Rating inside the form */}
          <div className="form-group">
            <label className="form-label">Overall Rating *</label>
            <StarPicker value={form.rating} onChange={r => setForm(f => ({ ...f, rating: r }))} />
            {errors.rating && <div style={{ fontSize: 12, color: theme.coral, marginTop: 4 }}>{errors.rating}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Review Title *</label>
            <input className="form-input" placeholder="Summarize your experience in one line"
              value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            {errors.title && <div style={{ fontSize: 12, color: theme.coral, marginTop: 4 }}>{errors.title}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Detailed Review *</label>
            <textarea className="form-input form-textarea" placeholder="What did you like or dislike? How was the quality? Would you recommend it?"
              value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} />
            <div className="form-hint">{form.body.length} characters (min. 20)</div>
            {errors.body && <div style={{ fontSize: 12, color: theme.coral, marginTop: 4 }}>{errors.body}</div>}
          </div>

          {/* MODULE 3: Photo Upload */}
          <div className="form-group">
            <label className="form-label">📸 Add Photos (optional, max 5)</label>
            <div className="upload-zone" onClick={addFile}>
              <div className="upload-zone-icon">📷</div>
              <div className="upload-zone-text">
                <strong>Click to upload</strong> photos of the product<br />
                <span style={{ fontSize: 12 }}>PNG, JPG up to 10MB each</span>
              </div>
            </div>
            {form.files.length > 0 && (
              <div className="uploaded-files">
                {form.files.map((f, i) => (
                  <div className="uploaded-file-preview" key={i}>
                    <span style={{ fontSize: 32 }}>{f}</span>
                    <button className="remove-file-btn" onClick={() => setForm(fo => ({ ...fo, files: fo.files.filter((_, j) => j !== i) }))}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: theme.light, borderRadius: 8, padding: "10px 14px", fontSize: 12, color: theme.blue }}>
            🔒 Your review will be marked as verified if you've purchased this product. Fake reviews are automatically flagged.
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit Review</button>
        </div>
      </div>
    </div>
  );
}

// ─── MODULE 5: Seller Response Modal ─────────────────────────────────────────
function SellerResponseModal({ review, onSubmit, onClose }) {
  const [response, setResponse] = useState(review.sellerResponse || "");
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <div className="modal-title">🏪 Respond as Seller</div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ background: theme.offWhite, borderRadius: 8, padding: 14, marginBottom: 16, fontSize: 13 }}>
            <div style={{ fontWeight: 700, marginBottom: 4 }}>Responding to: {review.user}</div>
            <div style={{ color: theme.muted }}>"{review.title}"</div>
            <StarDisplay rating={review.rating} size="sm" />
          </div>
          <div className="form-group">
            <label className="form-label">Your Response</label>
            <textarea className="form-input form-textarea" rows={4}
              placeholder="Thank the customer, address their concern, or offer a resolution..."
              value={response} onChange={e => setResponse(e.target.value)} />
            <div className="form-hint">Be professional and helpful. Your response is visible to all shoppers.</div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-success" onClick={() => response.trim() && onSubmit(response)}>Publish Response</button>
        </div>
      </div>
    </div>
  );
}

// ─── MODULE 6: Review List ────────────────────────────────────────────────────
function ReviewCard({ review, onVote, onSellerRespond, showAdminActions, onApprove, onReject }) {
  const [expanded, setExpanded] = useState(false);
  const shortBody = review.body.length > 160 ? review.body.slice(0, 160) + "…" : review.body;

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <Avatar initials={review.initials} color={review.avatarColor} />
          <div>
            <div className="reviewer-name">{review.user}</div>
            <div className="reviewer-meta">
              <StarDisplay rating={review.rating} size="sm" />
              <span style={{ marginLeft: 6 }}>{new Date(review.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
          {review.verified && <span className="verified-badge">✅ Verified Purchase</span>}
          {review.status === "pending" && <span className="badge badge-amber">⏳ Pending</span>}
          {showAdminActions && review.status === "pending" && (
            <>
              <button className="btn btn-success btn-xs" onClick={onApprove}>Approve</button>
              <button className="btn btn-danger btn-xs" onClick={onReject}>Reject</button>
            </>
          )}
        </div>
      </div>

      <div style={{ fontWeight: 700, fontSize: 15, color: theme.dark, margin: "6px 0 4px" }}>{review.title}</div>
      <div className="review-body">
        {expanded ? review.body : shortBody}
        {review.body.length > 160 && (
          <button onClick={() => setExpanded(!expanded)}
            style={{ background: "none", border: "none", color: theme.blue, fontSize: 13, cursor: "pointer", marginLeft: 4 }}>
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {review.photos.length > 0 && (
        <div className="review-photos">
          {review.photos.map((p, i) => (
            <div className="review-photo-placeholder" key={i} title="Product photo"><span style={{ fontSize: 28 }}>{p}</span></div>
          ))}
        </div>
      )}

      {review.sellerResponse && (
        <div className="seller-response">
          <div className="seller-response-header">🏪 Seller · {review.sellerResponseDate}</div>
          <div className="seller-response-body">{review.sellerResponse}</div>
        </div>
      )}

      <div className="review-footer">
        <span style={{ fontSize: 12, color: theme.muted }}>Was this helpful?</span>
        <button className={`helpful-btn ${review.userVote === "up" ? "active" : ""}`} onClick={() => onVote(review.id, "up")}>
          👍 {review.helpful}
        </button>
        <button className={`helpful-btn ${review.userVote === "down" ? "active" : ""}`} onClick={() => onVote(review.id, "down")}>
          👎 {review.unhelpful}
        </button>
        <div style={{ marginLeft: "auto" }}>
          {!review.sellerResponse && !showAdminActions && (
            <button className="btn btn-outline btn-xs" onClick={() => onSellerRespond(review)}>
              🏪 Respond
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── MODULE 4: Q&A Section ────────────────────────────────────────────────────
function QASection({ qaList, onAsk, onAnswer }) {
  const [askForm, setAskForm] = useState({ question: "", name: "" });
  const [answerModal, setAnswerModal] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [likedQAs, setLikedQAs] = useState([]);

  const handleLike = (id) => {
    setLikedQAs(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div>
      {/* Ask a question */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div className="card-header">
          <div>
            <div className="card-title">❓ Ask a Question</div>
            <div className="card-sub">Get answers from the seller or other buyers</div>
          </div>
        </div>
        <div className="form-row" style={{ marginBottom: 12 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Your Name</label>
            <input className="form-input" placeholder="Ravi Kumar"
              value={askForm.name} onChange={e => setAskForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <div className="form-group" style={{ marginBottom: 0, flex: 1 }}>
              <label className="form-label">Your Question</label>
              <input className="form-input" placeholder="e.g. Is this waterproof?"
                value={askForm.question} onChange={e => setAskForm(f => ({ ...f, question: e.target.value }))}
                onKeyDown={e => { if (e.key === "Enter" && askForm.question.trim() && askForm.name.trim()) { onAsk(askForm); setAskForm({ question: "", name: "" }); } }} />
            </div>
          </div>
        </div>
        <button className="btn btn-primary"
          onClick={() => { if (askForm.question.trim() && askForm.name.trim()) { onAsk(askForm); setAskForm({ question: "", name: "" }); } }}>
          Post Question
        </button>
      </div>

      {/* Q&A list */}
      <div className="section-label">{qaList.length} Questions</div>
      {qaList.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">💬</div>
          <div className="empty-state-text">No questions yet</div>
          <div className="empty-state-sub">Be the first to ask!</div>
        </div>
      )}
      {qaList.map(qa => (
        <div className="qa-item" key={qa.id}>
          <div className="qa-question">
            <span className="qa-q-label">Q</span>
            <div>
              <div className="qa-text">{qa.question}</div>
              <div className="qa-meta">Asked by {qa.askedBy} · {new Date(qa.askedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })} · {qa.likes + (likedQAs.includes(qa.id) ? 1 : 0)} found this helpful</div>
            </div>
            <button onClick={() => handleLike(qa.id)}
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, marginLeft: "auto", color: likedQAs.includes(qa.id) ? theme.blue : theme.muted }}>
              {likedQAs.includes(qa.id) ? "❤️" : "🤍"}
            </button>
          </div>
          {qa.answer ? (
            <div className="qa-answer">
              <span className="qa-a-label">A</span>
              <div>
                <div className="qa-text">{qa.answer}</div>
                <div className="qa-meta">{qa.answeredBy} · {new Date(qa.answeredDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 10, borderTop: `1px dashed ${theme.border}` }}>
              <span style={{ fontSize: 12, color: theme.muted }}>⏳ Awaiting answer</span>
              <button className="btn btn-accent btn-xs" onClick={() => { setAnswerModal(qa); setAnswerText(""); }}>
                🏪 Answer as Seller
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Answer modal */}
      {answerModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setAnswerModal(null)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">💬 Answer Question</div>
              <button className="modal-close" onClick={() => setAnswerModal(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ background: theme.light, borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 13, color: theme.dark }}>
                <strong>Q:</strong> {answerModal.question}
              </div>
              <div className="form-group">
                <label className="form-label">Your Answer</label>
                <textarea className="form-input form-textarea" rows={3} value={answerText}
                  onChange={e => setAnswerText(e.target.value)}
                  placeholder="Provide a clear, helpful answer..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setAnswerModal(null)}>Cancel</button>
              <button className="btn btn-accent"
                onClick={() => { if (answerText.trim()) { onAnswer(answerModal.id, answerText); setAnswerModal(null); } }}>
                Publish Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MODULE 7: Admin Panel ────────────────────────────────────────────────────
function AdminPanel({ reviews, onApprove, onReject, onDelete }) {
  const [adminTab, setAdminTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = reviews.filter(r => {
    const matchTab = adminTab === "all" || r.status === adminTab;
    const matchSearch = r.user.toLowerCase().includes(search.toLowerCase()) || r.title.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const stats = {
    total: reviews.length,
    approved: reviews.filter(r => r.status === "approved").length,
    pending: reviews.filter(r => r.status === "pending").length,
    rejected: reviews.filter(r => r.status === "rejected").length,
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {[
          { label: "Total Reviews", value: stats.total, icon: "📝", color: theme.blue },
          { label: "Approved", value: stats.approved, icon: "✅", color: theme.green },
          { label: "Pending Review", value: stats.pending, icon: "⏳", color: "#F59E0B" },
          { label: "Rejected", value: stats.rejected, icon: "❌", color: theme.coral },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-number" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">🛡️ Review Moderation</div>
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input className="form-input search-input" placeholder="Search by user or title..."
              value={search} onChange={e => setSearch(e.target.value)} style={{ width: 240 }} />
          </div>
        </div>

        <div className="tabs">
          {[["all", "All Reviews"], ["approved", "Approved"], ["pending", "Pending"], ["rejected", "Rejected"]].map(([v, l]) => (
            <button key={v} className={`tab-btn ${adminTab === v ? "active" : ""}`} onClick={() => setAdminTab(v)}>{l}</button>
          ))}
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Review</th>
                <th>Rating</th>
                <th>Date</th>
                <th>Verified</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 32, color: theme.muted }}>No reviews found</td></tr>
              )}
              {filtered.map(r => (
                <tr key={r.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Avatar initials={r.initials} color={r.avatarColor} size={30} />
                      <span style={{ fontWeight: 600, fontSize: 13 }}>{r.user}</span>
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, fontSize: 13, color: theme.dark, maxWidth: 220 }}>{r.title}</div>
                    <div style={{ fontSize: 12, color: theme.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 220 }}>{r.body}</div>
                  </td>
                  <td><StarDisplay rating={r.rating} size="sm" /></td>
                  <td style={{ fontSize: 12, color: theme.muted, whiteSpace: "nowrap" }}>{r.date}</td>
                  <td>{r.verified ? <span className="badge badge-green">✅ Yes</span> : <span className="badge badge-gray">No</span>}</td>
                  <td>
                    {r.status === "approved" && <span className="badge badge-green">Approved</span>}
                    {r.status === "pending" && <span className="badge badge-amber">Pending</span>}
                    {r.status === "rejected" && <span className="badge badge-red">Rejected</span>}
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 5 }}>
                      {r.status !== "approved" && <button className="btn btn-success btn-xs" onClick={() => onApprove(r.id)}>✓</button>}
                      {r.status !== "rejected" && <button className="btn btn-danger btn-xs" onClick={() => onReject(r.id)}>✕</button>}
                      <button className="btn btn-outline btn-xs" onClick={() => onDelete(r.id)} style={{ color: theme.coral, borderColor: theme.coral }}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeModule, setActiveModule] = useState("reviews");
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [qaList, setQaList] = useState(INITIAL_QA);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sellerModal, setSellerModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [sortBy, setSortBy] = useState("newest");
  const [filterRating, setFilterRating] = useState(0);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Review operations
  const handleSubmitReview = (form) => {
    const colors = AVATAR_COLORS;
    const newReview = {
      id: Date.now(), user: form.name, initials: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      avatarColor: colors[reviews.length % colors.length],
      rating: form.rating, date: new Date().toISOString().slice(0, 10), verified: true,
      title: form.title, body: form.body, photos: form.files,
      helpful: 0, unhelpful: 0, userVote: null, sellerResponse: null, status: "pending",
    };
    setReviews(r => [newReview, ...r]);
    setShowReviewForm(false);
    showToast("Your review has been submitted and is pending moderation.");
  };

  const handleVote = (id, type) => {
    setReviews(rs => rs.map(r => {
      if (r.id !== id) return r;
      const prevVote = r.userVote;
      if (prevVote === type) return { ...r, userVote: null, [type === "up" ? "helpful" : "unhelpful"]: r[type === "up" ? "helpful" : "unhelpful"] - 1 };
      const newR = { ...r, userVote: type };
      if (type === "up") { newR.helpful += 1; if (prevVote === "down") newR.unhelpful -= 1; }
      else { newR.unhelpful += 1; if (prevVote === "up") newR.helpful -= 1; }
      return newR;
    }));
  };

  const handleSellerResponse = (response) => {
    setReviews(rs => rs.map(r => r.id === sellerModal.id ? { ...r, sellerResponse: response, sellerResponseDate: new Date().toISOString().slice(0, 10) } : r));
    setSellerModal(null);
    showToast("Your seller response has been published.");
  };

  const handleAskQuestion = ({ question, name }) => {
    setQaList(qs => [{ id: Date.now(), question, askedBy: name, askedDate: new Date().toISOString().slice(0, 10), answer: null, answeredBy: null, answeredDate: null, likes: 0 }, ...qs]);
    showToast("Your question has been posted.");
  };

  const handleAnswerQuestion = (id, answer) => {
    setQaList(qs => qs.map(q => q.id === id ? { ...q, answer, answeredBy: "Store Team", answeredDate: new Date().toISOString().slice(0, 10) } : q));
    showToast("Answer published successfully.");
  };

  // Admin ops
  const handleApprove = (id) => { setReviews(rs => rs.map(r => r.id === id ? { ...r, status: "approved" } : r)); showToast("Review approved."); };
  const handleReject = (id) => { setReviews(rs => rs.map(r => r.id === id ? { ...r, status: "rejected" } : r)); showToast("Review rejected.", "error"); };
  const handleDelete = (id) => { setReviews(rs => rs.filter(r => r.id !== id)); showToast("Review deleted.", "error"); };

  // Sorted + filtered reviews for display
  const approvedReviews = reviews.filter(r => r.status === "approved");
  const visibleReviews = approvedReviews
    .filter(r => filterRating === 0 || r.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "highest") return b.rating - a.rating;
      if (sortBy === "lowest") return a.rating - b.rating;
      if (sortBy === "helpful") return b.helpful - a.helpful;
      return 0;
    });

  const navItems = [
    { id: "reviews", icon: "⭐", label: "Reviews" },
    { id: "qa", icon: "❓", label: "Q&A Section" },
    { id: "history", icon: "📋", label: "Review History" },
    { id: "admin", icon: "🛡️", label: "Admin Panel" },
  ];

  const pageInfo = {
    reviews: { title: "Product Reviews", sub: "Customer feedback and ratings for Sony WH-1000XM5" },
    qa: { title: "Questions & Answers", sub: "Ask questions, get answers from seller and buyers" },
    history: { title: "Review History", sub: "All reviews across all statuses" },
    admin: { title: "Admin Panel", sub: "Moderate and manage all review content" },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyle }} />

      <div className="app-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <h1>⭐ ReviewHub</h1>
            <p>Product Review System</p>
          </div>
          <nav className="sidebar-nav">
            {navItems.map(item => (
              <button key={item.id} className={`nav-item ${activeModule === item.id ? "active" : ""}`}
                onClick={() => setActiveModule(item.id)}>
                <span className="nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            v1.0.0 · Product Review & Rating System
          </div>
        </aside>

        {/* Main */}
        <main className="main">
          <header className="topbar">
            <div>
              <div className="topbar-title">{pageInfo[activeModule].title}</div>
              <div className="topbar-sub">{pageInfo[activeModule].sub}</div>
            </div>
            <div className="topbar-actions">
              {activeModule === "reviews" && (
                <button className="btn btn-primary" onClick={() => setShowReviewForm(true)}>
                  ✍️ Write a Review
                </button>
              )}
            </div>
          </header>

          <div className="page-content">
            {/* ── MODULE 6: Reviews page ── */}
            {activeModule === "reviews" && (
              <>
                {/* Rating Summary + Distribution */}
                <div className="card" style={{ marginBottom: 24 }}>
                  <RatingDist reviews={reviews} />
                </div>

                {/* Filter + Sort bar */}
                <div className="filter-bar">
                  <div className="search-input-wrap">
                    <span className="search-icon">🔍</span>
                    <input className="form-input search-input" placeholder="Search reviews…" style={{ width: 220 }} />
                  </div>
                  {[0, 5, 4, 3, 2, 1].map(r => (
                    <button key={r} className={`filter-chip ${filterRating === r ? "active" : ""}`} onClick={() => setFilterRating(r)}>
                      {r === 0 ? "All Stars" : `${r} ★`}
                    </button>
                  ))}
                  <select className="sort-select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="helpful">Most Helpful</option>
                  </select>
                </div>

                <div className="section-label">{visibleReviews.length} reviews</div>

                {visibleReviews.length === 0 && (
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <div className="empty-state-text">No reviews match your filters</div>
                    <div className="empty-state-sub">Try adjusting the star filter above</div>
                  </div>
                )}

                {visibleReviews.map(r => (
                  <ReviewCard key={r.id} review={r}
                    onVote={handleVote}
                    onSellerRespond={(rev) => setSellerModal(rev)}
                    showAdminActions={false} />
                ))}
              </>
            )}

            {/* ── MODULE 4: Q&A ── */}
            {activeModule === "qa" && (
              <QASection qaList={qaList} onAsk={handleAskQuestion} onAnswer={handleAnswerQuestion} />
            )}

            {/* ── Review History ── */}
            {activeModule === "history" && (
              <>
                <div className="grid-3" style={{ marginBottom: 24 }}>
                  {[
                    { label: "Total", value: reviews.length, color: theme.blue, icon: "📝" },
                    { label: "Approved", value: reviews.filter(r => r.status === "approved").length, color: theme.green, icon: "✅" },
                    { label: "Pending", value: reviews.filter(r => r.status === "pending").length, color: "#F59E0B", icon: "⏳" },
                  ].map(s => (
                    <div className="stat-card" key={s.label}>
                      <div className="stat-icon">{s.icon}</div>
                      <div className="stat-number" style={{ color: s.color }}>{s.value}</div>
                      <div className="stat-label">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="card">
                  <div className="card-header">
                    <div className="card-title">All Review Activity</div>
                  </div>
                  <div className="table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Reviewer</th>
                          <th>Title</th>
                          <th>Rating</th>
                          <th>Photos</th>
                          <th>Helpful</th>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.map(r => (
                          <tr key={r.id}>
                            <td>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <Avatar initials={r.initials} color={r.avatarColor} size={30} />
                                <div>
                                  <div style={{ fontWeight: 600, fontSize: 13 }}>{r.user}</div>
                                  {r.verified && <div style={{ fontSize: 11, color: theme.green }}>✅ Verified</div>}
                                </div>
                              </div>
                            </td>
                            <td style={{ fontSize: 13, maxWidth: 200 }}>{r.title}</td>
                            <td><StarDisplay rating={r.rating} size="sm" /></td>
                            <td><span className="badge badge-blue">{r.photos.length} photos</span></td>
                            <td style={{ fontSize: 13 }}>👍 {r.helpful}</td>
                            <td style={{ fontSize: 12, color: theme.muted }}>{r.date}</td>
                            <td>
                              {r.status === "approved" && <span className="badge badge-green">Approved</span>}
                              {r.status === "pending" && <span className="badge badge-amber">Pending</span>}
                              {r.status === "rejected" && <span className="badge badge-red">Rejected</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {/* ── MODULE 7: Admin Panel ── */}
            {activeModule === "admin" && (
              <AdminPanel
                reviews={reviews}
                onApprove={handleApprove}
                onReject={handleReject}
                onDelete={handleDelete}
              />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      {showReviewForm && <ReviewForm onSubmit={handleSubmitReview} onClose={() => setShowReviewForm(false)} />}
      {sellerModal && <SellerResponseModal review={sellerModal} onSubmit={handleSellerResponse} onClose={() => setSellerModal(null)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </>
  );
}
