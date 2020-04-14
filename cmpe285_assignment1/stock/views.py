from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def calculate(request):
    if request.method == 'POST':
        stock_label = request.POST['stock_label']
        allotment = request.POST['allotment']
        final_share_price = request.POST['final_share_price']
        sell_commission = request.POST['sell_commission']
        initial_share_price = request.POST['initial_share_price']
        buy_commission = request.POST['buy_commission']
        capital_gain_tax_rate = request.POST['capital_gain_tax_rate']

        if not isInt(allotment) and not isFloat(allotment):
            return render(request, 'error.html', {'error_message': 'allotment should be a number'})

        if not isInt(final_share_price) and not isFloat(final_share_price):
            return render(request, 'error.html', {'error_message': 'final share price should be a number'})

        if not isInt(sell_commission) and not isFloat(sell_commission):
            return render(request, 'error.html', {'error_message': 'sell commission should be a number'})

        if not isInt(initial_share_price) and not isFloat(initial_share_price):
            return render(request, 'error.html', {'error_message': 'initial share price should be a number'})

        if not isInt(buy_commission) and not isFloat(buy_commission):
            return render(request, 'error.html', {'error_message': 'buy commission should be a number'})

        if not isInt(capital_gain_tax_rate) and not isFloat(capital_gain_tax_rate):
            return render(request, 'error.html', {'error_message': 'capital gain tax rate should be a number'})

        proceeds = round(float(allotment) * float(final_share_price), 2)
        capital_gain = float(allotment) * (float(final_share_price) - float(initial_share_price)) - float(sell_commission) - float(buy_commission)
        tax_on_capital_gain = float(capital_gain_tax_rate) * 0.01 * capital_gain
        cost = round(float(allotment) * float(initial_share_price) + float(sell_commission) + float(buy_commission) + tax_on_capital_gain, 2)
        net_profit = round(proceeds - cost, 2)
        return_on_investment = round(net_profit / cost * 100.00, 2)
        break_even_price = round((float(allotment) * float(initial_share_price) + float(sell_commission) + float(buy_commission)) / float(allotment), 2)
        input = {'stock_label': stock_label, 'proceeds': proceeds, 'cost': cost, 'net_profit': net_profit, 'return_on_investment': return_on_investment, 'break_even_price': break_even_price}
        return render(request, 'result.html', input)

def isInt(input):
    try:
        int(input)
        return True
    except ValueError:
        return False

def isFloat(input):
    try:
        float(input)
        return True
    except ValueError:
        return False
