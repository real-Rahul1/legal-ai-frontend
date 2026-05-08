'use strict';

// ====== TRANSLATIONS ======
const TRANSLATIONS = {
  en: {
    // Nav
    navTagline: 'न्याय मित्र',

    // Index page
    heroBadge: '🇮🇳 Built for Indian Citizens',
    heroTitle1: 'Know Your',
    heroTitle2: 'Rights.',
    heroTitle3: 'Assert Your',
    heroTitle4: 'Freedom.',
    heroSub: 'Police stopped you? Landlord trouble? Workplace harassment? Get instant legal guidance based on Indian laws — in plain language.',
    startBtn: 'Start Chatting — Free & Instant',
    loginNote: 'No sign-up required. Ask your legal question right away.',
    pill1: '🚔 Police & Arrest Rights',
    pill2: '🏍️ Traffic Laws',
    pill3: '🏠 Property & Rent',
    pill4: '👷 Labour Rights',
    pill5: '🛒 Consumer Protection',
    pill6: '👨‍👩‍👧 Family Law',
    lawsTitle: 'Grounded in Indian Law',
    footerDisclaimer: '⚖️ <strong>Nyay Mitra</strong> provides legal information, not legal advice. For court matters, consult a licensed advocate.',
    footerEmergency: 'Emergency: <strong>100</strong> (Police) | <strong>112</strong> (National Emergency) | <strong>1091</strong> (Women Helpline)',

    // Chat page sidebar
    newQuery: 'New Query',
    quickLabel: 'Quick Questions',
    q1: '🏍️ Police stopped my bike',
    q1text: 'Police just stopped my bike. What are my rights and what documents do I need to show?',
    q2: '🚔 I\'ve been arrested',
    q2text: 'I have been arrested. What are my rights during arrest under Indian law?',
    q3: '🏠 Illegal eviction threat',
    q3text: 'My landlord is trying to evict me illegally. What are my rights as a tenant in India?',
    q4: '💼 Employer not paying salary',
    q4text: 'My employer is not paying my salary. What legal options do I have under Indian labour law?',
    q5: '🛒 Defective product complaint',
    q5text: 'I bought a defective product online. How can I file a consumer complaint in India?',
    q6: '📄 How to file RTI',
    q6text: 'I want to file an RTI application. How do I do it and what can I ask for?',
    recentChats: 'Recent Chats',
    noChats: 'No chats yet',
    loadingHistory: 'Loading history...',
    failedLoad: 'Failed to load',

    // Chat welcome screen
    welcomeTitle: 'Namaste! I\'m Nyay Mitra',
    welcomeSub: 'Your AI-powered Indian Legal Assistant. Ask me anything about your rights, laws, and legal procedures in India.',
    chip1: 'Fundamental Rights',
    chip1text: 'What are my fundamental rights under the Indian Constitution?',
    chip2: 'How to file FIR',
    chip2text: 'How to file an FIR with the police?',
    chip3: 'Section 498A IPC',
    chip3text: 'What is Section 498A of IPC?',
    chip4: 'Traffic Stop Rights',
    chip4text: 'What documents are required when police stop you on road?',
    disclaimer: 'Nyay Mitra provides legal <strong>information</strong>, not legal advice. For court matters or complex situations, please consult a licensed advocate.',

    // Input area
    inputPlaceholder: 'Ask your legal question in English or Hindi... (e.g. \'Police ne meri bike rok li, kya karu?\')',
    inputNote: 'Emergency: <strong>100</strong> Police | <strong>112</strong> National | <strong>1091</strong> Women',

    // Errors
    deleteConfirm: 'Delete this chat?',
    errorMsg: '❌ Sorry, I couldn\'t process your request. Please try again.',
    failedDelete: 'Failed to delete chat.',
    failedChat: 'Failed to load chat.',
  },

  hi: {
    navTagline: 'न्याय मित्र',

    heroBadge: '🇮🇳 भारतीय नागरिकों के लिए',
    heroTitle1: 'जानिए अपने',
    heroTitle2: 'अधिकार।',
    heroTitle3: 'करें अपनी',
    heroTitle4: 'आज़ादी का दावा।',
    heroSub: 'पुलिस ने रोका? मकान मालिक से झगड़ा? कार्यस्थल पर उत्पीड़न? भारतीय कानूनों के आधार पर तुरंत कानूनी मार्गदर्शन पाएं — सरल भाषा में।',
    startBtn: 'अभी चैट शुरू करें — मुफ्त और तुरंत',
    loginNote: 'कोई साइन-अप नहीं। सीधे अपना कानूनी सवाल पूछें।',
    pill1: '🚔 पुलिस और गिरफ्तारी अधिकार',
    pill2: '🏍️ ट्रैफिक कानून',
    pill3: '🏠 संपत्ति और किराया',
    pill4: '👷 श्रम अधिकार',
    pill5: '🛒 उपभोक्ता संरक्षण',
    pill6: '👨‍👩‍👧 पारिवारिक कानून',
    lawsTitle: 'भारतीय कानून पर आधारित',
    footerDisclaimer: '⚖️ <strong>न्याय मित्र</strong> कानूनी जानकारी प्रदान करता है, कानूनी सलाह नहीं। न्यायालय के मामलों में किसी वकील से परामर्श लें।',
    footerEmergency: 'आपातकाल: <strong>100</strong> (पुलिस) | <strong>112</strong> (राष्ट्रीय आपातकाल) | <strong>1091</strong> (महिला हेल्पलाइन)',

    newQuery: 'नई जानकारी',
    quickLabel: 'त्वरित प्रश्न',
    q1: '🏍️ पुलिस ने बाइक रोकी',
    q1text: 'पुलिस ने मेरी बाइक रोकी। मेरे क्या अधिकार हैं और कौन से दस्तावेज़ दिखाने होंगे?',
    q2: '🚔 मुझे गिरफ्तार किया गया',
    q2text: 'मुझे गिरफ्तार किया गया है। भारतीय कानून के तहत गिरफ्तारी के दौरान मेरे क्या अधिकार हैं?',
    q3: '🏠 अवैध बेदखली का खतरा',
    q3text: 'मेरा मकान मालिक मुझे अवैध रूप से बेदखल करने की कोशिश कर रहा है। भारत में किरायेदार के रूप में मेरे क्या अधिकार हैं?',
    q4: '💼 नियोक्ता वेतन नहीं दे रहा',
    q4text: 'मेरा नियोक्ता मुझे वेतन नहीं दे रहा। भारतीय श्रम कानून के तहत मेरे पास क्या कानूनी विकल्प हैं?',
    q5: '🛒 दोषपूर्ण उत्पाद की शिकायत',
    q5text: 'मैंने ऑनलाइन दोषपूर्ण उत्पाद खरीदा। भारत में उपभोक्ता शिकायत कैसे दर्ज करें?',
    q6: '📄 RTI कैसे दायर करें',
    q6text: 'मैं RTI आवेदन दाखिल करना चाहता हूँ। यह कैसे करें और क्या मांग सकते हैं?',
    recentChats: 'हाल की बातचीत',
    noChats: 'अभी कोई बातचीत नहीं',
    loadingHistory: 'इतिहास लोड हो रहा है...',
    failedLoad: 'लोड करने में विफल',

    welcomeTitle: 'नमस्ते! मैं न्याय मित्र हूँ',
    welcomeSub: 'आपका AI-संचालित भारतीय कानूनी सहायक। भारत में अपने अधिकारों, कानूनों और कानूनी प्रक्रियाओं के बारे में कुछ भी पूछें।',
    chip1: 'मौलिक अधिकार',
    chip1text: 'भारतीय संविधान के तहत मेरे मौलिक अधिकार क्या हैं?',
    chip2: 'FIR कैसे दर्ज करें',
    chip2text: 'पुलिस में FIR कैसे दर्ज करें?',
    chip3: 'IPC धारा 498A',
    chip3text: 'IPC की धारा 498A क्या है?',
    chip4: 'ट्रैफिक स्टॉप अधिकार',
    chip4text: 'जब पुलिस रास्ते में रोके तो कौन से दस्तावेज़ चाहिए?',
    disclaimer: 'न्याय मित्र कानूनी <strong>जानकारी</strong> प्रदान करता है, कानूनी सलाह नहीं। न्यायालय के मामलों में कृपया किसी वकील से परामर्श लें।',

    inputPlaceholder: 'अपना कानूनी प्रश्न हिंदी या अंग्रेजी में पूछें... (जैसे: पुलिस ने मेरी बाइक रोकी, क्या करूँ?)',
    inputNote: 'आपातकाल: <strong>100</strong> पुलिस | <strong>112</strong> राष्ट्रीय | <strong>1091</strong> महिला',

    deleteConfirm: 'इस बातचीत को हटाएं?',
    errorMsg: '❌ क्षमा करें, आपका अनुरोध संसाधित नहीं हो सका। कृपया पुनः प्रयास करें।',
    failedDelete: 'बातचीत हटाने में विफल।',
    failedChat: 'बातचीत लोड करने में विफल।',
  },

  bn: {
    navTagline: 'ন্যায় মিত্র',

    heroBadge: '🇮🇳 ভারতীয় নাগরিকদের জন্য',
    heroTitle1: 'জানুন আপনার',
    heroTitle2: 'অধিকার।',
    heroTitle3: 'দাবি করুন',
    heroTitle4: 'স্বাধীনতা।',
    heroSub: 'পুলিশ থামিয়েছে? বাড়িওয়ালার সমস্যা? কর্মক্ষেত্রে হয়রানি? ভারতীয় আইনের ভিত্তিতে তাৎক্ষণিক আইনি নির্দেশনা পান — সহজ ভাষায়।',
    startBtn: 'এখনই চ্যাট শুরু করুন — বিনামূল্যে',
    loginNote: 'কোনো সাইন-আপ দরকার নেই। সরাসরি আপনার আইনি প্রশ্ন জিজ্ঞাসা করুন।',
    pill1: '🚔 পুলিশ ও গ্রেফতার অধিকার',
    pill2: '🏍️ ট্রাফিক আইন',
    pill3: '🏠 সম্পত্তি ও ভাড়া',
    pill4: '👷 শ্রম অধিকার',
    pill5: '🛒 ভোক্তা সুরক্ষা',
    pill6: '👨‍👩‍👧 পারিবারিক আইন',
    lawsTitle: 'ভারতীয় আইনের উপর ভিত্তি করে',
    footerDisclaimer: '⚖️ <strong>ন্যায় মিত্র</strong> আইনি তথ্য প্রদান করে, আইনি পরামর্শ নয়। আদালতের বিষয়ে একজন আইনজীবীর পরামর্শ নিন।',
    footerEmergency: 'জরুরি: <strong>100</strong> (পুলিশ) | <strong>112</strong> (জাতীয় জরুরি) | <strong>1091</strong> (মহিলা হেল্পলাইন)',

    newQuery: 'নতুন প্রশ্ন',
    quickLabel: 'দ্রুত প্রশ্ন',
    q1: '🏍️ পুলিশ বাইক থামিয়েছে',
    q1text: 'পুলিশ আমার বাইক থামিয়েছে। আমার কী অধিকার আছে এবং কী কাগজপত্র দেখাতে হবে?',
    q2: '🚔 আমাকে গ্রেফতার করা হয়েছে',
    q2text: 'আমাকে গ্রেফতার করা হয়েছে। ভারতীয় আইনে গ্রেফতারের সময় আমার কী অধিকার আছে?',
    q3: '🏠 অবৈধ উচ্ছেদের হুমকি',
    q3text: 'আমার বাড়িওয়ালা আমাকে অবৈধভাবে উচ্ছেদ করার চেষ্টা করছে। ভারতে ভাড়াটে হিসেবে আমার কী অধিকার আছে?',
    q4: '💼 নিয়োগকর্তা বেতন দিচ্ছে না',
    q4text: 'আমার নিয়োগকর্তা বেতন দিচ্ছে না। ভারতীয় শ্রম আইনে আমার কী আইনি বিকল্প আছে?',
    q5: '🛒 ত্রুটিপূর্ণ পণ্যের অভিযোগ',
    q5text: 'আমি অনলাইনে ত্রুটিপূর্ণ পণ্য কিনেছি। ভারতে কীভাবে ভোক্তা অভিযোগ দায়ের করব?',
    q6: '📄 RTI কীভাবে দাখিল করবেন',
    q6text: 'আমি RTI আবেদন করতে চাই। এটি কীভাবে করব এবং কী চাইতে পারি?',
    recentChats: 'সাম্প্রতিক কথোপকথন',
    noChats: 'এখনো কোনো কথোপকথন নেই',
    loadingHistory: 'ইতিহাস লোড হচ্ছে...',
    failedLoad: 'লোড করতে ব্যর্থ',

    welcomeTitle: 'নমস্কার! আমি ন্যায় মিত্র',
    welcomeSub: 'আপনার AI-চালিত ভারতীয় আইনি সহকারী। ভারতে আপনার অধিকার, আইন ও আইনি পদ্ধতি সম্পর্কে যেকোনো প্রশ্ন করুন।',
    chip1: 'মৌলিক অধিকার',
    chip1text: 'ভারতীয় সংবিধানের অধীনে আমার মৌলিক অধিকার কী কী?',
    chip2: 'FIR কীভাবে দায়ের করবেন',
    chip2text: 'পুলিশে FIR কীভাবে দায়ের করবেন?',
    chip3: 'IPC ধারা 498A',
    chip3text: 'IPC-এর ধারা 498A কী?',
    chip4: 'ট্রাফিক স্টপ অধিকার',
    chip4text: 'পুলিশ রাস্তায় থামালে কী কী কাগজপত্র লাগে?',
    disclaimer: 'ন্যায় মিত্র আইনি <strong>তথ্য</strong> প্রদান করে, আইনি পরামর্শ নয়। আদালতের বিষয়ে বা জটিল পরিস্থিতিতে অনুগ্রহ করে একজন আইনজীবীর পরামর্শ নিন।',

    inputPlaceholder: 'বাংলা বা ইংরেজিতে আপনার আইনি প্রশ্ন করুন...',
    inputNote: 'জরুরি: <strong>100</strong> পুলিশ | <strong>112</strong> জাতীয় | <strong>1091</strong> মহিলা',

    deleteConfirm: 'এই কথোপকথন মুছে ফেলবেন?',
    errorMsg: '❌ দুঃখিত, আপনার অনুরোধ প্রক্রিয়া করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।',
    failedDelete: 'কথোপকথন মুছতে ব্যর্থ।',
    failedChat: 'কথোপকথন লোড করতে ব্যর্থ।',
  }
};

// Language names for display
const LANG_LABELS = {
  en: 'EN',
  hi: 'हिं',
  bn: 'বাং'
};

// ====== LANGUAGE MANAGER ======
const LangManager = {
  current: 'en',

  init() {
    this.current = localStorage.getItem('nyayMitraLang') || 'en';
  },

  set(lang) {
    if (!TRANSLATIONS[lang]) return;
    this.current = lang;
    localStorage.setItem('nyayMitraLang', lang);
  },

  t(key) {
    return TRANSLATIONS[this.current][key] || TRANSLATIONS['en'][key] || key;
  }
};

// ====== BUILD LANGUAGE SWITCHER (DROPDOWN) ======
function buildLangSwitcher(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'lang-dropdown-wrapper';

  const select = document.createElement('select');
  select.className = 'lang-dropdown';
  select.setAttribute('aria-label', 'Select language');
  select.id = 'langDropdown_' + containerId;

  Object.entries(LANG_LABELS).forEach(([code, label]) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = label;
    if (LangManager.current === code) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', () => switchLanguage(select.value));
  wrapper.appendChild(select);
  container.appendChild(wrapper);
}

function switchLanguage(lang) {
  LangManager.set(lang);
  // Sync all dropdowns
  document.querySelectorAll('.lang-dropdown').forEach(sel => {
    sel.value = lang;
  });
  // Re-apply translations
  applyTranslations();
}

// ====== APPLY TRANSLATIONS TO DOM ======
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = LangManager.t(key);
    if (el.dataset.i18nHtml) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = LangManager.t(el.dataset.i18nPlaceholder);
  });

  document.querySelectorAll('[data-i18n-data-q]').forEach(el => {
    el.dataset.q = LangManager.t(el.dataset.i18nDataQ);
  });
}

// Export
window.LangManager = LangManager;
window.buildLangSwitcher = buildLangSwitcher;
window.applyTranslations = applyTranslations;
window.switchLanguage = switchLanguage;
