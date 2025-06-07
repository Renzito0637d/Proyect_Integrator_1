package com.ucv.Controller.Model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

    // Atributos
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String nickname;
    private String password;
    private String cargo;
}