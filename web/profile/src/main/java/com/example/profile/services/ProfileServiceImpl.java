package com.example.profile.services;

import com.example.profile.model.Profile;
import com.example.profile.repository.ProfileRepository;
import com.example.profile.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Override
    public Profile upsertProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    @Override
public Profile fetchProfile(String email) {
    return profileRepository.findById(email).orElse(null);
        
}

}
