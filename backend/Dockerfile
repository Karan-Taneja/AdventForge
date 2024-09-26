FROM golang:1.21-alpine3.18

WORKDIR /app

COPY ./go.mod ./go.sum ./
RUN go mod download

COPY ./src ./src

RUN go build -o adventforge-backend ./src/main.go

CMD ["./adventforge-backend"]
