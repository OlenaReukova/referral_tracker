FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY backend /app

RUN ./gradlew build

CMD java -jar build/libs/referral_tracker-0.0.1-SNAPSHOT.jar