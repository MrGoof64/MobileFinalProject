package org.example.libraryapi.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

// This is just a POJO that takes the users.json file and puts
// the data into variables
@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;

    @Field("userName")
    private String userName;

    @Field("password")
    private String password;

    @Field("checkedOutBooks")
    private List<String> checkedOutBooks;
}
