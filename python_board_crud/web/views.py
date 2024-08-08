from re import template
from django.shortcuts import render, redirect
from django.template import loader
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from web.models import Board
# 메인 페이지
def home(request):
    template = loader.get_template("home.html")
    context = {}
    return HttpResponse(template.render(context, request))

# 글목록 리스트
def boardlist(request):
    template = loader.get_template("boardlist.html")
    boardlist = Board.objects.order_by('idx')
    boardcount = Board.objects.all().count()
    context = {
        "boardlist" : boardlist,
        "boardcount" : boardcount
    }
    return HttpResponse(template.render(context, request))

# 글쓰기
def add(request):
    template = loader.get_template('add.html')
    context = {}
    return HttpResponse(template.render(context, request))

@csrf_exempt
def addok(request):
# 글목록으로 넘어가면 되니까 템플릿을 가지고 올 필요는 없다
    dto = Board(
        userId = request.POST['userId'],
        userEmail = request.POST['userEmail'],
        userPwd = request.POST['userPwd'],
        content = request.POST['content'],
    )
    dto.save()
    return redirect('boardlist')

# 비밀번호 체크
@csrf_exempt
def pwdck(request):
    idx = request.POST['idx']
    userPwd = request.POST['userPwd']
    dto = Board.objects.get(idx=idx)
    context = {
        "dto" : dto
    }
    if userPwd == dto.userPwd:
        template = loader.get_template("edit.html")
        return HttpResponse(template.render(context, request))
    else :
        return redirect('boardlist')

# 글 수정
@csrf_exempt
def edit(request):
    idx = request.POST['idx']
    dto = Board.objects.get(idx=idx)
    # 새로운 dto 객체를 만들어서 저장한다
    newDto = Board(
        idx = idx,
        userId = dto.userId,
        userEmail = request.POST['userEmail'],
        userPwd = request.POST['userPwd'],
        content = request.POST['content']
    )
    newDto.save()
    return redirect('boardlist')

# 글 삭제
# 해당하는 db에서 인덱스를 꺼내와서 일치하면 delete
def delete(request):
    idx = request.GET['idx']
    Board.objects.get(idx=idx).delete()
    return redirect('boardlist')