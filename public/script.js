function requestUsers(){
	$("#userListRecords").html("");
	$.ajax({
        url: "http://localhost:3333/user",
        type: "get",
        dataType:'json',
        success: function (users) {
        	for (var i = 0; i < users.length; i++) {
        		var html = ""
        		html = "<tr><td>"+users[i].first_name+"</td><td>"+users[i].first_name+"</td><td>"+users[i].last_name+"</td></tr>";
        		$("#userListRecords").append(html);
        	}
        	console.log(users);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function retrieveUser(event){

	event.preventDefault();
	$.ajax({
        url: "http://localhost:3333/user/"+$("#userId").val(),
        type: "get",
        dataType:'json',
        success: function (user) {
        	console.log()
        	$("#firstName2").val(user.first_name);
        	$("#lastName2").val(user.last_name);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
function deleteUser(id){
	$("#userRecords").html("");
	$.ajax({
        url: "http://localhost:3333/user/"+id,
        type: "delete",
        success: function (user) {
        	$.ajax({
		        url: "http://localhost:3333/user",
		        type: "get",
		        dataType:'json',
		        success: function (users) {
		        	console.log(users);
		        	for (var i = 0; i < users.length; i++) {
		        		var html = ""
		        		html = "<tr><td>"+users[i].first_name+"</td><td>"+users[i].first_name+"</td><td>"+users[i].last_name+"</td><td><input type='button' value='Delete' onClick='deleteUser("+users[i].id+")' ></tr>";
		        		$("#userRecords").append(html);
		        	}
		        },
		        error: function(jqXHR, textStatus, errorThrown) {
		           console.log(textStatus, errorThrown);
		        }
		    });
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}
$("document").ready(function(){
	$.ajax({
        url: "http://localhost:3333/user",
        type: "get",
        dataType:'json',
        success: function (users) {
        	for (var i = 0; i < users.length; i++) {
        		var html = ""
        		html = "<tr><td>"+users[i].first_name+"</td><td>"+users[i].first_name+"</td><td>"+users[i].last_name+"</td><td><input type='button' value='Delete' onClick='deleteUser("+users[i].id+")' ></tr>";
        		$("#userRecords").append(html);
        	}
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
	$(".submit-user").on("click",function(){
		var formData = {
			first_name: $("#firstName").val(),
			last_name: $("#lastName").val(),
			age: $("#age").val(),
		};

	    $.ajax({
			type: "POST",
			url: "http://localhost:3333/user",
			data: formData,
			dataType: "json",
			encode: true,
			success: function (users) {
	        	console.log("done inserting");
	        },
	        error: function(jqXHR, textStatus, errorThrown) {
	           console.log(textStatus, errorThrown);
	        }
	    });
	});
});