package org.example.libraryapi.models;

import lombok.Getter;

@Getter
public enum Genre {
    FANTASY("Fantasy"),
    ROMANCE("Romance"),
    HISTORY("History"),
    BIOGRAPHY("Biography"),
    SCI_FI("Sci-Fi"),
    MYSTERY("Mystery"),
    YOUNG_ADULT("Young Adult"),
    HORROR("Horror"),
    ALLEGORICAL("Allegorical");

    private final String genre;

    Genre(String genre) { this.genre = genre; }

}
