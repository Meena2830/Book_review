package com.bookreview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.bookreview")
public class BookReviewApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookReviewApplication.class, args);
	}

}
