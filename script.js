let audio = document.getElementById("audio");
let pistes;
let playliste = 0;

//-------------source de la music---------------
// systemofadown.json
// https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=system_of_a_down
fetch('systemofadown.json')
.then(function(response) {
    return response.json();
})

.then(function(json) {
    let x=0
    //------------------------selection de music directe------------------------
    //------------------------création automatique de card----------------------
    document.getElementById('titre').innerHTML=json.data[0].title;
    document.getElementById('artiste').innerHTML=json.data[0].artist.name;
    pistes=json.data;

    for(x=0;x<pistes.length;x++){
            

            //--------------création des élément---------------
            let art=document.createElement('article');
            let dive=document.createElement('div');
            let images=document.createElement('img');
            let h1=document.createElement("h1");
            let p=document.createElement("p");
            let br=document.createElement("br");
            let p2=document.createElement("p")
            //-----------------création des élément en texte-----------
            let titres=document.createTextNode(pistes[x].title);
            let artistes=document.createTextNode(pistes[x].artist.name);
            let album=document.createTextNode(pistes[x].album.title);
            //----------------appel des texte-----------------
            h1.appendChild(titres);
            p.appendChild(artistes);
            p2.appendChild(album);
            //---------------atribution des style----------
            art.setAttribute("class","col-lg-3 text-white mb-4 del");
            art.setAttribute("track-id",x);
            //'morceau ('+x+')' si sa ne fonctionne pas utiliser sa → addEventListener
            art.addEventListener("click",function() {morceau(this)});
            dive.setAttribute("class","card shadow p-3 bg-secondary  rounded");
            images.setAttribute("src", pistes[x].album.cover_big);
            images.setAttribute("class","card-img-top");
            h1.setAttribute("class","card-title");
            p.setAttribute("class","card-text");
            p2.setAttribute("class","card-title");
            //-------------------appel des enfant--------------
            art.appendChild(dive);
            dive.appendChild(images);
            dive.append(p2)
            dive.append(br)        
            dive.appendChild(titres);
            dive.append(br)
            dive.appendChild(artistes);
            document.getElementById('article').appendChild(art);

    }
            //---------------------parti play/suivent/présédent------------
            document.getElementById("befort").addEventListener('click',befort);
            document.getElementById('Lecture').addEventListener('click',Lecture);
            document.getElementById('after').addEventListener('click',after);
            //---------------------parti volume---------------------
            document.getElementById('volumeDown').addEventListener('click', volumedown);
            document.getElementById('volumeUp').addEventListener('click',volumeup);
            document.getElementById('volume').addEventListener('input',barvolume);
            //---------------------parti barre de progréssion de la mussic---------------------
            document.getElementById('progressBar').addEventListener('input',progressBar);
            document.getElementById('progressBar').addEventListener('mousedown',mousedown);
            document.getElementById('progressBar').addEventListener('mouseup',mouseup);
            //---------------------parti zonne de recherche---------------------
            document.getElementById('searchBar').addEventListener('keyup',searchMusic)
            //---------------------dans la balise audio--------------------------
            document.getElementById('audio').addEventListener('loadedmetadata',getDuration)
            document.getElementById('audio').addEventListener('timeupdate',progressionMusic)
});	

function morceau(element){
    let index=parseInt(element.getAttribute("track-id"));
    audio.src=pistes[index].preview; 
    audio.play();
    document.getElementById('Lecture').src="pause.png";
    document.getElementById('titre').innerHTML=pistes[index].title;
    document.getElementById('artiste').innerHTML=pistes[index].artist.name;           
    document.getElementById('cover').src=pistes[index].album.cover    
}
//---------------------------play & pause de la music------------------------

function Lecture(){
    if (audio.paused){
        audio.play();
        document.getElementById('Lecture').src="pause.png";
    }
    else{audio.pause()
        document.getElementById('Lecture').src="lecture.png";
    }
}
    
//-------------------------------changement de music par bouton----------------

function after(){
    if(playliste==24){
        playliste=0;
        
        
    }
    else{
        playliste=playliste+1;
        
    }
    document.getElementById('Lecture').src="pause.png";
    document.getElementById('titre').innerHTML=pistes[playliste].title;
    document.getElementById('artiste').innerHTML=pistes[playliste].artist.name; 
    document.getElementById('cover').src=pistes[playliste].album.cover 
    audio.src=pistes[playliste].preview;
    audio.play();
}

function befort(){
    if(playliste==0){
        playliste=24;
        
    }
    else{
        playliste=playliste-1;
        
    }
    document.getElementById('Lecture').src="pause.png";
    document.getElementById('titre').innerHTML=pistes[playliste].title;
    document.getElementById('artiste').innerHTML=pistes[playliste].artist.name;
    document.getElementById('cover').src=pistes[playliste].album.cover  
    audio.src=pistes[playliste].preview;
    audio.play();
}

    //------------------------------son de la music---------------------------------
    
    
function volumedown(){
    console.log(audio.volume.toPrecision(1));
        if(audio.volume>=0.1){
            audio.volume-=0.1;
        }
        document.getElementById("volume").value=audio.volume;
}
    
function volumeup(){
    console.log(audio.volume.toPrecision(1));
        if(audio.volume<=0.9){
            audio.volume+=0.1;
        } 
        document.getElementById("volume").value=audio.volume;
}
    
function barvolume(){
        audio.volume=document.getElementById("volume").value;
}
    
    //-------------------------barre de progresion de la music-------------------
function getDuration() {
        document.getElementById('progressBar').setAttribute("max",audio.duration);
}
    
function progressionMusic() {
    
    document.getElementById('progressBar').value=audio.currentTime;
    let second=audio.currentTime;
    let minute=Math.floor(second/60);
    let secondrest=Math.ceil(second%60);

    document.getElementById("time").innerHTML=minute+":"+secondrest;
}
function mousedown() {
        audio.pause();
}
    
function mouseup() {
        audio.play();
}
function progressBar() {
        audio.currentTime=document.getElementById('progressBar').value;
}
    
//-----------------barre de recherche----------------------

function searchMusic(){
    let input = document.getElementById('searchBar').value;
    input=input.toLowerCase();
    let x=document.getElementsByClassName('col-lg-3 del');

    for (let i=0;i < x.length-1;i++){
        if(!x[i].innerHTML.toLowerCase().includes(input)){
            x[i].style.display = "none";
        }
        else{
            x[i].style.display = "";
        }
    }

}
