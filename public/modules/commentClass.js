
class Comment{
    constructor(text){
        this.id = Comment.id;
        this.text = text;

        Comment.id ++;
        localStorage.setItem('commentId', Comment.id)
    }
}

Comment.id = JSON.parse(localStorage.getItem('commentId') || '1')
export default Comment;