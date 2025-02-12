document.addEventListener("DOMContentLoaded",()=>{
    const uploadArea=document.querySelector(".upload-area");
    const imageInput=document.querySelector("#imageInput");
    const removeBtn=document.querySelector("#remove");
    const resetBtn=document.querySelector("#reset");
    const result=document.querySelector(".result");

    let selectedFile=null;
    //upload file from user
    uploadArea.addEventListener("click",()=>{
        imageInput.click();
    });
    //drag and drop feature
    uploadArea.addEventListener("dragover",(e)=>{
        e.preventDefault();
    }); 
    uploadArea.addEventListener("drop",(e)=>{
        e.preventDefault();
        e.stopPropagation();
        handleFile(e.dataTransfer.files[0]);
    });
    imageInput.addEventListener("change",(e)=>{
        handleFile(e.target.files[0]);
    });
    function handleFile(file){
        if (file && file.type.startsWith("image/")){
             selectedFile=file;
            const reader=new FileReader();
            reader.onload=()=>{
                displayImage(reader.result);
            };
            reader.readAsDataURL(file);
        }else{
            alert("Please upload a valid image format");
        }
    }

    function displayImage(imgsrc){
        result.innerHTML=`<img src="${imgsrc}" />`;
    }



    removeBtn.addEventListener("click",()=>{
        if(selectedFile){
            removeBackground(selectedFile);
        }else{
            alert("Please upload an image first");
        }
    });

    async function removeBackground(file){
        const api="PvHQug14Q7MsiX4PGX3LUwz7"
        const formData=new FormData()
        formData.append("image_file",file);
        formData.append("size","auto");
        result.innerHTML="<p>Removing Background...</p>";
        try{
            const response=await fetch('https://api.remove.bg/v1.0/removebg',{
                method:"POST",
                headers:{
                    "X-API-KEY":api,
                },
                body:formData,
            });
            if(!response.ok) throw new Error("Failed to remove background");
            const blob=await response.blob();
            const imageURL=URL.createObjectURL(blob);

            result.innerHTML=`<img src="${imageURL}" />`;

            const downloadBtn=document.createElement("button");
            downloadBtn.innerHTML="Download Image";
            downloadBtn.classList.add("btn");
            downloadBtn.addEventListener("click",()=>{
            const link=document.createElement("a");
            link.href=imageURL;
            link.download="background_remove.png";
            link.click();
            }); 
            result.appendChild(downloadBtn);
        }catch(error){
            console.log(error)
        }
    }
    resetBtn.addEventListener("click",()=>{
        selectedFile=null;
        result.innerHTML="<p>No image processed yet.</p>";
        imageInput.value="";
    })
});