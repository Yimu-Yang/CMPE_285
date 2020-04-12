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

        proceeds = round(int(allotment) * float(final_share_price), 2)
        capital_gain = int(allotment) * (float(final_share_price) - float(initial_share_price)) - float(sell_commission) - float(buy_commission)
        tax_on_capital_gain = float(capital_gain_tax_rate) * 0.01 * capital_gain
        cost = round(int(allotment) * float(initial_share_price) + float(sell_commission) + float(buy_commission) + tax_on_capital_gain, 2)
        net_profit = round(proceeds - cost, 2)
        return_on_investment = round(round(net_profit / cost * 100.00, 2), 2)
        break_even_price = round((int(allotment) * float(initial_share_price) + float(sell_commission) + float(buy_commission)) / int(allotment), 2)
        input = {'proceeds': proceeds, 'cost': cost, 'net_profit': net_profit, 'return_on_investment': return_on_investment, 'break_even_price': break_even_price}
        return render(request, 'result.html', input)
