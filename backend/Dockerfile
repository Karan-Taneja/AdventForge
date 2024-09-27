# Use the official Golang image as the base image
FROM golang:1.23.1 as builder

# Set the working directory inside the container
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the rest of the application code
COPY . .

# Build the application
RUN go build -o main ./cmd

# Stage 2: Run the Go application
FROM alpine:latest

# Set the working directory inside the container
WORKDIR /root/

# Copy the built application from the previous stage
COPY --from=builder /app/main .

# Set environment variables
ARG API_URL
ARG REDIRECT_URI
ARG LOGOUT_URI
ENV API_URL=${API_URL}
ENV REDIRECT_URI=${REDIRECT_URI}
ENV LOGOUT_URI=${LOGOUT_URI}

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the application
CMD ["./main"]