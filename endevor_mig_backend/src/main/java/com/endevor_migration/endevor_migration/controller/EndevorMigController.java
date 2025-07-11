package com.endevor_migration.endevor_migration.controller;

import java.io.InputStream;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.endevor_migration.endevor_migration.service.ImportMongo;
import com.endevor_migration.endevor_migration.service.MigrationGit;

@RestController
@CrossOrigin
public class EndevorMigController {

    @Autowired
    ImportMongo importMongo;

    @Autowired
    MigrationGit migGit;

    @GetMapping("/hi")
    public String greet(){
        return "hi";
    }

    @PostMapping("/extract")
    public ResponseEntity<String> extactEnv(@RequestParam("file") MultipartFile file){
        try{

            InputStream input = file.getInputStream();
            importMongo.insJsonMongo(input);
            return ResponseEntity.ok("Ok");
        }

        catch(Exception e){
            e.printStackTrace();
            return ResponseEntity.ok("Not Ok");
        }
    }

    @PostMapping("/api/transform")
     public ResponseEntity<String> transformPlatform(@RequestBody Map<String, String> data) {
        String platform = data.get("platform");

        System.out.println("Received platform: " + platform);

        migGit.dataRead();
        migGit.gitPush(platform);

        return ResponseEntity.ok("Platform processed: " + platform);
        
    }
}
