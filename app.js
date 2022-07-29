

//get elements
const postForm = document.getElementById('postForm');
const msg = document.querySelector('.msg');
const allPost=document.querySelector('.allPost')

// get post edit elements
const postEditForm=document.querySelector('#postEditForm')


// get all post
const getAllPost=()=>{
    

    let createPost = readlsData('inta-Post');
    let list ='';

    if(!createPost){
        allPost.innerHTML = '<div class="card shadow my-3"><div class="card-body text-center">No Post Found</div></div>';
        return false;
    }

    createPost.reverse().map((data)=>{
        list+=`
        <div class="postCard">
        <div class="info my-1">
            <div class="profileInfo">
                <div class="profile-img">
                    <img src="${data.pimage}" alt="">
                </div>
                
                <p style="color: black;">${data.pname}</p>
            </div>
            <div class="dropdown">
                <a class="dropdown-toggle" data-bs-toggle="dropdown" href="#">
                    <i class="fas fa-ellipsis-h"></i>
                </a>
                <ul class="dropdown-menu dropdown-menu-white" aria-labelledby="dropdownMenuLink">
                    <li><a class="dropdown-item editPost" post_id=${data.id} data-bs-toggle="modal" href="#postEditModal">Edit</a></li>
                    <li><a class="dropdown-item deletePost" post_id=${data.id} href="#">Delete</a></li>
                </ul>             
            </div>
        </div>
        <div class="postImage">
            <img src="${data.poimage}" alt="">
        </div>
        <div class="postIcon">
            <div class="leftIcons">
                <svg aria-label="Like" class="_ab6-" color="#000" fill="#000" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                <svg aria-label="Comment" class="_ab6-" color="#000" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                <svg aria-label="Share Post" class="_ab6-" color="#000" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </div>
            <div class="rightIcon">
                <svg aria-label="Save" class="_ab6-" color="#000" fill="#8e8e8e" height="24" role="img" viewBox="0 0 24 24" width="24"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon></svg>
            </div>
        </div>
        <div class="post-details">
            <div class="like">
                <span>10000 Likes</span>
            </div>
            <div class="description">
                <p>${data.pdescription}</p>
            </div>
            <div class="times">
                <p>10 HOURS AGO</p>
            </div>
        </div>
        <div class="comment">
            <div class="comment-box">
            <svg aria-label="Emoji" class="_ab6-" color="#262626" fill="#262626" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
            <input type="text" class="commentBox" placeholder="Add a comment...">
            </div>
            <div class="commentButton">
                <a href="#">Post</a>
            </div>
        </div>
    </div>
        `;
    });
    allPost.innerHTML=list;
};
getAllPost();

// submit post form

postForm.onsubmit=(e)=>{
    e.preventDefault();

    //get form data
    let formData = new FormData(e.target);
    let data = Object.fromEntries(formData.entries());
    let {pimage, pname, poimage, pdescription} = Object.fromEntries(formData.entries());

    // create a random id
    const radId = Math.floor(Math.random()*1000000) +'_'+Date.now();
    if(!pimage || !pname || !poimage || !pdescription){
        msg.innerHTML = setAlert('All fields are required');
    }else{
        createLsData('inta-Post', {...data, id: radId });
        msg.innerHTML = setAlert('Data stable');
        e.target.reset();
        getAllPost();
    }
};

// edit and delete post

allPost.onclick=(e)=>{
    e.preventDefault();

    // edit post
    if(e.target.classList.contains('editPost')){
        // get post id
        const postId = e.target.getAttribute('post_id');
        //get all post
        const allData = readlsData('inta-Post')
        // get edit single post data from array
        const editPost = allData.find(tomi => tomi.id == postId);
        // get single post data key
        const {pimage, pname, poimage, pdescription}=editPost;

        postEditForm.innerHTML= `

        <div class="my-3">
        <input name="pimage" value="${postId}" type="text" class="form-control">
        </div>

        <div class="my-3">
        <img width="50%" src="${pimage}" alt="">
        </div>

        <div class="my-3">
        <label for="">Profile Image</label>
        <input name="pimage" value="${pimage}" type="text" class="form-control">
        </div>
    
        <div class="my-3">
            <label for="">Profile Name</label>
            <input name="pname" value="${pname}" type="text" class="form-control">
        </div> 

        <div class="my-3">
        <img width="50%" src="${poimage}" alt="">
        </div>

        <div class="my-3">
            <label for="">Post Image</label>
            <input name="poimage" value="${poimage}" type="text" class="form-control">
        </div>

        <div class="my-3">
            <label for="">Post Description</label>
            <input name="pdescription" value="${pdescription}" type="text" class="form-control">
        </div> 

        <div class="my-3">
            <input value="Update Now" type="submit" class="btn btn-primary w-100">
        </div>    
        `;
    };

    // post delete

    if(e.target.classList.contains('deletePost')){
        // get post id
        const postId = e.target.getAttribute('post_id');

        // get all post
        const allData = readlsData('inta-post');

        // delete data from array

        const deleteData = allData.filter(tomi => tomi.id !== postId);

        // update new post
        updatelsData ('inta-post', deleteData);
        getAllPost();
    }
}


postEditForm.onsubmit=(e)=>{
    e.preventDefault();
    // get post id
    const postId = e.target.getAttribute('post_id');
    //get all post
    const allData = readlsData('inta-Post')
    // get edit single post data from array
    const editPost = allData.find(tomi => tomi.id == postId);

    updatelsData('inta-Post', editPost);
    getAllPost();
}