package helloNature.backend;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Component
@RequiredArgsConstructor
public class AmazonS3ResourceStorage {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3Client amazonS3Client;

    public void store(String path, MultipartFile multipartFile) {
        File file = new File(System.getProperty("user.home"), path);

        /*
        String dir = path.split("/")[0];
        File folder = new File(System.getProperty("user.home")+dir);
        if (!folder.exists()) {
            System.out.println("no directory");
            folder.mkdir();
        }
         */

        try {
            multipartFile.transferTo(file);
            amazonS3Client.putObject(new PutObjectRequest(bucket, path, file)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (Exception e) {
            throw new RuntimeException();
        } finally {
            if (file.exists()) {
                file.delete();
            }
        }
    }

}
