FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY backend /app

RUN chmod +x gradlew
RUN ./gradlew build -x test

EXPOSE 8080

CMD ["java", "-jar", "build/libs/app.jar"]