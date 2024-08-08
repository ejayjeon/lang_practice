from django.contrib import admin
from web.models import Board

class BoardAdmin(admin.ModelAdmin):
    # 관리자 페이지에서 보여줄 리스트
    list_display = ("idx", "userId", "userEmail", "userPwd", "content")

# Board Model과 함께 등록
admin.site.register(Board, BoardAdmin)
