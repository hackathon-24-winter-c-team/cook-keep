from django.contrib.auth.backends import BaseBackend
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class EmailAuthBackend(BaseBackend):
    """
    メールアドレスとパスワードでの認証を行うカスタム認証バックエンド。
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.get(email=username)  # ユーザー名ではなくメールアドレスでユーザーを検索
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            raise ValidationError("メールアドレスまたはパスワードが間違っています。")
        return None
