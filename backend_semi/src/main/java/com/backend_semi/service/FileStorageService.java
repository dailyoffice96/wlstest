package com.backend_semi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class FileStorageService {

    //설정 파일에서 파일 저장 경로를 주입받음
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.url-prefix}")
    private String urlPrefix;

    public String upload(MultipartFile file) throws IOException{
        //폴더가 없는 경우 자동 생성 (설정된 경로 사용)
        File dir = new File(uploadDir);
        if(!dir.exists()) {dir.mkdirs();}

        // 파일 이름 중복 방지를 위한 UUID 생성
        String savedFilename= UUID.randomUUID().toString() + "_" +  file.getOriginalFilename();

        //설정된 경로(uploadDir)에 파일 저장
        File dest = new File(dir, savedFilename);
        file.transferTo(dest);

        // DB에는 실제 PC 경로가 아니라 웹에서 접근할 수 있는 경로를 저장함
        return urlPrefix + "/" + savedFilename;
    }
}
