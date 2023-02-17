package com.LaadidaouiZahir.spring.data.mongodb.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "categories")
public class Category {
  @Id
  private String id;

  private String name;
  private boolean published;

  public Category() {

  }

  public Category(String name, boolean published) {
    this.name = name;
    this.published = published;
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


  public boolean isPublished() {
    return published;
  }

  public void setPublished(boolean isPublished) {
    this.published = isPublished;
  }

  @Override
  public String toString() {
    return "Product [id=" + id + ", name=" + name + ", published=" + published + "]";
  }
}
