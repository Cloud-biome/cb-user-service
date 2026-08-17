package com.cb.userservice.model;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterUserRequest {

    @NotBlank(message = "name is required")
    @Size(min = 2, max = 100, message = "name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "email is required")
    @Email(message = "email must be a valid address")
    private String email;

    public String getName()             { return name; }
    public String getEmail()            { return email; }
    public void setName(String name)    { this.name = name; }
    public void setEmail(String email)  { this.email = email; }
}
