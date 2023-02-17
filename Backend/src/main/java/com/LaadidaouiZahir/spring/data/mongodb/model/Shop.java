package com.LaadidaouiZahir.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "shops")
public class Shop {
  @Id
  private String id;

  private String name;
  private String description;
  private boolean isVacation;

  public Shop() {

  }

  public Shop(String name, String description, boolean isVacation) {
    this.name = name;
    this.description = description;
    this.isVacation = isVacation;
  }

  public String getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public boolean isVacation() {
    return isVacation;
  }

  public void setisVacation(boolean isVacation) {
    this.isVacation = isVacation;
  }

  @Override
  public String toString() {
    return "Tutorial [id=" + id + ", name=" + name + ", desc=" + description + ", isVacation=" + isVacation + "]";
  }
}
