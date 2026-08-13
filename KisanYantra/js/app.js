const ACCESSORIES_LIST = [
  {id:'rotavator', label:'Rotavator', icon:'🔄'},
  {id:'cultivator', label:'Cultivator', icon:'🌾'},
  {id:'harrow', label:'Harrow', icon:'🪓'},
  {id:'plough', label:'Plough', icon:'⚡'},
  {id:'trailer', label:'Trailer', icon:'🚛'},
  {id:'sprayer', label:'Sprayer', icon:'💧'},
  {id:'seeder', label:'Seeder', icon:'🌱'},
  {id:'loader', label:'Loader', icon:'🏗️'},
  {id:'leveller', label:'Leveller', icon:'📏'},
];

function getDB() {
  const raw = localStorage.getItem('kisanyantra_db');
  if (raw) {
    const db = JSON.parse(raw);
    // Migration: older saved DBs may not have support tickets yet
    let dirty = false;
    if (!db.supportTickets) { db.supportTickets = []; dirty = true; }
    if (!db.nextTicketId) { db.nextTicketId = 1; dirty = true; }
    if (dirty) saveDB(db);
    return db;
  }
  // Seed initial data
  const db = {
    users: [
      {id:1, username:'admin', password:'admin', role:'ADMIN', joined:'2025-01-01'},
      {id:2, username:'owner1', password:'pass', role:'OWNER', joined:'2025-01-15'},
      {id:3, username:'owner2', password:'pass', role:'OWNER', joined:'2025-02-01'},
      {id:4, username:'user1', password:'pass', role:'USER', joined:'2025-03-01'},
      {id:5, username:'user2', password:'pass', role:'USER', joined:'2025-03-15'},
    ],
    tractors: [
      {id:1, registrationNumber:'AP01AB1234', tractorType:'Mahindra 575', location:'Vijayawada', rentPerHour:600, available:true, reservedSlot:null, ownerUsername:'owner1', accessories:['rotavator','plough']},
      {id:2, registrationNumber:'AP02CD5678', tractorType:'John Deere 5050', location:'Guntur', rentPerHour:800, available:false, reservedSlot:'Morning (5AM - 9AM)', ownerUsername:'owner1', accessories:['rotavator','harrow','trailer']},
      {id:3, registrationNumber:'AP03EF9012', tractorType:'TAFE 7502', location:'Vijayawada', rentPerHour:500, available:true, reservedSlot:null, ownerUsername:'owner2', accessories:['cultivator','seeder']},
      {id:4, registrationNumber:'AP04GH3456', tractorType:'Sonalika DI 60', location:'Krishna', rentPerHour:700, available:true, reservedSlot:null, ownerUsername:'owner2', accessories:['sprayer','loader']},
    ],
    bookings: [
      {id:1, tractorId:2, customerName:'user1', bookingDate:'2026-05-20', slot:'Morning (5AM - 9AM)', hours:3, totalAmount:2400, paymentMethod:'UPI', status:'Completed', accessories:['rotavator']},
      {id:2, tractorId:4, customerName:'user1', bookingDate:'2026-05-28', slot:'Afternoon (1PM - 4PM)', hours:2, totalAmount:1400, paymentMethod:'Cash', status:'Upcoming', accessories:['sprayer']},
    ],
    supportTickets: [],
    nextTractorId: 5,
    nextBookingId: 3,
    nextUserId: 6,
    nextTicketId: 1,
  };
  saveDB(db); return db;
}
// suppressStorageEcho: while true, the storage-event listener ignores the next
// broadcast — used so a tab doesn't "react" to its own write in edge cases.
function saveDB(db) { localStorage.setItem('kisanyantra_db', JSON.stringify(db)); }

// ═══════════════════════════════════════════════════
//  i18n — LANGUAGE / TRANSLATION ENGINE
// ═══════════════════════════════════════════════════
const TRANSLATIONS = {
  brand_tagline: {en:'Tractor Rental Platform', te:'ట్రాక్టర్ అద్దె వేదిక'},
  stat_tractors: {en:'Tractors', te:'ట్రాక్టర్లు'},
  stat_bookings: {en:'Bookings', te:'బుకింగ్‌లు'},
  stat_members: {en:'Members', te:'సభ్యులు'},
  auth_welcome_back: {en:'Welcome back', te:'తిరిగి స్వాగతం'},
  auth_signin_sub: {en:'Sign in to continue to your dashboard', te:'మీ డాష్‌బోర్డ్‌ను కొనసాగించడానికి సైన్ ఇన్ చేయండి'},
  tab_login: {en:'Login', te:'లాగిన్'},
  tab_register: {en:'Register', te:'నమోదు'},
  label_username: {en:'Username', te:'వినియోగదారు పేరు'},
  ph_login_username: {en:'Enter your username', te:'మీ వినియోగదారు పేరు నమోదు చేయండి'},
  label_password: {en:'Password', te:'పాస్‌వర్డ్'},
  btn_login: {en:'Login →', te:'లాగిన్ →'},
  demo_label: {en:'Demo', te:'డెమో'},
  ph_reg_username: {en:'Choose a username', te:'వినియోగదారు పేరును ఎంచుకోండి'},
  ph_reg_password: {en:'Create a password', te:'పాస్‌వర్డ్ సృష్టించండి'},
  label_iam: {en:'I am a...', te:'నేను ఒక...'},
  role_user: {en:'User', te:'వినియోగదారు'},
  role_owner: {en:'Owner', te:'యజమాని'},
  role_admin: {en:'Admin', te:'నిర్వాహకుడు'},
  btn_create_account: {en:'Create Account →', te:'ఖాతా సృష్టించండి →'},

  nav_logout: {en:'Logout', te:'లాగ్ అవుట్'},
  nav_settings: {en:'Settings', te:'సెట్టింగ్‌లు'},
  role_badge_admin: {en:'⚙️ Admin', te:'⚙️ నిర్వాహకుడు'},
  role_badge_owner: {en:'🚜 Owner', te:'🚜 యజమాని'},
  role_badge_user: {en:'👤 Farmer', te:'👤 రైతు'},
  live_on: {en:'Live', te:'ప్రత్యక్షం'},

  admin_title: {en:'Admin Dashboard', te:'నిర్వాహక డాష్‌బోర్డ్'},
  admin_subtitle: {en:'Full system control & oversight', te:'పూర్తి వ్యవస్థ నియంత్రణ & పర్యవేక్షణ'},
  stat_total_tractors: {en:'Total Tractors', te:'మొత్తం ట్రాక్టర్లు'},
  stat_available: {en:'Available', te:'అందుబాటులో ఉంది'},
  stat_reserved: {en:'Reserved', te:'రిజర్వ్ చేయబడింది'},
  stat_total_bookings: {en:'Total Bookings', te:'మొత్తం బుకింగ్‌లు'},
  card_add_new_tractor: {en:'Add New Tractor', te:'కొత్త ట్రాక్టర్‌ను జోడించండి'},
  label_reg_number: {en:'Reg. Number', te:'నమోదు సంఖ్య'},
  label_tractor_type: {en:'Tractor Type', te:'ట్రాక్టర్ రకం'},
  label_location: {en:'Location', te:'ప్రాంతం'},
  label_rent_hour: {en:'Rent / Hour (₹)', te:'అద్దె / గంట (₹)'},
  label_rent_hr_short: {en:'Rent / Hr (₹)', te:'అద్దె / గం (₹)'},
  label_owner_username: {en:'Owner Username', te:'యజమాని వినియోగదారు పేరు'},
  select_owner_placeholder: {en:'Select Owner', te:'యజమానిని ఎంచుకోండి'},
  label_accessories: {en:'Accessories', te:'ఉపకరణాలు'},
  label_accessories_avail: {en:'Accessories Available', te:'అందుబాటులో ఉన్న ఉపకరణాలు'},
  btn_add_tractor: {en:'Add Tractor', te:'ట్రాక్టర్‌ను జోడించండి'},
  card_registered_users: {en:'Registered Users', te:'నమోదైన వినియోగదారులు'},
  th_username: {en:'Username', te:'వినియోగదారు పేరు'},
  th_role: {en:'Role', te:'పాత్ర'},
  th_joined: {en:'Joined', te:'చేరిన తేదీ'},
  th_action: {en:'Action', te:'చర్య'},
  btn_remove: {en:'Remove', te:'తొలగించు'},
  card_all_tractors: {en:'All Tractors', te:'అన్ని ట్రాక్టర్లు'},
  ph_search_tractors: {en:'Search tractors...', te:'ట్రాక్టర్లను వెతకండి...'},
  th_id: {en:'ID', te:'ID'},
  th_reg_no: {en:'Reg No.', te:'నమోదు సంఖ్య'},
  th_type: {en:'Type', te:'రకం'},
  th_owner: {en:'Owner', te:'యజమాని'},
  th_location: {en:'Location', te:'ప్రాంతం'},
  th_status: {en:'Status', te:'స్థితి'},
  th_rent_hr: {en:'Rent/Hr', te:'అద్దె/గం'},
  th_accessories: {en:'Accessories', te:'ఉపకరణాలు'},
  th_actions: {en:'Actions', te:'చర్యలు'},
  btn_edit: {en:'Edit', te:'సవరించు'},
  btn_del: {en:'Del', te:'తొలగించు'},
  card_all_bookings: {en:'All Bookings', te:'అన్ని బుకింగ్‌లు'},
  th_tractor: {en:'Tractor', te:'ట్రాక్టర్'},
  th_customer: {en:'Customer', te:'వినియోగదారు'},
  th_date: {en:'Date', te:'తేదీ'},
  th_slot: {en:'Slot', te:'సమయం'},
  th_hours: {en:'Hours', te:'గంటలు'},
  th_amount: {en:'Amount', te:'మొత్తం'},
  th_payment: {en:'Payment', te:'చెల్లింపు'},
  btn_complete: {en:'Complete', te:'పూర్తి చేయి'},
  empty_no_tractors: {en:'No tractors found', te:'ట్రాక్టర్లు కనుగొనబడలేదు'},
  empty_no_bookings: {en:'No bookings yet', te:'ఇంకా బుకింగ్‌లు లేవు'},
  card_support_tickets: {en:'Support Tickets', te:'మద్దతు టికెట్లు'},
  th_ticket_id: {en:'Ticket', te:'టికెట్'},
  th_category: {en:'Category', te:'వర్గం'},
  th_issue: {en:'Issue', te:'సమస్య'},
  empty_no_tickets: {en:'No support tickets', te:'మద్దతు టికెట్లు లేవు'},

  owner_subtitle: {en:'Manage your tractors and track earnings', te:'మీ ట్రాక్టర్లను నిర్వహించండి మరియు ఆదాయాన్ని ట్రాక్ చేయండి'},
  owner_welcome: {en:'Welcome, {name}', te:'స్వాగతం, {name}'},
  stat_total_revenue: {en:'Total Revenue', te:'మొత్తం ఆదాయం'},
  stat_my_tractors: {en:'My Tractors', te:'నా ట్రాక్టర్లు'},
  tab_bookings: {en:'Bookings', te:'బుకింగ్‌లు'},
  tab_my_tractors: {en:'My Tractors', te:'నా ట్రాక్టర్లు'},
  tab_add_tractor: {en:'Add Tractor', te:'ట్రాక్టర్‌ను జోడించు'},
  card_booking_requests: {en:'Booking Requests', te:'బుకింగ్ అభ్యర్థనలు'},
  empty_no_tractors_add: {en:'No tractors yet. Add one!', te:'ఇంకా ట్రాక్టర్లు లేవు. ఒకటి జోడించండి!'},
  btn_add_my_tractor: {en:'Add My Tractor', te:'నా ట్రాక్టర్‌ను జోడించు'},

  user_title: {en:'Find a Tractor', te:'ట్రాక్టర్‌ను కనుగొనండి'},
  user_subtitle: {en:'Browse available tractors and book your slot instantly', te:'అందుబాటులో ఉన్న ట్రాక్టర్లను బ్రౌజ్ చేసి తక్షణమే మీ సమయాన్ని బుక్ చేసుకోండి'},
  stat_available_now: {en:'Available Now', te:'ప్రస్తుతం అందుబాటులో'},
  stat_my_bookings: {en:'My Bookings', te:'నా బుకింగ్‌లు'},
  stat_total_spent: {en:'Total Spent', te:'మొత్తం ఖర్చు'},
  tab_browse: {en:'Browse Tractors', te:'ట్రాక్టర్లను బ్రౌజ్ చేయండి'},
  tab_history: {en:'My Bookings', te:'నా బుకింగ్‌లు'},
  ph_search_type_reg: {en:'Search by type or registration...', te:'రకం లేదా నమోదు సంఖ్య ద్వారా వెతకండి...'},
  ph_filter_location: {en:'Filter by location...', te:'ప్రాంతం ద్వారా ఫిల్టర్ చేయండి...'},
  all_accessories: {en:'All Accessories', te:'అన్ని ఉపకరణాలు'},
  lbl_booked_slot: {en:'Booked Slot', te:'బుక్ చేసిన సమయం'},
  per_hour: {en:'per hour', te:'గంటకు'},
  btn_book_now: {en:'Book Now →', te:'ఇప్పుడు బుక్ చేయండి →'},
  btn_reserved: {en:'Reserved', te:'రిజర్వ్ చేయబడింది'},
  no_match_search: {en:'No tractors match your search', te:'మీ శోధనకు సరిపోలే ట్రాక్టర్లు లేవు'},
  card_my_booking_history: {en:'My Booking History', te:'నా బుకింగ్ చరిత్ర'},
  empty_no_bookings_browse: {en:'No bookings yet. Browse tractors to get started!', te:'ఇంకా బుకింగ్‌లు లేవు. ప్రారంభించడానికి ట్రాక్టర్లను బ్రౌజ్ చేయండి!'},
  btn_cancel: {en:'Cancel', te:'రద్దు చేయి'},

  modal_book_tractor: {en:'🚜 Book Tractor', te:'🚜 ట్రాక్టర్‌ను బుక్ చేయండి'},
  label_tractor: {en:'Tractor', te:'ట్రాక్టర్'},
  label_booking_date: {en:'Booking Date', te:'బుకింగ్ తేదీ'},
  label_select_slot: {en:'Select Time Slot', te:'సమయాన్ని ఎంచుకోండి'},
  slot_morning_name: {en:'🌅 Morning', te:'🌅 ఉదయం'},
  slot_afternoon_name: {en:'☀️ Afternoon', te:'☀️ మధ్యాహ్నం'},
  slot_evening_name: {en:'🌙 Evening', te:'🌙 సాయంత్రం'},
  label_num_hours: {en:'Number of Hours', te:'గంటల సంఖ్య'},
  label_payment_method: {en:'Payment Method', te:'చెల్లింపు విధానం'},
  label_select_accessories: {en:'Select Accessories', te:'ఉపకరణాలను ఎంచుకోండి'},
  label_total_amount: {en:'Total Amount', te:'మొత్తం మొత్తం'},
  btn_confirm_booking: {en:'Confirm Booking ✓', te:'బుకింగ్‌ను నిర్ధారించండి ✓'},

  modal_edit_tractor: {en:'✏️ Edit Tractor', te:'✏️ ట్రాక్టర్‌ను సవరించండి'},
  btn_save_changes: {en:'Save Changes', te:'మార్పులను సేవ్ చేయండి'},

  status_available: {en:'✅ Available', te:'✅ అందుబాటులో ఉంది'},
  status_reserved_lock: {en:'🔒 Reserved', te:'🔒 రిజర్వ్ చేయబడింది'},
  status_upcoming: {en:'Upcoming', te:'రాబోయే'},
  status_completed: {en:'Completed', te:'పూర్తయింది'},
  status_cancelled: {en:'Cancelled', te:'రద్దు చేయబడింది'},

  acc_rotavator: {en:'Rotavator', te:'రోటావేటర్'},
  acc_cultivator: {en:'Cultivator', te:'కల్టివేటర్'},
  acc_harrow: {en:'Harrow', te:'హారో'},
  acc_plough: {en:'Plough', te:'నాగలి'},
  acc_trailer: {en:'Trailer', te:'ట్రైలర్'},
  acc_sprayer: {en:'Sprayer', te:'స్ప్రేయర్'},
  acc_seeder: {en:'Seeder', te:'విత్తే యంత్రం'},
  acc_loader: {en:'Loader', te:'లోడర్'},
  acc_leveller: {en:'Leveller', te:'లెవలర్'},

  toast_invalid_login: {en:'Invalid username or password', te:'చెల్లని వినియోగదారు పేరు లేదా పాస్‌వర్డ్'},
  toast_welcome: {en:'Welcome, {name}!', te:'స్వాగతం, {name}!'},
  toast_fill_fields: {en:'Please fill all fields', te:'దయచేసి అన్ని వివరాలను నింపండి'},
  toast_username_taken: {en:'Username already taken', te:'వినియోగదారు పేరు ఇప్పటికే వాడుకలో ఉంది'},
  toast_account_created: {en:'Account created! Welcome, {name}!', te:'ఖాతా సృష్టించబడింది! స్వాగతం, {name}!'},
  toast_fill_all: {en:'Fill all fields', te:'అన్ని వివరాలను నింపండి'},
  toast_tractor_added: {en:'Tractor added successfully!', te:'ట్రాక్టర్ విజయవంతంగా జోడించబడింది!'},
  toast_tractor_added2: {en:'Tractor added!', te:'ట్రాక్టర్ జోడించబడింది!'},
  toast_tractor_updated: {en:'Tractor updated!', te:'ట్రాక్టర్ నవీకరించబడింది!'},
  toast_tractor_deleted: {en:'Tractor deleted', te:'ట్రాక్టర్ తొలగించబడింది'},
  toast_booking_cancelled: {en:'Booking cancelled', te:'బుకింగ్ రద్దు చేయబడింది'},
  toast_booked: {en:'Booked! ₹{amt} via {payment}', te:'బుక్ చేయబడింది! ₹{amt} {payment} ద్వారా'},
  toast_fill_booking: {en:'Please fill all booking details', te:'దయచేసి అన్ని బుకింగ్ వివరాలను నింపండి'},
  toast_booking_completed_admin: {en:'Booking marked as completed', te:'బుకింగ్ పూర్తయినట్లు గుర్తించబడింది'},
  toast_booking_deleted: {en:'Booking deleted', te:'బుకింగ్ తొలగించబడింది'},
  toast_user_removed: {en:'User removed', te:'వినియోగదారు తొలగించబడ్డారు'},
  toast_booking_completed: {en:'Booking completed!', te:'బుకింగ్ పూర్తయింది!'},

  settings_title: {en:'⚙️ Settings', te:'⚙️ సెట్టింగ్‌లు'},
  settings_tab_language: {en:'🌐 Language', te:'🌐 భాష'},
  settings_tab_help: {en:'🆘 Help & Support', te:'🆘 సహాయం & మద్దతు'},
  lang_choose: {en:'Choose your app language', te:'మీ యాప్ భాషను ఎంచుకోండి'},
  lang_applied: {en:'Language switched to {lang}', te:'భాష {lang}కి మార్చబడింది'},
  lang_name_en: {en:'English', te:'ఇంగ్లీష్'},
  lang_name_te: {en:'Telugu', te:'తెలుగు'},
  btn_close: {en:'Close', te:'మూసివేయి'},

  help_intro: {en:'How can we help you today?', te:'ఈ రోజు మేము మీకు ఎలా సహాయపడగలం?'},
  help_cat_payment: {en:'Payment Issues', te:'చెల్లింపు సమస్యలు'},
  help_cat_tractor: {en:'Tractor Issues', te:'ట్రాక్టర్ సమస్యలు'},
  help_cat_payment_desc: {en:'Refunds, failed payments, charges', te:'వాపసులు, విఫలమైన చెల్లింపులు, ఛార్జీలు'},
  help_cat_tractor_desc: {en:'Availability, condition, accessories', te:'అందుబాటు, స్థితి, ఉపకరణాలు'},
  help_back: {en:'← Back', te:'← వెనుకకు'},
  help_select_issue: {en:'Select your issue', te:'మీ సమస్యను ఎంచుకోండి'},
  help_guided_steps: {en:'Try these steps', te:'ఈ దశలను ప్రయత్నించండి'},
  help_resolved_q: {en:'Did this resolve your issue?', te:'ఇది మీ సమస్యను పరిష్కరించిందా?'},
  btn_yes_resolved: {en:'✅ Yes, resolved', te:'✅ అవును, పరిష్కారమైంది'},
  btn_no_escalate: {en:'❌ No, still need help', te:'❌ లేదు, ఇంకా సహాయం కావాలి'},
  help_thanks: {en:"Great! Glad it's sorted. 🎉", te:'బాగుంది! ఇది పరిష్కారమైనందుకు సంతోషం. 🎉'},
  btn_back_to_help: {en:'Back to Help', te:'సహాయానికి తిరిగి వెళ్ళండి'},
  help_escalate_title: {en:'Escalate to Customer Care', te:'కస్టమర్ కేర్‌కు తెలియజేయండి'},
  help_escalate_desc: {en:'Describe your issue and our team will get back to you.', te:'మీ సమస్యను వివరించండి, మా బృందం మిమ్మల్ని సంప్రదిస్తుంది.'},
  ph_describe_issue: {en:'Additional details (optional)', te:'అదనపు వివరాలు (ఐచ్ఛికం)'},
  btn_submit_ticket: {en:'Submit to Customer Care', te:'కస్టమర్ కేర్‌కు సమర్పించండి'},
  ticket_confirm_title: {en:'Ticket Submitted ✓', te:'టికెట్ సమర్పించబడింది ✓'},
  ticket_confirm_desc: {en:'Our customer care team will contact you shortly.', te:'మా కస్టమర్ కేర్ బృందం త్వరలో మిమ్మల్ని సంప్రదిస్తుంది.'},
  contact_care: {en:'Customer Care', te:'కస్టమర్ కేర్'},
  contact_phone: {en:'Phone', te:'ఫోన్'},
  contact_email: {en:'Email', te:'ఇమెయిల్'},
  contact_hours: {en:'Hours', te:'సమయం'},
  my_tickets: {en:'My Support Tickets', te:'నా మద్దతు టికెట్లు'},
  ticket_status_open: {en:'Open', te:'తెరిచి ఉంది'},
  ticket_status_inprogress: {en:'In Progress', te:'పురోగతిలో ఉంది'},
  ticket_status_resolved: {en:'Resolved', te:'పరిష్కరించబడింది'},
  no_tickets_yet: {en:'No support tickets raised yet', te:'ఇంకా మద్దతు టికెట్లు లేవు'},
  admin_reply_label: {en:'Admin reply', te:'నిర్వాహకుని ప్రతిస్పందన'},
  ph_admin_reply: {en:'Type your response...', te:'మీ ప్రతిస్పందనను టైప్ చేయండి...'},
  btn_send_reply: {en:'Send & Mark In Progress', te:'పంపండి & పురోగతిలో గుర్తించండి'},
  btn_mark_resolved: {en:'Mark Resolved', te:'పరిష్కరించినట్లు గుర్తించండి'},
  toast_ticket_created: {en:'Support ticket #{id} created', te:'మద్దతు టికెట్ #{id} సృష్టించబడింది'},
  toast_new_ticket_admin: {en:'🎫 New support ticket from {name}', te:'🎫 {name} నుండి కొత్త మద్దతు టికెట్'},
  toast_ticket_updated: {en:'🔔 Your ticket #{id} was updated', te:'🔔 మీ టికెట్ #{id} నవీకరించబడింది'},
  submitted_by: {en:'Submitted by', te:'సమర్పించినవారు'},
  reply_from_care: {en:'Reply from Customer Care', te:'కస్టమర్ కేర్ నుండి ప్రతిస్పందన'},
};

let currentLang = localStorage.getItem('kisan_lang') || 'en';

function t(key, vars) {
  const entry = TRANSLATIONS[key];
  let str = entry ? (entry[currentLang] || entry.en) : key;
  if (vars) {
    Object.keys(vars).forEach(k => { str = str.replace(`{${k}}`, vars[k]); });
  }
  return str;
}
function accLabel(id) {
  const item = ACCESSORIES_LIST.find(a => a.id === id);
  return item ? `${item.icon} ${t('acc_'+id)}` : '';
}
// Canonical slot values are stored in English in the DB (used for matching);
// this maps the stored value to a translated display label.
const SLOT_DISPLAY_MAP = {
  'Morning (5AM - 9AM)': () => `${t('slot_morning_name')} (5AM – 9AM)`,
  'Afternoon (1PM - 4PM)': () => `${t('slot_afternoon_name')} (1PM – 4PM)`,
  'Evening (6PM - 10PM)': () => `${t('slot_evening_name')} (6PM – 10PM)`,
};
function slotLabel(slotValue) {
  const fn = SLOT_DISPLAY_MAP[slotValue];
  return fn ? fn() : (slotValue || '');
}
function statusBadgeLabel(status) {
  const map = { Upcoming:'status_upcoming', Completed:'status_completed', Cancelled:'status_cancelled' };
  return map[status] ? t(map[status]) : status;
}
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('kisan_lang', lang);
  applyTranslations();
  refreshCurrentView();
  showToast(t('lang_applied', {lang: lang==='te' ? t('lang_name_te') : t('lang_name_en')}));
}
function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
  // Sync toggle/card active states
  document.querySelectorAll('#auth-lang-en,#auth-lang-te').forEach(b=>b.classList.remove('active'));
  const authBtn = document.getElementById(currentLang==='te' ? 'auth-lang-te' : 'auth-lang-en');
  if (authBtn) authBtn.classList.add('active');
  document.querySelectorAll('#lang-card-en,#lang-card-te').forEach(c=>c && c.classList.remove('selected'));
  const langCard = document.getElementById(currentLang==='te' ? 'lang-card-te' : 'lang-card-en');
  if (langCard) langCard.classList.add('selected');
}
function initLanguage() { applyTranslations(); }

// Re-render whatever screen is currently on view, in the current language —
// used both after a language switch and after a cross-tab real-time update.
function refreshCurrentView() {
  const activePage = document.querySelector('.page.active');
  if (!activePage) return;
  if (activePage.id === 'page-admin' && currentUser) { initAdmin(); }
  else if (activePage.id === 'page-owner' && currentUser) { initOwner(); }
  else if (activePage.id === 'page-user' && currentUser) { initUser(); }
  else if (activePage.id === 'page-auth') { updateHeroStats(); }
  // Re-render an open help panel/ticket view so its text updates live too
  if (document.getElementById('settingsModalOverlay')?.classList.contains('open')) {
    const helpPanelActive = document.getElementById('settings-panel-help')?.classList.contains('active');
    if (helpPanelActive) renderHelpHome();
  }
}

// ═══════════════════════════════════════════════════
//  CURRENT SESSION
// ═══════════════════════════════════════════════════
let currentUser = JSON.parse(sessionStorage.getItem('kisan_user') || 'null');

// ═══════════════════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════════════════
function showToast(msg, type='success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `show ${type}`;
  setTimeout(() => t.className = '', 3200);
}

// ═══════════════════════════════════════════════════
//  AUTH PAGE
// ═══════════════════════════════════════════════════
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach((b,i)=>b.classList.toggle('active',i===(tab==='login'?0:1)));
  document.getElementById('loginForm').classList.toggle('active', tab==='login');
  document.getElementById('registerForm').classList.toggle('active', tab==='register');
}
let selectedRegRole = 'USER';
function selectRole(role, el) {
  selectedRegRole = role;
  document.getElementById('regRole').value = role;
  document.querySelectorAll('.role-option').forEach(r=>r.classList.remove('selected'));
  el.classList.add('selected');
}
function handleLogin(e) {
  e.preventDefault();

  const u = document.getElementById('loginUsername').value.trim();
  const p = document.getElementById('loginPassword').value;

  const db = getDB();

  const user = db.users.find(
    x => x.username === u && x.password === p
  );

  if (!user) {
    showToast(t('toast_invalid_login'), 'error');
    return;
  }

  currentUser = user;

  sessionStorage.setItem(
    'kisan_user',
    JSON.stringify(user)
  );

  showToast(t('toast_welcome', {name: user.username}));

  setTimeout(() => {
    routeToPage(user.role);
    window.scrollTo(0, 0);
  }, 600);
}
function handleRegister(e) {
  e.preventDefault();

  const u = document.getElementById('regUsername').value.trim();
  const p = document.getElementById('regPassword').value;
  const role = selectedRegRole;

  if (!u || !p) {
    showToast(t('toast_fill_fields'), 'error');
    return;
  }

  const db = getDB();

  if (db.users.find(x => x.username === u)) {
    showToast(t('toast_username_taken'), 'error');
    return;
  }

  const newUser = {
    id: db.nextUserId++,
    username: u,
    password: p,
    role,
    joined: new Date().toISOString().split('T')[0]
  };

  db.users.push(newUser);

  saveDB(db);

  currentUser = newUser;

  sessionStorage.setItem(
    'kisan_user',
    JSON.stringify(newUser)
  );

  showToast(t('toast_account_created', {name: u}));

  setTimeout(() => {
    routeToPage(role);
    window.scrollTo(0, 0);
  }, 600);
}
function routeToPage(role) {

  document.querySelectorAll('.page')
    .forEach(page => page.classList.remove('active'));

  if (role === 'ADMIN') {

    document
      .getElementById('page-admin')
      .classList.add('active');

    initAdmin();
  }

  else if (role === 'OWNER') {

    document
      .getElementById('page-owner')
      .classList.add('active');

    initOwner();
  }

  else {

    document
      .getElementById('page-user')
      .classList.add('active');

    initUser();
  }

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function logout() {
  currentUser = null;
  sessionStorage.removeItem('kisan_user');
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-auth').classList.add('active');
  updateHeroStats();
}

// ═══════════════════════════════════════════════════
//  ACCESSORIES GRID BUILDER
// ═══════════════════════════════════════════════════
function buildAccGrid(containerId, selectedIds=[]) {
  const el = document.getElementById(containerId);
  el.innerHTML = ACCESSORIES_LIST.map(a=>`
    <label class="accessory-chip ${selectedIds.includes(a.id)?'selected':''}" onclick="toggleAccChip(this)">
      <input type="checkbox" value="${a.id}" ${selectedIds.includes(a.id)?'checked':''}>
      ${a.icon} ${a.label}
    </label>
  `).join('');
}
function toggleAccChip(el) {
  setTimeout(()=>{
    const cb = el.querySelector('input');
    el.classList.toggle('selected', cb.checked);
    if (document.getElementById('bk-hours')) calcBookingTotal();
  }, 0);
}
function getSelectedAccs(containerId) {
  return [...document.querySelectorAll(`#${containerId} input[type=checkbox]:checked`)].map(c=>c.value);
}

// ═══════════════════════════════════════════════════
//  MODAL HELPERS
// ═══════════════════════════════════════════════════
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.querySelectorAll('.modal-overlay').forEach(o=>o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('open');}));

// ═══════════════════════════════════════════════════
//  HERO STATS
// ═══════════════════════════════════════════════════
function updateHeroStats() {
  const db = getDB();
  document.getElementById('hero-tractors').textContent = db.tractors.length;
  document.getElementById('hero-bookings').textContent = db.bookings.length;
  document.getElementById('hero-users').textContent = db.users.length;
}

// ═══════════════════════════════════════════════════
//  ADMIN DASHBOARD
// ═══════════════════════════════════════════════════
function initAdmin() {
  document.getElementById('admin-user-name').textContent = currentUser.username;
  buildAccGrid('admin-acc-grid');
  renderAdminStats();
  renderAdminTractors();
  renderAdminBookings();
  renderAdminUsers();
  populateOwnerDropdown();
}
function renderAdminStats() {
  const db = getDB();
  document.getElementById('a-total-tractors').textContent = db.tractors.length;
  document.getElementById('a-available').textContent = db.tractors.filter(t=>t.available).length;
  document.getElementById('a-reserved').textContent = db.tractors.filter(t=>!t.available).length;
  document.getElementById('a-bookings').textContent = db.bookings.length;
}
function populateOwnerDropdown() {
  const db = getDB();
  const owners = db.users.filter(u=>u.role==='OWNER');
  document.getElementById('a-owner').innerHTML = '<option value="">Select Owner</option>' +
    owners.map(o=>`<option value="${o.username}">${o.username}</option>`).join('');
}
function adminAddTractor() {
  const reg = document.getElementById('a-regNum').value.trim();
  const type = document.getElementById('a-tractorType').value.trim();
  const loc = document.getElementById('a-location').value.trim();
  const rent = parseInt(document.getElementById('a-rent').value);
  const owner = document.getElementById('a-owner').value;
  if (!reg||!type||!loc||!rent||!owner) { showToast(t('toast_fill_all'),'error'); return; }
  const db = getDB();
  db.tractors.push({id:db.nextTractorId++, registrationNumber:reg, tractorType:type, location:loc, rentPerHour:rent, available:true, reservedSlot:null, ownerUsername:owner, accessories:getSelectedAccs('admin-acc-grid')});
  saveDB(db);
  showToast(t('toast_tractor_added'));
  ['a-regNum','a-tractorType','a-location','a-rent'].forEach(id=>document.getElementById(id).value='');
  buildAccGrid('admin-acc-grid');
  renderAdminStats(); renderAdminTractors();
}
function renderAdminTractors() {
  const db = getDB();
  const q = (document.getElementById('a-search').value||'').toLowerCase();
  const rows = db.tractors.filter(t=>!q||t.registrationNumber.toLowerCase().includes(q)||t.tractorType.toLowerCase().includes(q)||t.location.toLowerCase().includes(q));
  const tbody = document.getElementById('a-tractors-table');
  if (!rows.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">🔍</span>${t('empty_no_tractors')}</div></td></tr>`; return; }
  tbody.innerHTML = rows.map(tr=>`
    <tr>
      <td><code style="font-size:12px;">#${tr.id}</code></td>
      <td><strong>${tr.registrationNumber}</strong></td>
      <td>${tr.tractorType}</td>
      <td><span style="background:rgba(230,126,34,0.15);color:#c0392b;padding:2px 8px;border-radius:12px;font-size:12px;">${tr.ownerUsername||'-'}</span></td>
      <td>📍 ${tr.location}</td>
      <td><span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span></td>
      <td><strong>₹${tr.rentPerHour}</strong></td>
      <td style="max-width:160px;">${(tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon} ${t('acc_'+x.id)}</span>`:''}).join('')||'-'}</td>
      <td>
        <div class="btn-group">
          <button class="btn btn-amber btn-sm" onclick="openEditTractor(${tr.id})">${t('btn_edit')}</button>
          <button class="btn btn-red btn-sm" onclick="deleteTractor(${tr.id})">${t('btn_del')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}
function renderAdminBookings() {
  const db = getDB();
  const tbody = document.getElementById('a-bookings-table');
  if (!db.bookings.length) { tbody.innerHTML = `<tr><td colspan="10"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings')}</div></td></tr>`; return; }
  tbody.innerHTML = db.bookings.map(b=>{
    const bt = db.tractors.find(x=>x.id===b.tractorId);
    return `<tr>
      <td><code>#${b.id}</code></td>
      <td>${bt?bt.registrationNumber:'-'}</td>
      <td>${b.customerName}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td><span style="font-size:12px;background:rgba(0,0,0,0.07);padding:2px 8px;border-radius:8px;">${b.paymentMethod}</span></td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>
        ${b.status==='Upcoming'?`<button class="btn btn-green btn-sm" onclick="adminCompleteBooking(${b.id})">${t('btn_complete')}</button>`:''}
        <button class="btn btn-red btn-sm" onclick="adminDeleteBooking(${b.id})">${t('btn_del')}</button>
      </td>
    </tr>`;
  }).join('');
}
function renderAdminUsers() {
  const db = getDB();
  const ROLE_COLORS = {ADMIN:'role-admin',OWNER:'role-owner',USER:'role-user'};
  document.getElementById('a-users-table').innerHTML = db.users.map(u=>`
    <tr>
      <td><code>#${u.id}</code></td>
      <td><strong>${u.username}</strong></td>
      <td><span class="nav-role-badge ${ROLE_COLORS[u.role]||'role-user'}">${u.role}</span></td>
      <td style="font-size:12px;color:#888;">${u.joined||'-'}</td>
      <td>${u.role!=='ADMIN'?`<button class="btn btn-red btn-sm" onclick="adminDeleteUser(${u.id})">${t('btn_remove')}</button>`:'-'}</td>
    </tr>
  `).join('');
}
function adminCompleteBooking(id) {
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Completed';
  const tt = db.tractors.find(x=>x.id===b.tractorId);
  if (tt) { tt.available=true; tt.reservedSlot=null; }
  saveDB(db); renderAdminBookings(); renderAdminStats(); renderAdminTractors();
  showToast(t('toast_booking_completed_admin'));
}
function adminDeleteBooking(id) {
  if (!confirm('Delete this booking?')) return;
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (b && b.status==='Upcoming') {
    const tt = db.tractors.find(x=>x.id===b.tractorId);
    if (tt) { tt.available=true; tt.reservedSlot=null; }
  }
  db.bookings = db.bookings.filter(x=>x.id!==id);
  saveDB(db); renderAdminBookings(); renderAdminStats(); renderAdminTractors();
  showToast(t('toast_booking_deleted'));
}
function adminDeleteUser(id) {
  if (!confirm('Remove this user?')) return;
  const db = getDB();
  db.users = db.users.filter(u=>u.id!==id);
  saveDB(db); renderAdminUsers(); populateOwnerDropdown();
  showToast(t('toast_user_removed'));
}

// ═══════════════════════════════════════════════════
//  EDIT TRACTOR (shared admin + owner)
// ═══════════════════════════════════════════════════
function openEditTractor(id) {
  const db = getDB();
  const t = db.tractors.find(x=>x.id===id);
  if (!t) return;
  document.getElementById('et-id').value = id;
  document.getElementById('et-regNum').value = t.registrationNumber;
  document.getElementById('et-type').value = t.tractorType;
  document.getElementById('et-location').value = t.location;
  document.getElementById('et-rent').value = t.rentPerHour;
  buildAccGrid('et-acc-grid', t.accessories||[]);
  openModal('editTractorModalOverlay');
}
function saveTractorEdit() {
  const id = parseInt(document.getElementById('et-id').value);
  const db = getDB();
  const et = db.tractors.find(x=>x.id===id);
  if (!et) return;
  et.registrationNumber = document.getElementById('et-regNum').value.trim();
  et.tractorType = document.getElementById('et-type').value.trim();
  et.location = document.getElementById('et-location').value.trim();
  et.rentPerHour = parseInt(document.getElementById('et-rent').value);
  et.accessories = getSelectedAccs('et-acc-grid');
  saveDB(db);
  closeModal('editTractorModalOverlay');
  showToast(t('toast_tractor_updated'));
  if (currentUser.role==='ADMIN') { renderAdminTractors(); }
  else { renderOwnerTractors(); }
}
function deleteTractor(id) {
  if (!confirm('Delete this tractor? All its bookings will also be removed.')) return;
  const db = getDB();
  db.tractors = db.tractors.filter(t=>t.id!==id);
  db.bookings = db.bookings.filter(b=>b.tractorId!==id);
  saveDB(db); showToast(t('toast_tractor_deleted'));
  if (currentUser.role==='ADMIN') { renderAdminStats(); renderAdminTractors(); renderAdminBookings(); }
  else { renderOwnerStats(); renderOwnerTractors(); renderOwnerBookings(); }
}

// ═══════════════════════════════════════════════════
//  OWNER DASHBOARD
// ═══════════════════════════════════════════════════
function initOwner() {
  document.getElementById('owner-user-name').textContent = currentUser.username;
  document.getElementById('owner-welcome').textContent = `Welcome, ${currentUser.username}`;
  buildAccGrid('owner-acc-grid');
  renderOwnerStats();
  renderOwnerBookings();
  renderOwnerTractors();
}
function renderOwnerStats() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const myBookings = db.bookings.filter(b=>myTractors.find(t=>t.id===b.tractorId));
  const revenue = myBookings.filter(b=>b.status==='Completed').reduce((s,b)=>s+b.totalAmount,0);
  document.getElementById('o-total-bookings').textContent = myBookings.length;
  document.getElementById('o-revenue').textContent = '₹'+revenue.toLocaleString();
  document.getElementById('o-my-tractors').textContent = myTractors.length;
}
function renderOwnerBookings() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const myBookings = db.bookings.filter(b=>myTractors.find(t=>t.id===b.tractorId));
  const tbody = document.getElementById('o-bookings-table');
  if (!myBookings.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings')}</div></td></tr>`; return; }
  tbody.innerHTML = myBookings.map(b=>{
    const t = myTractors.find(x=>x.id===b.tractorId);
    return `<tr>
      <td>${t?t.registrationNumber:'-'}</td>
      <td>${b.customerName}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td><span style="font-size:12px;background:rgba(0,0,0,0.07);padding:2px 8px;border-radius:8px;">${b.paymentMethod}</span></td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>${b.status==='Upcoming'?`<button class="btn btn-green btn-sm" onclick="ownerCompleteBooking(${b.id})">${t('btn_complete')}</button>`:'-'}</td>
    </tr>`;
  }).join('');
}
function renderOwnerTractors() {
  const db = getDB();
  const myTractors = db.tractors.filter(t=>t.ownerUsername===currentUser.username);
  const tbody = document.getElementById('o-tractors-table');
  if (!myTractors.length) { tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state"><span class="empty-icon">🚜</span>${t('empty_no_tractors_add')}</div></td></tr>`; return; }
  tbody.innerHTML = myTractors.map(tr=>`
    <tr>
      <td><strong>${tr.registrationNumber}</strong></td>
      <td>${tr.tractorType}</td>
      <td>📍 ${tr.location}</td>
      <td>₹${tr.rentPerHour}/hr</td>
      <td><span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span></td>
      <td>${(tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon}</span>`:''}).join('')||'-'}</td>
      <td>
        <div class="btn-group">
          <button class="btn btn-amber btn-sm" onclick="openEditTractor(${tr.id})">${t('btn_edit')}</button>
          <button class="btn btn-red btn-sm" onclick="deleteTractor(${tr.id})">${t('btn_del')}</button>
        </div>
      </td>
    </tr>
  `).join('');
}
function ownerAddTractor() {
  const reg = document.getElementById('o-regNum').value.trim();
  const type = document.getElementById('o-tractorType').value.trim();
  const loc = document.getElementById('o-location').value.trim();
  const rent = parseInt(document.getElementById('o-rent').value);
  if (!reg||!type||!loc||!rent) { showToast(t('toast_fill_all'),'error'); return; }
  const db = getDB();
  db.tractors.push({id:db.nextTractorId++, registrationNumber:reg, tractorType:type, location:loc, rentPerHour:rent, available:true, reservedSlot:null, ownerUsername:currentUser.username, accessories:getSelectedAccs('owner-acc-grid')});
  saveDB(db);
  showToast(t('toast_tractor_added2'));
  ['o-regNum','o-tractorType','o-location','o-rent'].forEach(id=>document.getElementById(id).value='');
  buildAccGrid('owner-acc-grid');
  renderOwnerStats(); renderOwnerTractors();
  switchOwnerTab('my-tractors', document.querySelectorAll('.tab-btn')[1]);
}
function ownerCompleteBooking(id) {
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Completed';
  const t = db.tractors.find(x=>x.id===b.tractorId);
  if (t) { t.available=true; t.reservedSlot=null; }
  saveDB(db); renderOwnerBookings(); renderOwnerStats(); renderOwnerTractors();
  showToast(t('toast_booking_completed'));
}
function switchOwnerTab(tab, btn) {
  document.querySelectorAll('#page-owner .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#page-owner .tab-panel').forEach(p=>p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`owner-tab-${tab}`).classList.add('active');
}

// ═══════════════════════════════════════════════════
//  USER DASHBOARD
// ═══════════════════════════════════════════════════
function initUser() {
  document.getElementById('user-user-name').textContent = currentUser.username;
  renderUserStats();
  renderUserTractors();
  renderUserHistory();
  populateAccFilter();
}
function renderUserStats() {
  const db = getDB();
  const avail = db.tractors.filter(t=>t.available).length;
  const myB = db.bookings.filter(b=>b.customerName===currentUser.username);
  const spent = myB.reduce((s,b)=>s+b.totalAmount,0);
  document.getElementById('u-available').textContent = avail;
  document.getElementById('u-my-bookings').textContent = myB.length;
  document.getElementById('u-spent').textContent = '₹'+spent.toLocaleString();
}
function populateAccFilter() {
  const sel = document.getElementById('u-acc-filter');
  sel.innerHTML = '<option value="">All Accessories</option>' +
    ACCESSORIES_LIST.map(a=>`<option value="${a.id}">${a.icon} ${a.label}</option>`).join('');
}
function renderUserTractors() {
  const db = getDB();
  const q = (document.getElementById('u-search').value||'').toLowerCase();
  const locQ = (document.getElementById('u-location-search').value||'').toLowerCase();
  const accQ = document.getElementById('u-acc-filter').value;
  const tractors = db.tractors.filter(t=>{
    if (!q && !locQ && !accQ) return true;
    const matchQ = !q || t.registrationNumber.toLowerCase().includes(q) || t.tractorType.toLowerCase().includes(q);
    const matchLoc = !locQ || t.location.toLowerCase().includes(locQ);
    const matchAcc = !accQ || (t.accessories||[]).includes(accQ);
    return matchQ && matchLoc && matchAcc;
  });
  const grid = document.getElementById('u-tractor-grid');
  if (!tractors.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px;color:#aaa;"><span style="font-size:48px;display:block;margin-bottom:12px;">🔍</span>${t('no_match_search')}</div>`;
    return;
  }
  grid.innerHTML = tractors.map(tr=>{
    const accs = (tr.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon} ${t('acc_'+x.id)}</span>`:''}).join('');
    return `
    <div class="tractor-card">
      <div class="tractor-card-header">
        <div class="tractor-card-reg">${tr.registrationNumber}</div>
        <div class="tractor-card-type">${tr.tractorType}</div>
        <div class="tractor-card-status">
          <span class="badge ${tr.available?'badge-available':'badge-reserved'}">${tr.available?t('status_available'):t('status_reserved_lock')}</span>
        </div>
      </div>
      <div class="tractor-card-body">
        <div class="tractor-info-row">
          <span class="tractor-info-icon">📍</span>
          <span class="tractor-info-label">${t('label_location')}</span>
          <span class="tractor-info-value">${tr.location}</span>
        </div>
        <div class="tractor-info-row">
          <span class="tractor-info-icon">👤</span>
          <span class="tractor-info-label">${t('th_owner')}</span>
          <span class="tractor-info-value">${tr.ownerUsername||'—'}</span>
        </div>
        ${tr.reservedSlot?`<div class="tractor-info-row"><span class="tractor-info-icon">🕐</span><span class="tractor-info-label">${t('lbl_booked_slot')}</span><span class="tractor-info-value" style="font-size:12px;">${slotLabel(tr.reservedSlot)}</span></div>`:''}
        ${accs?`<div class="tractor-accessories">${accs}</div>`:''}
      </div>
      <div class="tractor-card-footer">
        <div class="rent-display">
          <div class="rent-amount">₹${tr.rentPerHour}</div>
          <div class="rent-unit">${t('per_hour')}</div>
        </div>
        <button class="btn btn-green" ${!tr.available?'disabled':''} onclick="openBookingModal(${tr.id})">
          ${tr.available?t('btn_book_now'):t('btn_reserved')}
        </button>
      </div>
    </div>`;
  }).join('');
}
function renderUserHistory() {
  const db = getDB();
  const myB = db.bookings.filter(b=>b.customerName===currentUser.username);
  const tbody = document.getElementById('u-history-table');
  if (!myB.length) { tbody.innerHTML = `<tr><td colspan="9"><div class="empty-state"><span class="empty-icon">📋</span>${t('empty_no_bookings_browse')}</div></td></tr>`; return; }
  tbody.innerHTML = myB.map(b=>{
    const t = db.tractors.find(x=>x.id===b.tractorId);
    const accs = (b.accessories||[]).map(a=>{const x=ACCESSORIES_LIST.find(l=>l.id===a);return x?`<span class="acc-tag">${x.icon}</span>`:''}).join('');
    return `<tr>
      <td>${t?`<strong>${t.registrationNumber}</strong><br><span style="font-size:11px;color:#888;">${t.tractorType}</span>`:'-'}</td>
      <td>${b.bookingDate}</td>
      <td style="font-size:12px;">${slotLabel(b.slot)}</td>
      <td>${b.hours}h</td>
      <td>${accs||'-'}</td>
      <td><strong>₹${b.totalAmount}</strong></td>
      <td>${b.paymentMethod}</td>
      <td><span class="badge badge-${b.status.toLowerCase()}">${statusBadgeLabel(b.status)}</span></td>
      <td>${b.status==='Upcoming'?`<button class="btn btn-red btn-sm" onclick="cancelBooking(${b.id})">${t('btn_cancel')}</button>`:'-'}</td>
    </tr>`;
  }).join('');
}
function switchUserTab(tab, btn) {
  document.querySelectorAll('#page-user .tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('#page-user .tab-panel').forEach(p=>p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`user-tab-${tab}`).classList.add('active');
  if (tab==='history') renderUserHistory();
}
function cancelBooking(id) {
  if (!confirm('Cancel this booking?')) return;
  const db = getDB();
  const b = db.bookings.find(x=>x.id===id);
  if (!b) return;
  b.status = 'Cancelled';
  const t = db.tractors.find(x=>x.id===b.tractorId);
  if (t) { t.available=true; t.reservedSlot=null; }
  saveDB(db); showToast(t('toast_booking_cancelled'));
  renderUserStats(); renderUserHistory(); renderUserTractors();
}

// ═══════════════════════════════════════════════════
//  BOOKING MODAL
// ═══════════════════════════════════════════════════
function openBookingModal(tractorId) {
  const db = getDB();
  const t = db.tractors.find(x=>x.id===tractorId);
  if (!t) return;
  document.getElementById('bk-tractorId').value = tractorId;
  document.getElementById('bk-rentPerHour').value = t.rentPerHour;
  document.getElementById('bk-tractorDisplay').value = `${t.registrationNumber} — ${t.tractorType}`;
  document.getElementById('bk-date').value = new Date().toISOString().split('T')[0];
  document.getElementById('bk-hours').value = 2;
  document.querySelectorAll('.slot-chip').forEach((c,i)=>c.classList.toggle('selected',i===0));
  document.querySelectorAll('.slot-chip input').forEach((r,i)=>{r.checked=i===0;});
  buildAccGrid('bk-acc-grid', t.accessories||[]);
  calcBookingTotal();
  openModal('bookingModalOverlay');
}
function selectSlot(el, val) {
  document.querySelectorAll('.slot-chip').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}
function calcBookingTotal() {
  const rent = parseInt(document.getElementById('bk-rentPerHour').value)||0;
  const hours = parseInt(document.getElementById('bk-hours').value)||0;
  const total = rent * hours;
  document.getElementById('bk-total').textContent = '₹' + total.toLocaleString();
  document.getElementById('bk-calc-hint').textContent = `${hours} hr${hours!==1?'s':''} × ₹${rent}/hr`;
}
function confirmBooking() {
  const tractorId = parseInt(document.getElementById('bk-tractorId').value);
  const date = document.getElementById('bk-date').value;
  const hours = parseInt(document.getElementById('bk-hours').value);
  const payment = document.getElementById('bk-payment').value;
  const rent = parseInt(document.getElementById('bk-rentPerHour').value);
  const slot = document.querySelector('.slot-chip.selected input')?.value || 'Morning (5AM - 9AM)';
  const accs = getSelectedAccs('bk-acc-grid');
  if (!date||!hours||hours<1) { showToast(t('toast_fill_booking'),'error'); return; }
  const db = getDB();
  const booking = {
    id: db.nextBookingId++,
    tractorId, customerName: currentUser.username,
    bookingDate: date, slot, hours,
    totalAmount: rent*hours,
    paymentMethod: payment,
    status: 'Upcoming',
    accessories: accs,
  };
  db.bookings.push(booking);
  const t = db.tractors.find(x=>x.id===tractorId);
  if (t) { t.available=false; t.reservedSlot=slot; }
  saveDB(db);
  closeModal('bookingModalOverlay');
  showToast(t('toast_booked', {amt: booking.totalAmount.toLocaleString(), payment}));
  renderUserStats(); renderUserTractors(); renderUserHistory();
}

// ═══════════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════════
updateHeroStats();

if (currentUser) {

  setTimeout(() => {

    routeToPage(currentUser.role);

    window.scrollTo(0, 0);

  }, 100);
}