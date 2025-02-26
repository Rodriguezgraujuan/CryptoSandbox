$(document).ready(function() {
    console.log("hola")
    $("#checkUserBtn").click(function() {
        $.ajax({
            url: "/checkUser",
            type: "GET",
            dataType: "text",
            success: function(response) {
                console.log("✅", response);
                window.location.href = "/home.html";
            },
            error: function(xhr) {
                console.log("❌ Anonymous user");
            }
        });
    });
});
