from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework.utils import json
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
from django.contrib.auth.models import User
from rest_framework import status
from django.core.serializers import serialize

@api_view(["GET"])
@csrf_exempt
def get_users(request):
    users = User.objects.all()
    serializer = serialize("json",users)
    return JsonResponse({'users': serializer}, safe=False, status=status.HTTP_200_OK)


@api_view(["POST"])
@csrf_exempt
def add_user(request):
    payload = json.loads(request.body)
    try:
        User.objects.create_user(**payload)
        subject = "Thanks for register"
        message = payload["username"]+", you are successfully register with us !"
        to = payload["email"]
        send_mail(subject,message,settings.EMAIL_HOST_USER, [to])
        return Response(status=status.HTTP_201_CREATED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False,
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["PUT"])
@csrf_exempt
def update_user(request, userid):
    payload = json.loads(request.body)
    try:
        user = User.objects.filter(id=userid)
        user.update(**payload)
        return Response(status=status.HTTP_200_OK)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something terrible went wrong'}, safe=False,
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["DELETE"])
@csrf_exempt
def delete_user(request, userid):
    try:
        user = User.objects.get(id=userid)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception:
        return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@csrf_exempt
def login_user(request):
    payload = json.loads(request.body)
    print(payload)
    try:
        user = authenticate(request, username=payload["username"], password=payload['password'])
        if user is not None:
            login(request, user)
            print("logged on")
            return Response(data=user.id,status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except ObjectDoesNotExist as e:
        return JsonResponse({'error': str(e)}, safe=False, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        print(e)
        return JsonResponse({'error': 'Something went wrong'}, safe=False, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])
@csrf_exempt
def logout_user(request):
    logout(request)
