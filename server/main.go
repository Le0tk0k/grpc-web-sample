package main

import (
	"context"
	"log"
	"net"

	pb "github.com/Le0tk0k/server/hello"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":9090"
)

type server struct{}

func (s *server) SayHello(ctx context.Context, r *pb.HelloRequest) (*pb.HelloResponse, error) {
	log.Printf("Recieved : %s", r.GetName())
	return &pb.HelloResponse{Message: "Hello " + r.GetName() + "!"}, nil
}

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterHelloServiceServer(s, &server{})
	reflection.Register(s)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %c", err)
	}
}
