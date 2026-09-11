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

  // ── Help Assistant — topic menu (added) ──
  help_topic_login: {en:"Login / Registration", te:"లాగిన్ / నమోదు"},
  help_topic_login_desc: {en:"Signing in or creating an account", te:"సైన్ ఇన్ చేయడం లేదా ఖాతా సృష్టించడం"},
  help_steps_login: {en:"Go to the Login tab on the welcome screen and enter your username and password.||New here? Switch to the Register tab, choose a username, password, and your role (Farmer/Owner/Admin).||Password reset isn't self-service yet — use \"Still need help\" below to contact Customer Support if you're locked out.", te:"స్వాగత స్క్రీన్‌లోని లాగిన్ ట్యాబ్‌కు వెళ్లి మీ వినియోగదారు పేరు మరియు పాస్‌వర్డ్‌ను నమోదు చేయండి.||కొత్తవారా? నమోదు ట్యాబ్‌కు మారి, వినియోగదారు పేరు, పాస్‌వర్డ్ మరియు మీ పాత్ర (రైతు/యజమాని/నిర్వాహకుడు) ఎంచుకోండి.||పాస్‌వర్డ్ రీసెట్ ఇంకా స్వయం-సేవ కాదు — లాక్ అయితే క్రింద \"ఇంకా సహాయం కావాలి\" ద్వారా కస్టమర్ కేర్‌ను సంప్రదించండి."},

  help_topic_find: {en:"Finding a Tractor", te:"ట్రాక్టర్‌ను కనుగొనడం"},
  help_topic_find_desc: {en:"Search and filter available tractors", te:"అందుబాటులో ఉన్న ట్రాక్టర్లను శోధించండి మరియు ఫిల్టర్ చేయండి"},
  help_steps_find: {en:"Go to the 'Browse Tractors' tab on your dashboard.||Use the search bar to filter by tractor type, registration number, or location.||Use the accessories filter to find tractors with the implements you need (rotavator, plough, trailer, etc.).", te:"మీ డాష్‌బోర్డ్‌లోని 'ట్రాక్టర్లను బ్రౌజ్ చేయండి' ట్యాబ్‌కు వెళ్లండి.||రకం, నమోదు సంఖ్య లేదా ప్రాంతం ద్వారా ఫిల్టర్ చేయడానికి శోధన బార్‌ను ఉపయోగించండి.||మీకు అవసరమైన ఉపకరణాలు (రోటావేటర్, నాగలి, ట్రైలర్ మొదలైనవి) ఉన్న ట్రాక్టర్లను కనుగొనడానికి ఉపకరణాల ఫిల్టర్‌ను ఉపయోగించండి."},

  help_topic_booking: {en:"Booking a Tractor", te:"ట్రాక్టర్‌ను బుక్ చేయడం"},
  help_topic_booking_desc: {en:"How to reserve a tractor & slot", te:"ట్రాక్టర్ & సమయాన్ని ఎలా రిజర్వ్ చేయాలి"},
  help_steps_booking: {en:"Open a tractor's card and tap 'Book Now'.||Pick a date, a time slot (Morning/Afternoon/Evening), the number of hours, and any accessories.||Review the total amount, choose a payment method, and confirm — the tractor is reserved instantly.", te:"ట్రాక్టర్ కార్డ్‌ను తెరిచి 'ఇప్పుడు బుక్ చేయండి' నొక్కండి.||తేదీ, సమయం (ఉదయం/మధ్యాహ్నం/సాయంత్రం), గంటల సంఖ్య మరియు ఏవైనా ఉపకరణాలను ఎంచుకోండి.||మొత్తం మొత్తాన్ని సమీక్షించి, చెల్లింపు విధానాన్ని ఎంచుకుని, నిర్ధారించండి — ట్రాక్టర్ తక్షణమే రిజర్వ్ అవుతుంది."},

  help_topic_payment: {en:"Payment", te:"చెల్లింపు"},
  help_topic_payment_desc: {en:"Methods, totals & refunds", te:"విధానాలు, మొత్తాలు & వాపసులు"},
  help_steps_payment: {en:"Available methods are UPI, Cash, and Card — choose one while confirming your booking.||The total is calculated as hours × rent per hour, shown before you confirm.||Had a payment issue or need a refund? Use \"Still need help\" below to reach Customer Support with your booking details.", te:"అందుబాటులో ఉన్న విధానాలు UPI, నగదు మరియు కార్డ్ — బుకింగ్‌ను నిర్ధారించేటప్పుడు ఒకటి ఎంచుకోండి.||మొత్తం = గంటలు × గంటకు అద్దెగా లెక్కించి, నిర్ధారించే ముందు చూపబడుతుంది.||చెల్లింపు సమస్య లేదా వాపసు కావాలా? మీ బుకింగ్ వివరాలతో కస్టమర్ కేర్‌ను చేరుకోవడానికి క్రింద \"ఇంకా సహాయం కావాలి\" ఉపయోగించండి."},

  help_topic_status: {en:"Booking Status", te:"బుకింగ్ స్థితి"},
  help_topic_status_desc: {en:"Track your booking status", te:"మీ బుకింగ్ స్థితిని ట్రాక్ చేయండి"},
  help_steps_status: {en:"Go to 'My Bookings' on your dashboard to see all your bookings and their status.||Status can be Upcoming, Completed, or Cancelled.||Owners and Admins update a booking's status from their own dashboards as the rental progresses.", te:"మీ అన్ని బుకింగ్‌లు మరియు వాటి స్థితిని చూడటానికి డాష్‌బోర్డ్‌లోని 'నా బుకింగ్‌లు'కు వెళ్లండి.||స్థితి రాబోయే, పూర్తయింది లేదా రద్దు చేయబడింది కావచ్చు.||అద్దె పురోగమిస్తున్న కొద్దీ యజమానులు మరియు నిర్వాహకులు తమ డాష్‌బోర్డ్‌ల నుండి బుకింగ్ స్థితిని నవీకరించవచ్చు."},

  help_topic_cancel: {en:"Cancellation", te:"రద్దు"},
  help_topic_cancel_desc: {en:"Cancel an upcoming booking", te:"రాబోయే బుకింగ్‌ను రద్దు చేయండి"},
  help_steps_cancel: {en:"Go to 'My Bookings', find the booking, and tap 'Cancel' — this is only available for Upcoming bookings.||Cancelling frees up the tractor again for other users.||Refund timing for already-paid bookings depends on your payment method — contact Customer Support for refund status.", te:"'నా బుకింగ్‌లు'కు వెళ్లి, బుకింగ్‌ను కనుగొని 'రద్దు చేయి' నొక్కండి — ఇది రాబోయే బుకింగ్‌లకు మాత్రమే అందుబాటులో ఉంటుంది.||రద్దు చేయడం ఇతర వినియోగదారుల కోసం ట్రాక్టర్‌ను మళ్లీ అందుబాటులోకి తెస్తుంది.||ఇప్పటికే చెల్లించిన బుకింగ్‌లకు వాపసు సమయం మీ చెల్లింపు విధానంపై ఆధారపడి ఉంటుంది — వాపసు స్థితి కోసం కస్టమర్ కేర్‌ను సంప్రదించండి."},

  help_topic_account: {en:"Account / Profile", te:"ఖాతా / ప్రొఫైల్"},
  help_topic_account_desc: {en:"Your username, role & logout", te:"మీ వినియోగదారు పేరు, పాత్ర & లాగ్ అవుట్"},
  help_steps_account: {en:"Your username and role (Farmer/Owner/Admin) are shown in the top navigation bar.||Editing your profile (changing username or password yourself) isn't available yet — contact Customer Support for account changes.||To switch accounts, use Logout and sign back in with different credentials.", te:"మీ వినియోగదారు పేరు మరియు పాత్ర (రైతు/యజమాని/నిర్వాహకుడు) పైభాగంలోని నావిగేషన్ బార్‌లో చూపబడతాయి.||ప్రొఫైల్ ఎడిటింగ్ (వినియోగదారు పేరు లేదా పాస్‌వర్డ్‌ను మీరే మార్చుకోవడం) ఇంకా అందుబాటులో లేదు — ఖాతా మార్పుల కోసం కస్టమర్ కేర్‌ను సంప్రదించండి.||ఖాతాలను మార్చడానికి, లాగ్ అవుట్ చేసి వేరే వివరాలతో మళ్లీ సైన్ ఇన్ చేయండి."},

  help_topic_language: {en:"Language", te:"భాష"},
  help_topic_language_desc: {en:"Switch between English & Telugu", te:"ఇంగ్లీష్ & తెలుగు మధ్య మారండి"},
  help_steps_language: {en:"Open Settings → Language and pick English or Telugu.||The app switches instantly — no page reload, and your current screen stays exactly where it was.||Your choice is remembered the next time you visit.", te:"సెట్టింగ్‌లు → భాషను తెరిచి ఇంగ్లీష్ లేదా తెలుగును ఎంచుకోండి.||యాప్ తక్షణమే మారుతుంది — పేజీ రీలోడ్ లేదు, మీ ప్రస్తుత స్క్రీన్ అలాగే ఉంటుంది.||మీరు మళ్లీ సందర్శించినప్పుడు మీ ఎంపిక గుర్తుంచుకోబడుతుంది."},

  help_topic_other: {en:"Other Issue", te:"ఇతర సమస్య"},
  help_topic_other_desc: {en:"Ask anything else about the app", te:"యాప్ గురించి మరేదైనా అడగండి"},

  // ── Help Assistant — AI fallback chat (added) ──
  gemini_thinking: {en:"Thinking…", te:"ఆలోచిస్తోంది…"},
  gemini_no_key: {en:"The AI assistant isn't set up yet. Please pick a topic above, or contact Customer Support.", te:"AI సహాయకుడు ఇంకా సెటప్ చేయబడలేదు. దయచేసి పైన ఒక అంశాన్ని ఎంచుకోండి లేదా కస్టమర్ కేర్‌ను సంప్రదించండి."},
  gemini_error: {en:"Sorry, I couldn't reach the assistant right now. Please try again or contact Customer Support.", te:"క్షమించండి, ప్రస్తుతం సహాయకుడిని చేరుకోలేకపోయాను. దయచేసి మళ్లీ ప్రయత్నించండి లేదా కస్టమర్ కేర్‌ను సంప్రదించండి."},
  help_ask_own: {en:"Or ask a question in your own words", te:"లేదా మీ స్వంత మాటల్లో ప్రశ్న అడగండి"},
  ph_ask_gemini: {en:"Type your question...", te:"మీ ప్రశ్నను టైప్ చేయండి..."},
  btn_ask_send: {en:"Ask →", te:"అడగండి →"},
  chat_disclaimer: {en:"AI-generated answers — may not always be accurate.", te:"AI రూపొందించిన సమాధానాలు — ఎల్లప్పుడూ ఖచ్చితమైనవి కాకపోవచ్చు."},
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
