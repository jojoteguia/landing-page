$(document).ready(function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        setEstimate();

        let email = $('#email').val();
        if(!isEmail(email)) {
            alert('Email inválido');
            return;
        }

        Promise.all([sendMail(this, 'estimate_form'), sendMail(this, 'contact_form')])
        .then(() => {
            $.modal.close();
            alert('Solicitação recebida. Entraremos em contato em breve');
        }).catch(() => {
            $.modal.close();
            alert('Ocorreu um erro, tente novamente mais tarde');
        });
        
    });
});

function sendMail(form, template) {
    return emailjs.sendForm('gmail', template, form);
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}