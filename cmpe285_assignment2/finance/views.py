from django.shortcuts import render
from datetime import datetime
import pytz
import yfinance as yf


def index(request):
    if request.method == 'GET':
        return render(request, 'index.html')


def calculate(request):
    if request.method == 'POST':
        stock_label = request.POST['stock_label']

        if stock_label == 'error':
            return render(request, 'error.html', {'error_message': 'wrong stock label!'})

        # datetime current date and time
        timezone = pytz.timezone('US/Pacific')
        now = datetime.now(timezone)
        current_date_time = now.strftime('%a %b %d %H:%M:%S %Z %Y')

        ticker_data = yf.Ticker(stock_label)
        ticker_info = ticker_data.info
        ticker_df = ticker_data.history()

        latest_price = ticker_df['Close'].iloc[-1]  # or 'Adj Close'
        yesterday_close = ticker_df['Close'].iloc[-2]

        time = current_date_time
        company_name = ticker_info['longName']
        stock_price = latest_price
        value_changes = round(float(latest_price) - float(yesterday_close), 2)
        percentage_changes = round(value_changes / float(yesterday_close) * 100, 2)

        if value_changes >= 0:
            value_changes = '+' + str(value_changes)
        else:
            value_changes = str(value_changes)

        if percentage_changes >= 0:
            percentage_changes = '(' + '+' + str(percentage_changes) + '%' + ')'
        else:
            percentage_changes = '(' + str(percentage_changes) + '%' + ')'

        parameters = {'stock_label': stock_label, 'time': time,
                      'company_name': company_name, 'stock_price': stock_price,
                      'value_changes': value_changes, 'percentage_changes': percentage_changes}
        return render(request, 'result.html', parameters)
