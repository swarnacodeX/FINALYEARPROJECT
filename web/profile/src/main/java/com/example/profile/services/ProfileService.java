package com.example.profile.services;

import com.example.profile.model.Profile;

public interface ProfileService {
    Profile upsertProfile(Profile profile);
    Profile fetchProfile(String email);
}
