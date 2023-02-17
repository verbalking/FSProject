package com.LaadidaouiZahir.spring.data.mongodb.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.LaadidaouiZahir.spring.data.mongodb.model.Shop;

public interface ShopRepository extends MongoRepository<Shop, String> {
  List<Shop> findByisVacation(boolean isVacation);
  List<Shop> findByNameContaining(String name);
}
