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
        Optional<Profile> existingProfile = profileRepository.findById(profile.getEmail());

        if (existingProfile.isPresent()) {
            Profile updated = existingProfile.get();
            updated.setAge(profile.getAge());
            updated.setWeight(profile.getWeight());
            updated.setHeight(profile.getHeight());
            updated.setBloodgroup(profile.getBloodgroup());
            updated.setAccesstoken(profile.getAccesstoken());
            return profileRepository.save(updated);
        } else {
            return profileRepository.save(profile);
        }
    }
}
