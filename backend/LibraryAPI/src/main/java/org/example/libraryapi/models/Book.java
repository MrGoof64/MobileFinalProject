package org.example.libraryapi.models;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
@Document(collection = "books")
public class Book {
    @Id
    private String id;

    @Field("picture")
    private String picture;

    @Field("name")
    private String name;

    @Field("author")
    private String author;

    @Field("publisher")
    private String publisher;

    @Field("date")
    private String releaseDate;

    @Field("genre")
    private Genre genre;

    @Field("pages")
    private int pages;

    @Field("description")
    private String description;

    @Field("available")
    private int available;

    @Field("checkedOut")
    private int checkedOut;
}
