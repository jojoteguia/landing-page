$(document).ready(function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        setEstimate();
        Promise.all([sendMail(this, 'estimate_form'), sendMail(this, 'contact_form')])
        .then(() => {
            $.modal.close();
            alert('success');
        }).catch(() => {
            $.modal.close();
            alert('error');
        });
        
    });
});

function sendMail(form, template) {
    return emailjs.sendForm('gmail', template, form);
}