from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload
from ..dependencies.database import SessionLocal, engine
from ..models.post import Post as PostModel
from ..models.user import User as UserModel
from ..models.replies import Reply as ReplyModel
from ..schemas.post_schema import PostCreate, Post, ReplyCreate, Reply
from ..routers.user_routes import oauth2_scheme
from ..routers.user_routes import get_current_user, TokenData


router = APIRouter(
    prefix="/api/posts",
    tags=["posts"],
    responses={404: {"description": "Not found"}},
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=list[Post])
def get_all_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    posts = db.query(PostModel).options(joinedload(
        PostModel.user)).offset(skip).limit(limit).all()
    return posts


@router.get("/user/{user_id}", response_model=list[Post])
def get_all_posts_by_user(user_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    posts = db.query(PostModel).filter(PostModel.user_id ==
                                       user_id).options(joinedload(PostModel.user)).all()
    if not posts:
        raise HTTPException(
            status_code=404, detail="No posts found for this user")
    return posts


@router.post("/create", response_model=Post)
def create_post(post: PostCreate, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user), token: str = Depends(oauth2_scheme)):
    print(current_user.user_id)
    db_post = PostModel(**post.model_dump(), user_id=current_user.user_id)
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user), token: str = Depends(oauth2_scheme)):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    print(f'{post.user_id != current_user.user_id or current_user.role != "Admin"}')
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.user_id != current_user.user_id:
        if current_user.role == "Admin":
            db.delete(post)
            db.commit()
            return {"message": "Post deleted"}
        raise HTTPException(
            status_code=403, detail="Not authorized to delete this post")
    db.delete(post)
    db.commit()
    return {"message": "Post deleted"}


@router.post("/like/{post_id}")
def like_post(post_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    post.like_counter += 1
    db.commit()
    return {"message": "Post liked"}


@router.get("/{post_id}", response_model=Post)
def get_post_by_id(post_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.post("/reply/{post_id}")
def reply_to_post(post_id: int, reply: ReplyCreate, db: Session = Depends(get_db), current_user: TokenData = Depends(get_current_user), token: str = Depends(oauth2_scheme)):
    post = db.query(PostModel).filter(PostModel.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    user = db.query(UserModel).filter(
        UserModel.id == current_user.user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    reply = ReplyModel(**reply.model_dump(), post_id=post_id,
                       user_id=current_user.user_id)
    db.add(reply)
    db.commit()
    db.refresh(reply)
    reply = db.query(ReplyModel).options(joinedload(
        ReplyModel.user)).filter(ReplyModel.id == reply.id).first()
    return reply


@router.get("/replies/{post_id}", response_model=list[Reply])
def get_replies_for_post(post_id: int, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    replies = db.query(ReplyModel).filter(ReplyModel.post_id == post_id).all()
    if not replies:
        raise HTTPException(
            status_code=404, detail="No replies found for this post")
    return replies
