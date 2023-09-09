FROM python:3.8

ENV PYTHONUNBUFFERED 1

RUN mkdir /home/app

COPY ./app /home/app

WORKDIR /home/app

RUN pip install -r requirements.txt