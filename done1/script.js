document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('greetingForm');

    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); // منع الإرسال الافتراضي

            // 1. جمع البيانات من النموذج
            const userName = document.getElementById('userName').value;
            const occasion = document.getElementById('occasion').value;
            const language = document.querySelector('input[name="language"]:checked').value;
            const recipientType = document.getElementById('recipientType').value;

            // 2. التحقق من البيانات الأساسية
            if (!userName || !occasion) {
                alert("الرجاء ملء اسم المستلم واختيار المناسبة.");
                return;
            }

            // 3. تخزين البيانات في Session Storage
            sessionStorage.setItem('userName', userName);
            sessionStorage.setItem('occasion', occasion);
            sessionStorage.setItem('language', language);
            sessionStorage.setItem('recipientType', recipientType);
            
            console.log("تم حفظ بيانات البطاقة بنجاح.");

            // 4. التوجيه إلى صفحة البطاقة
            window.location.href = 'greeting.html';
        });
    }

    // ----------------------------------------------------
    // منطق صفحة البطاقة (greeting.html) - لتحميل المحتوى
    
    if (document.body.classList.contains('greeting-page')) {
        loadGreetingCardContent();
    }
});

function loadGreetingCardContent() {
    // 1. استرجاع البيانات من Session Storage
    const userName = sessionStorage.getItem('userName');
    const occasion = sessionStorage.getItem('occasion');
    const language = sessionStorage.getItem('language');
    const recipientType = sessionStorage.getItem('recipientType');

    // 2. التحقق من وجود البيانات
    if (!userName || !occasion) {
        // إذا لم تتوفر البيانات، أعد التوجيه لصفحة الإدخال
        document.getElementById('messageBodyAr').textContent = "عذراً، لم يتم العثور على بيانات البطاقة. الرجاء العودة لصفحة الإدخال.";
        return; 
    }

    // 3. توليد المحتوى العربي والإنجليزية بناءً على الإدخالات
    
    // الترويسة
    const arabicTitle = `تهنئة خاصة بمناسبة ${occasion}، إلى ${userName}`;
    const englishTitle = `Special Greeting for ${occasion} to ${userName}`;
    document.getElementById('greetingTitle').textContent = arabicTitle;
    
    // نص الرسالة العربية (حسب نوع المستلم)
    const arabicMessageBody = `
        ${recipientType}، نتمنى لك كل التوفيق في مناسبة ${occasion}. 
        بكل فخر وسرور، نتقدم إليك بأجمل التهاني والتبريكات. نسأل الله أن يجعله مناسبة خير وبركة، وأن تستمر مسيرتك بالنجاح والتميز.
    `;
    document.getElementById('messageBodyAr').innerHTML = arabicMessageBody.trim();
    
    // نص الرسالة الإنجليزية
    const englishMessageBody = `
        Dear ${recipientType.split(' ')[0]} ${userName}, We wish you all the best on the occasion of ${occasion}.
        It is with great pride and pleasure that we extend our warmest congratulations and blessings to you. We wish you continued success and excellence in your journey.
    `;
    
    // عرض اللغة المطلوبة
    const enDiv = document.getElementById('englishContent');
    if (language === 'en') {
        document.getElementById('greetingTitle').textContent = englishTitle;
        document.getElementById('messageBodyAr').style.display = 'none';
        enDiv.innerHTML = englishMessageBody.trim();
    } else if (language === 'both') {
        enDiv.innerHTML = `<hr class="lang-separator"> 
                           <h3 class="message-title">English Message</h3>
                           <p class="message-body">${englishMessageBody.trim()}</p>`;
    } else {
        enDiv.style.display = 'none';
    }
}