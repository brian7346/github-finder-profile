$(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;

		$.ajax({
			url: 'https://api.github.com/users/'+ username,
			data:{
				client_id:'f3ef447f472fc9dae81e',
				client_secret:'6bb175bd26532dbf709dd8855fdbf08ad106562d'
			}
		}).done(function(user){
			$.ajax({
				url:"https://api.github.com/users/"+ username+"/repos",
				data:{
				client_id:'f3ef447f472fc9dae81e',
				client_secret:'6bb175bd26532dbf709dd8855fdbf08ad106562d',
				sort: 'created: asc',
				per_page:5
			}
			}).done(function(repos){
				$.each(repos, function(index, repo){
					$('#repos').append(`
						<div class="well">
							<div class="row">
								<div class="col-md-7">
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3">
									<span class="label label-default">Forks: ${repo.forks_count}</span>
									<span class="label label-primary">Просмотрело: ${user.watchers_count}</span>
									<span class="label label-success">Звезд:${user.stargazers_count}</span>
								</div>
								<div class="col-md-2">
									<a href="${repo.html_url}" target="_blank" class="btn btn-default">Посмотреть</a>
								</div>
							</div>
						</div>
					`);
				});
			});

			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				  	<div class="row">
						<div class="col-md-3">
							
				<img style="width: 100%"class="thumpnail" src="${user.avatar_url}">
				<hr>
				<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">Просмотреть профиль</a>
						</div>

						<div class="col-md-9">
							<span class="label label-default">Репозиториев: ${user.public_repos}</span>
							<span class="label label-primary">Gits: ${user.public_gits}</span>
							<span class="label label-success">Подписчики:${user.followers}</span>
							<span class="label label-info">Подписан на:${user.following}</span>

							<br><br>

						<ul class="list-group">
							<li class="list-group-item">Компания: ${user.company}</li>
							<li class="list-group-item">Блог: ${user.blog}</li>
							<li class="list-group-item">Местоположение: ${user.location}</li>
							<li class="list-group-item">Created at: ${user.created_at}</li>
						</ul>
						</div>

						
				  	</div>
				  </div>
				</div>

				<h3 class="page-header">Последние репозитории</h3>
				<div id="repos"></div>
				`);
		});
	});
})