package helloNature.backend.service;

import helloNature.backend.AmazonS3ResourceStorage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@RequiredArgsConstructor
@Service
@Transactional
public class S3Service {
    private final AmazonS3ResourceStorage amazonS3ResourceStorage;

    public String getImagePath(MultipartFile multipartFile) {
        String BASE_DIR = "images";
        String fileId = UUID.randomUUID().toString();
        String format = "";
        if (StringUtils.hasText(multipartFile.getContentType())) {
            format = multipartFile.getContentType().substring(multipartFile.getContentType().lastIndexOf('/')+1);
        }

        return String.format("%s/%s.%s", BASE_DIR, fileId, format);

    }

    public String saveImage(MultipartFile multipartFile) {
        String path = getImagePath(multipartFile);
        amazonS3ResourceStorage.store(path, multipartFile);
        return path;
    }
}
