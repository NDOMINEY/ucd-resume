function fetchGitHubInformation(){

    var username = $("#gh-username").val();
    
    if (!username){
        $("#gh-user-data").html("<h2>Please enter a Github Username</h2>");
        return;
    }
 
    $("#gh-user-data").html(`
    <div id="loader">
        <img src="assets/images/loader.gif" alt="Loading...."/>
    </div>`);

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`)
    ).then(function(response){
        var userData = response;

        $("#gh-user-data").html(userInformationHTML(userData));
    }, function(errorResponse){
        if(errorResponse.status === 404){
            $("#gh-user-data").html(`<h2>No info found for ${username}</h2>`)
        } else {
            console.log(errorResponse);
            $("#gh-user-data").html(
                `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
        }
    }
    )

}
