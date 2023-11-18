FROM openjdk:16
ADD target/server_tcp.jar server_tcp.jar
ENTRYPOINT ["java", "-jar","server_tcp.jar"]
EXPOSE 12345