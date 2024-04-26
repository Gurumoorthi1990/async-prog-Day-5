//Getting all the html elements
const userInput=document.getElementById("username");
const getDetailsButton=document.getElementById("getDetails");
const profile=document.getElementById("profile");
const repo=document.getElementById("repo");

//getting user name from input and using async function to fetch the details from github
getDetailsButton.addEventListener("click",async()=>{
const userName = userInput.value;
//console.log(username);
//using github api to fetch the profile details from the server
//since we are going to fetch from api we are changing to aync functions and will be using await keyword to handling
const res=await fetch(`https://api.github.com/users/${userName}`);
//Since it will be in readable stream we are using .json
const data=await res.json();
//console.log(data);
getProfile(data);
getRepo(userName);
});

function getProfile(data){
//console.log(data);
//displaying the profile details in the card
profile.innerHTML=`
<div calss="card">
<div calss="card-img">
<img src=${data.avatar_url} alt=${data.name}>
</div>
<div class="card-body">
<Div class="card-title">${data.name}</div>
<div class="card-subHeading">${data.login}</div>
<div class="card-text">
<p>${data.bio}</p>
<p><i class="fa-solid fa-user-group"></i> ${data.followers} Followers . ${data.following} Following </p>
<p><i class="fa-solid fa-location-dot"></i> ${data.location}</p?
<button>
<a href=${data.html_url} target="_blank">visit profile</a></button>
</div>
</div>
</div>
`;

}

//getting the username and passing to another 
async function getRepo(userName){
    //console.log(userName);
    const result=await fetch(`https://api.github.com/users/${userName}/repos`);
const repositary=await result.json();
for(let i=0;i<repositary.length;i++){
    repo.innerHTML +=`
    <div class="card">
    <div class="card-body">
<Div class="card-title">${repositary[i].name}</div>
<div class="card-subHeading">${repositary[i].language}</div>
<div class="card-text">
<button>
<a href= target="_blank">visit repo </a></button></div>
</div>
</div>
    `
}

}