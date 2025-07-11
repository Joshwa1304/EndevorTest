package com.endevor_migration.endevor_migration.service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.bson.Document;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@Service
public class ImportMongo {
    public void insJsonMongo(InputStream input){
        //String filePath = "D:\\Apache\\Endevor.json";
        String uri = "mongodb://localhost:27017";
        String dbName = "test2";

        MongoClient client = MongoClients.create(uri);
        MongoDatabase database = client.getDatabase(dbName);

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(input))) {

            ObjectMapper mapper = new ObjectMapper();

            String line;
            String currentCollection = null;

            while ((line = reader.readLine()) != null) {
                line = line.replaceAll("[^\\x20-\\x7E\\r\\n{}\\[\\]\":,]", "").trim();

                if (line.startsWith("##")) {
                    currentCollection = line.substring(2).trim();
                    System.out.println("Detected Collection :: " + currentCollection);
                }

                else if (!line.isEmpty() && currentCollection != null && line.startsWith("{")) {
                    StringBuilder builder = new StringBuilder();
                    builder.append(line);
                    while (!line.endsWith("}")) {
                        line = reader.readLine();
                        if (line == null)
                            break;
                        line = line.trim();
                        builder.append(line);
                    }

                    String str = builder.toString();
                    str = str.replaceAll(":(\\s*)0+(\\d+)", ":$1$2");
                    JsonNode jNode = mapper.readTree(str);
                    Document doc = Document.parse(jNode.toString());

                    MongoCollection<Document> collection = database.getCollection(currentCollection);
                    collection.insertOne(doc);
                }

            }

            System.out.println("\nAll Collections Inserted Successfully");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    
}
