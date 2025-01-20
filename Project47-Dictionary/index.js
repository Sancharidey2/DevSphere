let input=document.querySelector("#input");
let output=document.querySelector("#meaning");
let search=document.querySelector("#search");
search.addEventListener("click",async()=>{
    let val=input.value;
    if(val==""){
        alert("please enter a word");
    }else{
        let url=`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`;
        let mean=await fetch(url);
        mean=await mean.json();
        console.log("Meaning is ",mean[0]['meanings'][0]['definitions'][0]['definition']);
        output.textContent=mean[0]['meanings'][0]['definitions'][0]['definition'];
    }
});