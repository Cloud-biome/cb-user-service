package com.cb.userservice.model;

import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbBean;
import software.amazon.awssdk.enhanced.dynamodb.mapper.annotations.DynamoDbPartitionKey;

import java.time.Instant;

@DynamoDbBean
public class User {

    private String userId;
    private String name;
    private String email;
    private String createdAt;

    @DynamoDbPartitionKey
    public String getUserId()           { return userId; }
    public String getName()             { return name; }
    public String getEmail()            { return email; }
    public String getCreatedAt()        { return createdAt; }

    public void setUserId(String userId)        { this.userId = userId; }
    public void setName(String name)            { this.name = name; }
    public void setEmail(String email)          { this.email = email; }
    public void setCreatedAt(String createdAt)  { this.createdAt = createdAt; }

    public static User of(String userId, String name, String email) {
        User u = new User();
        u.setUserId(userId);
        u.setName(name);
        u.setEmail(email);
        u.setCreatedAt(Instant.now().toString());
        return u;
    }
}
