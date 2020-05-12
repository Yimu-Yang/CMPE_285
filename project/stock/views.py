from django.shortcuts import render
from datetime import datetime
import pytz
import yfinance as yf
from requests.exceptions import ConnectionError


def index(request):
    if request.method == 'GET':
        return render(request, 'index.html')


def suggest(request):
    if request.method == 'POST':
        result1 = strategy(request, request.POST['investment_strategy_1'])
        result2 = strategy(request, request.POST['investment_strategy_2'])
        parameters = {'results': [result1, result2]}
        return render(request, 'result.html', parameters)


def strategy(request, strategy_name):
    dollar_amount = request.POST['dollar_amount']
    stocks = []
    money = []
    current_value = []
    current_share = []
    portfolio_value = 0

    if strategy_name.lower() == '':
        return {}
    elif strategy_name.lower() == 'ethical investing':
        # assigned stocks
        stocks = ['AAPL', 'ADBE', 'NSRGY']
        stock_name = []
        for stock in stocks:
            stock_name.append(get_stock_name(stock) + '(' + stock + ')')

        # how money is split
        money = [round(float(dollar_amount) * 1 / 2, 2),
                 round(float(dollar_amount) * 3 / 8, 2),
                 round(float(dollar_amount) * 1 / 8, 2)]
        # get current values of the stocks
        current_value = [get_current_value(stocks[0]), get_current_value(stocks[1]), get_current_value(stocks[2])]
        current_share = [int(money[0] / current_value[0]),
                         int(money[1] / current_value[1]),
                         int(money[2] / current_value[2])]
        portfolio_value = round(current_value[0] * current_share[0] + current_value[1] * current_share[1] + current_value[2] * current_share[2], 2)
        history_value1 = get_fiveday_history(stocks[0])
        history_value2 = get_fiveday_history(stocks[1])
        history_value3 = get_fiveday_history(stocks[2])
        portfolio_history = []
        for x in range(5):
            portfolio_history.append(history_value1[x] * current_share[0] + history_value2[x] * current_share[1] + history_value3[x] * current_share[2])

    elif strategy_name.lower() == 'growth investing':
        # assigned stocks
        stocks = ['AAPL', 'AMD', 'MSFT']
        stock_name = []
        for stock in stocks:
            stock_name.append(get_stock_name(stock) + '(' + stock + ')')

        # how money is split
        money = [round(float(dollar_amount) * 3 / 16, 2),
                 round(float(dollar_amount) * 3 / 4, 2),
                 round(float(dollar_amount) * 1 / 16, 2)]
        # get current values of the stocks
        current_value = [get_current_value(stocks[0]), get_current_value(stocks[1]), get_current_value(stocks[2])]
        current_share = [int(money[0] / current_value[0]),
                         int(money[1] / current_value[1]),
                         int(money[2] / current_value[2])]
        portfolio_value = round(current_value[0] * current_share[0] + current_value[1] * current_share[1] + current_value[2] * current_share[2], 2)

        history_value1 = get_fiveday_history(stocks[0])
        history_value2 = get_fiveday_history(stocks[1])
        history_value3 = get_fiveday_history(stocks[2])
        portfolio_history = []
        for x in range(5):
            portfolio_history.append(history_value1[x] * current_share[0] + history_value2[x] * current_share[1] + history_value3[x] * current_share[2])

    result = {'strategy': strategy_name, 'investment amount': dollar_amount, 'invested stocks': stock_name,
              'stock label': stocks, 'money distribution': money, 'current stock share prices': current_value,
              'number of shares': current_share, 'portfolio value': portfolio_value, 'portfolio history': portfolio_history}
    return result


def get_stock_name(label):
    try:
        stock_label = label
        ticker_data = yf.Ticker(stock_label)
        ticker_info = ticker_data.info
        company_name = ticker_info['longName']
        return company_name
    except Exception as e:
        if isinstance(e, ConnectionError):
            return 'no network!'
        else:
            return 'invalid stock symbol!'


def get_current_value(label):
    try:
        stock_label = label
        ticker_data = yf.Ticker(stock_label)
        ticker_df = ticker_data.history()
        latest_price = ticker_df['Close'].iloc[-1]
        return round(float(latest_price), 2)
    except Exception as e:
        if isinstance(e, ConnectionError):
            return 'no network!'
        else:
            return 'invalid stock symbol!'


def get_fiveday_history(label):
    try:
        stock_label = label
        ticker_data = yf.Ticker(stock_label)
        ticker_df = ticker_data.history()
        return [round(float(ticker_df['Close'].iloc[-5]), 2), round(float(ticker_df['Close'].iloc[-4]), 2),
                round(float(ticker_df['Close'].iloc[-3]), 2), round(float(ticker_df['Close'].iloc[-2]), 2),
                round(float(ticker_df['Close'].iloc[-1]), 2)]
    except Exception as e:
        if isinstance(e, ConnectionError):
            return 'no network!'
        else:
            return 'invalid stock symbol!'


def dashboard(request):
    if request.method == 'GET':
        return render(request, 'dashboard.html')
