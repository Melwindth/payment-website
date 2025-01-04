const emailForm = document.getElementById('emailForm');
const paymentSection = document.getElementById('paymentSection');
const qrCodeDiv = document.getElementById('qr-code');

emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;

    // Show payment section
    paymentSection.style.display = 'block';

    // Generate QR Code for UPI payment
    const upiLink = `upi://pay?pa=yourupi@bank&pn=YourName&am=100&cu=INR`;
    qrCodeDiv.innerHTML = '';
    new QRCode(qrCodeDiv, {
        text: upiLink,
        width: 200,
        height: 200,
    });

    // Send email to backend
    fetch('https://your-backend-url/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
    });
});
