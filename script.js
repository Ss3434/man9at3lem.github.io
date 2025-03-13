// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Handle subject card clicks
    const subjectCards = document.querySelectorAll(".subject-card");
    subjectCards.forEach(card => {
        card.addEventListener("click", function() {
            const subject = this.getAttribute("data-subject");
            localStorage.setItem("selectedSubject", subject);
            window.location.href = "study.html";
        });
    });

    // Initialize study page if we're on it
    if (window.location.pathname.includes("study.html")) {
        initializeStudyPage();
    }
});
// script.js
window.onload = function() {
    loadNotesFromStorage();
};

function saveNotes() {
    const notesText = document.getElementById('notes').value;
    localStorage.setItem('notes', notesText);
    showNotification('تم حفظ الملاحظات');
}

function clearNotes() {
    document.getElementById('notes').value = '';
    localStorage.removeItem('notes');
    showNotification('تم مسح الملاحظات');
}

function loadNotesFromStorage() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        document.getElementById('notes').value = notesText;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}
// script.js
window.onload = function() {
    loadNotesFromStorage();
};

function saveNotes() {
    const notesText = document.getElementById('notes').value;
    localStorage.setItem('notes', notesText);
    showNotification('تم حفظ الملاحظات');
}

function clearNotes() {
    document.getElementById('notes').value = '';
    localStorage.removeItem('notes');
    showNotification('تم مسح الملاحظات');
}

function loadNotesFromStorage() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        document.getElementById('notes').value = notesText;
    }
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function downloadNotes() {
    const notesText = localStorage.getItem('notes');
    if (notesText) {
        const downloadLink = document.createElement('a');
        downloadLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(notesText));
        downloadLink.setAttribute('download', 'notes.txt');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        showNotification('تم تحميل الملاحظات');
    } else {
        showNotification('لا توجد ملاحظات لتحميلها');
    }
}

document.getElementById('saveNotes').addEventListener('click', saveNotes);
document.getElementById('downloadNotes').addEventListener('click', downloadNotes);

document.getElementById('saveNotes').addEventListener('click', saveNotes);
function initializeStudyPage() {
    const subject = localStorage.getItem("selectedSubject");
    if (!subject) return;

    const subjects = {
        math: { title: "📐 الرياضيات", pdf: "math.pdf" },
        physics: { title: "⚡ الفيزياء", pdf: "physics.pdf" },
        chemistry: { title: "🧪 الكيمياء", pdf: "chemistry.pdf" },
        biology: { title: "🧬 الأحياء", pdf: "biology.pdf" }
    };

    document.getElementById("subject-title").innerText = subjects[subject].title;
    document.getElementById("pdf-frame").src = subjects[subject].pdf;
    
    // Load saved notes
    const savedNotes = localStorage.getItem(`${subject}-notes`);
    if (savedNotes) {
        document.getElementById("notes").value = savedNotes;
    }

    // Initialize zoom level
    window.currentZoom = 100;
}

function adjustZoom(direction) {
    const frame = document.getElementById("pdf-frame");
    const zoomLevel = document.getElementById("zoom-level");
    
    if (direction === 'in' && window.currentZoom < 200) {
        window.currentZoom += 10;
    } else if (direction === 'out' && window.currentZoom > 50) {
        window.currentZoom -= 10;
    }
    
    frame.style.transform = `scale(${window.currentZoom / 100})`;
    zoomLevel.textContent = `${window.currentZoom}%`;
}

function saveNotes() {
    const subject = localStorage.getItem("selectedSubject");
    const notes = document.getElementById("notes").value;
    localStorage.setItem(`${subject}-notes`, notes);
    showNotification("تم حفظ الملاحظات بنجاح");
}

function clearNotes() {
    if (confirm("هل أنت متأكد من مسح جميع الملاحظات؟")) {
        document.getElementById("notes").value = "";
        saveNotes();
    }
}

function downloadNotes() {
    const subject = localStorage.getItem("selectedSubject");
    const notes = document.getElementById("notes").value;
    
    if (!notes.trim()) {
        showNotification("لا توجد ملاحظات للتحميل", "error");
        return;
    }

    const blob = new Blob([notes], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ملاحظات-${subject}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

function showNotification(message, type = "success") {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.backgroundColor = type === "success" ? "var(--success)" : "var(--error)";
    notification.classList.add("show");
    
    setTimeout(() => {
        notification.classList.remove("show");
    }, 3000);
}

function goBack() {
    window.location.href = "index.html";
}

// Toggle view layout
document.getElementById("toggleView")?.addEventListener("click", function() {
    const layout = document.querySelector(".study-layout");
    layout.style.gridTemplateColumns = 
        layout.style.gridTemplateColumns === "1fr" ? "2fr 1fr" : "1fr";
});
