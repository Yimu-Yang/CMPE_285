install:
	pip3 install django

migrate:
	python3 manage.py migrate

run:
	python3 manage.py runserver 0.0.0.0:8000

runback:
	python3 manage.py runserver 0.0.0.0:8000 &

end:
	lsof -ti tcp:8000 | xargs kill
