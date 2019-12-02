$(document).ready(function () {
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault();
        setEstimate();
        sendMail(this, 'estimate_form');
        sendMail(this, 'contact_form');
    });
});

function sendMail(form, template) {
    emailjs.sendForm('gmail', template, form)
        .then(function (response) {
            $.modal.close()
            document.getElementById("contact-form").reset();
            alert("E-mail enviado, aguarde nosso retorno em breve!");
        },
            function (error) {
                console.log(error);
                $.modal.close()
                alert("Ocorreu um erro tente novamente mais tarde");
            });
}