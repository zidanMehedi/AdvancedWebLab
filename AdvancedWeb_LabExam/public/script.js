$(document).ready(function(){

	$('#search').on('keyup',function()
	{
		var key = $('#search').val();
		$.ajax({
			url:'/home/uSearch/'+key,
			method:'GET',
			success: function(response){
				$('#data').html(response);
			},
			error: function(error){
				$('#data').html('');
			}
		});
	});

	/*$('#btn').on('click',function(){
		$.ajax({
			url:'/login',
			method:'POST',
			success: function(response){
				alert(response);
				}
			},
			error: function(error){
				//$('#msg').html('');
				alert(error);
			}
		});
	});*/

	$('#dlt').on('click',function()
	{
		var value=$('#dlt').val();
		alert(value);
		if(confirm('Are You Sure?')){
			$.ajax({
				url:'/home/delete/'+value,
				method:'GET',
				success: function(response){
					window.location = 'http://localhost:3000/home/alluser';
				},
				error: function(error){
					return false;
				}
			});
		}
	});
	$('#edit').on('click',function(){
		var value=$('#edit').val();
		window.location = 'http://localhost:3000/home/edit/'+value;
	});
});