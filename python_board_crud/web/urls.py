from django.urls import path
from web import views

urlpatterns = [
    # 상세 url 설정 -> views에서 보여줄 페이지
    path("", views.home, name="home"),
    
    # 리스트
    path("boardlist", views.boardlist, name="boardlist"),
    # 글쓰기 
    path("add", views.add, name="add"),
    path("addok", views.addok, name="addok"),

    # 비밀번호 확인
    path("pwdck", views.pwdck, name="pwdck"),

    # 글수정
    path("edit", views.edit, name="edit"),

    # 글삭제
    path("delete", views.delete, name="delete"),
]