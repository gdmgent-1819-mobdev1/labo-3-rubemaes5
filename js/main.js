//localStorage.clear();
function logToConsole(people) {
    console.log(people); // works fine
    console.log(people[0]); // returns undefined
    console.log(people.length); //returns 0
};
let people = [];
let likes = [];
let dislikes = [];
if(localStorage.getItem("likes") !== null){
    likes = JSON.parse(localStorage.getItem("likes"));
}
if(localStorage.getItem("dislikes") !== null){
    dislikes = JSON.parse(localStorage.getItem("dislikes"));
}
if(localStorage.getItem("people") === null){
fetch('https://randomuser.me/api/?results=10')
.then(function(response){
    return response.json();
})
.then(function(data){
    for(i=0; i<10; i++){
        let person = data.results[i];
        if(dislikes.includes(person.login.uuid) || likes.includes(person.login.uuid) ){
            continue;
        }else{
        let x = {
            name: person.name.first + " " +person.name.last,
            picture: person.picture.large,
            age: person.dob.age,
            place: person.location.street + "<br>" + person.location.city,
            id: person.login.uuid
        }
        people.push(x);
    }}
    lengte = people.length;
    logToConsole(people);
    judge();
}).catch(function(error){
        console.log('Data is not shown ' + error.message);
});
}else{
    people = JSON.parse(localStorage.getItem("people"));
    judge(); 
}
function judge(){
    localStorage.setItem("people", JSON.stringify(people));
    function showPeople(){
        document.getElementById("image").src = people[0].picture;
        document.getElementById("name").innerHTML = people[0].name;
        document.getElementById("age").innerHTML = people[0].age;
        document.getElementById("location").innerHTML = people[0].place;
    }
    showPeople();
    document.getElementById("heartclick").addEventListener("click", function(){
        if(people.length<=1){
        likes.push(people[0]);
        console.log(likes);
        people.shift();
        localStorage.removeItem("people");
        location.reload();
        console.log("er zijn er nie veel meer");
    }else{
        if(localStorage.getItem("likes") !== null){
        likes = JSON.parse(localStorage.getItem("likes"));
        likes.push(people[0]);
        console.log(likes);
        people.shift();
        showPeople();
        localStorage.setItem("people", JSON.stringify(people));
        localStorage.setItem("likes", JSON.stringify(likes));
        }else{
        likes.push(people[0]);
        console.log(likes);
        people.shift();
        showPeople();
        localStorage.setItem("people", JSON.stringify(people));
        localStorage.setItem("likes", JSON.stringify(likes));
        }}})
document.getElementById("skipclick").addEventListener("click", function(){
        if(people.length<=1){
        dislikes.push(people[0]);
        console.log(dislikes);
        people.shift();
        localStorage.removeItem("people");
        location.reload();
        console.log("er zijn er nie veel meer");
    }else{
        if(localStorage.getItem("dislikes") !== null){
        dislikes = JSON.parse(localStorage.getItem("dislikes"));
        dislikes.push(people[0]);
        console.log(dislikes);
        people.shift();
        showPeople();
        localStorage.setItem("people", JSON.stringify(people));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        }else{
        dislikes.push(people[0]);
        console.log(dislikes);
        people.shift();
        showPeople();
        localStorage.setItem("people", JSON.stringify(people));
        localStorage.setItem("dislikes", JSON.stringify(dislikes));
        }}})}
document.getElementById("clickforlikes").addEventListener('click', function(){
    document.getElementById("yourdislikes").innerHTML="";
    document.getElementById("yourlikes").innerHTML="";
    document.querySelectorAll('.yourlikes')[0].style.left = "0";
    for(x=0; x<dislikes.length; x++){
        if(dislikes.length>0){
            let changeThis = dislikes[x];
            document.getElementById("yourdislikes").innerHTML += dislikes[x].name +"<p class='ch'>change list</p><br><br>";
            let ch = document.querySelectorAll('.ch');
            for(i=0;i<ch.length;i++){
                let z = i;
                ch[i].addEventListener('click', function(){
                    likes.push(dislikes[z]);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    dislikes.splice(z, 1);
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
                })}}}
    for(v=0;v<likes.length;v++){
        if(likes.length>0){
            let ChangeThat = likes[v];
            document.getElementById("yourlikes").innerHTML += likes[v].name +"<p class='co'>change list</p><br><br>";
            let co = document.querySelectorAll('.co');
            for(o=0; o<co.length; o++){
                let q = o;
                co[q].addEventListener('click', function(){
                    console.log(dislikes)
                    dislikes.push(likes[q]);
                    localStorage.setItem("dislikes", JSON.stringify(dislikes));
                    likes.splice(q, 1);
                    localStorage.setItem("likes", JSON.stringify(likes));
                    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
                })}}}})
    document.getElementById("goAwayclick").addEventListener('click', function(){
    document.querySelectorAll('.yourlikes')[0].style.left = "100%";
})