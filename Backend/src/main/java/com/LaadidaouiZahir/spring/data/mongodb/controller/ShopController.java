package com.LaadidaouiZahir.spring.data.mongodb.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.LaadidaouiZahir.spring.data.mongodb.model.Shop;
import com.LaadidaouiZahir.spring.data.mongodb.repository.ShopRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ShopController {

  @Autowired
  ShopRepository shopRepository;

  @GetMapping("/shops")
  public ResponseEntity<List<Shop>> getAllShops(@RequestParam(required = false) String name) {
    try {
      List<Shop> shops = new ArrayList<Shop>();

      if (name == null)
        shopRepository.findAll().forEach(shops::add);
      else
        shopRepository.findByNameContaining(name).forEach(shops::add);

      if (shops.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }

      return new ResponseEntity<>(shops, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/shops/{id}")
  public ResponseEntity<Shop> getShopById(@PathVariable("id") String id) {
    Optional<Shop> shopData = shopRepository.findById(id);

    if (shopData.isPresent()) {
      return new ResponseEntity<>(shopData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @PostMapping("/shops")
  public ResponseEntity<Shop> createShop(@RequestBody Shop shop) {
    try {
      Shop _shop = shopRepository.save(new Shop(shop.getName(), shop.getDescription(), false));
      return new ResponseEntity<>(_shop, HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @PutMapping("/shops/{id}")
  public ResponseEntity<Shop> updateShop(@PathVariable("id") String id, @RequestBody Shop shop) {
    Optional<Shop> shopData = shopRepository.findById(id);

    if (shopData.isPresent()) {
      Shop _shop = shopData.get();
      _shop.setName(shop.getName());
      _shop.setDescription(shop.getDescription());
      _shop.setisVacation(shop.isVacation());
      return new ResponseEntity<>(shopRepository.save(_shop), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/shops/{id}")
  public ResponseEntity<HttpStatus> deleteShop(@PathVariable("id") String id) {
    try {
      shopRepository.deleteById(id);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @DeleteMapping("/shops")
  public ResponseEntity<HttpStatus> deleteAllShops() {
    try {
      shopRepository.deleteAll();
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GetMapping("/shops/invacation")
  public ResponseEntity<List<Shop>> findByisVacation() {
    try {
      List<Shop> shops = shopRepository.findByisVacation(true);

      if (shops.isEmpty()) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(shops, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
