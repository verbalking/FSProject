package com.LaadidaouiZahir.spring.data.mongodb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.LaadidaouiZahir.spring.data.mongodb.model.Product;

public interface ProductRepository extends MongoRepository<Product, String> {
  List<Product> findByPublished(boolean published);
  List<Product> findByNameContaining(String name);
}
