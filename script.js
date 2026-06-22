const COMMENTS_PER_LOAD = 10;
let visibleComments = COMMENTS_PER_LOAD;
function addComment() {
    const name = document.getElementById("name").value.trim();
    const text = document.getElementById("comment").value.trim();
    if (!name || !text) return;
    const comment = {
        name,
        text,
        date: new Date().toLocaleString()
    };
    let comments =
        JSON.parse(localStorage.getItem("comments")) || [];
    comments.unshift(comment);
    localStorage.setItem(
        "comments",
        JSON.stringify(comments)
    );
    document.getElementById("comment").value = "";
    displayComments();
}
function deleteComment(index) {
    let comments =
        JSON.parse(localStorage.getItem("comments")) || [];
    comments.splice(index, 1);
    localStorage.setItem(
        "comments",
        JSON.stringify(comments)
    );
    displayComments();
}
function editComment(index) {
    let comments =
        JSON.parse(localStorage.getItem("comments")) || [];
    const newText = prompt(
        "Edit your comment:",
        comments[index].text
    );
    if (newText !== null && newText.trim() !== "") {
        comments[index].text = newText;
        localStorage.setItem(
            "comments",
            JSON.stringify(comments)
        );
        displayComments();
    }
}
function displayComments() {
    const list = document.getElementById("commentList");
    let comments =
        JSON.parse(localStorage.getItem("comments")) || [];
    list.innerHTML = "";
    comments
        .slice(0, visibleComments)
        .forEach((c, index) => {
            list.innerHTML += `
                <div class="comment fade-in">
                    <strong>${c.name}</strong>
                    <small>${c.date}</small>
                    <p>${c.text}</p>
                    <button onclick="editComment(${index})">
                        Edit
                    </button>
                    <button onclick="deleteComment(${index})">
                        Delete
                    </button>
                </div>
            `;
        });
    const loadBtn =
        document.getElementById("loadMoreBtn");
    if (visibleComments >= comments.length) {
        loadBtn.style.display = "none";
    } else {
        loadBtn.style.display = "block";
    }
}
function loadMoreComments() {
    visibleComments += COMMENTS_PER_LOAD;
    displayComments();
}
displayComments();