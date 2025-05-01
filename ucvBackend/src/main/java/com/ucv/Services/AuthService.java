package com.ucv.Services;

import com.ucv.Controller.Model.AuthResponse;
import com.ucv.Controller.Model.AuthenticationRequest;
import com.ucv.Controller.Model.RegisterRequest;
public interface AuthService {

    AuthResponse register (RegisterRequest request);
    AuthResponse authenticate (AuthenticationRequest request);
    
}
