# from django.shortcuts import render
# import requests
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
# from django.conf import settings

# GEMINI_API_KEY = "AIzaSyDZWAfbJU0B_tEcCcPKtXt4AJeEhQ3WJbY"  # Replace with your key

# @csrf_exempt
# def chatbot_query(request):
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
#             user_message = data.get("message", "")
#             if not user_message:
#                 return JsonResponse({"error": "Message is required"}, status=400)

#             # Make the API request to Gemini
#             headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
#             payload = {"query": user_message}
#             response = requests.post("https://api.gemini.com/v1/chat", json=payload, headers=headers)
#             print(response)
#             if response.status_code == 200:
#                 reply = response.json().get("response", "")
#                 return JsonResponse({"reply": reply}, status=200)
#             else:
#                 return JsonResponse({"error": "Error communicating with Gemini API"}, status=response.status_code)

#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=500)
#     else:
#         return JsonResponse({"error": "Invalid request method"}, status=405)



from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.conf import settings
GEMINI_API_KEY = "AIzaSyDZWAfbJU0B_tEcCcPKtXt4AJeEhQ3WJbY"  # Replace with your key

@csrf_exempt
def chatbot_query(request):
    if request.method == "POST":
        try:
            # Parse incoming JSON request
            data = json.loads(request.body)
            user_message = data.get("message", "")
            if not user_message:
                return JsonResponse({"error": "Message is required"}, status=400)

            # Prepare API request
            headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
            payload = {"query": user_message}
            response = requests.post("https://api.gemini.com/v1/chat", json=payload, headers=headers)

            # Debugging logs
            print(f"Request payload: {payload}")
            print(f"Response status: {response.status_code}")
            print(f"Response text: {response.text}")

            if response.status_code == 200:
                try:
                    # Parse API response
                    reply = response.json().get("response", "")
                    return JsonResponse({"reply": reply}, status=200)
                except json.JSONDecodeError as e:
                    return JsonResponse({"error": "Invalid JSON in API response"}, status=500)
            else:
                return JsonResponse({"error": "Error communicating with Gemini API", "details": response.text}, status=response.status_code)

        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON in request body"}, status=400)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": "Request exception", "details": str(e)}, status=500)
        except Exception as e:
            return JsonResponse({"error": "Unexpected error", "details": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)
