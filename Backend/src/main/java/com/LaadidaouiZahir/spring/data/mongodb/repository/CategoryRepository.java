package com.LaadidaouiZahir.spring.data.mongodb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.LaadidaouiZahir.spring.data.mongodb.model.Category;

public interface CategoryRepository extends MongoRepository<Category, String> {
  List<Category> findByPublished(boolean published);
  List<Category> findByNameContaining(String name);
}
