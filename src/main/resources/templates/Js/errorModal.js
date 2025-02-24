let credentialsErrorModal = new bootstrap.Modal(document.getElementById('credentialsErrorModal'));
let param = new URLSearchParams(window.location.search);
if (param.get("error") === 'true') {
    credentialsErrorModal.show();
}