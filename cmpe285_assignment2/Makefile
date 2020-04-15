install:
	pip3 install django
	pip3 install yfinance
	pip3 install lxml
	pip3 install html5lib
	pip3 install pytz

migrate:
	python3 manage.py migrate

run:
	python3 manage.py runserver 0.0.0.0:8000

runback:
	python3 manage.py runserver 0.0.0.0:8000 &

end:
	lsof -ti tcp:8000 | xargs kill