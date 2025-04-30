package com.ucv.Services;

import com.ucv.Model.AuthenticationRequest;
import com.ucv.Model.AuthResponse;
import com.ucv.Model.RegisterRequest;
public interface AuthService {

    AuthResponse register (RegisterRequest request);
    AuthResponse authenticate (AuthenticationRequest request);
    
}
