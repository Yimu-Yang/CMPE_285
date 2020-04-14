from django.shortcuts import render

def index(request):
    if request.method == 'GET':
        return render(request, 'index.html')

def calculate(request):
    if request.method == 'POST':
        stock_label = request.POST['stock_label']
        time = '[current time]'
        company_name = '[company name]'
        stock_price = '[100]'
        value_changes = '[+10]'
        percentage_changes = '[+6%]'

        if stock_label == 'error':
            return render(request, 'error.html', {'error_message': 'wrong stock label!'})

        input = {'stock_label': stock_label, 'time': time, 'company_name': company_name, 'stock_price': stock_price, 'value_changes': value_changes, 'percentage_changes': percentage_changes}
        return render(request, 'result.html', input)
