


const article = document.querySelector("#article");
const addPostform = document.querySelector("#addPostform");

// createmodal
const createPostTitle = document.querySelector("#createPostTitle");
const createPostContent = document.querySelector("#createPostContent");
const createImg=document.querySelector("#createImg");
const createImgFile=document.querySelector("#createImgFile");
const createImgFileBtn=document.querySelector("#createImgFileBtn");
const uplodedImg=document.getElementsByClassName("uplodedImg");


// editmodal
const modalEditTitle = document.querySelector("#modalEditTitle");
const modalEditContent = document.querySelector("#modalEditContent");
const modalEditImg = document.querySelector("#modalEditImg");
const modalEditImgFile=document.querySelector("#modalEditImgFile")

const saveChange = document.querySelector("#saveChange");
const deleteArticle = document.querySelector("#deleteArticle");

const modalForEdit = new bootstrap.Modal(
  document.getElementById("modalForEdit")
);

fetch("http://localhost:3000/content")
  .then((response) => response.json())
  .then((json) => {
    // console.log(json)
    // json.map((data) => {
    const timesort = json.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    // console.log(timesort)
    for (let i = 0; i < 20; i++) {
      const dataFilter = json[i];
      article.append(createArticle(dataFilter));
    }
    // });
  })
  .catch(()=>alert("please type NPM Start in Terminal"))


  // createArticle/createPost (html)
const createArticle = (data) => {
  const div = document.createElement("div");
  div.id = data.id;
  div.classList = "my-5";
  div.innerHTML = `
  <div class="container border-bottom border-dark-substle">
  <div class="row justify-content-center">
    <div class="col-6 col-md-6">
      <div class="mb-3">
        <span class="articleBy">${data.created_by}</span> 
        <span class="badge bg-secondary-subtle text-black-50 m-0 ms-md-2 articleCreatedAt">${data.created_at}</span>
      </div>
      <h3 class="articleTitle">${data.title}</h3>
      <p class="articleContent">${data.content}</p>
      <div class="mt-1">
        <button type="button" class="btn btn-sm rounded btn-outline-dark" id="readMore">Read More</button>
      </div>
    </div>
    <div class="col-5 col-md-2">
      <img class="img-size articleImg" src=${data.image_url} alt="">
    </div>
  </div>
</div>

    `;

  return div;
};

let storage = JSON.parse(localStorage.getItem("js-login-js"));

//file to img src using file (for create modal)
createImgFileBtn.addEventListener("click",()=>{
  createImgFile.click();
})

createImgFile.addEventListener("change", (event) => {
  console.log(event.target.files);
  [...event.target.files].forEach((file) => {
    const reader = new FileReader();
    console.log(event.target.files);
    reader.addEventListener("load", (event) => {
      console.log(event.target);
      uplodedImg[0].src = event.target.result;
    });

    reader.readAsDataURL(file);
  });
});


// create new posts
//method: post
addPostform.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(createPostContent);
  const id = moment().format();
  const dataToUpdate = {
    id,
    title: createPostTitle.value,
    image_url: uplodedImg[0].src,
    content: createPostContent.value,
    created_at: moment().format(),
    created_by: `${storage.name}`,
  };
  // const jsonString = JSON.stringify(dataToUpdate);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToUpdate),
  };

  fetch("http://localhost:3000/content", options)
    .then((res) => res.json())
    .then((json) => {
      location.reload();
      const dataArr = [];
      dataArr.push(json);
      createArticle(dataArr);
    });
});


// delete and edit posts 
article.addEventListener("click", (e) => {
  const url = "http://localhost:3000/content";
  e.preventDefault();
  if (e.target.id == "readMore") {
    modalForEdit.show();
    const parent =
      e.target.parentElement.parentElement.parentElement.parentElement
        .parentElement;
    const id = parent.id;
    // console.log(id);
    let articleTitle = parent.querySelector(".articleTitle").textContent;
    let articleContent = parent.querySelector(".articleContent").textContent;
    let articleBy = parent.querySelector(".articleBy").textContent;
    let articleImg=parent.querySelector(".articleImg").src;
    modalEditTitle.value = articleTitle;
    modalEditContent.value = articleContent;
    modalEditImg.src=articleImg;

    // update from exited data
    saveChange.addEventListener("click", (e) => {
      e.preventDefault();
      fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: parent.id,
          title: modalEditTitle.value,
          image_url:modalEditImg.src,
          content: modalEditContent.value,
          created_at: moment().format(),
          created_by: articleBy,
        }),
      })
        .then((res) => res.json())
        .then(() => location.reload());
    });

    //Delete data
    deleteArticle.addEventListener("click", (e) => {
      fetch(`${url}/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => location.reload());
    });
  }
});

//file to img src using file (for Edit modal)
modalEditImg.addEventListener("click",()=>{
  modalEditImgFile.click();
})

modalEditImgFile.addEventListener("change", (event) => {
  console.log(event.target.files);
  [...event.target.files].forEach((file) => {
    const reader = new FileReader();
    console.log(event.target.files);
    reader.addEventListener("load", (event) => {
      modalEditImg.src = event.target.result;
    });

    reader.readAsDataURL(file);
  });
});
