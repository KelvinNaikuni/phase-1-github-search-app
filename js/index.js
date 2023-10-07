document.addEventListener('DOMContentLoaded', function () {
  
  document.getElementById('github-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    searchGitHubUsers(searchTerm);
  });
});


function searchGitHubUsers(searchTerm) {
  // Create the URL for the GitHub User Search Endpoint
  const apiUrl = `https://api.github.com/search/users?q=${searchTerm}`;

  // Send a GET request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process and display user search results
      displayUserResults(data.items);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayUserResults(users) {
  const userList = document.getElementById('user-list');
  userList.innerHTML = ''; // Clear previous results

  users.forEach(user => {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
      <img src="${user.avatar_url}" alt="${user.login}" width="100">
      <h3>${user.login}</h3>
      <a href="${user.html_url}" target="_blank">View Profile</a>
    `;
    userList.appendChild(userItem);

    // Add click event to show user repositories
    userItem.addEventListener('click', () => {
      getUserRepositories(user.login);
    });
  });
}

function getUserRepositories(username) {
  // Create the URL for the GitHub User Repos Endpoint
  const apiUrl = `https://api.github.com/users/${username}/repos`;

  // Send a GET request
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process and display user repositories
      displayUserRepositories(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayUserRepositories(repositories) {
  const reposList = document.getElementById('repos-list');
  reposList.innerHTML = ''; // Clear previous repositories

  repositories.forEach(repo => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
    `;
    reposList.appendChild(repoItem);
  });
}

